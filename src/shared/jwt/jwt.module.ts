import {Global, Module} from "@nestjs/common";
import {JwtUtilService} from "./jwt-util.service";

@Global()
@Module({
    providers: [JwtUtilService],
    exports: [JwtUtilService],
})
export class JwtModule {}