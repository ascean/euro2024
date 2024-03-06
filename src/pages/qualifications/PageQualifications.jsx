import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams } from "../../redux/teamSlice";
import Team from "../../components/team/Team";
import { gotoHome } from "../../utils/matchUtils";
import { useNavigate } from "react-router";
import { updateStep } from "../../redux/stepSlice";

const PageQualifications = () => {
    const navigate = useNavigate();
    const teams = useSelector(allTeams);
    const dispatch = useDispatch();
    const step = useSelector((state) => state.steps.step);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [topTwoTeamsPerGroup, setTopTwoTeamsPerGroup] = useState([]);
    const [thirdPlaceTeams, setThirdPlaceTeams] = useState([]);

    useEffect(() => {
        const shouldGoToHome = gotoHome(step, 4);
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
        setSelectedTeams(orderedTeams);
        if (step === 4) dispatch(updateStep(5));
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

        return topThird;
    };

    return (
        <div className="wrapper qualifications">
            <h1 className="title">Qualifications </h1>
            <div className="wrapper-infos">
                {["A", "B", "C", "D", "E", "F"].map((group) => (
                    <div className="wrapper-container" key={"group" + group}>
                        <h2>Groupe {group}</h2>
                        <ul className="wrapper-teams">
                            {teams
                                .filter((team) => team.group === group)
                                .map((team) => (
                                    <li
                                        className="wrapper-team"
                                        key={team.name}
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

export default PageQualifications;
