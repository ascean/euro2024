import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allTeams,
    updateRound8,
    updateRound4,
    updateRound2,
    updateRound1,
    updateScores,
} from "../../redux/teamSlice";
import { gotoHome, playGame } from "../../utils/matchUtils";
import { useNavigate } from "react-router";
import Round from "../../components/rounds/Round";

const Tournoi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isNavigated, setIsNavigated] = useState(false);
    const teams = useSelector(allTeams);
    const [teams8, setTeams8] = useState([]);
    const [teams4, setTeams4] = useState([]);
    const [teams2, setTeams2] = useState([]);
    const [teams1, setTeams1] = useState([]);
    const [play8, setPlay8] = useState(false);
    const [play4, setPlay4] = useState(false);
    const [play2, setPlay2] = useState(false);
    const [play1, setPlay1] = useState(false);

    const getQualifiedFor8 = (teams) => {
        const teamsA = teams
            .filter((team) => team.round16 & (team.group === "A"))
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
     * Génère les matchs pour les 8èmes de finale et met à jour l'état Round8 et de l'ordre des équipes.
     * @param {Object} teams Les équipes pour lesquelles générer les matchs.
     * @param {Array} teams.teamsA Les équipes du groupe A.
     * @param {Array} teams.teamsB Les équipes du groupe B.
     * @param {Array} teams.teamsC Les équipes du groupe C.
     * @param {Array} teams.teamsD Les équipes du groupe D.
     * @param {Array} teams.teamsE Les équipes du groupe E.
     * @param {Array} teams.teamsF Les équipes du groupe F.
     * @returns {Array} teamsForMatches : Un tableau contenant les équipes participant aux matchs.
     */
    const generateMatchesForRound8 = ({
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
        const teamsForMatch1 = [teamsA[1], teamsB[1]];
        dispatch(updateRound8({ teamId: teamsA[1].id, round8: 38, order: 1 }));
        dispatch(updateRound8({ teamId: teamsB[1].id, round8: 38, order: 2 }));

        //1er Gr. A vs 2e Gr. C
        const teamsForMatch2 = [teamsA[0], teamsC[1]];
        dispatch(updateRound8({ teamId: teamsA[0].id, round8: 37, order: 3 }));
        dispatch(updateRound8({ teamId: teamsC[1].id, round8: 37, order: 4 }));

        //1er Gr. C vs 3e Gr. D,E ou F
        let teamsForMatch3;
        dispatch(updateRound8({ teamId: teamsC[0].id, round8: 40, order: 5 }));
        if (teamsD.length === 3) {
            teamsForMatch3 = [teamsC[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, round8: 40, order: 6 })
            );
        } else if (teamsE.length === 3) {
            teamsForMatch3 = [teamsC[0], teamsE[2]];
            playE = true;
            dispatch(
                updateRound8({ teamId: teamsE[2].id, round8: 40, order: 6 })
            );
        } else if (teamsF.length === 3) {
            teamsForMatch3 = [teamsC[0], teamsF[2]];
            playF = true;
            dispatch(
                updateRound8({ teamId: teamsF[2].id, round8: 40, order: 6 })
            );
        }

        //1er Gr. B vs 3e Gr. A,D,E ou F
        let teamsForMatch4;
        dispatch(updateRound8({ teamId: teamsB[0].id, round8: 39, order: 7 }));
        if (teamsA.length === 3) {
            teamsForMatch4 = [teamsB[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, round8: 39, order: 8 })
            );
        } else if (teamsD.length === 3 && !playD) {
            teamsForMatch4 = [teamsB[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, round8: 39, order: 8 })
            );
        } else if (teamsE.length === 3 && !playE) {
            teamsForMatch4 = [teamsB[0], teamsE[2]];
            playE = true;
            dispatch(
                updateRound8({ teamId: teamsE[2].id, round8: 39, order: 8 })
            );
        } else if (teamsF.length === 3 && !playF) {
            teamsForMatch4 = [teamsB[0], teamsF[2]];
            playF = true;
            dispatch(
                updateRound8({ teamId: teamsF[2].id, round8: 39, order: 8 })
            );
        }

        //1er Gr. B vs 3e Gr. A,D,E ou F
        const teamsForMatch5 = [teamsD[1], teamsE[1]];
        dispatch(updateRound8({ teamId: teamsD[1].id, round8: 42, order: 9 }));
        dispatch(updateRound8({ teamId: teamsE[1].id, round8: 42, order: 10 }));

        //1er Gr. F vs 3e Gr. A,B ou C
        let teamsForMatch6;
        dispatch(updateRound8({ teamId: teamsF[0].id, round8: 41, order: 11 }));
        if (teamsA.length === 3 && !playA) {
            teamsForMatch6 = [teamsF[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, round8: 41, order: 12 })
            );
        } else if (teamsB.length === 3 && !playB) {
            teamsForMatch6 = [teamsF[0], teamsB[2]];
            playB = true;
            dispatch(
                updateRound8({ teamId: teamsB[2].id, round8: 41, order: 12 })
            );
        } else if (teamsC.length === 3 && !playC) {
            teamsForMatch6 = [teamsF[0], teamsC[2]];
            playC = true;
            dispatch(
                updateRound8({ teamId: teamsC[2].id, round8: 41, order: 12 })
            );
        }

        //1er Gr. E vs 3e Gr. A,B, C ou D
        let teamsForMatch7;
        dispatch(updateRound8({ teamId: teamsE[0].id, round8: 43, order: 13 }));
        if (teamsA.length === 3 && !playA) {
            teamsForMatch7 = [teamsE[0], teamsA[2]];
            playA = true;
            dispatch(
                updateRound8({ teamId: teamsA[2].id, round8: 43, order: 14 })
            );
        } else if (teamsB.length === 3 && !playB) {
            teamsForMatch7 = [teamsE[0], teamsB[2]];
            playB = true;
            dispatch(
                updateRound8({ teamId: teamsB[2].id, round8: 43, order: 14 })
            );
        } else if (teamsC.length === 3 && !playC) {
            teamsForMatch7 = [teamsE[0], teamsC[2]];
            playC = true;
            dispatch(
                updateRound8({ teamId: teamsC[2].id, round8: 43, order: 14 })
            );
        } else if (teamsD.length === 3 && !playD) {
            teamsForMatch7 = [teamsE[0], teamsD[2]];
            playD = true;
            dispatch(
                updateRound8({ teamId: teamsD[2].id, round8: 43, order: 14 })
            );
        }

        //1er Gr. D vs 2e Gr. F
        const teamsForMatch8 = [teamsD[0], teamsF[1]];
        dispatch(updateRound8({ teamId: teamsD[0].id, round8: 44, order: 15 }));
        dispatch(updateRound8({ teamId: teamsF[1].id, round8: 44, order: 16 }));

        const teamsForMatches = teamsForMatch1
            .concat(teamsForMatch2)
            .concat(teamsForMatch3)
            .concat(teamsForMatch4)
            .concat(teamsForMatch5)
            .concat(teamsForMatch6)
            .concat(teamsForMatch7)
            .concat(teamsForMatch8);

        return teamsForMatches;
    };

    /**
     * Joue une série de matchs et retourne les résultats.
     * @param {Array} matches Les matchs à jouer.
     * @param {number} round Le numéro du tour.
     * @returns {Array} Un tableau contenant les résultats des matchs joués.
     */
    const playMatches = (matches, round) => {
        let allMatches = [];
        for (let i = 0; i < matches.length; i += 2) {
            allMatches.push(playGame(round, matches[i], matches[i + 1]));
        }
        return allMatches;
    };

    /**
     * Génère les matchs pour les quarts de finale et met à jour l'état Round4 et de l'ordre des équipes.
     * @param {Array} teamsForRound4 Les équipes qualifiées pour les quarts de finale.
     * @returns {Array} Un tableau contenant les équipes participant aux matchs des quarts de finale.
     */
    const generateMatchesForRound4 = (teamsForRound4) => {
        let teamsForMatches = [];
        //table de correspondance entre match de 8ème et match de 1/4
        const corresp = [
            [39, 45, 1], //le vainqueur du match de 8ème n°39 jouera le match n°45
            [37, 45, 2], //le vainqueur du match de 8ème n°37 jouera le match n°45
            [41, 46, 3], //le vainqueur du match de 8ème n°41 jouera le match n°46
            [42, 46, 4], //le vainqueur du match de 8ème n°42 jouera le match n°46
            [40, 48, 5], //le vainqueur du match de 8ème n°40 jouera le match n°48
            [38, 48, 6], //le vainqueur du match de 8ème n°38 jouera le match n°48
            [43, 47, 7], //le vainqueur du match de 8ème n°43 jouera le match n°47
            [44, 47, 8], //le vainqueur du match de 8ème n°44 jouera le match n°47
        ];

        for (let i = 0; i < corresp.length; i++) {
            const numMatch = corresp[i];

            const twoTeams = teamsForRound4
                .filter((team) => team.round8 === numMatch[0])
                .sort((a, b) => a.order8 - b.order8);

            let winner;
            if (twoTeams[0].matchList[3][3] > twoTeams[0].matchList[3][4]) {
                winner = twoTeams[0];
            } else {
                winner = twoTeams[1];
            }

            dispatch(
                updateRound4({
                    teamId: winner.id,
                    round4: numMatch[1],
                    order: numMatch[2],
                })
            );
            teamsForMatches.push(winner);
        }

        return teamsForMatches;
    };

    /**
     * Génère les matchs pour les demi-finales et met à jour l'état de Round2 et de l'ordre des équipes.
     * @param {Array} teamsForRound2 Les équipes qualifiées pour les demi-finales.
     * @returns {Array} Un tableau contenant les équipes participant aux matchs des demi-finales.
     */
    const generateMatchesForRound2 = (teamsForRound2) => {
        let teamsForMatches = [];
        //table de correspondance entre match de 1/4 et match de 1/2
        const corresp = [
            [45, 49, 1], //le vainqueur du match de 1/4 n°45 jouera le match n°49
            [46, 49, 2], //le vainqueur du match de 1/4 n°46 jouera le match n°49
            [47, 50, 3], //le vainqueur du match de 1/4 n°47 jouera le match n°50
            [48, 50, 4], //le vainqueur du match de 1/4 n°48 jouera le match n°50
        ];

        for (let i = 0; i < corresp.length; i++) {
            const numMatch = corresp[i];

            const twoTeams = teamsForRound2
                .filter((team) => team.round4 === numMatch[0])
                .sort((a, b) => a.order4 - b.order4);

            let winner;
            if (twoTeams[0].matchList[4][3] > twoTeams[0].matchList[4][4]) {
                winner = twoTeams[0];
            } else {
                winner = twoTeams[1];
            }

            dispatch(
                updateRound2({
                    teamId: winner.id,
                    round2: numMatch[1],
                    order: numMatch[2],
                })
            );
            teamsForMatches.push(winner);
        }

        return teamsForMatches;
    };

    /**
     * Génère les matchs pour les demi-finales et met à jour l'état de Round1 et de l'ordre des équipes.
     * @param {Array} teamsForRound1 Les équipes qualifiées pour les demi-finales.
     * @returns {Array} Un tableau contenant les équipes participant aux matchs des demi-finales.
     */
    const generateMatchesForRound1 = (teamsForRound1) => {
        let teamsForMatches = [];
        //table de correspondance entre match de 1/2 et match de finale
        const corresp = [
            [49, 51, 1], //le vainqueur du match de 1/2 n°49 jouera le match n°51
            [50, 51, 2], //le vainqueur du match de 1/2 n°50 jouera le match n°51
        ];

        for (let i = 0; i < corresp.length; i++) {
            const numMatch = corresp[i];

            const twoTeams = teamsForRound1
                .filter((team) => team.round2 === numMatch[0])
                .sort((a, b) => a.order2 - b.order2);

            let winner;
            if (twoTeams[0].matchList[5][3] > twoTeams[0].matchList[5][4]) {
                winner = twoTeams[0];
            } else {
                winner = twoTeams[1];
            }

            dispatch(
                updateRound1({
                    teamId: winner.id,
                    round1: numMatch[1],
                    order: numMatch[2],
                })
            );
            teamsForMatches.push(winner);
        }

        return teamsForMatches;
    };

    //retour à la page home si le state n'est pas complet
    useEffect(() => {
        const shouldGoToHome = gotoHome(teams);
        if (!shouldGoToHome && !isNavigated) {
            navigate("/");
            setIsNavigated(true);
            return;
        }
    }, [navigate, isNavigated]);

    /**
     * Effet utilisé pour générer et jouer des matchs pour les huitièmes de finale.
     * Met à jour les scores et les équipes qualifiées pour les quarts de finale.
     */
    useEffect(() => {
        // Création d'un tableau contenant les équipes qualifiées pour les huitièmes de finale
        const teamsPlaying16 = getQualifiedFor8(teams);

        // Génération des matchs pour les huitièmes de finale
        const matchesFor8 =
            teamsPlaying16.teamsA.length > 0 &&
            generateMatchesForRound8(teamsPlaying16);

        if (matchesFor8.length > 0) {
            // Joue les matchs pour les huitièmes de finale et met à jour les scores
            const allMatches = playMatches(matchesFor8, 8);
            allMatches && dispatch(updateScores(allMatches));

            // Sélectionne les équipes participant aux huitièmes de finale
            const teamsPlaying8 = teams
                .filter((team) => team.round8 !== 0)
                .sort((a, b) => a.order8 - b.order8);

            // Met à jour l'état pour indiquer que les matchs des huitièmes de finale ont été joués
            setPlay8(true);

            // Met à jour l'état avec les équipes qualifiées pour les quarts de finale
            setTeams8(teamsPlaying8);
        }
    }, []);

    /**
     * Effet utilisé pour générer et jouer des matchs pour les quarts de finale.
     * Met à jour les scores et les équipes qualifiées pour les demi-finales.
     */
    useEffect(() => {
        // Sélectionne les équipes participant aux quarts de finale
        const teamsPlaying8 = teams
            .filter((team) => team.round8 !== 0)
            .sort((a, b) => a.order8 - b.order8);

        if (teamsPlaying8.length > 0) {
            // Génère les matchs pour les quarts de finale
            const matchesFor4 = generateMatchesForRound4(teamsPlaying8);

            // Joue les matchs pour les quarts de finale et met à jour les scores
            const allMatches = playMatches(matchesFor4, 4);
            allMatches && dispatch(updateScores(allMatches));

            // Sélectionne les équipes qualifiées pour les demi-finales
            const teamsPlaying4 = teams
                .filter((team) => team.round4 !== 0)
                .sort((a, b) => a.order4 - b.order4);

            // Met à jour l'état pour indiquer que les matchs des quarts de finale ont été joués
            setPlay4(true);

            // Met à jour l'état avec les équipes qualifiées pour les demi-finales
            setTeams4(teamsPlaying4);
        }
    }, [play8, teams8]);

    /**
     * Effet utilisé pour générer et jouer des matchs pour les demi-finales.
     * Met à jour les scores et les équipes qualifiées pour la finale.
     */
    useEffect(() => {
        // Sélectionne les équipes participant aux demi-finales
        const teamsPlaying4 = teams
            .filter((team) => team.round4 !== 0)
            .sort((a, b) => a.order4 - b.order4);

        if (teamsPlaying4.length > 0) {
            // Génère les matchs pour les demi-finales
            const matchesFor2 = generateMatchesForRound2(teamsPlaying4);

            // Joue les matchs pour les demi-finales et met à jour les scores
            const allMatches = playMatches(matchesFor2, 2);
            allMatches && dispatch(updateScores(allMatches));

            // Sélectionne les équipes qualifiées pour la finale
            const teamsPlaying2 = teams
                .filter((team) => team.round2 !== 0)
                .sort((a, b) => a.order2 - b.order2);

            // Met à jour l'état pour indiquer que les matchs des demi-finales ont été joués
            setPlay2(true);

            // Met à jour l'état avec les équipes qualifiées pour la finale
            setTeams2(teamsPlaying2);
        }
    }, [play4, teams4]);

    /**
     * Effet utilisé pour générer et jouer des matchs pour la finale.
     * Met à jour les scores et les équipes qualifiées comme vainqueur.
     */
    useEffect(() => {
        // Sélectionne les équipes participant à la finale
        const teamsPlaying2 = teams
            .filter((team) => team.round2 !== 0)
            .sort((a, b) => a.order2 - b.order2);

        if (teamsPlaying2.length > 0) {
            // Génère les matchs pour la finale
            const matchesFor1 = generateMatchesForRound1(teamsPlaying2);

            // Joue les matchs pour la finale et met à jour les scores
            const allMatches = playMatches(matchesFor1, 1);
            allMatches && dispatch(updateScores(allMatches));

            // Sélectionne l'équipe gagnante
            const teamsPlaying1 = teams
                .filter((team) => team.round1 !== 0)
                .sort((a, b) => a.order1 - b.order1);

            // Met à jour l'état pour indiquer que la finale a été jouée
            setPlay1(true);

            // Met à jour l'état avec l'équipe gagnante
            setTeams1(teamsPlaying1);
        }
    }, [play2, teams2]);

    return (
        <div>
            <h1 className="title">Tournoi</h1>
            <div className="tournoi-container">
                {teams.length > 0 && play1 && <Round teams={teams} round={8} />}
                {teams.length > 0 && play1 && <Round teams={teams} round={4} />}
                {teams.length > 0 && play1 && <Round teams={teams} round={2} />}
                {teams.length > 0 && play1 && <Round teams={teams} round={1} />}
            </div>
        </div>
    );
};

export default Tournoi;
