import { createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../services/servicesAPI";
import { produce } from "immer";

// Fonction utilitaire pour générer les valeurs par défaut d'une équipe
const getDefaultTeamValues = () => ({
    group: null,
    order: null,
    nbPts: 0,
    nbMatchs: 0,
    nbWin: 0,
    nbNuls: 0,
    nbLost: 0,
    nbGoalsPlus: 0,
    nbGoalsMinus: 0,
    diffGoals: 0,
    matchsList: [],
    round16: false,
    round8: 0,
    round4: 0,
    round2: false,
    round1: false,
    order8: 0,
    order4:0
});

function updateTeamScore(team, match) {
    // Vérifier si l'équipe correspondante existe dans l'état
    if (team) {
        // Si l'équipe a déjà une liste de matchs, ajoutez-y ce match, sinon créez-en une nouvelle
        if (!team.matchList) {
            team.matchList = [match];
        } else {
            team.matchList.push(match);
        }
    } else {
        console.error(
            `L'équipe avec l'ID ${team.id} n'a pas été trouvée dans l'état.`
        );
    }
    const resultat =
        match[3] === match[4] ? "nul" : match[3] > match[4] ? "team1" : "team2";
    team.nbMatchs += 1;
    team.nbGoalsPlus += match[3];
    team.nbGoalsMinus += match[4];
    team.diffGoals += match[3] - match[4];
    if (resultat === "nul") {
        team.nbNuls += 1;
        team.nbPts += 1;
    } else if (resultat === "team1") {
        team.nbWin += 1;
        team.nbPts += 3;
    } else if (resultat === "team2") {
        team.nbLost += 1;
    }
}

const TEAMS = await getDatas();
// nbPts : nombre de points
// nbMatchs : nombre de matchs joués
// nbWin : nombre de matchs gagnés
// nbNul : nombre de matchs nuls
// nbLost : nombre de matchs perdus
// nbGoalsPlus : nombre de Goals marqués (« Goals “pour” »)
// nbGoalsMinus : nombre de Goals encaissés (« Goals “contre” »)
// diffGoals : différence de Goals (nbGoalsPlus-nbGoalsMinus)
export const teamSlice = createSlice({
    name: "teams",
    initialState: TEAMS.map((team) => ({
        ...team,
        ...getDefaultTeamValues(),
    })), // Ajout de group et order à chaque équipe
    reducers: {
        // Réinitialiser le state des équipes
        initState: (state) => {
            return TEAMS.map((team) => ({
                ...team,
                ...getDefaultTeamValues(),
            }));
        },
        updateTeamHat: (state, action) => {
            const teamsHat = action.payload;
            return state.map((team) => {
                if (teamsHat.includes(team.id)) {
                    return {
                        ...team,
                        playoff: null,
                    };
                }
                return team;
            });
        },
        updateTeamGroupAndOrder: (state, action) => {
            const newTeams = action.payload.newTeams;
            return state.map((team) => {
                const teamToUpdate = newTeams.find(
                    (newTeam) => newTeam.id === team.id
                );
                if (teamToUpdate) {
                    const { group, order } = teamToUpdate;
                    return {
                        ...team,
                        group,
                        order,
                    };
                }
                return team;
            });
        },
        clearTeamsPlayoff: (state) => {
            if (state.teamsPlayOff) {
                state.teamsPlayOff.splice(0, state.teamsPlayOff.length);
            }
        },
        updateScores(state, action) {
            const newMatchLists = action.payload;
            console.log(newMatchLists);
            newMatchLists.forEach((match) => {
                const matchTeam1 = match;
                const team1 = state.find((team) => team.id === matchTeam1[1]);
                updateTeamScore(team1, matchTeam1);

                const matchTeam2 = [
                    match[0],
                    match[2],
                    match[1],
                    match[4],
                    match[3],
                ];
                const team2 = state.find((team) => team.id === matchTeam2[1]);
                updateTeamScore(team2, matchTeam2);
            });
        },

        
        
        updateRound16: (state, action) => {
            const selectedTeamIds = action.payload.map(team => team.id);
            return state.map((team) => {
                if (selectedTeamIds.includes(team.id)) {
                    return {
                        ...team,
                        round16: true
                    };
                }
                return team; // Retourner l'équipe inchangée si elle n'a pas été sélectionnée
            });
        },
        
        updateRound8: (state, action) => {
            const { teamId, numMatch, order } = action.payload;
            return state.map((team) => {
                if (team.id === teamId) {
                    return {
                        ...team,
                        round8: numMatch,
                        order8:order
                    };
                }
                return team;
            });
        },
        updateRound4: (state, action) => {
            const { teamId, numMatch, order } = action.payload;
            return state.map((team) => {
                if (team.id === teamId) {
                    return {
                        ...team,
                        round4: numMatch,
                        order4:order
                    };
                }
                return team;
            });
        },
        
        updateRound2: (state, action) => {
            const selectedTeams = action.payload;
            selectedTeams.forEach((team) => {
                const teamId = team.id;
                const selectedTeam = state.find((team) => team.id === teamId);
                selectedTeam.round2 = true;
            });
        },
        updateRound1: (state, action) => {
            const selectedTeams = action.payload;
            selectedTeams.forEach((team) => {
                const teamId = team.id;
                const selectedTeam = state.find((team) => team.id === teamId);
                selectedTeam.round1 = true;
            });
        },
    },
});

export const allTeams = (state) => state.teams;

export const {
    updateTeamHat,
    clearTeamsPlayoff,
    updateTeamGroupAndOrder,
    initState,
    updateScores,
    updateRound16,
    updateRound8,
    updateRound4,
    updateRound2,
    updateRound1,
} = teamSlice.actions;
export default teamSlice.reducer;
