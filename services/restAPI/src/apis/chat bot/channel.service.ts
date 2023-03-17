import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
// 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
interface IChannelServiceQuestion {
  question: string;
}

@Injectable()
export class ChannelService {
  async questionGpt({ question }: IChannelServiceQuestion): Promise<string> {
    console.log(Object.values(question));
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: Object.values(question)[0],
      temperature: 0.9,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    });
    console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
  }
}
