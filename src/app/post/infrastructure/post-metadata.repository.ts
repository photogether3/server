import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DrizzleRepository, postMetadatas } from 'src/shared/database';

import { PostMetadataModel } from '../domain/post-metadata/post-metadata.model';

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
}
