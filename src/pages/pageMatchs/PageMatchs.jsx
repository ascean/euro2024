import { useDispatch, useSelector } from "react-redux";
import { allTeams, updateScores } from "../../redux/teamSlice";
import { useNavigate } from "react-router-dom";
import Match from "../../components/match/Match";
import { useEffect, useState } from "react";
import { generateGroupMatches, gotoHome } from "../../utils/matchUtils";

const PageMatchs = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const navigate = useNavigate();
    const [groupMatches, setGroupMatches] = useState({});

    useEffect(() => {
        const shouldGoToHome = gotoHome(teams);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);

    useEffect(() => {
        // Générer les matchs pour chaque groupe
        const updatedGroupMatches = {};
        const groups = ["A", "B", "C", "D", "E", "F"];
        groups.forEach((group) => {
            const groupTeams = teams.filter((team) => team.group === group);
            updatedGroupMatches[group] = generateGroupMatches(groupTeams);
        });

        // Mise à jour des points dans le store
        const allMatches = groups.flatMap(
            (group) => updatedGroupMatches[group]
        );
        dispatch(updateScores(allMatches));
        setGroupMatches(updatedGroupMatches);
    }, []);

    return (
        <div className="title">
            <h1>Matchs de la phase de groupe</h1>
            <ul className="match-groups-container">
                {Object.keys(groupMatches).map((group) => (
                    <li key={group} className="match-groups-item">
                        <h2>Groupe {group}</h2>
                        <div className="match-group-container">
                            {groupMatches[group].map((match, index) => (
                                <Match
                                    key={index}
                                    team1={match[1]}
                                    team2={match[2]}
                                    nbPts1={match[3]}
                                    nbPts2={match[4]}
                                />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageMatchs;
