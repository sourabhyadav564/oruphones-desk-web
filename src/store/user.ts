import TUser from '@/types/User';
import { atomWithStorage } from 'jotai/utils';

const userAtom = atomWithStorage<TUser | null | undefined>('user', undefined);

export default userAtom;
