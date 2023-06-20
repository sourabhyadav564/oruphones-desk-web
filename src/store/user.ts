import TUser from '@/types/User';
import { atomWithStorage } from 'jotai/utils';

const userAtom = atomWithStorage<TUser | null>('user', null);

export default userAtom;
