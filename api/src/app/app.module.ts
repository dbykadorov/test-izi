import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InterfaceModule } from '@izi/core/interface';

@Module({
  imports: [InterfaceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
