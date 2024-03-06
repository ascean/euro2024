import { useDispatch, useSelector } from "react-redux";
import { initStateTeam, updateTeamHat } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect, useState } from "react";
import Hat from "../../components/hat/Hat";
import { initStateStep, updateStep } from "../../redux/stepSlice";
import { gotoHome } from "../../utils/matchUtils";
import { useNavigate } from "react-router";

/**
 * Page Playoff : affiche les 4 chapeaux. Chaque chapeau contient 6 équipes
 * @returns
 */
const Playoff = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const teams = useSelector(allTeams);
    const [showPlayoff, setShowPlayoff] = useState(false);
    const step = useSelector((state) => state.steps.step);

    useEffect(() => {
        const shouldGoToHome = gotoHome(step, 2);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);

    const handleResetTeams = () => {
        dispatch(initStateTeam());
        dispatch(initStateStep());
    };

    // Obtenir les chapeaux uniques présents dans les équipes
    const uniqueHats = [1, 2, 3, 4];

    /**
     * Tirage au sort parmi les playoff pour trouver les équipes qui complètent le chapeau 4
     */
    const handlePlayOff = () => {
        let teamsPlayOff = teams.filter((team) => team.playoff !== null);
        const selectRandomTeams = (teamsPlayOff) => {
            const randomIndices = [];
            while (randomIndices.length < 3 && teamsPlayOff.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * teamsPlayOff.length
                );
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }
            return randomIndices.map((index) => teamsPlayOff[index].id);
        };

        const selectedTeamIds = selectRandomTeams(teamsPlayOff);
        dispatch(updateTeamHat(selectedTeamIds));
        setShowPlayoff(true);
        teamsPlayOff = teams.filter((team) => team.playoff !== null);
        if (step === 0) dispatch(updateStep(1));
    };

    useEffect(() => {
        handleResetTeams();
        handlePlayOff();
    }, []);

    return (
        <div className="wrapper">
            <h1 className="title">Playoff</h1>
            <ul className="wrapper-infos hat">
                    {/* Générer une liste pour chaque chapeau */}
                    {showPlayoff &&
                        uniqueHats.map((hat) => (
                            <li
                                className="wrapper-container"
                                key={"chapeau" + hat}
                            >
                                <Hat hat={hat} />
                            </li>
                        ))}
                </ul>
        </div>
    );
};

export default Playoff;
