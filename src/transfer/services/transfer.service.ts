import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferDto } from '../DTOs/common/bank.dto';
import { Transfer } from '../entities/bank.entity';

@Injectable()
export class TransferService {
  private transfers: any[] = []; // Simulated in-memory database

  findAll(): any[] {
    return this.transfers;
  }

  findOne(id: number): any {
    const transfer = this.transfers.find((t) => t.id === id);
    if (!transfer) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }
    return transfer;
  }

  create(transfer: any): any {
    const newTransfer = { id: this.generateId(), ...transfer };
    this.transfers.push(newTransfer);
    return newTransfer;
  }

  update(id: number, transfer: any): any {
    const index = this.transfers.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }
    this.transfers[index] = { ...this.transfers[index], ...transfer };
    return this.transfers[index];
  }

  remove(id: number): any {
    const index = this.transfers.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }
    const deletedTransfer = this.transfers.splice(index, 1);
    return deletedTransfer[0];
  }

  private generateId(): number {
    return this.transfers.length > 0
      ? Math.max(...this.transfers.map((t) => t.id)) + 1
      : 1;
  }
}
