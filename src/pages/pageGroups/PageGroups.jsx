import { useDispatch, useSelector } from "react-redux";
import { updateTeamGroupAndOrder } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect } from "react";
import Group from "../../components/group/Group";
import { Link, useNavigate } from "react-router-dom";
import { gotoBarrages } from "../../utils/matchUtils";

const PageGroups = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const teams = useSelector(allTeams);

    useEffect(() => {
        const shouldGoToBarrages = gotoBarrages(teams);
        if (!shouldGoToBarrages) {
            navigate("/barrages");
        }
    }, [navigate, teams]);
    
    const handleGroup = () => {
        // Index de l'équipe dans chaque hat
        let teamIndex = 0;

        let order = 1; // Initialisation de l'ordre
        // Parcours des équipes
        let newTeams = []
        teams
            .filter((team) => team.playoff == null)
            .sort((a, b) => a.hat - b.hat)
            .forEach((team) => {
                const { id } = team; // Récupération de l'id de l'équipe
                const group = String.fromCharCode(65 + teamIndex); // Calcul du groupe (A, B, C, etc.)
                newTeams.push({ id, group, order })
                // dispatch(updateTeamGroupAndOrder({ id, group, order }));
                // Passage à l'équipe suivante dans le "hat"
                teamIndex = (teamIndex + 1) % 6;
                order++;
            });
            console.log(newTeams);
            dispatch(updateTeamGroupAndOrder({ newTeams}));
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
