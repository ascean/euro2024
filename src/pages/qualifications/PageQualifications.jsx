import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams, updateRound16 } from "../../redux/teamSlice";
import Team from "../../components/team/Team";
import { gotoBarrages } from "../../utils/matchUtils";
import { useNavigate } from "react-router";

const PageQualifications = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [topTwoTeamsPerGroup, setTopTwoTeamsPerGroup] = useState([]);
    const [thirdPlaceTeams, setThirdPlaceTeams] = useState([]);

    useEffect(() => {
        const shouldGoToBarrages = gotoBarrages(teams);
        if (!shouldGoToBarrages) {
            navigate("/barrages");
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
        console.log(topTwo);
        console.log(topThird);
        // dispatch(updateRound16(orderedTeams));
        console.log(orderedTeams);
        setSelectedTeams(orderedTeams);
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
        <div>
            <h2>Qualifications</h2>
            {["A", "B", "C", "D", "E", "F"].map((group) => (
                <div key={"group" + group}>
                    <h3>Groupe {group}</h3>
                    <ul className="team-list">
                        {teams
                            .filter((team) => team.group === group)
                            .map((team) => (
                                <li key={team.name}>
                                    {team.name} ({team.nbPts} points)
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PageQualifications;
