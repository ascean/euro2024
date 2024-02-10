import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

const Router = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/tirage" element={<Tirage />} /> */}
                </Routes>
        </BrowserRouter>
    );
};

export default Router;
