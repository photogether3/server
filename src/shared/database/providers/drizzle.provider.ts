import { Logger, Provider } from '@nestjs/common';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { EnvService } from '../../env';

export const DRIZZLE_ORM_TOKEN = 'DRIZZLE_ORM_TOKEN';

export function provideDrizzleOrm(): Provider {
    return {
        provide: DRIZZLE_ORM_TOKEN,
        useFactory: (envService: EnvService): LibSQLDatabase => {
            Logger.debug('Drizzle DB Init');
            const { url, authToken } = envService.getDBEnv();
            const client = createClient({ url, authToken });
            return drizzle(client, { casing: 'snake_case' });
        },
        inject: [EnvService],
    };
}
