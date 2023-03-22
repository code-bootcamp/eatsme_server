import { Controller, Post, Body } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService, //
  ) {}

  @Post('/info/channel')
  async getChannel(
    @Body() question: string, //
  ): Promise<string> {
    return this.channelService.questionGpt({ question });
  }
}
