import React, { useState } from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'
import * as login from "../../localization/localization-login";
import * as register from "../../localization/localization-register";
import * as makePost from "../../localization/localization-create-post";



export default function CustomFooter() {
  const [lang, setLang] = useState("fr")

  const _onButtonClick= ()=>{
    setLang(lang == "fr" ? "en" : "fr");   
    login.strings.setLanguage(lang);
    register.strings.setLanguage(lang);
    makePost.strings.setLanguage(lang);
  }
  return(
    <footer className={styles.footer}>
      <div className={styles['switch']}>
        <input 
          id="language-toggle" 
          className={[styles['check-toggle'], styles['check-toggle-round-flat']].join(" ")} 
          type="checkbox"
          onClick={_onButtonClick}
        />
        <label htmlFor="language-toggle"></label>
        <span className={styles['on']}>EN</span>
        <span className={styles['off']}>FR</span>
      </div>
    </footer>
  )
}