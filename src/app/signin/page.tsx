'use client'

import styles from './Signin.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";

type SignInProps = {
    emailRequired: string
    passwordRequired: string
}

export default function App() {
    const {
        register,
        handleSubmit
    } = useForm<SignInProps>()
    const onSubmit: SubmitHandler<SignInProps> = (data: SignInProps) => console.log(data)
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        <article style={themeStyles} className={styles.signin}>
        <h1>Login</h1>
        {
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>E-mail</label>
                <input type="email" placeholder="E-mail" {...register("emailRequired", { required: true })} />
                <label>Last Name</label>
                <input type="password" placeholder="Password" minLength={8} {...register("passwordRequired", { required: true })} />
                <input type="submit" />
            </form>
        }
        </article>
    )
}