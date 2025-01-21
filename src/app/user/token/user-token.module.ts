import {Module} from "@nestjs/common";

import {UserTokenService} from "./user-token.service";
import {UserTokenRepository} from "./user-token.repository";

@Module({
    imports: [],
    providers: [
        UserTokenService,
        UserTokenRepository
    ],
    exports: [UserTokenService]
})
export class UserTokenModule {}