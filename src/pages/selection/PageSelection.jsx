import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams, updateRound16 } from "../../redux/teamSlice";
import Team from "../../components/team/Team";
import { updateStep } from "../../redux/stepSlice";
import { gotoHome } from "../../utils/matchUtils";
import { useNavigate } from "react-router";

/**
 * Affiche les équipes qualifiées pour le tournoi : 2 meilleures de chaque groupe + 4 meilleures 3ème
 * @returns
 */
const PageSelection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const teams = useSelector(allTeams);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [topTwoTeamsPerGroup, setTopTwoTeamsPerGroup] = useState([]);
    const [thirdPlaceTeams, setThirdPlaceTeams] = useState([]);

    const step = useSelector((state) => state.steps.step);
    console.log(step);
    useEffect(() => {
        const shouldGoToHome = gotoHome(step, 5);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);

    useEffect(() => {
        const topTwo = getTopTwoTeamsPerGroup(teams);
        const topThird = getThirdPlaceTeams(teams);
        setTopTwoTeamsPerGroup(topTwo);
        setThirdPlaceTeams(topThird);
        const qualifiedTeams = [...topTwo, ...topThird];
        const orderedTeams = qualifiedTeams.sort((a, b) => {
            // Comparaison des groupes
            if (a.group < b.group) return -1;
            if (a.group > b.group) return 1;

            // Si les noms sont égaux, comparer les âges
            if (a.nbPts > b.nbPts) return -1;
            if (a.nbPts < b.nbPts) return 1;

            return 0; //
        });
        dispatch(updateRound16(orderedTeams));
        setSelectedTeams(orderedTeams);
        if (step === 3) dispatch(updateStep(4));
    }, []);

    const getTopTwoTeamsPerGroup = (teams) => {
        const groups = ["A", "B", "C", "D", "E", "F"];
        const topTwo = [];

        groups.forEach((group) => {
            const teamsInGroup = teams.filter(
                (team) => (team.group === group) & (team.playoff === null)
            );
            const topTwoTeams = teamsInGroup
                .sort((a, b) => b.nbPts - a.nbPts)
                .slice(0, 2);
            topTwo.push(...topTwoTeams);
        });

        return topTwo;
    };
    const getThirdPlaceTeams = (teams) => {
        const groups = ["A", "B", "C", "D", "E", "F"];
        const topThird = [];

        groups.forEach((group) => {
            const teamsInGroup = teams.filter(
                (team) => (team.group === group) & (team.playoff === null)
            );
            const topThirdTeams = teamsInGroup
                .sort((a, b) => b.nbPts - a.nbPts)
                .slice(2, 3);
            topThird.push(...topThirdTeams);
        });
        return topThird.slice(0, 4);
    };

    return (
        <div className="wrapper selections">
            <h1 className="title">Sélections</h1>
            <div className="wrapper-infos">
                {["A", "B", "C", "D", "E", "F"].map((group) => (
                    <div key={"group" + group} className="wrapper-container">
                        <h2>Groupe {group}</h2>
                        <ul className="wrapper-teams">
                            {selectedTeams
                                .filter((team) => team.group === group)
                                .map((team) => (
                                    <li
                                        key={team.name}
                                        className="wrapper-team"
                                    >
                                        <Team team={team} order={null} />(
                                        {team.nbPts} points)
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageSelection;
