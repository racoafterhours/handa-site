import React from 'react';
import { Link } from "react-router-dom";

import handa_logo from '../assets/handa_logo.png'
import lang_en from '../assets/lang_en.png'
import styles from '../styles/navbar.module.css'

const navbar= () =>{
  return (
  <div className = {styles.NavBar}>

    {/* Logo Block */}
    <div className = {styles.LogoBlock}> 
      <img src={handa_logo} className = {styles.Logo}/> 
      <div className = {styles.Title}> 
        <span style={{color: '#0038a8'}}>H</span>
        <span style={{color: '#ce1126'}}>A</span>
        <span style={{color: '#fcd116'}}>N</span>
        <span style={{color: '#ce1126'}}>D</span>
        <span style={{color: '#0038a8'}}>A</span>
      </div>
    </div>

    {/* Links Block */}
    <div className = {styles.LinkBlock}> 
      <Link className = {styles.Link} to="/">Home</Link>
      <Link className = {styles.Link} to="/about">About</Link>
      <Link className = {styles.Link} to="/contact">Contact</Link>
      <div className={styles.Lang}>
        <img src={lang_en} className = {styles.LangEn}/> 
        EN
      </div>
    </div>

  </div>
  );
}
export default navbar;