import { Module } from '@nestjs/common';
import { HttpCommunicationService } from './http-communication.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpCommunicationService],
})
export class HttpCommunicationModule {}
