import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveTaskTime,
  checkTask,
  deleteTask,
  addTodayTask,
  closeTask,
  moveTask,
} from "../../store/actions";
import formatTime from "../../helpers/formatTime";
import convertTimeToNumber from "../../helpers/convertTime";
import Checkbox from "../Checkbox";
import ActionButton from "../ActionButton";
import icon from "../../assets/close.svg";
import stopIcon from "../../assets/stop.svg";
import archiveIcon from "../../assets/archive.png";
import trashIcon from "../../assets/trash.svg";
import styles from "./taskmanager.module.scss";

const TaskManager = () => {
  const isOpenTask = useSelector((state) => state.taskIsOpen);
  const task = useSelector((state) =>
    state.tasks.find((task) => task.id === state.selectedTask)
  );
  const folder = useSelector(
    (state) =>
      state.folders.find((folder) => folder.id === task?.folderId)?.name
  );
  const todayWorktime = useSelector((state) => state.todayWorktime);
  const archive = useSelector(
    (state) => state.folders.find((folder) => folder.name === "Архив").id
  );
  const dispatch = useDispatch();

  const [isRunningTimer, setIsRunningTimer] = useState(false);
  const [time, setTime] = useState(task?.time || 0);

  const handleClick = () => {
    setIsRunningTimer((prevState) => !prevState);
    dispatch(saveTaskTime(task?.id, formatTime(time)));
    dispatch(addTodayTask(task?.id));
  };

  const handleTick = () => {
    if (isRunningTimer) {
      setTime((prevState) => prevState + 1);
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
          <h2 className={styles.taskName}>{task?.name}</h2>
          <div className={styles.folderName}>{folder}</div>
          <div className={styles.timerContainer}>
            <div className={styles.todayContainer}>
              <span className={styles.todaySpan}>Сегодня</span>{" "}
              {formatTime(time)}
            </div>

            <button className={styles.timerBtn} onClick={handleClick}>
              <img src={stopIcon} alt="Стоп или старт" />
            </button>
            <div>
              <span className={styles.overallSpan}>Всего</span> {todayWorktime}
            </div>
          </div>
          <div className={styles.doneCheckbox}>
            <Checkbox
              checked={task?.isDone}
              onChange={() => dispatch(checkTask(task?.id, !task?.isDone))}
              id={task?.id}
              name={"Выполнено"}
            />
          </div>
          <div className={styles.archiveBtn}>
            <ActionButton
              onClick={() => {
                dispatch(moveTask(task?.id, task?.folderId, archive));
              }}
              icon={archiveIcon}
              label={"В архив"}
              color={"#FFFFFF"}
            />
          </div>
          <div className={styles.deleteBtn}>
            <ActionButton
              onClick={() => {
                dispatch(deleteTask(task?.id, task?.folderId));
                dispatch(closeTask());
              }}
              icon={trashIcon}
              label={<span style={{ color: "red" }}>Удалить</span>}
              color={"#FFFFFF"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManager;
