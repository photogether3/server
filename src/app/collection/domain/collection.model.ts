import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';

import { CreateCollectionDto, UpdateCollectionDto } from './dto';

export class CollectionModel extends OrmModel {

    readonly collectionId: string;
    readonly title: string;
    readonly userId: string;
    readonly categoryId: string;

    static from(dto: CreateCollectionDto) {
        return plainToInstance(CollectionModel, {
            collectionId: nanoid(30),
            title: dto.title,
            userId: dto.userId,
            categoryId: dto.categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        } as CollectionModel);
    }

    withUpdate(dto: UpdateCollectionDto) {
        return plainToInstance(CollectionModel, {
            ...this,
            title: dto.title,
            categoryId: dto.categoryId,
            updatedAt: new Date(),
        } as CollectionModel);
    }
}
