import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageGroups from "./pages/pageGroups/PageGroups";
import PageMatchs from "./pages/pageMatchs/PageMatchs";
import Header from "./components/header/Header";
import Barrages from "./pages/barrages/Barrages";
import PageResult from "./pages/result/PageResult";
import PageTournoi from "./pages/tournoi/PageTournoi";
import PageQualifications from "./pages/qualifications/PageQualifications";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/barrages" element={<Barrages />} />
                <Route path="/groupes" element={<PageGroups />} />
                <Route path="/matchs" element={<PageMatchs />} />
                <Route path="/result" element={<PageResult />} />
                <Route
                    path="/qualifications"
                    element={<PageQualifications />}
                />
                <Route path="/tournoi" element={<PageTournoi />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
