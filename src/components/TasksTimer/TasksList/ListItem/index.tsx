import React from 'react'
import { useSelector } from 'react-redux'

//сюда мы передаем задачу. У этой задачи есть id. Меняем время затраченное на работу и общее время
const ListItem = ({ label }) => {
    return (
        <div>
            <button>Жми</button>
            {label}
            {'00:00:00'}
        </div>
    )
}

export default ListItem