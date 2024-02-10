import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { updateTeamHat } from "../../redux/teamSlice";
import { selectTeamsPlayOff, selectedTeams } from "../../redux/teamSlice";
import { useState } from "react";
import Team from "../team/Team.jsx";
import Hat from "../hat/Hat.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const teamsWithHat = useSelector(selectedTeams);
    const teamsPlayOff = useSelector(selectTeamsPlayOff);
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

    return (
        <div>
            <button onClick={handleClick}>Tirage au sort</button>
            <div>
                <p>Liste des équipes sélectionnées</p>
                <ul>
                    {/* Générer une liste pour chaque chapeau */}
                    {uniqueHats.map((hat) => (
                        <li key={"chapeau" + hat}>
                            <Hat hat={hat} />
                            {/* <h2>Chapeau {hat}</h2>
                            <ul className="list">
                                Filtrer les équipes par chapeau
                                {teamsWithHat
                                    .filter((team) => team.hat === hat)
                                    .map((team, index) => (
                                        <li key={index}>
                                            <Team team={team} />
                                        </li>
                                    ))}
                            </ul> */}
                        </li>
                    ))}
                </ul>
            </div>
            {showPlayoff && (
                <div>
                    <p>Liste des équipes en ballotage</p>
                    {/* Générer une liste pour chaque chapeau */}
                    <ul className="list">
                        {/* Filtrer les équipes par chapeau */}
                        {teamsPlayOff.map((team, index) => (
                            <li key={index}>
                                <Team team={team} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
