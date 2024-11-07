import css from "./App.module.css";

import HomePage from "./pages/HomePge";
import NavBar from "./NavBar/NavBar";

function App() {
  return (
    <div className={css.app}>
        <NavBar />
        <HomePage/>
    </div>
  );
}

export default App;
