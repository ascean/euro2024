import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageGroups from "./pages/pageGroups/PageGroups";
import PageMatchs from "./pages/pageMatchs/PageMatchs";
import Header from "./components/header/Header";
import PageSelection from "./pages/selection/PageSelection";
import PageQualifications from "./pages/qualifications/PageQualifications";
import Tournoi from "./pages/tournoi/Tournoi";
import Recap from "./pages/recap/Recap";
import Footer from "./components/footer/Footer";
import Playoff from "./pages/playoff/Playoff";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playoff" element={<Playoff />} />
                <Route path="/groupes" element={<PageGroups />} />
                <Route path="/matchs" element={<PageMatchs />} />
                <Route path="/selection" element={<PageSelection />} />
                <Route
                    path="/qualifications"
                    element={<PageQualifications />}
                />
                <Route path="/tournoi" element={<Tournoi />} />
                <Route path="/recap" element={<Recap />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
