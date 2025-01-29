import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiFiles() {
    return applyDecorators(
        ApiConsumes('multipart/form-data'),
        ApiBody({
            description: 'files (array)',
            schema: {
                type: 'object',
                properties: {
                    files: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        }),
    );
}
