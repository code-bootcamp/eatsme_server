import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalMapData } from './entities/personalMapData.entity';
import { IPersonalMapServiceSavePersonalMapData } from './interface/personalMapData-service.interface';

@Injectable()
export class PersonalMapDataService {
  constructor(
    @InjectRepository(PersonalMapData)
    private readonly personalMapDataRepository: Repository<PersonalMapData>,
  ) {}

  async savePersonalMapData({
    isSave,
  }: IPersonalMapServiceSavePersonalMapData): Promise<PersonalMapData> {
    return this.personalMapDataRepository.save({
      ...isSave,
    });
  }
}
