import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, asc, inArray, isNull } from 'drizzle-orm';

import { categories, DrizzleService } from 'src/shared/database';

import { CategoryModel } from './category.model';

@Injectable()
export class CategoryRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findCategories() {
        const results = await this.drizzleService.db
            .select()
            .from(categories)
            .where(isNull(categories.deletedAt))
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });

        return results.map(x => CategoryModel.fromDrizzleModel(x));
    }

    async findCategoriesByIds(categoryIds: string[]) {
        const results = await this.drizzleService.db
            .select()
            .from(categories)
            .where(
                and(
                    inArray(categories.categoryId, categoryIds),
                    isNull(categories.deletedAt),
                ),
            )
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });

        return results.map(x => CategoryModel.fromDrizzleModel(x));
    }

    async save(category: CategoryModel) {
        await this.drizzleService.db
            .insert(categories)
            .values(category.toPlainObject())
            .onConflictDoUpdate({
                target: categories.categoryId,
                set: category.toPlainObject(),
            })
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }
}
