import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allTeams,
    updateRound2,
} from "../../redux/teamSlice";
import { gotoBarrages } from "../../utils/matchUtils";
import { useNavigate } from "react-router";
import Round8 from "../../components/rounds/Round8";
import Round4 from "../../components/rounds/Round4";
import Round2 from "../../components/rounds/Round2";

const PageTournoiRound2 = () => {
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState(false);
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);

    /**
     * Sélection des équipes pour le quart de finale
     */
    const selectSemiTeams = () => {
        let semiTeams = teams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.order4 - b.order4);
        console.log(semiTeams);
        const corresp = [
            [45, 49, 1],
            [46, 49, 2],
            [47, 50, 3],
            [48, 50, 4],
        ];
        for (let i = 0; i < semiTeams.length; i += 2) {
            const team1 = semiTeams[i];
            const team2 = semiTeams[i + 1];
            // Recherche de l'entrée correspondante pour 37
            const oldNumMatch1 = corresp.find(
                (pair) => pair[0] === team1.round4
            );
            const oldNumMatch2 = corresp.find(
                (pair) => pair[0] === team2.round4
            );
            // Récupération du deuxième élément de l'entrée correspondante
            const newNumMatch1 = oldNumMatch1 ? oldNumMatch1[1] : null;
            const newNumMatch2 = oldNumMatch2 ? oldNumMatch2[1] : null;
            const newOrder1 = oldNumMatch1 ? oldNumMatch1[2] : null;
            const newOrder2 = oldNumMatch2 ? oldNumMatch2[2] : null;

            const match = team1.matchList[team1.matchList.length - 1];
            if (match[3] === match[4]) {
                if (team1.nbDiffGoals > team2.nbDiffGoals) {
                    dispatch(
                        updateRound2({
                            teamId: match[1],
                            numMatch: newNumMatch1,
                            order: newOrder1,
                        })
                    );
                    dispatch(
                        updateRound2({
                            teamId: match[2],
                            numMatch: 0,
                            order: 0,
                        })
                    );
                } else {
                    dispatch(
                        updateRound2({
                            teamId: match[2],
                            numMatch: newNumMatch2,
                            order: newOrder2,
                        })
                    );
                    dispatch(
                        updateRound2({
                            teamId: match[1],
                            numMatch: 0,
                            order: 0,
                        })
                    );
                }
            } else if (match[3] > match[4]) {
                dispatch(
                    updateRound2({
                        teamId: match[1],
                        numMatch: newNumMatch1,
                        order: newOrder1,
                    })
                );
                dispatch(
                    updateRound2({
                        teamId: match[2],
                        numMatch: 0,
                        order: 0,
                    })
                );
            } else {
                dispatch(
                    updateRound2({
                        teamId: match[2],
                        numMatch: newNumMatch2,
                        order: newOrder2,
                    })
                );
                dispatch(
                    updateRound2({
                        teamId: match[1],
                        numMatch: 0,
                        order: 0,
                    })
                );
            }
        }
        // Créer une copie de teams avant de filtrer
        const copiedTeams = teams.slice();
        semiTeams = copiedTeams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.round2 - b.round2);
        console.log(semiTeams);
        // setTeams2(semiTeams);
    };

    /**
     * Joue les quarts de finale
     */
    const play_semi = () => {
        selectSemiTeams();
    };

    //retour à la page barrages si le state n'est pas complet
    useEffect(() => {
        const shouldGoToBarrages = gotoBarrages(teams);
        if (!shouldGoToBarrages && !isNavigated) {
            navigate("/barrages");
            setIsNavigated(true);
            return;
        }
    }, [navigate, isNavigated]);

    useEffect(() => {
        play_semi();
    }, []);

    return (
        <div>
            <button onClick={() => play_quarter()}>Quart de finale</button>
            <div className="tournoi-container">
                {teams.length > 0 && <Round8 teams={teams} />}
                {teams.length > 0 && <Round4 teams={teams} />}
                {teams.length > 0 && <Round2 teams={teams} />}
            </div>
        </div>
    );
};
export default PageTournoiRound2;
