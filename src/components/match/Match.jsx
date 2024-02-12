import { useDispatch, useSelector } from "react-redux";
import { addMatchId, allTeams } from "../../redux/teamSlice";
import { useState } from "react";
import Team from "../team/Team";
import "./match.css";

// Composant Match pour représenter un match entre deux équipes
const Match = ({ team1, team2 }) => {
    const [playedMatch, setPlayedMatch] = useState(false);
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const[nbPoints1, setNbPoints1] = useState(0)
    const[nbPoints2, setNbPoints2] = useState(0)

    // On renvoie un nombre aléatoire entre une valeur min (incluse)
    // et une valeur max (exclue)
    const getRandomArbitrary = (min=0, max=5) => {
        return Math.trunc(Math.random() * (max - min) + min);
    }
    const addMatch = () => {
        const nbPts1 = getRandomArbitrary()
        const nbPts2 = getRandomArbitrary()
        !playedMatch && dispatch(addMatchId({ team1, team2, nbPts1, nbPts2 }));
        setPlayedMatch(true);
        setNbPoints1(nbPts1)
        setNbPoints2(nbPts2)
    };

    const infosTeam1 = teams.find((t) => t.id === team1);
    const infosTeam2 = teams.find((t) => t.id === team2);

    return (
        <div>
            <div className="match">
                <Team team={infosTeam1} />
                {!playedMatch ? (
                    <button onClick={() => addMatch()} className="match-btn">
                        Jouer
                    </button>
                ) : (
                        <span> {nbPoints1}⚽ {nbPoints2}</span>
                )}
                <Team team={infosTeam2} />
            </div>
        </div>
    );
};

export default Match;
