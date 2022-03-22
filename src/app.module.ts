import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `../.${process.env.NODE_ENV}.env`),
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
