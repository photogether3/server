import { Module } from '@nestjs/common';

import { CategoryFacade } from './category.facade';
import { CategoryController } from './category.controller';
import { CategoryCoreModule } from './category-core/category-core.module';

@Module({
    imports: [CategoryCoreModule],
    controllers: [CategoryController],
    providers: [CategoryFacade],
})
export class CategoryModule {
}
