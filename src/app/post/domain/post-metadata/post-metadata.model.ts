import { OrmModel } from 'src/shared/database';
import { CreatePostMetadataBodyDto } from './dto';
import { plainToInstance } from 'class-transformer';

export class PostMetadataModel extends OrmModel {
    readonly postId: string;
    readonly rank: number;
    readonly content: string;
    readonly isPublic: boolean;

    static from(postId: string, rank: number, dto: CreatePostMetadataBodyDto) {
        const now = new Date();
        return plainToInstance(PostMetadataModel, {
            postId,
            rank,
            content: dto.content,
            isPublic: dto.isPublic,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as PostMetadataModel);
    }
}
