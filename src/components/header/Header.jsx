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
                    <NavLink to="/groupes">Phase de groupe</NavLink>
                </li>
                <li>
                    <NavLink to="/matchs">Phase éliminatoire</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
