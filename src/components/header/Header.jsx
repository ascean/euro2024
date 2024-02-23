import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("");

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                                to="/barrages"
                                className={
                                    activeMenu === "/barrages"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setActiveMenu("/barrages")}
                            >
                                Barrages
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
                                Phase de groupes
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
                                Matchs de la phase de groupe
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
                                Phase de qualifications
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
