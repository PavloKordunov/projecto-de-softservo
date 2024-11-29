import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Loyout from "./Loyout/Loyout";
import HomePage from "./pages/HomePage";
import AdminPost from "./AdminPost/AdminPost";
import Profile from "./Profile/Profile";
import LoginPage from "./pages/LoginPage";
import Register from "./Auth/Register";
import Callback from "./Auth/Callback";
import Login from "./Auth/Login";
import AuthWrapper from "./Auth/AuthWrapper";

function App() {

    return (

        <Routes>
            <Route path="/" element={<Loyout />} >
                <Route index element={<HomePage />} />
                 <Route index element={<LoginPage />} />
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/callback" element={<Callback />} />
                <Route path='/adminPost' element={<AdminPost />} />
                <Route path='userProfile' element={<Profile/>}/>
            </Route>
        </Routes>

    );
}

export default App;
