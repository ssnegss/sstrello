import type { IBase } from './root.types';

export enum EnumTaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITask extends IBase {
	name: string;
	priority?: EnumTaskPriority;
	isCompleted: boolean;
}

export type TypeTask = Required<ITask>;

export type TypeTaskCreate = Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>;

export type TypeTaskUpdate = Partial<
	Omit<TypeTask, 'id' | 'createdAt' | 'updatedAt'>
>;
