import Header from "./components/Header";
import FoldersManager from "./components/FoldersManager";
import FolderTasks from "./components/FolderTasks";
import TaskManager from "./components/TaskManager";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import { useSelector } from "react-redux";

function App() {
  const isOpen = useSelector((state) => state.taskIsOpen);
  console.log(isOpen);
  /* const navigate = useNavigate();
  //заглушка-костыль
  const handleLoad = () => {
    navigate('/');
  } */
  //убрать здесь кнопку
  return (
    <div className={style.container}>
      <Header />
      <div className={style.mainContainer}>
        <div className={isOpen ? style.leftSideNarrow : style.leftSideWide}>
          <FoldersManager isOpen={isOpen} />
        </div>
        <div className={isOpen ? style.centerSideNarrow : style.centerSideWide}>
          <FolderTasks />
        </div>
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
