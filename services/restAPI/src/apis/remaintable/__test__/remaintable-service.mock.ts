import { UnprocessableEntityException } from '@nestjs/common';
import {
  IRemainTableServiceDelete,
  IRmainTableFindOne,
} from '../interfaces/remainTable.interface';
import { RemainTableDocument } from '../schemas/remaintable.schemas';

import { MockRemainTableRepository } from './remaintable-mock.DB';

export class MockRemainTableServcie {
  remainTableModel = new MockRemainTableRepository();

  async findOne({
    createReamintalbeInput,
  }: IRmainTableFindOne): Promise<RemainTableDocument> {
    const isRemainTable = await this.remainTableModel
      .findOne({
        restaurant: createReamintalbeInput.restaurant,
        reservation_time: createReamintalbeInput.reservation_time,
      })
      .exec();

    if (!isRemainTable.remainTable)
      throw new UnprocessableEntityException('더 이상 예약이 불가능합니다.');

    if (!isRemainTable) {
      return await new this.remainTableModel({
        ...createReamintalbeInput,
      }).save();
    }

    return isRemainTable;
  }

  async deleteRemainTable({
    _id,
    table,
  }: IRemainTableServiceDelete): Promise<boolean> {
    const result = await this.remainTableModel.updateOne(
      { _id },
      { $inc: { remainTable: +table } },
    );
    if (!result.matchedCount)
      throw new UnprocessableEntityException('변경되지 않았습니다.');
    return true;
  }
}
