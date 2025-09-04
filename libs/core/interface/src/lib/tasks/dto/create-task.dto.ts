import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Вынести мусор', description: 'Название новой задачи' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: false, description: 'Начальный статус выполнения' })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
