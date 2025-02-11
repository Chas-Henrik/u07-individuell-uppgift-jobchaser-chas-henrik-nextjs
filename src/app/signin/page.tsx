'use client'

import styles from './Signin.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";

type SignInProps = {
    emailRequired: string;
    passwordRequired: string;
}

export default function App() {
    const {
        register,
        formState: { errors },
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
        <article style={themeStyles} className={styles.signinForm}>
        <h1 className={styles.header}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.formInput} type="email" placeholder="E-mail" {...register("emailRequired", { required: true })}
                aria-invalid={errors.emailRequired ? "true" : "false"} />
                {errors.emailRequired?.type === "required" && (<p className={styles.error} role="alert">E-mail is required</p>)}
                <input className={styles.formInput} type="password" placeholder="Password" minLength={6} {...register("passwordRequired", { required: true })}
                aria-invalid={errors.passwordRequired ? "true" : "false"} />
                {errors.passwordRequired?.type === "required" && (<p className={styles.error} role="alert">Password is required</p>)}
                <button className={styles.formSubmitButton} type="submit">Submit</button>
                <div></div>
            </form>
        </article>
    )
}