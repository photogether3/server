import { Module } from '@nestjs/common';

import { CategoryCoreService } from './category-core.service';
import { CategoryRepository } from './category.repository';

@Module({
    providers: [CategoryCoreService, CategoryRepository],
    exports: [CategoryCoreService],
})
export class CategoryCoreModule {
}
