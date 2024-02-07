import { Module } from '@nestjs/common';
import { CsvModule } from './csv/csv.module';
import { OrderModule } from './order/order.module';
import { ProcessingModule } from './processing/processing.module';
import { HttpCommunicationModule } from './http-communication/http-communication.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/config.schema';
import { config } from './config';
import { ConfigLoaderModule } from './config/config-loader.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    ConfigLoaderModule,
    CsvModule,
    OrderModule,
    ProcessingModule,
    HttpCommunicationModule,
  ],
})
export class AppModule {}
