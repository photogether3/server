import { ApiProperty } from '@nestjs/swagger';

export class CollectionViewModel__Category {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '이름' })
    readonly name: string;
}

export class CollectionViewModel {
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;

    @ApiProperty({ description: '제목' })
    readonly title: string;

    @ApiProperty({ description: '게시물 개수' })
    readonly postCount: number;

    @ApiProperty({ type: CollectionViewModel__Category })
    readonly category: CollectionViewModel__Category;

    @ApiProperty({ description: '일부 이미지 URL' })
    readonly imageUrls: string[];

    static fromPersistence(param: any, publicUrl: string) {
        const filePaths: any[] = JSON.parse(param.filePaths);
        const imageUrls =
            filePaths
                .map(x => `${publicUrl}/${x.filePath as string}`)
                .filter((x, i) => i < 3)

        return {
            collectionId: param.collectionId,
            title: param.title,
            postCount: param.postCount,
            category: JSON.parse(param.category),
            imageUrls,
        } as CollectionViewModel;
    }
}
