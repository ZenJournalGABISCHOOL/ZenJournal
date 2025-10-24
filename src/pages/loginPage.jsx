import { loginSchema } from "../store/schemas/loginSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { set } from "zod";


const LoginPage = () => {
    const dptch = useDispatch();
    const nav = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failed, setFailed] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = async(data) => {
        try {
            setIsSubmitting(true);
            setFailed(false);
            await dptch(login(data)).unwrap();
            reset();
            setTimeout(() =>{
                nav("/");
            }, 1000);
        } catch (error) {
            setFailed(true);
            console.error("Login failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <form className="body" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="login-container mt-40 flex flex-col items-center w-1/2">
                <h1 className="text-3xl mb-4 font-bold">Login</h1>
                <input type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <input type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <button className="button" type="submit" disabled={isSubmitting}>Login</button>
                {(errors.password || errors.email) && <p className="text-red-500 mt-2">Fill in all fields correctly</p>}
                {failed && <p className="text-red-500 mt-2 font-bold">Login failed. Please check your credentials and try again.</p>}
            </div>
        </form>
    )
}
export default LoginPage;