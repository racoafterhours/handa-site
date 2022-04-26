import React from 'react';
import styles from '../styles/unfinished.module.css'
import wrench from '../assets/wrench.png'
const About = () =>{
    return(
        <div className={styles.Page}>
            <div>HANDA About page under construction...</div>
            <div><img src={wrench} className = {styles.Wrench}/></div>
        </div>
    );
}
export default About;

