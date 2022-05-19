import { SearchClient } from './search.client';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Logger } from 'nestjs-pino';
import { EventListener } from 'nestjs-io-client';

const INVALID = -1;

@Command({
  name: 'run',
  arguments: '[query]',
  argsDescription: {
    query: 'partial text to search with',
  },
  options: { isDefault: true },
})
export class SearchRunner implements CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    private readonly logger: Logger,
    private readonly client: SearchClient,
  ) {
    console.log('\nA long time ago, in a galaxy far, far away...\n');
  }

  async run(inputs: string[], options: Record<string, string>): Promise<void> {
    await this.queryAndSearch(inputs);
  }

  private async queryAndSearch(inputs: string[] = []) {
    let query = inputs[0];
    if (!query) {
      query = (await this.inquirer.ask<{ query: string }>('search', undefined))
        .query;
    }

    if (query === '') {
      process.exit(0);
    }

    console.log(' --- searching ---');

    this.client.search({ query });
  }

  @EventListener('search')
  async message(data: SearchResultDto) {
    if (data.page === INVALID && data.resultCount === INVALID) {
      console.log(data.error);
      console.log(`\n --- end of search results ---\n`);
      await this.queryAndSearch();
      return;
    }

    console.log(`Name : ${data.name}\nFilms: ${data.films}\n`);

    if (data.page == data.resultCount) {
      console.log(`\n --- end of search results ---\n`);
      await this.queryAndSearch();
    }
  }
}
