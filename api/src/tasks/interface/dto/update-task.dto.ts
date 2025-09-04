import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
	@ApiPropertyOptional({ example: 'Buy bread' })
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	completed?: boolean;
}
