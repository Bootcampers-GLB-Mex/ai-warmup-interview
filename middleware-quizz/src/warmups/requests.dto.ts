import { ApiProperty } from '@nestjs/swagger';
import {
  FilterByCriteria,
  OrderByCriteria,
  WarmupsRequest,
} from './requests.schema';

export class WarmupsRequestDTO implements WarmupsRequest {
  @ApiProperty()
  filterBy: FilterByCriteria;

  @ApiProperty()
  orderBy: OrderByCriteria;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
