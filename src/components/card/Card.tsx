import React from 'react'
import style from "./Card.module.scss"

interface CardProps {
    img : string;
    title : string;
    type : string
    year : string
}
function Card(props :CardProps) {
  return (
    <div className={style.cardWrapper}>
        <img className={style.imgPoster} src={props.img}></img>
        <div className={style.title}>{props.title}</div>
        <div className={style.infoDiv}>
          <span className={style.detail}>{props.year}</span>
          <span className={style.detail}>{props.type}</span>
        </div>
    </div>
  )
}

export default Card