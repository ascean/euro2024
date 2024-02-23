import { useDispatch, useSelector } from "react-redux";
import {
    clearTeamsPlayoff,
    updateTeamHat,
    initState,
} from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect, useState } from "react";
import Team from "../../components/team/Team";
import Hat from "../../components/hat/Hat";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);

    const handleResetTeams = () => {
        dispatch(initState());
    };

    const teamsPlayOff = teams.filter((team) => team.playoff !== null);
    const [showPlayoff, setShowPlayoff] = useState(true);

    // Obtenir les chapeaux uniques présents dans les équipes
    const uniqueHats = [1, 2, 3, 4];

    /**
     * Tirage au sort parmi les playoff pour trouver les équipes qui complètent le chapeau 4
     */
    const handleClick = () => {
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
        for (let i = 0; i < selectedTeamIds.length; i++) {
            const selectedTeamId = selectedTeamIds[i];
            dispatch(updateTeamHat(selectedTeamId));
        }
        setShowPlayoff(false);
    };

    useEffect(() => {
        handleResetTeams();
    }, []);
    return (
        <div>
            <div>
                <p>Liste des équipes sélectionnées</p>
                <ul>
                    {/* Générer une liste pour chaque chapeau */}
                    {uniqueHats.map((hat) => (
                        <li key={"chapeau" + hat}>
                            <Hat hat={hat} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Liste des équipes en ballotage</p>
                {/* Générer une liste pour chaque chapeau */}
                <ul className="list">
                    {/* Filtrer les équipes par chapeau */}
                    {teamsPlayOff.map((team, index) => (
                        <li key={index}>
                            <Team team={team} order={null} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
