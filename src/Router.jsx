import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AllGroups from "./pages/allgroups/AllGroups";

const Router = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groupes" element={<AllGroups />} />
                    {/* <Route path="/tirage" element={<Tirage />} /> */}
                </Routes>
        </BrowserRouter>
    );
};

export default Router;
