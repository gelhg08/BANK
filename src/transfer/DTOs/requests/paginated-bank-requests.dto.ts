import { IsNumber, IsOptional, IsString } from 'class-validator';
import { TransferRequestDto } from './bank-requests.dto';

export class PaginatedTransfersRequestDto extends TransferRequestDto {
  @IsNumber()
  @IsOptional()
  docsPerPage?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  sortBy?: string;
}
