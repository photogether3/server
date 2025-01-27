import { BadRequestException, Injectable } from '@nestjs/common';

import { CollectionModel } from './collection.model';
import { CollectionRepository } from '../infrastructure';
import {
    CollectionPaginationDto,
    CreateCollectionDto,
    GetCollectionsOptionDto,
    UpdateCollectionDto,
} from './dto';

@Injectable()
export class CollectionService {

    constructor(
        private readonly collectionRepository: CollectionRepository,
    ) {
    }

    /**
     * @todo 유저의 사진첩목록을 페이징처리하여 조회합니다.
     */
    async getCollections(dto: GetCollectionsOptionDto): Promise<CollectionPaginationDto> {
        const result = await this.collectionRepository.findPagedCollections(dto);
        if (result.totalItemCount === 0) {
            return CollectionPaginationDto.fromNullData();
        }
        return result;
    }

    /**
     * @todo 유저의 특정 사진첩을 조회합니다.
     * @throw 사진첩이 없으면 에러처리합니다.
     */
    async getCollection(userId: string, collectionId: string): Promise<CollectionModel> {
        const result = await this.collectionRepository.findCollection(userId, collectionId);
        if (!result) {
            throw new BadRequestException('사진첩을 찾을 수 없습니다.');
        }
        return result;
    }

    /**
     * @todo 사진첩 모델을 생성하고 DB에 저장합니다.
     */
    async create(param: CreateCollectionDto): Promise<CollectionModel> {
        const collection = CollectionModel.from(param);
        await this.collectionRepository.save(collection);
        return collection;
    }

    /**
     * @todo 사진첩 모델을 업데이트, DB에 저장합니다.
     */
    async update(collection: CollectionModel, dto: UpdateCollectionDto): Promise<CollectionModel> {
        collection = collection.withUpdate(dto);
        await this.collectionRepository.save(collection);
        return collection;
    }
}
