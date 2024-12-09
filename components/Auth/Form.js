import { signIn, getSession } from 'next-auth/react';
import styles from './Form.module.css'
import { useState,useRef } from 'react'

import { useRouter } from 'next/router';

export default function Form(){

    const e=useRef();
    const p=useRef();
    const n=useRef();

    const r=useRouter()

    const [isLogin,setIsLogin]=useState(true)

    function toggleForm(){
        setIsLogin(prevState=>!prevState)
    }

    async function submitHandler(event){
        event.preventDefault();
        const email=e.current.value;
        const password=p.current.value;
        const name=n.current.value

        if(isLogin){
            const res=await signIn('credentials',{redirect:false, email:email,password:password})
            console.log(res)
            
            getSession().then(session=>{
                if(session){
                    r.push(`/profile/${session.user.id}`)
                }
                else{
                    r.push('/auth')
                }
            })

        }

        else{
            const res=await fetch('/api/auth/signup',{
                method:"POST",
                body:JSON.stringify({email,password,name}),
                headers:{
                    'Content-Type':'application/json'
                }
            })

            if(res.status===201){

                r.push('/')
            }
            // if(res.ok){
            //     r.push(`/profile/${session.user.id}`)
            // }
        }
    }
    return(
        <div className={styles.auth}>
            <h1>{isLogin ? 'Login':'Sign Up'}</h1>

            <form onSubmit={submitHandler}>

                <div className={styles.control}>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' required ref={e}/>
                </div>
                <div className={styles.control}>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' required ref={p}/>
                </div>

                
                    <div className={styles.control}>
                        <label htmlFor='name'>Name:</label>
                        <input type='name' id='name' required ref={n}/>
                    </div>
                

                <div className={styles.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type='button' className={styles.toggle} onClick={toggleForm}>
                        {isLogin ? 'Create New Account':'Login'}
                    </button>

                </div>
            </form>
        </div>
    )
}
