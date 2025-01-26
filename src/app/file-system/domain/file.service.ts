import { Injectable } from '@nestjs/common';

import { CreateFileDTO } from './file.dto';
import { FileFlags } from './file.type';
import { FileGroupModel } from './models/file-group.model';
import { FileItemModel } from './models/file-item.model';
import { FileGroupRepository, FileItemRepository } from '../infastructure';

@Injectable()
export class FileService {

    constructor(
        private readonly fileGroupRepository: FileGroupRepository,
        private readonly fileItemRepository: FileItemRepository,
    ) {
    }

    /**
     * @todo 파일그룹을 조회합니다.
     */
    async getFileGroup(userId: string, fileGroupId: string) {
        const result = await this.fileGroupRepository.findFileGroup(userId, fileGroupId);
    }

    /**
     * @todo 파일그룹모델과 하위 파일아이템들을 생성하고 DB에 저장합니다.
     * @warning 다수 도메인 모델의 생성을 제어합니다.
     * @warning 외부 트랜잭션 처리가 필요합니다.
     */
    async creates(userId: string, dtos: CreateFileDTO[], flag: FileFlags = FileFlags.TEMP): Promise<FileGroupModel> {
        const fileGroup = FileGroupModel.from(userId, flag);
        const fileItems = dtos.map(dto =>
            FileItemModel.from(fileGroup.fileGroupId, userId, dto),
        );
        await this.fileGroupRepository.save(fileGroup);
        await this.fileItemRepository.saves(fileItems);

        return fileGroup;
    }
}
