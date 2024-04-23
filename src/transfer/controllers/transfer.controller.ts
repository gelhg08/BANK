import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransfersService } from '../services/transfer.service';
import { TransferDto } from '../DTOs/common/bank.dto';
import { PaginatedTransfersRequestDto } from '../DTOs/requests/paginated-bank-requests.dto';
import { TransferResponseDto } from '../DTOs/response/bank-response.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransfersService) {}

  @Post()
  async create(@Body() transferDto: TransferDto): Promise<TransferDto> {
    return await this.transferService.create(transferDto);
  }

  @Get()
  async findAll(): Promise<TransferDto[]> {
    return await this.transferService.findAll();
  }

  @Get('paginated')
  @HttpCode(HttpStatus.OK)
  async findPaginated(
    @Query() query: PaginatedTransfersRequestDto,
  ): Promise<TransferResponseDto[]> {
    const transferList = await this.transferService.findPaginated(
      query,
      { createdAt: -1 },
      query.docsPerPage,
      query.offset,
    );
    return transferList;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TransferDto> {
    return await this.transferService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() transferDto: TransferDto,
  ): Promise<TransferDto> {
    return await this.transferService.update(id, transferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TransferDto> {
    return await this.transferService.remove(id);
  }
}
