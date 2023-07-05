import TUser from '@/types/User';
import { atom } from 'jotai';

const userAtom = atom<Partial<TUser> | null | undefined>(undefined);

export default userAtom;
