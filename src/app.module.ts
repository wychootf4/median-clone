// The root module of the application
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { SampleService } from './sample/sample.service';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [PrismaModule, ArticlesModule, SampleModule],
  controllers: [AppController],
  providers: [AppService, SampleService],
})
export class AppModule {}
