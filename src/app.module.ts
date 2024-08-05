//app.module.ts
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {InzeratService} from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
  ],
  controllers: [AppController],
  providers: [InzeratService],
})
export class AppModule {}
