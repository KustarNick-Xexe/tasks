import React from 'react'
import style from './radio.module.scss'

//переименовать name
const Radio = ({ id, name, ...props}) => {
  return (
    <>
      <input className={style.radio} type="radio" id={id} value={name} />
      <label className={style.radioLabel} htmlFor={id}>{name}</label>
    </>
  )
}

export default Radio