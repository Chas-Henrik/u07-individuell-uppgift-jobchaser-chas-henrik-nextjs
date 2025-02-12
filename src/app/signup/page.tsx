'use client'

import styles from './Signup.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

export default function SignUp() {
    const formSchema = z.object({
        firstname: z.string().min(2).max(15),
        lastname: z.string().min(2).max(15),
        address: z.string().min(2).max(50).optional().or(z.literal('')),
        postalCode: z.string().min(1).max(6).regex(/^[\d|\s|-]+$/, "Invalid postal code").optional().or(z.literal('')),
        city: z.string().min(2).max(50).optional().or(z.literal('')),
        country: z.string().min(2).max(50).optional().or(z.literal('')),
        phone: z.string().regex(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/, "Invalid phone number"),
        dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date of birth").optional().or(z.literal('')),
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
        <article style={themeStyles} className={styles.signUpForm}>
        <h1 className={styles.header}>Create Account</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div><input className={`${styles.formInput}`} type="text" placeholder="First Name" {...register("firstname", { required: true })} />
                {errors.firstname?.message && <span className="text-red-500 text-base w-fit">{errors.firstname.message}</span>}</div>
                <div><input className={`${styles.formInput}`} type="text" placeholder="Last Name" {...register("lastname", { required: true })} />
                {errors.lastname?.message && <span className="text-red-500 text-base w-fit">{errors.lastname.message}</span>}</div>
                <div className={`${styles.formInputAddress}`}><input className={`${styles.formInput} ${styles.formInputAddress}`} type="text" placeholder="Address" {...register("address", { required: false })} />
                {errors.address?.message && <span className="text-red-500 text-base w-fit">{errors.address.message}</span>}</div>
                <div><input className={`${styles.formInput}`} type="text" placeholder="Postal Code" {...register("postalCode", { required: false })} />
                {errors.postalCode?.message && <span className="text-red-500 text-base w-fit">{errors.postalCode.message}</span>}</div>
                <div className={`${styles.formInputCity}`}><input className={`${styles.formInput}`} type="text" placeholder="City" {...register("city", { required: false })} />
                {errors.city?.message && <span className="text-red-500 text-base w-fit">{errors.city.message}</span>}</div>
                <div className={`${styles.formInputCountry}`}><input className={`${styles.formInput}`} type="text" placeholder="Country" {...register("country", { required: false })} />
                {errors.country?.message && <span className="text-red-500 text-base w-fit">{errors.country.message}</span>}</div>
                <div className={`${styles.formInputPhone}`}><input className={`${styles.formInput}`} type="tel" size={20} placeholder="Phone: +46 (070) 123 4567" {...register("phone", { required: true })} />
                {errors.phone?.message && <span className="text-red-500 text-base w-fit">{errors.phone.message}</span>}</div>
                <label className={`${styles.formLabel}`} htmlFor="dob">Date of Birth: <input id="dob" className={`${styles.formInput} ${styles.formInputDateOfBirth}`} type="date" placeholder="Date of Birth (YYYY-MM-DD)" {...register("dateOfBirth", { required: false })} /></label>
                {errors.dateOfBirth?.message && <span className="text-red-500 text-base w-fit">{errors.dateOfBirth.message}</span>}
                <div className={`${styles.formInputEmail}`}><input className={`${styles.formInput}`} type="email" placeholder="E-mail" {...register("email", { required: true })} />
                {errors.email?.message && <span className="text-red-500 text-base w-fit">{errors.email.message}</span>}</div>
                <div className={`${styles.formInputPassword}`}><input className={`${styles.formInput}`} type="password" placeholder="Password" minLength={6} {...register("password", { required: true })} />
                {errors.password?.message && <span className="text-red-500 text-base w-fit">{errors.password.message}</span>}</div>
                <button className={styles.formSubmitButton} type="submit">Submit</button>
            </form>
        </article>
    )
}