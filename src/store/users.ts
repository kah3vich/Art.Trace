import { atom } from 'nanostores';

export type TUser = {
	id: number;
	name: string;
};

export const users = atom<TUser[]>([]);

export function addUser(user: TUser) {
	users.set([...users.get(), user]);
}
