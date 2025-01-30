import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';
import { CreatePostDto } from '../dto/post.dto';

export class PostModel extends OrmModel {
    readonly postId: string;
    readonly userId: string;
    readonly fileGroupId: string;
    readonly collectionId: string;
    readonly title: string;
    readonly content: string;

    static from(userId: string, dto: CreatePostDto) {
        const now = new Date();
        return plainToInstance(PostModel, {
            postId: nanoid(30),
            userId,
            fileGroupId: dto.fileGroupId,
            collectionId: dto.collectionId,
            title: dto.title,
            content: dto.content,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as PostModel);
    }

    withRemove() {
        return plainToInstance(PostModel, {
            ...this,
            deletedAt: new Date(),
        });
    }
}
