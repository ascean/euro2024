import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams, updateRound8, updateScores } from "../../redux/teamSlice";
import { gotoBarrages, playGame } from "../../utils/matchUtils";
import { useNavigate } from "react-router";

const PageTournoi = () => {
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState(false);
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [bestTeams, setBestTeams] = useState([]);
    const [play8, setPlay8] = useState(false);

    useEffect(() => {
        //retour à la page barrages si le state n'est pas complet
        const shouldGoToBarrages = gotoBarrages(teams);
        if (!shouldGoToBarrages && !isNavigated) {
            navigate("/barrages");
            setIsNavigated(true);
            return;
        }

        const teamA = teams
            .filter((team) => (team.round16 !== false) & (team.group === "A"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamB = teams
            .filter((team) => (team.round16 !== false) & (team.group === "B"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamC = teams
            .filter((team) => (team.round16 !== false) & (team.group === "C"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamD = teams
            .filter((team) => (team.round16 !== false) & (team.group === "D"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamE = teams
            .filter((team) => (team.round16 !== false) & (team.group === "E"))
            .sort((a, b) => b.nbPts - a.nbPts);
        const teamF = teams
            .filter((team) => (team.round16 !== false) & (team.group === "F"))
            .sort((a, b) => b.nbPts - a.nbPts);
        //2e Gr. A vs 2e Gr. B
        const match1 = [teamA[1], teamB[1]];
        dispatch(updateRound8({ teamId: teamA[1].id, order: 1 }));
        dispatch(updateRound8({ teamId: teamB[1].id, order: 2 }));
        console.log(teamA);
        console.log(teamB);
        console.log(match1);
        //1er Gr. A vs 2e Gr. C
        const match2 = [teamA[0], teamC[1]];
        dispatch(updateRound8({ teamId: teamA[0].id, order: 3 }));
        dispatch(updateRound8({ teamId: teamC[1].id, order: 4 }));
        let playA,
            playB,
            playC,
            playE,
            playD,
            playF = false;
        //1er Gr. C vs 3e Gr. D,E ou F
        let match3;
        dispatch(updateRound8({ teamId: teamC[0].id, order: 5 }));
        if (teamD.length === 3) {
            match3 = [teamC[0], teamD[2]];
            playD = true;
            dispatch(updateRound8({ teamId: teamD[2].id, order: 6 }));
        } else if (teamE.length === 3) {
            match3 = [teamC[0], teamE[2]];
            playE = true;
            dispatch(updateRound8({ teamId: teamE[2].id, order: 6 }));
        } else if (teamF.length === 3) {
            match3 = [teamC[0], teamF[2]];
            playF = true;
            dispatch(updateRound8({ teamId: teamF[2].id, order: 6 }));
        }
        //1er Gr. B vs 3e Gr. A,D,E ou F
        let match4;
        dispatch(updateRound8({ teamId: teamB[0].id, order: 7 }));
        if (teamA.length === 3) {
            match4 = [teamB[0], teamA[2]];
            playA = true;
            dispatch(updateRound8({ teamId: teamA[2].id, order: 8 }));
        } else if (teamD.length === 3 && !playD) {
            match4 = [teamB[0], teamD[2]];
            playD = true;
            dispatch(updateRound8({ teamId: teamD[2].id, order: 8 }));
        } else if (teamE.length === 3 && !playE) {
            match4 = [teamB[0], teamE[2]];
            playE = true;
            dispatch(updateRound8({ teamId: teamE[2].id, order: 8 }));
        } else if (teamF.length === 3 && !playF) {
            match4 = [teamB[0], teamF[2]];
            playF = true;
            dispatch(updateRound8({ teamId: teamF[2].id, order: 8 }));
        }

        //1er Gr. B vs 3e Gr. A,D,E ou F
        const match5 = [teamD[1], teamE[1]];
        dispatch(updateRound8({ teamId: teamD[1].id, order: 9 }));
        dispatch(updateRound8({ teamId: teamE[1].id, order: 10 }));

        //1er Gr. F vs 3e Gr. A,B ou C
        let match6;
        dispatch(updateRound8({ teamId: teamF[0].id, order: 11 }));
        if (teamA.length === 3 && !playA) {
            match6 = [teamF[0], teamA[2]];
            playA = true;
            dispatch(updateRound8({ teamId: teamA[2].id, order: 12 }));
        } else if (teamB.length === 3 && !playB) {
            match6 = [teamF[0], teamB[2]];
            playB = true;
            dispatch(updateRound8({ teamId: teamB[2].id, order: 12 }));
        } else if (teamC.length === 3 && !playC) {
            match6 = [teamF[0], teamC[2]];
            playC = true;
            dispatch(updateRound8({ teamId: teamC[2].id, order: 12 }));
        }
        //1er Gr. E vs 3e Gr. A,B, C ou D
        let match7;
        dispatch(updateRound8({ teamId: teamE[0].id, order: 13 }));
        if (teamA.length === 3 && !playA) {
            match7 = [teamE[0], teamA[2]];
            playA = true;
            dispatch(updateRound8({ teamId: teamA[2].id, order: 14 }));
        } else if (teamB.length === 3 && !playB) {
            match7 = [teamE[0], teamB[2]];
            playB = true;
            dispatch(updateRound8({ teamId: teamB[2].id, order: 14 }));
        } else if (teamC.length === 3 && !playC) {
            match7 = [teamE[0], teamC[2]];
            playC = true;
            dispatch(updateRound8({ teamId: teamC[2].id, order: 14 }));
        } else if (teamD.length === 3 && !playD) {
            match7 = [teamE[0], teamD[2]];
            playD = true;
            dispatch(updateRound8({ teamId: teamD[2].id, order: 14 }));
        }

        //1er Gr. D vs 2e Gr. F
        const match8 = [teamD[0], teamF[1]];
        dispatch(updateRound8({ teamId: teamD[0].id, order: 15 }));
        dispatch(updateRound8({ teamId: teamF[1].id, order: 16 }));

        const teamsInStep3 = match1
            .concat(match2)
            .concat(match3)
            .concat(match4)
            .concat(match5)
            .concat(match6)
            .concat(match7)
            .concat(match8);
        let allMatches = [];
        for (let i = 0; i < teamsInStep3.length; i += 2) {
            allMatches.push(playGame(8, teamsInStep3[i], teamsInStep3[i + 1]));
        }
        console.log(teamsInStep3);
        allMatches && dispatch(updateScores(allMatches));
        setBestTeams(teamsInStep3);

        const teams8 = teams
            .filter((team) => team.round8 !== 0)
            .sort((a, b) => a.round8 - b.round8);
        console.log(teams8);
    }, [navigate, isNavigated]);

    useEffect(() => {
        // Mettre à jour bestTeams lorsque teams est mis à jour
        const teams8 = teams
            .filter((team) => team.round8 !== 0)
            .sort((a, b) => a.round8 - b.round8);
        setBestTeams(teams8);
        console.log(teams8);
    }, [teams]);

    const play_eight = () => {
        console.log(bestTeams);
        setPlay8(true);
    };

    return (
        <div>
            <button onClick={() => play_eight()}>8ème de finale</button>
            <button>Quart de finale</button>
            <button>Demi finale</button>
            <button>Finale</button>
            <div className="tournoi-container">
                <ul>
                    {bestTeams &&
                        bestTeams
                            .reduce((pairs, team, index) => {
                                if (index % 2 === 0) {
                                    pairs.push(
                                        bestTeams.slice(index, index + 2)
                                    );
                                }
                                return pairs;
                            }, [])
                            .map((pair, index) => (
                                <li key={"pair_" + index}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>
                                            <p>
                                                {pair[0].name}({pair[0].group})
                                            </p>
                                            {play8 &&
                                                pair[0].matchList &&
                                                pair[0].matchList.length > 0 &&
                                                pair[0].matchList[
                                                    pair[0].matchList.length - 1
                                                ][0] === 8 && (
                                                    <p>
                                                        {
                                                            pair[0].matchList.find(
                                                                (array) =>
                                                                    array[0] ===
                                                                    8
                                                            )[3]
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                        {play8 && <div>⚽ </div>}
                                        <div>
                                            <p>
                                                {pair[1].name}({pair[1].group})
                                            </p>
                                            {play8 &&
                                                pair[1].matchList &&
                                                pair[1].matchList.length > 0 &&
                                                pair[1].matchList[
                                                    pair[1].matchList.length - 1
                                                ][0] === 8 && (
                                                    <p>
                                                        {
                                                            pair[1].matchList.find(
                                                                (array) =>
                                                                    array[0] ===
                                                                    8
                                                            )[3]
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                </ul>
            </div>
        </div>
    );
};
export default PageTournoi;
