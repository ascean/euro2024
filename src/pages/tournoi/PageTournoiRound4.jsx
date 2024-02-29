import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allTeams,
    updateRound4,
    updateScores,
} from "../../redux/teamSlice";
import { gotoBarrages, playGame } from "../../utils/matchUtils";
import { useNavigate } from "react-router";
import Round8 from "../../components/rounds/Round8";
import Round4 from "../../components/rounds/Round4";

const PageTournoiRound4 = () => {
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState(false);
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [play4, setPlay4] = useState(false);
    const [teams4, setTeams4] = useState(false);

    /**
     * Sélection des équipes pour le quart de finale
     */
    const selectQuarterTeams = () => {
        //récupération des 16 équipes qui ont joué la 8ème
        let quarterTeams = teams
            .filter((team) => team.round8 !== 0)
            .sort((a, b) => a.order8 - b.order8);
        console.log(quarterTeams);

        //gestion des maths en fonction des informations officielles
        const corresp = [
            [39, 45, 1],   //gagnant du match 39, jouera le match 45
            [37, 45, 2],   //gagnant du match 37, jouera le match 45
            [41, 46, 3],   //gagnant du match 41, jouera le match 46
            [42, 46, 4],   //gagnant du match 42, jouera le match 46
            [40, 48, 5],   //gagnant du match 40, jouera le match 48
            [38, 48, 6],   //gagnant du match 38, jouera le match 48
            [43, 47, 7],   //gagnant du match 43, jouera le match 47
            [44, 47, 8],   //gagnant du match 44, jouera le match 47
        ];


        for (let i = 0; i < quarterTeams.length; i += 2) {
            const team1 = quarterTeams[i];
            const team2 = quarterTeams[i + 1];

            const oldNumMatch1 = corresp.find(
                (pair) => pair[0] === team1.round8
            );
            const oldNumMatch2 = corresp.find(
                (pair) => pair[0] === team2.round8
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
                        updateRound4({
                            teamId: match[1],
                            numMatch: newNumMatch1,
                            order: newOrder1,
                        })
                    );
                    dispatch(
                        updateRound4({
                            teamId: match[2],
                            numMatch: 0,
                            order: 0,
                        })
                    );
                } else {
                    dispatch(
                        updateRound4({
                            teamId: match[2],
                            numMatch: newNumMatch2,
                            order: newOrder2,
                        })
                    );
                    dispatch(
                        updateRound4({
                            teamId: match[1],
                            numMatch: 0,
                            order: 0,
                        })
                    );
                }
            } else if (match[3] > match[4]) {
                dispatch(
                    updateRound4({
                        teamId: match[1],
                        numMatch: newNumMatch1,
                        order: newOrder1,
                    })
                );
                dispatch(
                    updateRound4({
                        teamId: match[2],
                        numMatch: 0,
                        order: 0,
                    })
                );
            } else {
                dispatch(
                    updateRound4({
                        teamId: match[2],
                        numMatch: newNumMatch2,
                        order: newOrder2,
                    })
                );
                dispatch(
                    updateRound4({
                        teamId: match[1],
                        numMatch: 0,
                        order: 0,
                    })
                );
            }
        }

        //récupération des 16 équipes qui ont joué la 8ème
        let teamsInRound4 = teams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.order4 - b.order4);
        console.log(teamsInRound4);

        let allMatches = [];
        for (let i = 0; i < teamsInRound4.length; i += 2) {
            allMatches.push(playGame(4, teamsInRound4[i], teamsInRound4[i + 1]));
        }
        setPlay4(true);
        console.log(allMatches);
        setPlay4(true);
        return allMatches;
    };

    /**
     * Joue les quarts de finale
     */
    /**
     * Joue les quarts de finale
     */
    const play_semi = () => {
        navigate("/tournoi2")
        // setPlay4(true);
        selectQuarterTeams();
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
        const allMatches = selectQuarterTeams();
        allMatches && dispatch(updateScores(allMatches));
        setPlay4(true)
    }, []);

     /**
     * Après les 8ème, les quarts de finale
     */
     useEffect(() => {
        const newteams4 = teams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.order - b.order);
        setTeams4(newteams4);
     }, [play4]);
    

    return (
        <div>
            <button onClick={() => play_semi()}>Demi finale</button>
            <div className="tournoi-container">
                {teams.length > 0 && <Round8 teams={teams} />}
                {teams.length > 0 && <Round4 teams={teams} />}
            </div>
        </div>
    );
};
export default PageTournoiRound4;
