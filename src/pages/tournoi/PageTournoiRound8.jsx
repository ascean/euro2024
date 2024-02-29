import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allTeams,
    updateRound4,
    updateRound8,
    updateScores,
} from "../../redux/teamSlice";
import { gotoBarrages, playGame } from "../../utils/matchUtils";
import { useNavigate } from "react-router";
import Round8 from "../../components/rounds/Round8";
import Round4 from "../../components/rounds/Round4";

const PageTournoiRound8 = () => {
    // const [play4, setPlay4] = useState(false);
    const [play8, setPlay8] = useState(false);
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState(false);
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [teams8, setTeams8] = useState([]);
    // const [teams4, setTeams4] = useState([]);

    /**
     * Sélection des équipes pour la 8ème de finale : 
     * on récupère toutes les équipes sélectionnées au 16ème
     * on les classe par groupe : chaque groupe dans un array
     * @returns 
     */
    const selectEightTeams = () => {
        const teamsA = teams
            .filter((team) => team.round16  & (team.group === "A"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamsB = teams
            .filter((team) => team.round16 & (team.group === "B"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamsC = teams
            .filter((team) => team.round16 & (team.group === "C"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamsD = teams
            .filter((team) => team.round16 & (team.group === "D"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamsE = teams
            .filter((team) => team.round16 & (team.group === "E"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamsF = teams
            .filter((team) => team.round16 & (team.group === "F"))
            .sort((a, b) => b.nbPts - a.nbPts);
        return { teamsA, teamsB, teamsC, teamsD, teamsE, teamsF };
    };

    /**
     * Génération des matchs de 8ème de finale selon les règles indiquées
     * @param {*} param0 
     * @returns 
     */
    const generateEightMatches = ({
        teamsA,
        teamsB,
        teamsC,
        teamsD,
        teamsE,
        teamsF,
    }) => {
        let playA,
            playB,
            playC,
            playE,
            playD,
            playF = false;

        //2e Gr. A vs 2e Gr. B
        const match1 = [teamsA[1], teamsB[1]];
        console.log(match1);
        dispatch(
            updateRound8({ teamId: teamsA[1].id, numMatch: 38, order: 1 })
        );
        dispatch(
            updateRound8({ teamId: teamsB[1].id, numMatch: 38, order: 2 })
        );
        console.log(teamsA);
        console.log(teamsB);
        console.log(match1);

        //1er Gr. A vs 2e Gr. C
        const match2 = [teamsA[0], teamsC[1]];
        dispatch(
            updateRound8({ teamId: teamsA[0].id, numMatch: 37, order: 3 })
        );
        dispatch(
            updateRound8({ teamId: teamsC[1].id, numMatch: 37, order: 4 })
        );

        //1er Gr. C vs 3e Gr. D,E ou F
        let match3;
        dispatch(
            updateRound8({ teamId: teamsC[0].id, numMatch: 40, order: 5 })
        );
        if (teamsD.length === 3) {
            match3 = [teamsC[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, numMatch: 40, order: 6 })
            );
        } else if (teamsE.length === 3) {
            match3 = [teamsC[0], teamsE[2]];
            playE = true;
            dispatch(
                updateRound8({ teamId: teamsE[2].id, numMatch: 40, order: 6 })
            );
        } else if (teamsF.length === 3) {
            match3 = [teamsC[0], teamsF[2]];
            playF = true;
            dispatch(
                updateRound8({ teamId: teamsF[2].id, numMatch: 40, order: 6 })
            );
        }
        //1er Gr. B vs 3e Gr. A,D,E ou F
        let match4;
        dispatch(
            updateRound8({ teamId: teamsB[0].id, numMatch: 39, order: 7 })
        );
        if (teamsA.length === 3) {
            match4 = [teamsB[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, numMatch: 39, order: 8 })
            );
        } else if (teamsD.length === 3 && !playD) {
            match4 = [teamsB[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, numMatch: 39, order: 8 })
            );
        } else if (teamsE.length === 3 && !playE) {
            match4 = [teamsB[0], teamsE[2]];
            playE = true;
            dispatch(
                updateRound8({ teamId: teamsE[2].id, numMatch: 39, order: 8 })
            );
        } else if (teamsF.length === 3 && !playF) {
            match4 = [teamsB[0], teamsF[2]];
            playF = true;
            dispatch(
                updateRound8({ teamId: teamsF[2].id, numMatch: 39, order: 8 })
            );
        }

        //1er Gr. B vs 3e Gr. A,D,E ou F
        const match5 = [teamsD[1], teamsE[1]];
        dispatch(
            updateRound8({ teamId: teamsD[1].id, numMatch: 42, order: 9 })
        );
        dispatch(
            updateRound8({ teamId: teamsE[1].id, numMatch: 42, order: 10 })
        );

        //1er Gr. F vs 3e Gr. A,B ou C
        let match6;
        dispatch(
            updateRound8({ teamId: teamsF[0].id, numMatch: 41, order: 11 })
        );
        if (teamsA.length === 3 && !playA) {
            match6 = [teamsF[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, numMatch: 41, order: 12 })
            );
        } else if (teamsB.length === 3 && !playB) {
            match6 = [teamsF[0], teamsB[2]];
            playB = true;
            dispatch(
                updateRound8({ teamId: teamsB[2].id, numMatch: 41, order: 12 })
            );
        } else if (teamsC.length === 3 && !playC) {
            match6 = [teamsF[0], teamsC[2]];
            playC = true;
            dispatch(
                updateRound8({ teamId: teamsC[2].id, numMatch: 41, order: 12 })
            );
        }
        //1er Gr. E vs 3e Gr. A,B, C ou D
        let match7;
        dispatch(
            updateRound8({ teamId: teamsE[0].id, numMatch: 43, order: 13 })
        );
        if (teamsA.length === 3 && !playA) {
            match7 = [teamsE[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, numMatch: 43, order: 14 })
            );
        } else if (teamsB.length === 3 && !playB) {
            match7 = [teamsE[0], teamsB[2]];
            playB = true;
            dispatch(
                updateRound8({ teamId: teamsB[2].id, numMatch: 43, order: 14 })
            );
        } else if (teamsC.length === 3 && !playC) {
            match7 = [teamsE[0], teamsC[2]];
            playC = true;
            dispatch(
                updateRound8({ teamId: teamsC[2].id, numMatch: 43, order: 14 })
            );
        } else if (teamsD.length === 3 && !playD) {
            match7 = [teamsE[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, numMatch: 43, order: 14 })
            );
        }

        //1er Gr. D vs 2e Gr. F
        const match8 = [teamsD[0], teamsF[1]];
        dispatch(
            updateRound8({ teamId: teamsD[0].id, numMatch: 44, order: 15 })
        );
        dispatch(
            updateRound8({ teamId: teamsF[1].id, numMatch: 44, order: 16 })
        );

        const teamsInStep3 = match1
            .concat(match2)
            .concat(match3)
            .concat(match4)
            .concat(match5)
            .concat(match6)
            .concat(match7)
            .concat(match8);

        setTeams8(teamsInStep3);
        let allMatches = [];
        for (let i = 0; i < teamsInStep3.length; i += 2) {
            allMatches.push(playGame(8, teamsInStep3[i], teamsInStep3[i + 1]));
        }
        setPlay8(true);
        return allMatches;
    };

    /**
     * Sélection des équipes pour le quart de finale
     */
    const selectQuarterTeams = () => {
        let quarterTeams = teams.filter((team)=>team.round8 !==0).sort((a, b) => a.order8 - b.order8);
        console.log(quarterTeams);
        const corresp = [
            [39, 45,1],
            [37, 45,2],
            [41, 46,3],
            [42, 46,4],
            [40, 48,5],
            [38, 48,6],
            [43, 47,7],
            [44, 47,8],
        ];
        for (let i = 0; i < quarterTeams.length; i += 2) {
            const team1 = quarterTeams[i];
            const team2 = quarterTeams[i + 1];
            // Recherche de l'entrée correspondante pour 37
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
        // Créer une copie de teams avant de filtrer
        const copiedTeams = teams.slice();
        quarterTeams = copiedTeams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.round4 - b.round4);
        console.log(quarterTeams);
        // setTeams4(quarterTeams);
    };



    /**
     * Joue les quarts de finale
     */
    const play_quarter = () => {
        navigate("/tournoi4")
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

    /**
     * Au chargement : 8ème de finale
     */
    useEffect(() => {
        //création d'un array contenant un array avec les équipes de chaque groupe
        const newTeams8 = selectEightTeams();

        //génération des matchs pour les équipes sélectionnées
        const allMatches = generateEightMatches(newTeams8);
console.log(allMatches);
        allMatches && dispatch(updateScores(allMatches));
        setPlay8(true)
    }, []);

    /**
     * Après les 8ème, les quarts de finale
     */
    useEffect(() => {
        const newteams8 = teams
            .filter((team) => team.round8 !== 0)
            .sort((a, b) => a.order - b.order);
        setTeams8(newteams8);
    }, [play8]);

    
    
    return (
        <div>
            <button onClick={() => play_quarter()}>Quart de finale</button>
            <div className="tournoi-container">
                {teams.length > 0 && <Round8 teams={teams} />}
                {/* {teams.length > 0 && <Round4 teams={teams} />} */}
            </div>
        </div>
    );
};
export default PageTournoiRound8;
