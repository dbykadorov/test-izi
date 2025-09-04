import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Купить хлеб', description: 'Новое название задачи' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: true, description: 'Отметка выполнения' })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
