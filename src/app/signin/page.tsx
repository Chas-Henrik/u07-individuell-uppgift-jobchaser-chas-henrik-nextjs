import styles from './Login.module.css'
import { useContext } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { ThemeContext } from "@/layout";

type SignInProps = {
    emailRequired: string
    passwordRequired: string
}

export default function SignIn() {
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm<SignInProps>()
    // const onSubmit: SubmitHandler<SignInProps> = (data: SignInProps) => console.log(data)
    // const {darkTheme} = useContext(ThemeContext);
    // const themeStyles = {
    //     backgroundColor: darkTheme ? '#333' : '#fff',
    //     color: darkTheme ? '#fff' : '#333',
    //     boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    // };

    // console.log(watch()) // watch everything
    // console.log(watch("emailRequired")) // watch input value by passing the name of it

    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <h1>Login</h1>
        // <form style={themeStyles} className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        //     // {/x register your input into the hook by invoking the "register" function x/}
        //     <input type="email" placeholder="E-mail" {...register("emailRequired", { required: true })} />
        //     // {/x errors will return when field validation fails  x/}
        //     {errors.emailRequired && <span>This field is required</span>}

        //     {/x include validation with required or other standard HTML validation rules x/}
        //     <input {...register("passwordRequired", { required: true })} />
        //     {/x errors will return when field validation fails  x/}
        //     {errors.passwordRequired && <span>This field is required</span>}

        //     <input type="submit" />
        // </form>
    )
}
