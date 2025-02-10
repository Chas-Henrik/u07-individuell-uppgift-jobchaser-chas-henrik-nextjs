'use client'

import styles from './Signup.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";

export default function SignUp() {
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm<SignInProps>()
    // const onSubmit: SubmitHandler<SignInProps> = (data: SignInProps) => console.log(data)
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <article style={themeStyles} className={styles.signup}>
        <h1>Create Account</h1>
        </article>

    )
}