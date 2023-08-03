import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveTaskTime, checkTask, deleteTask, addTodayTask, closeTask, moveTask } from '../../store/actions';
import formatTime from '../../helpers/formatTime';
import convertTimeToNumber from '../../helpers/convertTime';
import Checkbox from '../Checkbox';
import ActionButton from '../ActionButton';
import icon from '../../assets/close.svg';

const TaskManager = () => {
  const isOpenTask = useSelector(state => state.taskIsOpen);
  const task = useSelector(state => state.tasks.find(task => task.id === state.selectedTask));
  const folder = useSelector(state => state.folders.find(folder => folder.id === task?.folderId)?.name);
  const todayWorktime = useSelector(state => state.todayWorktime);
  const archive = useSelector(state => state.folders.find(folder => folder.name === "Архив").id);
  const dispatch = useDispatch();
 

  const [isRunningTimer, setIsRunningTimer] = useState(false);
  const [time, setTime] = useState(task?.time || 0);

  const handleClick = () => {
    setIsRunningTimer(prevState => !prevState);
    dispatch(saveTaskTime(task?.id, formatTime(time)));
    dispatch(addTodayTask(task?.id));
  };

  const handleTick = () => {
    if (isRunningTimer) {
      setTime(prevState => prevState + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleTick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunningTimer]);

  useEffect(() => {
    setTime(convertTimeToNumber(task?.time) || 0);
  }, [task]);

  return (
    <div>
      {isOpenTask && (
        <>
          Из папки {folder} задача {task?.name} -- {formatTime(time)} --
          <button onClick={handleClick}>{isRunningTimer ? 'Стоп' : 'Старт'}</button>
          Всего: {todayWorktime}
          <div>
            <Checkbox checked={task?.isDone} onChange={() => dispatch(checkTask(task?.id, !task?.isDone))} id={task?.id} name={'Выполнено'} />
            <ActionButton onClick={() => {
              dispatch(deleteTask(task?.id, task?.folderId));
              dispatch(closeTask());
            }}
              icon={icon} label={'Удалить'} color={"#FFFFFF"} />
            <ActionButton onClick={() => {
              dispatch(moveTask(task?.id, task?.folderId, archive));
            }}
              icon={icon} label={'В архив'} color={"#FFFFFF"} />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManager;