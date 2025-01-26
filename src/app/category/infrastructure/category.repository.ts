import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, asc, eq, inArray, isNull } from 'drizzle-orm';

import { categories, DrizzleRepository, favorites } from 'src/shared/database';
import { CategoryModel } from '../domain/category.model';

@Injectable()
export class CategoryRepository extends DrizzleRepository {

    async findCategories() {
        const results = await this.db
            .select()
            .from(categories)
            .where(isNull(categories.deletedAt))
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
        return results.map(x =>
            this.fromDrizzleModel(CategoryModel, x),
        );
    }

    async findCategoriesByUserId(userId: string) {
        const results = await this.db
            .select()
            .from(categories)
            .leftJoin(favorites, and(
                eq(favorites.categoryId, categories.categoryId),
            ))
            .where(and(
                eq(favorites.userId, userId),
                isNull(categories.deletedAt),
            ))
            .orderBy(asc(categories.name))
            .catch(err => {
                throw new InternalServerErrorException(err);
            });

        return results.map(x =>
            this.fromDrizzleModel(CategoryModel, x.categories),
        );
    }

    async getCategoriesWithFavoriteStatus(userId: string) {
        return await this.db
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
        const results = await this.db
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

        return results.map(x =>
            this.fromDrizzleModel(CategoryModel, x),
        );
    }

    async findCategoryById(categoryId: string) {
        const result = await this.db
            .select()
            .from(categories)
            .where(and(
                eq(categories.categoryId, categoryId),
                isNull(categories.deletedAt),
            ))
            .limit(1)
            .get()
            .catch(err => {
                throw new InternalServerErrorException(err);
            });

        return this.fromDrizzleModel(CategoryModel, result);
    }

    async save(category: CategoryModel) {
        await this.db
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

