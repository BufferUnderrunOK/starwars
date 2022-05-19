import { ConsoleLogger, Logger, Module } from '@nestjs/common';
import { IoClientModule } from 'nestjs-io-client';
import { SearchRunner } from './search/search.runner';
import { SearchClient } from './search/search.client';
import { SearchQuestions } from './search/search.questions';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

@Module({
  imports: [
    IoClientModule.forRoot({
      uri: 'ws://localhost:3000/',
      options: {
        reconnectionDelayMax: 10000,
      },
    }),
    LoggerModule.forRoot(),
  ],
  providers: [SearchRunner, SearchClient, SearchQuestions],
})
export class AppModule {
  constructor(private readonly logger: PinoLogger) {
    logger.logger.level = 'error';
  }
}
