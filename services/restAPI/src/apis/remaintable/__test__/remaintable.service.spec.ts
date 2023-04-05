import { Test, TestingModule } from '@nestjs/testing';
import { RemainTablesService } from '../remainTable.service';
import { MockRemainTableRepository } from './remaintable-mock.DB';
import { MockRemainTableServcie } from './remaintable-service.mock';

describe('remainTableService', () => {
  let remainTableServcie: RemainTablesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RemainTablesService, //
        {
          provide: RemainTablesService,
          useClass: MockRemainTableServcie,
        },
      ],
    }).compile();

    remainTableServcie =
      moduleRef.get<RemainTablesService>(RemainTablesService);
  });

  describe('예약', () => {
    it('정상 예약 가능', async () => {
      const createReamintalbeInput = {
        restaurant: new MockRemainTableRepository().remainTables[0].restaurant,
        reservation_time: 1,
      };
      await remainTableServcie.findOne({ createReamintalbeInput });
    });
  });
});
