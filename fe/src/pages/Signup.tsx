import { SetStateAction, useState} from "react"

import {Heading} from "../components/Heading"
import {InputBox} from "../components/InputBox"
import {SubHeading} from "../components/SubHeading"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {BottomWarning} from "../components/BottomWarning";
import Button1 from "../components/Button1.tsx";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80  p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setUsername(e.target.value);
                }} placeholder="JohnMan" label={"Username"} value={username}/>
                <InputBox onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setEmail(e.target.value);
                }} placeholder="john@gmail.com" label={"Email"} value={email}/>
                <InputBox onChange={(e: { target: { value: SetStateAction<string> } }) => {
                    setPassword(e.target.value)
                }} placeholder="password" label={"Password"} value={password}/>
                <div className="pt-4">
                    <Button1  onClick={async () => {
                        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/signup`, {
                            username,
                            email,
                            password,
                        });
                        localStorage.setItem("authorization", response.data.token)
                        navigate("/")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}
