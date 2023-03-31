import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TimeTalbesService } from '../timeTable.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { MockTiamTableRepository } from './timeTable-mock.DB';

describe('TimeTableService', () => {
  let timeTablesService: TimeTalbesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TimeTalbesService, //
        {
          provide: getModelToken('TimeTable'),
          useClass: MockTiamTableRepository,
        },
      ],
    }).compile();
    timeTablesService = moduleRef.get<TimeTalbesService>(TimeTalbesService);
  });

  describe('timeTalbe', () => {
    it('예약 가능한 시간일때', async () => {
      const _id = '1';
      const result = await timeTablesService.findOne({ _id });
      expect(result).toStrictEqual({
        _id: 1,
        time: '10시',
      });
    });
    it('예약 가능한 시간아닐때!!', async () => {
      const _id = '10';
      try {
        await timeTablesService.findOne({ _id });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
