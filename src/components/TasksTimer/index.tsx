import { useState } from 'react'
import style from './taskstimer.module.scss'
import TasksList from './TasksList';

const TasksTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

 return (
    <div className={style.dropdownContainer}>
      <div className={style.dropdownHeader} onClick={toggleDropdown}>
        {selectedOption ? 'TasksTimer1' : 'TasksTimer2'}
      </div>
      {isOpen && <TasksList />}
    </div>
  );
}

export default TasksTimer;