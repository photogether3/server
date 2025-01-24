import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, asc, eq, inArray, isNull } from 'drizzle-orm';

import { categories, DrizzleService, favorites } from 'src/shared/database';

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

    async findCategoriesByUserId(userId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(categories)
            .leftJoin(favorites, and(
                eq(favorites.categoryId, categories.categoryId),
            ))
            .where(eq(favorites.userId, userId))
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });

        return results.map(x => CategoryModel.fromDrizzleModel(x.categories));
    }

    async getCategoriesWithFavoriteStatus(userId: string) {
        return await this.drizzleService.db
            .select()
            .from(categories)
            .leftJoin(favorites, and(
                eq(favorites.categoryId, categories.categoryId),
                eq(favorites.userId, userId),
            ))
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
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


    async findCategoryById(categoryId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(categories)
            .where(and(
                eq(categories.categoryId, categoryId),
                isNull(categories.deletedAt),
            ))
            .limit(1)
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
        if (results.length === 0) return null;

        return CategoryModel.fromDrizzleModel(results.shift());
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

