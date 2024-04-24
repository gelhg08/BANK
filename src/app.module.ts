import { Module } from '@nestjs/common';
import { TransferModule } from './transfer/transfer.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './persistence/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
