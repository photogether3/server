import { OrmModel } from 'src/shared/database';
import { FileFlags } from '../types';
import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

export class FileGroupModel extends OrmModel {

    readonly fileGroupId: string;
    readonly flag: string;

    static from(flag: FileFlags) {
        const now = new Date();
        return plainToInstance(FileGroupModel, {
            fileGroupId: nanoid(30),
            flag,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as FileGroupModel);
    }
}
