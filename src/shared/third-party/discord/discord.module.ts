import {Global, Module} from "@nestjs/common";
import {DiscordWebHookService} from "./discord-web-hook.service";

@Global()
@Module({
    providers: [DiscordWebHookService],
    exports: [DiscordWebHookService]
})
export class DiscordModule {}