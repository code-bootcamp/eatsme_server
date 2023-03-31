import { UnprocessableEntityException } from '@nestjs/common';

export class MockTiamTableRepository {
  timeTable = [
    {
      _id: 1,
      time: '10시',
    },
    {
      _id: 2,
      time: '12시',
    },
    {
      _id: 3,
      time: '14시',
    },
    {
      _id: 4,
      time: '16시',
    },
    {
      _id: 5,
      time: '18시',
    },
    {
      _id: 6,
      time: '20시',
    },
    {
      _id: 7,
      time: '22시',
    },
    {
      _id: 8,
      time: '24시',
    },
  ];

  findOne({ _id }) {
    const result = this.timeTable.filter((el) => el._id === Number(_id));
    console.log(...result);
    return {
      ...result[0],
      exec: jest.fn().mockResolvedValue(result[0]),
    };
  }
}
