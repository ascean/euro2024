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
                    <NavLink to="/matchs">Matchs de la phase de groupe</NavLink>
                </li>
                <li>
                    <NavLink to="/classement">Classement des équipes (2 meilleurs qualifiées)</NavLink>
                </li>
                <li>
                    <NavLink to="/eliminatoire">Phase éliminatoire</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
