import { Module, StandardSchemaValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // Enforces every `@Body({ schema })` and `@Param('x', { schema })` in the app, tests included.
    { provide: APP_PIPE, useClass: StandardSchemaValidationPipe },
  ],
})
export class AppModule {}
