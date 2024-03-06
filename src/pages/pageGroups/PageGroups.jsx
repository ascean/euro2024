import { useDispatch, useSelector } from "react-redux";
import { updateTeamGroupAndOrder } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect } from "react";
import Group from "../../components/group/Group";
import { useNavigate } from "react-router-dom";
import { gotoHome } from "../../utils/matchUtils";
import { updateStep } from "../../redux/stepSlice";

/**
 * Page affichant les 6 groupes A, B, C, D, E, F. Chaque groupe est constitué de 4 équipes
 * @returns
 */
const PageGroups = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const step = useSelector((state) => state.steps.step);
    const teams = useSelector(allTeams);

    useEffect(() => {
        const shouldGoToHome = gotoHome(step, 2);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);

    const handleGroup = () => {
        // Index de l'équipe dans chaque hat
        let teamIndex = 0;

        let order = 1; // Initialisation de l'ordre
        // Parcours des équipes
        let newTeams = [];
        teams
            .filter((team) => team.playoff == null)
            .sort((a, b) => a.hat - b.hat)
            .forEach((team) => {
                const { id } = team; // Récupération de l'id de l'équipe
                const group = String.fromCharCode(65 + teamIndex); // Calcul du groupe (A, B, C, etc.)
                newTeams.push({ id, group, order });
                // dispatch(updateTeamGroupAndOrder({ id, group, order }));
                // Passage à l'équipe suivante dans le "hat"
                teamIndex = (teamIndex + 1) % 6;
                order++;
            });
        dispatch(updateTeamGroupAndOrder({ newTeams }));
        if (step === 1) dispatch(updateStep(2));
    };

    useEffect(() => {
        // Appeler handleGroup une fois après le premier rendu
        handleGroup();
    }, []);

    return (
        <div className="wrapper groups">
            <h1 className="title">Groupes</h1>
            <ul className="wrapper-infos">
                <Group />
            </ul>
        </div>
    );
};
export default PageGroups;
