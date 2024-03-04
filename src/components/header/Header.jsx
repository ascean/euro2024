import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("");

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid ">
                <a className="navbar-brand " href="#">
                    <img src="/src/assets/logo.jpg" alt="logo" />
                </a>
                <div
                    className="collapse navbar-collapse justify-content-center"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={
                                    activeMenu === "/"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/")}
                            >
                                Accueil
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/groupes"
                                className={
                                    activeMenu === "/groupes"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/groupes")}
                            >
                                Groupes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/matchs"
                                className={
                                    activeMenu === "/matchs"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/matchs")}
                            >
                                Matchs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/qualifications"
                                className={
                                    activeMenu === "/qualifications"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/qualifications")}
                            >
                                Qualifications
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/result"
                                className={
                                    activeMenu === "/result"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/result")}
                            >
                                Resultats des qualifications
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/tournoi"
                                className={
                                    activeMenu === "/tournoi"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/tournoi")}
                            >
                                Tournoi
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/recap"
                                className={
                                    activeMenu === "/recap"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/recap")}
                            >
                                Recap
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
