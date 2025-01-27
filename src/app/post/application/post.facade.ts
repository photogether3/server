import { Injectable } from '@nestjs/common';

import { FileManager } from '../../file/application';

import { CreatePostDTO } from './post.dto';

@Injectable()
export class PostFacade {

    constructor(
        private readonly fileManager: FileManager,
    ) {
    }

    async create(userId: string, dto: CreatePostDTO) {
        return this.fileManager.upload(userId, dto.file);
    }
}
