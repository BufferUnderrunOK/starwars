import { Logger, Module } from '@nestjs/common';
import { SearchCommand } from './search/search.command';

@Module({
  imports: [],
  providers: [SearchCommand, Logger],
})
export class AppModule {}
