import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageGroups from "./pages/pageGroups/PageGroups";
import PageMatchs from "./pages/pageMatchs/PageMatchs";
import Header from "./components/header/Header";
import Barrages from "./pages/barrages/Barrages";
import PageClassement from "./pages/classement/PageClassement";
import PageEliminatoire from "./pages/eliminatoire/PageEliminatoire";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/barrages" element={<Barrages />} />
                <Route path="/groupes" element={<PageGroups />} />
                <Route path="/matchs" element={<PageMatchs />} />
                <Route path="/classement" element={<PageClassement />} />
                <Route path="/eliminatoire" element={<PageEliminatoire />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
