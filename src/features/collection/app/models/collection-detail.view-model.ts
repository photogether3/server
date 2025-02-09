import { ApiProperty } from "@nestjs/swagger";

import { CollectionViewModel__Category } from "./collection.view-model";

export class CollectionDetailViewModel {
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;

    @ApiProperty({ description: '제목' })
    readonly title: string;

    @ApiProperty({ description: '게시물 개수' })
    readonly postCount: number;

    @ApiProperty({ type: CollectionViewModel__Category })
    readonly category: CollectionViewModel__Category;

    static fromPersistence(param: any) {
        return {
            collectionId: param.collectionId,
            title: param.title,
            postCount: param.postCount,
            category: JSON.parse(param.category),
        } as CollectionDetailViewModel;
    }
}