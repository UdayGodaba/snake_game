import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { setLogin } from "../store/auth";
import registerOptions from "../utils/registerOptions.js";

// initial values
const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    logEmail: "",
    logPassword: "",
};

// env variables
const API_URL = import.meta.env.VITE_API_URL;

// Main Form Component
const Form = () => {

    const [pageType, setPageType] = useState("login");
    const [errorMsg, setErrorMsg] = useState("");
    const [isRequesting, setIsRequesting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = (pageType === "login");
    const isRegister = (pageType === "register");

    const form = useForm({
        defaultValues: isLogin ? initialValuesLogin : initialValuesRegister,
        shouldUnregister: true
    })
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;


    const registeration = async (values) => {
        try {
            const registeredUser = await axios.post(`${API_URL}/api/auth/register`, {
                userName: values.username,
                email: values.email,
                password: values.password
            });

            setIsRequesting(false);
            form.reset();

            if (registeredUser.data.userId) {
                setPageType("login");
            }
        } catch (error) {
            console.log(error.response.data?.errorMessage);
            setIsRequesting(false);
            if (error.response.data?.errorMessage) {
                setErrorMsg(error.response.data?.errorMessage);
            }
        }

    };

    const login = async (values) => {
        try {
            const loggedInUser = await axios.post(`${API_URL}/api/auth/login`, {
                email: values.logEmail,
                password: values.logPassword
            });

            setIsRequesting(false);
            form.reset();

            const { userId, token } = loggedInUser.data;
            dispatch(setLogin({
                user: userId,
                token
            }));
            navigate("/home");
        } catch (error) {
            console.log(error.response.data?.errorMessage);
            setIsRequesting(false);
            if (error.response.data?.errorMessage) {
                setErrorMsg(error.response.data?.errorMessage);
            }
        }
    };

    const handleFormSubmit = async (values) => {
        setIsRequesting(true);
        if (isLogin) await login(values);
        if (isRegister) await registeration(values);
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            autoComplete="off"
        >
            <Box
                display="grid"
                gap="30px"
            >
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {isRegister &&
                    <>
                        <TextField
                            {...(errors.username && { error: true })}
                            id="username"
                            placeholder="Username"
                            {...register("username", registerOptions.username)}
                            helperText={errors.username?.message}
                            sx={{ backgroundColor: "white" }}
                        />
                        <TextField
                            {...(errors.email && { error: true })}
                            id="email"
                            placeholder="Email"
                            {...register("email", registerOptions.email)}
                            helperText={errors.email?.message}
                            sx={{ backgroundColor: "white" }}
                        />
                        <TextField
                            {...(errors.password && { error: true })}
                            id="password"
                            placeholder="Password"
                            type="password"
                            {...register("password", registerOptions.password)}
                            helperText={errors.password?.message}
                            sx={{ backgroundColor: "white" }}
                        />
                    </>
                }

                {isLogin &&
                    <>
                        <TextField
                            {...(errors.logEmail && { error: true })}
                            id="logEmail"
                            placeholder="Email"
                            {...register("logEmail", registerOptions.logEmail)}
                            helperText={errors.logEmail?.message}
                            sx={{ backgroundColor: "white" }}
                        />
                        <TextField
                            {...(errors.logPassword && { error: true })}
                            id="logPassword"
                            placeholder="Password"
                            type="password"
                            {...register("logPassword", registerOptions.logPassword)}
                            helperText={errors.logPassword?.message}
                            sx={{ backgroundColor: "white" }}
                        />
                    </>
                }
            </Box>

            <Box>
                <Button
                    fullWidth
                    type="submit"
                    sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: "#9abbe0",
                        color: "black",
                    }}
                    disabled={isRequesting}
                >
                    {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                    onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                    }}
                    sx={{
                        textDecoration: "underline",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#9abbe0",
                        },
                    }}
                >
                    {isLogin
                        ? "Don't have an account? SignUp here."
                        : "Already have an account? Login here"
                    }
                </Typography>
            </Box>
            {isRequesting &&
                <Alert type="info">Processing Request Please wait!</Alert>
            }
        </form>
    )
};

export default Form;