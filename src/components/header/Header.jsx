import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/barrages">Barrages</NavLink>
                </li>
                <li>
                    <NavLink to="/groupes">Créations des groupes</NavLink>
                </li>
                <li>
                    <NavLink to="/matchs">Phase de groupe</NavLink>
                </li>
                <li>
                    <NavLink to="/classement">Classement</NavLink>
                </li>
                <li>
                    <NavLink to="/eliminatoire">Eliminatoire</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
