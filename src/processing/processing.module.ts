import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { CsvService } from 'src/csv/csv.service';
import { HttpCommunicationService } from 'src/http-communication/http-communication.service';
import { OrderService } from 'src/order/order.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    ProcessingService,
    HttpCommunicationService,
    CsvService,
    OrderService,
  ],
})
export class ProcessingModule {}
