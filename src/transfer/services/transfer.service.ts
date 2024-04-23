import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { TransferDto } from '../DTOs/common/bank.dto';
import { Transfer } from '../entities/bank.entity';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer.name) protected transferModel: Model<Transfer>,
  ) {}

  async create(createTransferDto: TransferDto): Promise<Transfer> {
    const createdTransfer = new this.transferModel(createTransferDto);
    return createdTransfer.save();
  }

  async findAll(): Promise<Transfer[]> {
    return this.transferModel.find().exec();
  }

  async findOne(id: string): Promise<Transfer> {
    return this.transferModel.findOne({ id }).exec();
  }

  findPaginated(
    filter: FilterQuery<Transfer>,
    sort?: Record<string, SortOrder>,
    limit = 400,
    skip = 0,
  ): Promise<any[]> {
    return this.transferModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .catch((error) =>
        this.throwUnhandledError(
          error,
          'findSortedPaginated',
          `Transfer couldn't be returned`,
        ),
      )
      .then((records) => {
        if (!records) {
          return null;
        }

        return records.map((record) => this.mapEntityToDto(record));
      });
  }

  throwUnhandledError(error: any, context: string, message: string): never {
    console.error(`Unhandled Error in ${context}:`, error);
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  mapEntityToDto(transfer: Transfer): TransferDto {
    const { sender, recipient, amount, description, id } = transfer;
    return { sender, recipient, amount, description, id };
  }

  async update(id: string, updateTransferDto: TransferDto): Promise<Transfer> {
    return this.transferModel
      .findOneAndUpdate({ id }, updateTransferDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Transfer> {
    return this.transferModel.findOneAndDelete({ id }).exec();
  }
}
