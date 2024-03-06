import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("");
    const step = useSelector((state) => state.steps.step);

    // Fonction pour fermer le menu mobile lorsque vous cliquez sur un élément de menu
    const closeMenu = () => {
        const navBar = document.getElementById("navbarSupportedContent");
        if (navBar.classList.contains("show")) {
            navBar.classList.remove("show");
        }
    };

    // Tableau contenant les noms et les chemins de vos NavLink
    const navLinkData = [
        { name: "Accueil", path: "" },
        { name: "Playoff", path: "playoff" },
        { name: "Groupes", path: "groupes" },
        { name: "Matchs", path: "matchs" },
        { name: "Sélections", path: "selection" },
        { name: "Qualifications", path: "qualifications" },
        { name: "Tournoi", path: "tournoi" },
        { name: "Recap", path: "recap" },
    ];

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    const navLinks = [];
    for (let i = 0; i < navLinkData.length; i++) {
        const navLink = navLinkData[i];
        const isDisabled = step !== i && i !== step + 1 && i !== 0;
        navLinks.push(
            <li key={i} className="nav-item">
                <NavLink
                    to={`/${navLink.path}`}
                    className={`nav-link ${
                        activeMenu === `/${navLink.path}` ? "active" : ""
                    } ${isDisabled ? "disabled" : ""}`}
                    onClick={() => {
                        setActiveMenu(`/${navLink.path}`);
                        closeMenu(); // Ferme le menu après avoir cliqué sur un élément de menu
                    }}
                >
                    {navLink.name}
                </NavLink>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid ">
                <a className="navbar-brand " href="#">
                    <img src="/src/assets/logo.jpg" alt="logo" />
                </a>
                <button
                    className="navbar-toggler bg-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-center"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0">{navLinks}</ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
