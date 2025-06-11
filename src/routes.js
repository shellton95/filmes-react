import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Home from './pages/home';
import Filme from './pages/Filme';
import Header from './components/header'
import Favoritos from "./pages/favoritos";

function RoutesApp(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/filme/:id" element={ <Filme/> } />
                <Route path="/favoritos" element={ <Favoritos /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;

// instalação das rotas: npm install react-router-dom
// instalação do axios: npm install axios
// instalação do toastFy notificações: npm install react-toastify