import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import {SetStateAction, useState} from "react";
import Button1 from "../components/Button1";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80  p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setUsername(e.target.value);
                }} placeholder="Username or Email" label={"Username"} value={username}/>
                <InputBox onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setPassword(e.target.value);
                }} placeholder="password" label={"Password"} value={password}/>
                <div className="pt-4">
                    <Button1 onClick={async () => {
                        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/signin`, {
                            username,
                            password,
                        });
                        localStorage.setItem("authorization", response.data.token)
                        navigate("/")
                    }} label={"Sign in"}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}