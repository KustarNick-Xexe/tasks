import React from 'react'
import style from './checkbox.module.scss'

//переименовать name
const Checkbox = ({ id, name, checked, ...props}) => {
  return (
    <>
      <input className={style.checkbox} type="checkbox" id={id} value={name} checked={checked} {...props} />
      <label className={style.checkboxLabel} htmlFor={id}>{name}</label>
    </>
  )
}

export default Checkbox