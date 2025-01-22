import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./slider.module.css"

const HorizontalLoader = () => {
  return (
    <div className={`spinner ${styles.horicontainer}`}>
        <AiOutlineLoading3Quarters />
    </div>
  )
}

export default HorizontalLoader