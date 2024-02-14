import { useDispatch, useSelector } from "react-redux";
import { allTeams,  updateScores } from "../../redux/teamSlice";
import { useNavigate } from "react-router-dom";
import Match from "../../components/match/Match";
import "./pagematchs.css";
import { useEffect, useState } from "react";
import { generateGroupMatches } from "../../utils/matchUtils";

const PageMatchs = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const teamsPlayOff = teams.filter((team) => team.playoff !== null);
    const navigate = useNavigate();
    const [groupMatches, setGroupMatches] = useState({});
    const [playGames, setPlayGames] = useState(false)

    useEffect(() => {
        // Redirection vers la page des barrages si le nombre d'équipes en play-off est égal à 12
        if (teamsPlayOff.length === 12) {
            navigate("/barrages");
        }
    }, []);


    //déclenché au premier rendu 
    //Génération des matchs pour chaque groupe : generateGroupMatches()
    //Mise à jour des points dans le store Redux en fonction de ces matchs updatePoints()
    useEffect(() => {
        
        // Générer les matchs pour chaque groupe
        const updatedGroupMatches = {};
        ["A", "B", "C", "D", "E", "F"].forEach((group) => {
            const groupTeams = teams.filter((team) => team.group === group);
            updatedGroupMatches[group] = generateGroupMatches(groupTeams);
        });

        
        /**
         * Mise à jour des points dans le store
         * @param {*} allMatches Ensemble de tous les matchs de tous les groupes
        */
        const handleMatchsAndPoints = (allMatches) => {
            console.log(allMatches);
            dispatch(updateScores(allMatches))
        };
        
        // Mise à jour de groupMatches avec les nouvelles valeurs pour rendu avec les valeurs mises à jour
        setGroupMatches(updatedGroupMatches);

        //mise à jour des points
        handleMatchsAndPoints(Object.values(updatedGroupMatches).flat());

    }, []);

    const handlePlayGames = () => {
        setPlayGames(true)
    }
    return (
        <div>
            <p>Liste des matchs</p>
            <button onClick={handlePlayGames}>Jouer les matchs</button>
            <ul>
                <div className="all-groups">
                    {Object.keys(groupMatches).map((group) => (
                        <div key={group} className="group-matches">
                            <h2>Groupe {group}</h2>
                            {groupMatches[group].map((match, index) => (
                                <Match
                                    key={index}
                                    team1={match[0]}
                                    team2={match[1]}
                                    nbPts1={match[2]}
                                    nbPts2={match[3]}
                                    show={playGames}
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
