import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from 'src/shared/base';
import { CollectionViewModel } from '../collection.view-model';

// export class GetCollectionsOptionDto {
//     readonly userId: string;
//     readonly page: number;
//     readonly offset: number;
//     readonly perPage: number;
//     readonly sortBy: CollectionSortBy;
//     readonly sortOrder: SortOrders;
// }

export class CreateCollectionDto {
    readonly title: string;
    readonly userId: string;
    readonly categoryId: string;
}

export class UpdateCollectionDto {
    readonly title: string;
    readonly categoryId: string;
}

///////////////////////////////////Response///////////////////////////////////////

export class CollectionPaginationDto extends PaginationDto<CollectionViewModel> {
    @ApiProperty({ type: [CollectionViewModel] })
    readonly items: CollectionViewModel[];
}
