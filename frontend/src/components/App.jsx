import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Loyout from "./Loyout/Loyout";
import HomePage from "./pages/HomePage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Loyout />} >
                <Route index element={<HomePage />} />
            </Route>
        </Routes>

    );
}

export default App;
