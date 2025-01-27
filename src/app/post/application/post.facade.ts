import { Injectable } from '@nestjs/common';

import { FileManager } from '../../file/application';

import { CreatePostBodyDto } from './request-dto';

@Injectable()
export class PostFacade {

    constructor(
        private readonly fileManager: FileManager,
        // private readonly postService: PostService,
    ) {
    }

    async create(userId: string, _dto: CreatePostBodyDto) {
        const { file, ...dto } = _dto;
        const fileGroup = await this.fileManager.upload(userId, file);

        const {  } = dto;
        // this.postService.create();
    }
}
