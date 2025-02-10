'use client'

import styles from './Signup.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";

type SignUpProps = {
    firstNameRequired: string;
    lastNameRequired: string;
    phoneRequired: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    dateOfBirth: string;
    emailRequired: string;
    passwordRequired: string;
}

export default function App() {
    const {
        register,
        handleSubmit
    } = useForm<SignUpProps>()
    const onSubmit: SubmitHandler<SignUpProps> = (data: SignUpProps) => console.log(data)
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        <article style={themeStyles} className={styles.signUpForm}>
        <h1 className={styles.header}>Create Account</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={`${styles.formInput}`} type="text" placeholder="First Name" {...register("firstNameRequired", { required: true })} />
                <input className={`${styles.formInput}`} type="text" placeholder="Last Name" {...register("lastNameRequired", { required: true })} />
                <input className={`${styles.formInput} ${styles.formInputAddress}`} type="text" placeholder="Address" {...register("address", { required: false })} />
                <input className={`${styles.formInput}`} type="text" placeholder="Postal Code" {...register("postalCode", { required: false })} />
                <input className={`${styles.formInput} ${styles.formInputCity}`} type="text" placeholder="City" {...register("city", { required: false })} />
                <input className={`${styles.formInput} ${styles.formInputCountry}`} type="text" placeholder="Country" {...register("country", { required: false })} />
                <input className={`${styles.formInput} ${styles.formInputPhone}`} type="text" placeholder="Phone" {...register("phoneRequired", { required: true })} />
                <label className={`${styles.formLabel} ${styles.formLabelDateOfBirth}`} htmlFor="dob">Date of Birth: <input id="dob" className={`${styles.formInput} ${styles.formInputDateOfBirth}`} type="date" placeholder="Date of Birth (YYYY-MM-DD)" {...register("dateOfBirth", { required: false })} /></label>
                <input className={`${styles.formInput} ${styles.formInputEmail}`} type="email" placeholder="E-mail" {...register("emailRequired", { required: true })} />
                <input className={`${styles.formInput} ${styles.formInputPassword}`} type="password" placeholder="Password" minLength={6} {...register("passwordRequired", { required: true })} />
                <button className={styles.formSubmitButton} type="submit">Submit</button>
            </form>
        </article>
    )
}