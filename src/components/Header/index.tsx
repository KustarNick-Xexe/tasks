import React from 'react'
import Logo from '../Logo'
import TasksTimer from '../TasksTimer'
import style from './header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <Logo />
      <TasksTimer />
    </div>
  );
}

export default Header;