import React from 'react'
import style from './taskslist.module.scss'
import { useSelector } from 'react-redux'
import ListItem from './ListItem';

const TasksList = () => {
  const date = useSelector(state => state.today)
  const labels = useSelector(state => state.todayTasks)

  //здесь прицепить треугольник
  return (
    <div className={style.dropdownMenu}>
      {date}
      <ul>
        {labels && labels?.map( element => 
          <ListItem key={element} label={element} />
        )}
      </ul>
    </div>
  )
}

export default TasksList