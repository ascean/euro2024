import { createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../services/servicesAPI";

// Fonction utilitaire pour générer les valeurs par défaut d'une équipe
const getDefaultTeamValues = () => ({
    group: null,
    order: null,
    nbPts: 0,
    nbMatchs: 0,
    nbWin: 0,
    nbNuls: 0,
    nbLost: 0,
    nbButsPlus: 0,
    nbButsMinus: 0,
    diffButs: 0,
    matchs: [],
    sixteenth: '',
    eighteenth:'',
    forteenth:'',
    half: '',
    finale:''
});

const TEAMS = await getDatas();
// nbPts : nombre de points
// nbMatchs : nombre de matchs joués
// nbWin : nombre de matchs gagnés
// nbNul : nombre de matchs nuls
// nbLost : nombre de matchs perdus
// nbButsPlus : nombre de buts marqués (« buts “pour” »)
// nbButsMinus : nombre de buts encaissés (« buts “contre” »)
// diffButs : différence de buts (nbButsPlus-nbButsMinus)
export const teamSlice = createSlice({
    name: "teams",
    initialState: TEAMS.map((team) => ({
        ...team,
        ...getDefaultTeamValues(),
    })), // Ajout de group et order à chaque équipe
    reducers: {
        // Réinitialiser le state des équipes
        resetTeams: (state) => {
            return TEAMS.map((team) => ({
                ...team,
                ...getDefaultTeamValues(),
            }));
        },
        updateTeamHat: (state, action) => {
            const teamsHat = action.payload;
            teamsHat.map((teamHat) => {
                const teamToUpdate = TEAMS.find((team) => team.id === teamHat);
                if (teamToUpdate) {
                    teamToUpdate.playoff = null;
                }
            })
        },
        updateTeamGroupAndOrder: (state, action) => {
            const newTeams = action.payload.newTeams;
            console.log(newTeams)
            return state.map((team) => {
                const teamToUpdate = newTeams.find(newTeam => newTeam.id === team.id);
                if (teamToUpdate) {
                    const {group, order} = teamToUpdate
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
            const matches = action.payload;
            matches.map((match) => {
                let resultat =
                    match[2] === match[3]
                        ? "nul"
                        : match[2] > match[3]
                        ? "team1"
                        : "team2";
                const teamToUpdate1 = state.find((t) => t.id === match[0]);
                if (!teamToUpdate1.matchs.includes(match[1])) {
                    teamToUpdate1.matchs.push(match[1]);
                    teamToUpdate1.nbMatchs += 1;
                    teamToUpdate1.nbButsPlus += match[2];
                    teamToUpdate1.nbButsMinus += match[3];
                    teamToUpdate1.diffButs += match[2] - match[3];
                    if (resultat === "nul") {
                        teamToUpdate1.nbNuls += 1;
                        teamToUpdate1.nbPts += 1;
                    }
                    //team1 WIN
                    if (resultat === "team1") {
                        teamToUpdate1.nbWin += 1;
                        teamToUpdate1.nbPts += 3;
                    }
                    //team1 LOST
                    if (resultat === "team2") {
                        teamToUpdate1.nbLost += 1;
                    }
                }
                const teamToUpdate2 = state.find((t) => t.id === match[1]);
                if (!teamToUpdate2.matchs.includes(match[0])) {
                    teamToUpdate2.matchs.push(match[0]);
                    teamToUpdate2.nbMatchs += 1;
                    teamToUpdate2.nbButsPlus += match[3];
                    teamToUpdate2.nbButsMinus += match[2];
                    teamToUpdate2.diffButs += match[3] - match[2];
                    if (resultat === "nul") {
                        teamToUpdate2.nbNuls += 1;
                        teamToUpdate2.nbPts += 1;
                    }
                    //team1 WIN
                    if (resultat === "team2") {
                        teamToUpdate2.nbWin += 1;
                        teamToUpdate2.nbPts += 3;
                    }
                    //team2 LOST
                    if (resultat === "team1") teamToUpdate2.nbLost += 1;
                }
            });
        },
        updateSixteen: (state, action) => {
            const { id, sixteenth } = action.payload;
            return state.map((team) => {
                if (team.id === id) {
                    return {
                        ...team,
                        sixteenth,
                    };
                }
                return team;
            });
        },

    },
});

export const allTeams = (state) => state.teams;

export const {
    updateTeamHat,
    clearTeamsPlayoff,
    updateTeamGroupAndOrder,
    resetTeams,
    updateScores,
} = teamSlice.actions;
export default teamSlice.reducer;
