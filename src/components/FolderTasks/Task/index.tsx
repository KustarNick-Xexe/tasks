import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenTask, selectTask, checkTask } from "../../../store/actions";
import styles from "./task.module.scss";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(checkTask(task.id, !task.isDone));
  }

  const handleClick = () => {
    dispatch(selectTask(task.id));
    dispatch(setIsOpenTask());
  };

  return (
    <div className={styles.taskContainer}>
      <div>
        <input checked={task.isDone} onChange={handleChange} className={styles.taskCheckbox} type="checkbox" />
        <div className={styles.taskName} onClick={handleClick}>
          {task.name}
        </div>
      </div>
      {task.time}
    </div>
  );
};

export default Task;
