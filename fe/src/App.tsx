import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./pages/Landing.tsx";
import {Signin} from "./pages/Signin.tsx";
import {Signup} from "./pages/Signup.tsx";
import Layout from "./pages/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SharedPage from "./pages/SharedPage.tsx";


function App() {

  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing/>}/>
                <Route path={"/signin"} element={<Signin/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/main"} element={<Layout/>}>
                    <Route index element={<Dashboard/>}/>
                </Route>
                <Route path="brain/:shareLink" element={<SharedPage />} />
            </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
