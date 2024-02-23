import { useDispatch, useSelector } from "react-redux";
import { initState, updateTeamHat } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect, useState } from "react";
import Team from "../../components/team/Team";
import Hat from "../../components/hat/Hat";
import { Link } from "react-router-dom";

const Barrages = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [showPlayoff, setShowPlayoff] = useState(false);

    const handleResetTeams = () => {
        dispatch(initState());
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
    };

    useEffect(() => {
        handlePlayOff();
    }, []);

    return (
        <div>
            <div>
                <p>Liste des équipes sélectionnées</p>
                <ul>
                    {/* Générer une liste pour chaque chapeau */}
                    {showPlayoff &&
                        uniqueHats.map((hat) => (
                            <li key={"chapeau" + hat}>
                                <Hat hat={hat} />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Barrages;
