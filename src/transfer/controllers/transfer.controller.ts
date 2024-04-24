import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TransferService } from '../services/transfer.service';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  findAll(): any[] {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.transferService.findOne(+id);
  }

  @Post()
  create(@Body() transfer: any): any {
    return this.transferService.create(transfer);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transfer: any): any {
    return this.transferService.update(+id, transfer);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.transferService.remove(+id);
  }
}
