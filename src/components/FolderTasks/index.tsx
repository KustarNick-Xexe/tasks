import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionButton from "../ActionButton";
import plus from "../../assets/plus.png";
import sortIcon from "../../assets/sorting.png";
import { addTask } from "../../store/actions";
import Task from "./Task";
import styles from "./foldertasks.module.scss";

const FolderTasks = () => {
  const isOpenFolder = useSelector((state) => state.folderIsOpen);
  const location = useLocation();
  const folderName = decodeURIComponent(location.pathname).slice(1);
  const folderId = useSelector(
    (state) => state.folders.find((folder) => folder.name === folderName)?.id
  );
  const dispatch = useDispatch();

  const [isActiveInput, setIsActiveInput] = useState(false);
  const [taskName, setTaskName] = useState("");
  const tasks = useSelector( (state) =>  {
      const tasksId = state.folders.find((folder) => folder.id === folderId)?.tasks;
      return state.tasks.filter(task => tasksId.includes(task.id));
  });

  const handleClick = () => {
    setIsActiveInput(true);
  };

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  //заглушка
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(addTask(folderId, taskName));
      setIsActiveInput(false);
      setTaskName('');
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {isOpenFolder && (
        <>
          <div className={styles.mainHeaderContainer}>
            <div className={styles.folderName}>{location.state.name}</div>
            <div onClick={toggleDropdown} className={styles.sorting}>
              <span className={styles.sortingIcon}>
                <img src={sortIcon} alt="-" />
              </span>
              Сортировка
              {isOpen && <div >Тогл сработал, дропдаун открылся</div>}
            </div>
          </div>
          <div className={styles.descripts}>
            <div className={styles.taskDesc}>Задача</div>
            <div className={styles.timeDesc}>Время</div>
          </div>
          <div className={styles.allTasksContainer}>
            <ActionButton
              icon={plus}
              label={"Добавить задачу"}
              onClick={handleClick}
              color="#fff"
            />
            {isActiveInput && (
              <input
                type="text"
                value={taskName}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                className={styles.addFolderInput}
              />
            )}
            <ul>
              {folderId &&
                tasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default FolderTasks;
