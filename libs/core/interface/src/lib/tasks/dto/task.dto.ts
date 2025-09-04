import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: 'a3f3a3c2-7f14-4a0a-9b9e-2f4b1d9f2c1a', description: 'Уникальный идентификатор задачи' })
  id!: string;

  @ApiProperty({ example: 'Вынести мусор', description: 'Название задачи' })
  title!: string;

  @ApiProperty({ example: false, description: 'Признак выполнения' })
  completed!: boolean;
}


