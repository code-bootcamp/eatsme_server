import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IRemainTableReduceTable,
  IRemainTableServiceDelete,
  IRmainTableFindOne,
} from './interfaces/remainTable.interface';
import { RemainTableDocument } from './schemas/remaintable.schemas';

@Injectable()
export class RemainTablesService {
  constructor(
    @InjectModel('RemainTable')
    private readonly reaminTableModel: Model<RemainTableDocument>,
  ) {}

  async findOne({
    createReamintalbeInput,
  }: IRmainTableFindOne): Promise<RemainTableDocument> {
    const isRemainTable = await this.reaminTableModel
      .findOne({
        restaurant: createReamintalbeInput.restaurant,
        reservation_time: createReamintalbeInput.reservation_time,
      })
      .exec();

    if (!isRemainTable.remainTable)
      throw new UnprocessableEntityException('더 이상 예약이 불가능합니다.');

    if (!isRemainTable) {
      return await new this.reaminTableModel({
        ...createReamintalbeInput,
      }).save();
    }

    return isRemainTable;
  }

  async remainTable({ _id, table }: IRemainTableReduceTable): Promise<void> {
    const result = await this.reaminTableModel.updateOne(
      { _id },
      { $inc: { remainTable: -table } },
    );
    if (!result.matchedCount)
      throw new UnprocessableEntityException('변경되지 않았습니다.');
  }

  async deleteRemainTable({
    _id,
    table,
  }: IRemainTableServiceDelete): Promise<boolean> {
    const result = await this.reaminTableModel.updateOne(
      { 'restaurant._id': _id },
      { $inc: { remainTable: +table } },
    );
    if (!result.matchedCount)
      throw new UnprocessableEntityException('변경되지 않았습니다.');
    return true;
  }
}
