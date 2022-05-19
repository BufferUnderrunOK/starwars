import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await CommandFactory.runWithoutClosing(AppModule);
}

bootstrap();
