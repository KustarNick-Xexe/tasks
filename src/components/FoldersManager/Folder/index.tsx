import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setIsOpenFolder,
  deleteFolder,
  setIsCloseFolder,
} from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import style from "./folder.module.scss";
import archive from "../../../assets/archive.png";
import close from "../../../assets/close.svg";

const Folder = ({ name, id }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (name !== "Основные задачи" && name !== "Архив") {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteFolder(id));
    dispatch(setIsCloseFolder());
  };

  const handleClick = () => {
    dispatch(setIsOpenFolder());
    navigate(`/${name}`, { state: { name: name } });
  };
  //исправить верстку - убрать лишние теги и заменить на норм иконку
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {
        <div className={style.folder}>
          {name === "Архив" ? (
            <div>
              <img className={style.archiveIcon} src={archive} alt="-" />
              <span>{name}</span>
            </div>
          ) : (
            <span>{name}</span>
          )}
          {name !== "Архив" && name !== "Основные задачи" && hovered && (
            <span onClick={handleDelete}>
              <img src={close} alt="-" />
            </span>
          )}
        </div>
      }
    </div>
  );
};

export default Folder;
