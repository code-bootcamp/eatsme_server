import { Controller, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { RemainTablesService } from './remainTable.service';

@Controller()
export class RemainTableController {
  constructor(
    private readonly remainTablesService: RemainTablesService, //
  ) {}

  @Delete('/info/road/remainTable')
  deleteRemainTable(
    @Req() req: Request, //
  ): Promise<boolean> {
    const { restaurant_id, table } = req.body;
    return this.remainTablesService.deleteRemainTable({
      _id: restaurant_id,
      table,
    });
  }
}
