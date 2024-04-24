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
import { TransferDto } from '../DTOs/common/transfer.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  findAll(): TransferDto[] {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TransferDto {
    return this.transferService.findOne(+id);
  }

  @Post()
  create(@Body() transfer: TransferDto): TransferDto {
    return this.transferService.create(transfer);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transfer: TransferDto): TransferDto {
    return this.transferService.update(+id, transfer);
  }

  @Delete(':id')
  remove(@Param('id') id: string): TransferDto {
    return this.transferService.remove(+id);
  }
}
