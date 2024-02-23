import { useDispatch, useSelector } from "react-redux";
import { allTeams, updateScores } from "../../redux/teamSlice";
import { useNavigate } from "react-router-dom";
import Match from "../../components/match/Match";
import { useEffect, useState } from "react";
import { generateGroupMatches, gotoBarrages } from "../../utils/matchUtils";

const PageMatchs = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const navigate = useNavigate();
    const [groupMatches, setGroupMatches] = useState({});
    const [playGames, setPlayGames] = useState(true);

    useEffect(() => {
        const shouldGoToBarrages = gotoBarrages(teams);
        if (!shouldGoToBarrages) {
            navigate("/barrages");
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
        console.log(allMatches);
        dispatch(updateScores(allMatches));
        setGroupMatches(updatedGroupMatches);
    }, []);

    return (
        <div>
            <p>Liste des matchs</p>
            <ul>
                <div className="all-groups">
                    {Object.keys(groupMatches).map((group) => (
                        <div key={group} className="group-matches">
                            <h2>Groupe {group}</h2>
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
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default PageMatchs;
