import { useDispatch, useSelector } from "react-redux";
import { initStateTeam } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import { useEffect, useState } from "react";
import Team from "../../components/team/Team";
import Hat from "../../components/hat/Hat";
import { initStateStep } from "../../redux/stepSlice";

/**
 * Page d'accueil
 * @returns
 */
const Home = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [showPlayoff, setShowPlayoff] = useState(false);
    const step = useSelector((state) => state.steps.step);

    const handleResetTeams = () => {
        dispatch(initStateTeam());
        dispatch(initStateStep());
    };

    const teamsPlayOff = teams.filter((team) => team.playoff !== null);

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
        setShowPlayoff(true);
    };

    useEffect(() => {
        handleResetTeams();
        handlePlayOff();
    }, []);

    return (
        <>
            <div className="wrapper">
                <h1 className="title">Euro 2024</h1>
                <ul className="wrapper-infos hat">
                    {/* Générer une liste pour chaque chapeau */}
                    {showPlayoff &&
                        uniqueHats.map((hat) => (
                            <li
                                key={"chapeau" + hat}
                                className="wrapper-container"
                            >
                                <Hat hat={hat} />
                            </li>
                        ))}
                </ul>
            </div>
            <div className="wrapper ballotage">
                <h2 className="title">Liste des équipes en ballotage</h2>
                {/* Générer une liste pour chaque chapeau */}
                <ul className="wrapper-infos ballotage">
                    {/* Filtrer les équipes par chapeau */}
                    {teamsPlayOff.map((team, index) => (
                        <li key={index}>
                            <Team team={team} order={null} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Home;
