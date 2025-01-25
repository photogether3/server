import { BadRequestException, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { UserParam } from '../../user/framework';
import { UserModel } from '../../user/domain';

import { ApiFiles } from '../framework';
import { FileFacade } from './file.facade';
import { FileResultDTO } from '../domain';

@Controller({ version: '1' })
@ApiTags('파일 시스템')
@ApiBearerAuth()
export class FileController {

    constructor(
        private readonly fileFacade: FileFacade,
    ) {
    }

    @Post('images')
    @ApiOperation({
        summary: '이미지 파일 일괄 생성', description: `
        # 이미지 파일을 필요로하는 다른 도메인 API 이전에 호출
        - 먼저 저장이 필요한 파일들을 업로드
        - 반환 값으로 임시저장된 파일 URL 배열을 제공(일괄성을 위해 단건 저장도 배열로 반환됨)
        - 전달받은 이미지 URL을 다른 도메인 API의 body 값(imageUrl) 으로 전달해야 임시 -> 영구 데이터로 저장됨
        - 현재 앱에서는 게시물 등록, 프로필 사진 업로드/변경 전에 사용가능
        - 임시 저장된 파일은 일정시간(정책에 따라변경됨)이 지나면 스캐줄러에 의해 삭제처리
    `,
    })
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiFiles()
    @ApiResponse({ type: [FileResultDTO] })
    async uploadImages(
        @UserParam() user: UserModel,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        if (!files || files?.length === 0) {
            throw new BadRequestException('파일을 등록해 주세요.');
        }
        return await this.fileFacade.creates(user.id, files);
    }
}
