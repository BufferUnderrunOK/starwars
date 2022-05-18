import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'search', description: 'A parameter parse' })
export class SearchCommand implements CommandRunner {
  constructor(private readonly logger: Logger) {}

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    this.runWithNone(passedParam);
  }

  runWithNone(param: string[]): void {
    this.logger.log({ param });
  }
}
