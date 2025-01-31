import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository, postMetadatas } from 'src/shared/database';

import { PostMetadataModel } from '../models/post-metadata.model';


@Injectable()
export class PostMetadataRepository extends DrizzleRepository {

    async saves(metadataModels: PostMetadataModel[]) {
        this.db
            .insert(postMetadatas)
            .values(metadataModels.map(x => x.toPlainObject()))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }

    async removes(postId: string) {
        await this.db
            .delete(postMetadatas)
            .where(eq(postMetadatas.postId, postId));
    }
}
