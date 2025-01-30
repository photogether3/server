import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateFileDto } from './dto';
import { FileGroupRepository, FileItemRepository } from '../infra';
import { FileFlags, FileGroupModel, FileItemModel } from '../core';

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
    async getFileGroup(fileGroupId: string) {
        const result = await this.fileGroupRepository.findFileGroup(fileGroupId);
    }

    /**
     * @todo 파일아이템을 조회합니다.
     * @throw 파일아이템이 없으면 에러처리합니다.
     */
    async getFileItem(fileGroupId: string) {
        const result = await this.fileItemRepository.findFileItem(fileGroupId);
        if (!result) {
            throw new BadRequestException('파일을 찾을 수 없습니다.');
        }
        return result;
    }

    /**
     * @todo 파일그룹모델과 하위 파일아이템을 생성하고 DB에 저장합니다.
     * @warning 다수 도메인 모델의 생성을 제어합니다.
     * @warning 외부 트랜잭션 처리가 필요합니다.
     */
    async create(metadata: CreateFileDto, flag: FileFlags): Promise<FileGroupModel> {
        const fileGroup = FileGroupModel.from(flag);
        const fileItem = FileItemModel.from(fileGroup.fileGroupId, metadata);
        await this.fileGroupRepository.save(fileGroup);
        await this.fileItemRepository.save(fileItem);
        return fileGroup;
    }

    /**
     * @todo 파일그룹모델과 하위 파일아이템들을 생성하고 DB에 저장합니다.
     * @warning 다수 도메인 모델의 생성을 제어합니다.
     * @warning 외부 트랜잭션 처리가 필요합니다.
     */
    async creates(dtos: CreateFileDto[], flag: FileFlags = FileFlags.TEMP): Promise<FileGroupModel> {
        const fileGroup = FileGroupModel.from(flag);
        const fileItems = dtos.map(dto =>
            FileItemModel.from(fileGroup.fileGroupId, dto),
        );
        await this.fileGroupRepository.save(fileGroup);
        await this.fileItemRepository.saves(fileItems);

        return fileGroup;
    }
}
