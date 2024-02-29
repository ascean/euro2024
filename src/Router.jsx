import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageGroups from "./pages/pageGroups/PageGroups";
import PageMatchs from "./pages/pageMatchs/PageMatchs";
import Header from "./components/header/Header";
import Barrages from "./pages/barrages/Barrages";
import PageResult from "./pages/result/PageResult";
import PageQualifications from "./pages/qualifications/PageQualifications";
import PageTournoiRound8 from "./pages/tournoi/PageTournoiRound8";
import PageTournoiRound4 from "./pages/tournoi/PageTournoiRound4";
import PageTournoiRound2 from "./pages/tournoi/PageTournoiRound2";

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
                <Route path="/tournoi8" element={<PageTournoiRound8 />} />
                <Route path="/tournoi4" element={<PageTournoiRound4 />} />
                <Route path="/tournoi2" element={<PageTournoiRound2 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
