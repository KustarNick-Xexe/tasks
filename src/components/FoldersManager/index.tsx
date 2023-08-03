import { useState } from "react";
import plus from "../../assets/folder-plus.png";
import ActionButton from "../ActionButton";
import Folder from "./Folder";
import { useSelector, useDispatch } from "react-redux";
import { addFolder } from "../../store/actions";
import styles from "./foldersmanager.module.scss";

//сделать так, чтобы при нажатии куда-то не
//туда написанное имя если оно не пустое становилось именем файлы - нужно ли для ТЗ
const FoldersManager = () => {
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [folderName, setFolderName] = useState(null);

  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  const handleClick = () => {
    setIsActiveInput(true);
  };

  const handleInputChange = (event) => {
    setFolderName(event.target.value);
  };

  //заглушка
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(addFolder(folderName));
      setIsActiveInput(false);
      setFolderName(null);
    }
  };

  return (
    <>
      {/* <div>FoldersManager</div> */}
      <ActionButton
        icon={plus}
        label={"Добавить папку"}
        color="#f6f6f6"
        onClick={handleClick}
      />
      {isActiveInput && (
        <input
          className={styles.addFolderInput}
          type="text"
          value={folderName}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
      )}
      <ul>
        {folders.map((folder) => (
          <Folder key={folder.id} name={folder.name} id={folder.id}/>
        ))}
      </ul>
    </>
  );
};

export default FoldersManager;
