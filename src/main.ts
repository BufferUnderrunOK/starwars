import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    errorHandler: (err) => {
      if (err.message === '(outputHelp)') {
        process.exit(0);
      }
      console.error(err);
      process.exit(1);
    },
  });
}

bootstrap();
