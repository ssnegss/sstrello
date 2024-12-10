import type { IBase } from './root.types';

export interface ITimeBlock extends IBase {
	name: string;
	color?: string;
	duration: number;
	order: number;
}

export type TypeTimeBlock = Required<ITimeBlock>;

export type TypeTimeBlockCreate = Omit<
	ITimeBlock,
	'id' | 'createdAt' | 'updatedAt'
>;

export type TypeTimeBlockUpdate = Partial<
	Omit<TypeTimeBlock, 'createdAt' | 'updatedAt'>
>;
