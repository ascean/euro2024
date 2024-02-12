import { useDispatch, useSelector } from "react-redux";
import { updateTeamGroupAndOrder } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect } from "react";
import Group from "../../components/group/Group";
import { Link, useNavigate } from "react-router-dom";

const PageGroups = () => {
    const dispatch = useDispatch();

    const teams = useSelector(allTeams);

    const teamsPlayOff = teams.filter((team) => team.playoff !== null);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirection vers la page des barrages si le nombre d'équipes en play-off est égal à 12
        if (teamsPlayOff.length === 12) {
            navigate("/barrages");
        }
    }, [navigate, teamsPlayOff]);

    const handleGroup = () => {
        // Index de l'équipe dans chaque hat
        let teamIndex = 0;

        let order = 1; // Initialisation de l'ordre
        // Parcours des équipes
        teams
            .filter((team) => team.playoff == null)
            .sort((a, b) => a.hat - b.hat)
            .forEach((team) => {
                const { id } = team; // Récupération de l'id de l'équipe
                const group = String.fromCharCode(65 + teamIndex); // Calcul du groupe (A, B, C, etc.)
                dispatch(updateTeamGroupAndOrder({ id, group, order }));
                // Passage à l'équipe suivante dans le "hat"
                teamIndex = (teamIndex + 1) % 6;
                order++;
            });
    };

    useEffect(() => {
        // Appeler handleGroup une fois après le premier rendu
        handleGroup();
    }, []);

    return (
        <div>
            <Link to="/matchs">Simulation du calendrier des matchs de la phase de groupe</Link>
            <p>Liste des équipes sélectionnées</p>
            <ul>
                <Group />
            </ul>
        </div>
    );
};
export default PageGroups;
