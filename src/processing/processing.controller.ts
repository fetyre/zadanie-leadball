import { Controller, Get } from '@nestjs/common';
import { ProcessingService } from './processing.service';

@Controller('processing')
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @Get()
  findAll() {
    return this.processingService.getAverage();
  }
}
