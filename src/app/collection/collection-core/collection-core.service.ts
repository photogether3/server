import { Injectable } from '@nestjs/common';

import { CollectionModel, CreateCollectionParam } from './collection.model';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionCoreService {

    constructor(
        private readonly collectionRepository: CollectionRepository,
    ) {
    }

    /**
     * @todo 사진첩 모델을 생성하고 DB에 저장합니다.
     * @return CollectionModel
     */
    async create(param: CreateCollectionParam) {
        const collection = CollectionModel.from(param);
        await this.collectionRepository.save(collection);
        return collection;
    }
}
