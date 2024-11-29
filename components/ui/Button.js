import Link from "next/link";
import styles from './Button.module.css';

export default function Button(props){
    if(props.lnk)
    {
        return <Link className={styles.btn}href={props.lnk}>{props.children}</Link>
    }
    else
    {
        return <button className={styles.btn} onClick={props.onClick}>{props.children}</button>
    }
    }