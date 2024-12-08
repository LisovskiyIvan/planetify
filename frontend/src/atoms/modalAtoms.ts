import { atom } from 'jotai'
import { IPost } from '@/pages/User'

export const createProjectModalAtom = atom(false);
export const createPostModalAtom = atom(false);
export const changePostModalAtom = atom(false);
export const deletePostModalAtom = atom(false);
export const deleteProjectModalAtom = atom(false);
export const selectedPostAtom = atom<IPost | undefined>(undefined);
export const selectedProjectIdAtom = atom<number>(0);
export const triggerAtom = atom(false);
