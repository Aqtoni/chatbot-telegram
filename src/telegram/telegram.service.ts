import { ChatgptService } from '@/chatgpt/chatgpt.service';
import { ConfigService } from '@nestjs/config';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
    private readonly gpt: ChatgptService,
  ) {
    super(configService.get('TELEGRAM_API'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Привет, ${ctx.from.username}</b>
This is a chat bot with ChatGPT!
Enter any phrase and get an answer!
        `);
  }

  @On('text')
 onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    ctx.replyWithHTML(this.gpt.generateResponse(message));
  }
}
