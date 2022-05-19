import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'search' })
export class SearchQuestions {
  @Question({
    message: 'Enter a character partial name to search for:',
    prefix: '\n... STAR WARS Character Search ...\n',
    suffix: '\n(enter to quit)',
    name: 'query',
  })
  parseQuery(val: string) {
    return val;
  }
}
