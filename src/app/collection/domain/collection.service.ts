import { BadRequestException, Injectable } from '@nestjs/common';

import { CollectionModel, CreateCollectionParam } from './collection.model';
import { GetCollectionsOptionDTO, UpdateCollectionDTO } from './collection.dto';
import { CollectionPaginationDTO, CollectionRepository, FindCollectionsOptionDTO } from '../infrastructure';

@Injectable()
export class CollectionService {

    constructor(
        private readonly collectionRepository: CollectionRepository,
    ) {
    }

    /**
     * @todo 유저의 사진첩목록을 페이징처리하여 조회합니다.
     */
    async getCollections(userId: string, dto: GetCollectionsOptionDTO): Promise<CollectionPaginationDTO> {
        const { page, perPage } = dto;
        const offset = (page - 1) * perPage;
        const params: FindCollectionsOptionDTO = { ...dto, userId, offset };
        const result = await this.collectionRepository.findPagedCollections(params);
        if (result.totalItemCount === 0) {
            return CollectionPaginationDTO.fromNullData();
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
    async create(param: CreateCollectionParam): Promise<CollectionModel> {
        const collection = CollectionModel.from(param);
        await this.collectionRepository.save(collection);
        return collection;
    }

    /**
     * @todo 사진첩 모델을 업데이트, DB에 저장합니다.
     */
    async update(collection: CollectionModel, dto: UpdateCollectionDTO): Promise<CollectionModel> {
        const { title, categoryId } = dto;
        collection = collection.withUpdate(title, categoryId);
        await this.collectionRepository.save(collection);
        return collection;
    }
}
