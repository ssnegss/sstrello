import type { IBase } from './root.types';

export interface ITimerRound extends IBase {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface ITimerSession extends IBase {
	isCompleted?: boolean;
	rounds?: ITimerRound[];
}

export type TypeTimerSession = Required<ITimerSession>;
export type TypeTimerRound = Required<ITimerRound>;

export type TypeTimerSessionCreate = Omit<
	ITimerSession,
	'id' | 'createdAt' | 'updatedAt'
>;

export type TypeTimerSessionUpdate = Partial<
	Omit<TypeTimerSession, 'id' | 'createdAt' | 'updatedAt'>
>;

export type TypeTimerRoundUpdate = Partial<
	Omit<TypeTimerRound, 'id' | 'createdAt' | 'updatedAt'>
>;
