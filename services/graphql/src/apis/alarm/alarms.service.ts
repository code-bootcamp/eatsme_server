import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Alarm } from "./entities/alarm.entity";


@Injectable()
export class AlarmsService {
 constructor(
  @InjectRepository(Alarm)
  private readonly alarmsRepository: Repository<Alarm>,
 ) {}

 
}