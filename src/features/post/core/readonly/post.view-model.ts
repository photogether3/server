import { ApiProperty } from '@nestjs/swagger';
import { CreatePostMetadataBodyDto } from '../dto/post-metadata.dto';
import { toKSTDate } from '../../../../shared/database';

export class PostViewModel__Metadata {
    @ApiProperty({ description: '메타데이터 텍스트', example: '추출데이터1' })
    readonly content: string;

    @ApiProperty({ description: '공개여부', example: true })
    readonly isPublic: boolean;
}

export class PostViewModel__Favorite {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '이름' })
    readonly name: boolean;
}

export class PostViewModel__Collection {
    @ApiProperty({ description: '컬랙션 ID' })
    readonly collectionId: string;

    @ApiProperty({ description: '제목' })
    readonly title: boolean;
}

export class PostViewModel {
    @ApiProperty({ description: '게시물 ID' })
    readonly postId: string;

    @ApiProperty({ description: '제목' })
    readonly title: string;

    @ApiProperty({ description: '내용' })
    readonly content: string;

    @ApiProperty({ description: '이미지 URL' })
    readonly imageUrl: string;

    @ApiProperty({ description: '생성일' })
    readonly createdAt: Date;

    @ApiProperty({ description: '수정일' })
    readonly updatedAt: Date;

    @ApiProperty({ description: '카테고리 정보', type: PostViewModel__Favorite })
    readonly category?: PostViewModel__Favorite;

    @ApiProperty({ description: '사진첩 정보', type: PostViewModel__Collection })
    readonly collection?: PostViewModel__Collection;

    @ApiProperty({ description: '메타데이터 목록', type: [PostViewModel__Metadata] })
    readonly metadataList: CreatePostMetadataBodyDto[];

    static fromPersistence(x: any, publicUrl: string) {
        let metadataJson: any[] = JSON.parse(x.metadata);
        const metadataList = metadataJson.map(x => ({ ...x, isPublic: x.isPublic === 1 } as PostViewModel__Metadata));
        const imageUrl = x.filePath ? `${publicUrl}/${x.filePath}` : null;
        return {
            postId: x.postId,
            title: x.title,
            content: x.content,
            imageUrl,
            category: JSON.parse(x.category),
            collection: JSON.parse(x.collection),
            metadataList,
            createdAt: toKSTDate(x.createdAt),
            updatedAt: toKSTDate(x.updatedAt),
        } as PostViewModel;
    }
}
