import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TransferDto } from '../common/transfer.dto';

export class TransferResponseDto extends TransferDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
