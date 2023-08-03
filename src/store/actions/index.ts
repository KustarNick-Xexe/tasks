import ACTION_TYPE from '../constants';

export const addFolder = (name: string) => ({
    type: ACTION_TYPE.ADD_FOLDER,
    payload: { name }
});

export const addTask = (folderId: string, name: string) => ({
    type: ACTION_TYPE.ADD_TASK,
    payload: { folderId, name }
});

export const setIsOpenFolder = () => ({
    type: ACTION_TYPE.OPEN_FOLDER,
    payload: { }
});

export const setIsCloseFolder = () => ({
    type: ACTION_TYPE.CLOSE_FOLDER,
    payload: { }
});

export const setIsOpenTask = () => ({
    type: ACTION_TYPE.OPEN_TASK,
    payload: { }
});

export const selectTask = (id: string) => ({
    type: ACTION_TYPE.SELECT_TASK,
    payload: { id }
});

export const saveTaskTime = (id: string, time: string) => ({
    type: ACTION_TYPE.SAVE_TASK_TIME,
    payload: { id, time }
});

export const addTodayTask = (id: string) => ({
    type: ACTION_TYPE.ADD_TODAY_TASK,
    payload: { id }
});

export const deleteFolder = (id: string) => ({
    type: ACTION_TYPE.DELETE_FOLDER,
    payload: { id }
});

export const closeTask = (id: string) => ({
    type: ACTION_TYPE.CLOSE_TASK,
    payload: { id }
});

export const checkTask = (id: string, status: boolean) => ({
    type: ACTION_TYPE.CHECK_TASK,
    payload: { id, status }
});

export const deleteTask = (id: string, folderId: string) => ({
    type: ACTION_TYPE.DELETE_TASK,
    payload: { id, folderId }
});

export const moveTask = (id: string, oldFolderId: string,  newFolderId: string) => ({
    type: ACTION_TYPE.MOVE_TASK,
    payload: { id, oldFolderId, newFolderId }
});



