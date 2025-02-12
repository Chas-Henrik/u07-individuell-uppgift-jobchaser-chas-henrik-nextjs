'use client'

import styles from './Signup.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

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

export default function SignUp() {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<SignUpProps>()
    const onSubmit: SubmitHandler<SignUpProps> = (data: SignUpProps) => console.log(data)
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
        <article style={themeStyles} className={styles.signUpForm}>
        <h1 className={styles.header}>Create Account</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div><input className={`${styles.formInput}`} type="text" placeholder="First Name" {...register("firstNameRequired", { required: true })}
                aria-invalid={errors.firstNameRequired ? "true" : "false"} />
                {errors.firstNameRequired?.type === "required" && (<p className={styles.error} role="alert">First Name is required</p>)} </div>
                <div><input className={`${styles.formInput}`} type="text" placeholder="Last Name" {...register("lastNameRequired", { required: true })} 
                aria-invalid={errors.lastNameRequired ? "true" : "false"} />
                {errors.lastNameRequired?.type === "required" && (<p className={styles.error} role="alert">Last Name is required</p>)}</div>
                <input className={`${styles.formInput} ${styles.formInputAddress}`} type="text" placeholder="Address" {...register("address", { required: false })} />
                <input className={`${styles.formInput}`} type="text" placeholder="Postal Code" {...register("postalCode", { required: false })} />
                <input className={`${styles.formInput} ${styles.formInputCity}`} type="text" placeholder="City" {...register("city", { required: false })} />
                <input className={`${styles.formInput} ${styles.formInputCountry}`} type="text" placeholder="Country" {...register("country", { required: false })} />
                <div><input className={`${styles.formInput} ${styles.formInputPhone}`} type="tel" size={20} placeholder="Phone" {...register("phoneRequired", { required: true })}
                aria-invalid={errors.passwordRequired ? "true" : "false"} />
                {errors.phoneRequired?.type === "required" && (<p className={styles.error} role="alert">Phone number is required</p>)}</div>
                <label className={`${styles.formLabel} ${styles.formLabelDateOfBirth}`} htmlFor="dob">Date of Birth: <input id="dob" className={`${styles.formInput} ${styles.formInputDateOfBirth}`} type="date" placeholder="Date of Birth (YYYY-MM-DD)" {...register("dateOfBirth", { required: false })} /></label>
                <div className={styles.formInputEmail}><input className={`${styles.formInput} ${styles.formInputEmail}`} type="email" placeholder="E-mail" {...register("emailRequired", { required: true })}
                aria-invalid={errors.emailRequired ? "true" : "false"} />
                {errors.emailRequired?.type === "required" && (<p className={styles.error} role="alert">E-mail is required</p>)}</div>
                <div className={styles.formInputPassword} ><input className={`${styles.formInput} ${styles.formInputPassword}`} type="password" placeholder="Password" minLength={6} {...register("passwordRequired", { required: true })}
                aria-invalid={errors.passwordRequired ? "true" : "false"}/>
                {errors.passwordRequired?.type === "required" && (<p className={styles.error} role="alert">Password is required</p>)}</div>
                <button className={styles.formSubmitButton} type="submit">Submit</button>
            </form>
        </article>
    )
}