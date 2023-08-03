import Header from "./components/Header";
import FoldersManager from "./components/FoldersManager";
import FolderTasks from "./components/FolderTasks";
import TaskManager from "./components/TaskManager";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";

function App() {
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
        <div className={style.leftSide}>
          <FoldersManager />
        </div>
        <div className={style.rightSide}>
          <FolderTasks />
          <TaskManager />
        </div>
      </div>
    </div>
  );
}

export default App;
