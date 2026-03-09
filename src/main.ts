import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/exceptionsGlobal';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter)
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true,}),)
  app.enableCors({origin: ['*', ], methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], credentials: true,})
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Api Rodando na Porta ${process.env.PORT ?? 3000}`)
}
bootstrap();
