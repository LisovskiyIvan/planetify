import { atom } from 'jotai'
import { IPost } from '@/pages/User'
import { IBoard, ITask } from '@/models';

export const createProjectModalAtom = atom(false);
export const createPostModalAtom = atom(false);
export const changePostModalAtom = atom(false);
export const deletePostModalAtom = atom(false);
export const deleteProjectModalAtom = atom(false);
export const selectedPostAtom = atom<IPost | undefined>(undefined);
export const selectedProjectIdAtom = atom<number>(0);
export const triggerAtom = atom(false);


export const createBoardModalAtom = atom(false);
export const createColumnModalAtom = atom({isOpen: false, boardId: 0, position: 0});
export const createTaskModalAtom = atom({isOpen: false, columnId: 0, position: 0});
export const changeColumnModalAtom = atom(false);
export const changeTaskModalAtom = atom(false);
export const deleteBoardModalAtom = atom({isOpen: false, id: 0});
export const deleteColumnModalAtom = atom({isOpen: false, id: 0});
export const deleteTaskModalAtom = atom({isOpen: false, id: 0});
export const triggerBoardAtom = atom(false);
export const selectedTaskAtom = atom<ITask | undefined>(undefined);
export const selectedColumnAtom = atom<number>(0);
export const selectedBoardAtom = atom<number | undefined>(undefined);
export const boardsAtom = atom<IBoard[]>([]);
export const currentBoardAtom = atom<IBoard>((get) => get(boardsAtom).find((board) => board.id === get(selectedBoardAtom))!);
