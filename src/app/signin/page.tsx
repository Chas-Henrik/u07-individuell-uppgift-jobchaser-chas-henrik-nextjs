'use client'

import styles from './Signin.module.css'
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";



export default function SignIn() {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(15)
    })
    type FormData = z.infer<typeof formSchema>;

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });
    const onSubmit: SubmitHandler<FormData> = (data: FormData) => console.log(data)

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        <article style={themeStyles} className={styles.signinForm}>
            <h1 className={styles.header}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.formInput} type="email" placeholder="E-mail" {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500 text-base w-fit">{errors.email.message}</span>}
                <input className={styles.formInput} type="password" placeholder="Password" {...register("password", { required: true })} />
                {errors.password && <span className="text-red-500 text-base w-fit">{errors.password.message}</span>}
                <button className={styles.formSubmitButton} type="submit">Submit</button>
                <div></div>
            </form>
            <Link href="/signup" scroll={false}>
                <p className={styles.signupLink}>Register here to Sign Up</p>
            </Link>
        </article>
    )
}