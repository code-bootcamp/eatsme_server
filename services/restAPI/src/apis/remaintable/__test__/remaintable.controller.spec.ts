import { Test, TestingModule } from '@nestjs/testing';
import { RemainTalbeController } from '../reaminTable.controller';
import { RemainTablesService } from '../remainTable.service';
import { Request } from 'express';
import { MockRemainTableServcie } from './remaintable-service.mock';
import { MockRemainTableRepository } from './remaintable-mock.DB';
import { UnprocessableEntityException } from '@nestjs/common';

describe('RestaurantController', () => {
  let remainTablesController: RemainTalbeController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        RemainTalbeController, //
      ],
      providers: [
        RemainTablesService, //
        {
          provide: RemainTablesService,
          useClass: MockRemainTableServcie,
        },
      ],
    }).compile();

    remainTablesController = moduleRef.get<RemainTalbeController>(
      RemainTalbeController,
    );
  });

  describe('deleteRemainTable', () => {
    it('정상 삭제', async () => {
      const { _id } = new MockRemainTableRepository().remainTables[0];

      const req: Request = {
        body: {
          restaurant_id: _id,
          table: 1,
        },
      } as Request;

      const result = await remainTablesController.deleteRemainTable(req);

      expect(result).toBe(true);
    });

    it('정상 삭제되지 않는 경우', async () => {
      const { _id } = new MockRemainTableRepository().remainTables[0];

      const req: Request = {
        body: {
          restaurant_id: _id,
          table: '100',
        },
      } as Request;

      try {
        await remainTablesController.deleteRemainTable(req);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
