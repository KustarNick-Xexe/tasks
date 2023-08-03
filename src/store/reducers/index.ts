import { v4 as createId } from 'uuid'
import ACTION_TYPE from '../constants'
import getCurrentDate from '../../helpers/getCurrentDate';
import addTimes from '../../helpers/addTimes';
import subtractTimes from '../../helpers/substractTimes';


const initialState = {
    folders: [
        { id: createId(), name: 'Основные задачи', time: '00:00:00', tasks: [] },
        { id: createId(), name: 'Архив', time: '00:00:00', tasks: [] },
    ],
    tasks: [],
    todayWorktime: '00:00:00',
    today: getCurrentDate(),
    todayTasks: [],
    folderIsOpen: false,
    taskIsOpen: false,
    selectedTask: null,
}

//исправить здесь возврат
const addTask = (state, action) => {
    const newItem = {
        id: createId(),
        name: action.payload.name,
        time: '00:00:00',
        isDone: false,
        folderId: action.payload.folderId,
    };

    state.folders.find(folder => folder.id === action.payload.folderId).tasks.push(newItem.id);
    state.tasks.push(newItem);

    return {
        ...state,
        folders: [
            ...state.folders,
        ],
    };
};

const checkTask = (state, action) => {
    const updatedTask = state.tasks.find((task) => task.id === action.payload.id);
    updatedTask.isDone = action.payload.status;
    return {
        ...state,
        tasks: [
            ...state.tasks,
        ]
    };
}

const addFolder = (state, action) => {
    const newItem = {
        id: createId(),
        name: action.payload.name,
        tasks: [],
    };

    return {
        ...state,
        folders: [
            ...state.folders,
            newItem,
        ],
    };
};


const openFolder = (state, action) => {
    return {
        ...state,
        folderIsOpen: true,
    };
}


const openTask = (state, action) => {
    return {
        ...state,
        taskIsOpen: true,
    };
}

const closeFolder = (state, action) => {
    return {
        ...state,
        folderIsOpen: false,
    };
}

const closeTask = (state, action) => {
    return {
        ...state,
        taskIsOpen: false,
    };
}

const moveTask = (state, action) => {
    state.folders.find(folder => folder.id === action.payload.oldFolderId).tasks.filter(task => task.id === action.payload.id);
    state.folders.find(folder => folder.id === action.payload.newFolderId).tasks.push(action.payload.id);
    state.tasks.find(task => task.id === action.payload.id).folderId = action.payload.newFolderId;
    return {
        ...state,
    };
}

const selectTask = (state, action) => {
    return {
        ...state,
        selectedTask: action.payload.id,
    };
}

const deleteFolder = (state, action) => {
    const deletedFolderTasks = state.folders.find(folder => folder.id === action.payload.id).tasks;

    return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload.id),
        tasks: state.tasks.filter(task => !deletedFolderTasks.includes(task.id)),
    };
}

const saveTaskTime = (state, action) => {
    const updatedTask = state.tasks.find(task => task.id === action.payload.id);
    const todayWorktime = state.tasks.filter(task => state.todayTasks.includes(task.id)).reduce((acc, task) => acc = addTimes(acc, task.time), '00:00:00');
    updatedTask.time = action.payload.time;
    return {
        ...state,
        todayWorktime: todayWorktime,
    };
};

const addTodayTask = (state, action) => {
    if (!state.todayTasks.includes(action.payload.id)) {
        state.todayTasks.push(action.payload.id);
    }
    return {
        ...state,
    };
}

const deleteTask = (state, action) => {
    const folder = state.folders.find(folder => folder.id === action.payload.folderId);
    folder.tasks = folder.tasks.filter(task => task.id !== action.payload.id);
    state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    state.todayTasks = state.todayTasks.filter(task => task.id !== action.payload.id);

    return {
        ...state,
    };
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_FOLDER:
            return addFolder(state, action);
        case ACTION_TYPE.ADD_TASK:
            return addTask(state, action);
        case ACTION_TYPE.OPEN_FOLDER:
            return openFolder(state, action);
        case ACTION_TYPE.CLOSE_FOLDER:
            return closeFolder(state, action);
        case ACTION_TYPE.OPEN_TASK:
            return openTask(state, action);
        case ACTION_TYPE.SELECT_TASK:
            return selectTask(state, action);
        case ACTION_TYPE.SAVE_TASK_TIME:
            return saveTaskTime(state, action);
        case ACTION_TYPE.ADD_TODAY_TASK:
            return addTodayTask(state, action);
        case ACTION_TYPE.DELETE_FOLDER:
            return deleteFolder(state, action);
        case ACTION_TYPE.CHECK_TASK:
            return checkTask(state, action);
        case ACTION_TYPE.DELETE_TASK:
            return deleteTask(state, action);
        case ACTION_TYPE.CLOSE_TASK:
            return closeTask(state, action);
        case ACTION_TYPE.MOVE_TASK:
            return moveTask(state, action);   
        default:
            return state;
    }
};

export default rootReducer;