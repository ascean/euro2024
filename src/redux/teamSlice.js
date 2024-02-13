import { createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../services/servicesAPI";
// import { TEAMS } from "../datas/teams";

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
    })), // Ajout de group et order à chaque équipe
    reducers: {
        // Réinitialiser le state des équipes
        resetTeams: (state) => {
            return TEAMS.map((team) => ({
                ...team,
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
            }));
        },
        updateTeamHat: (state, action) => {
            const id = action.payload;
            const teamToUpdate = state.find((team) => team.id === id);
            if (teamToUpdate) {
                teamToUpdate.playoff = null;
            }
        },
        updateTeamGroupAndOrder: (state, action) => {
            const { id, group, order } = action.payload;
            return state.map((team) => {
                if (team.id === id) {
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
        addMatchIdOld(state, action) {
            const { team1, team2, nbPts1, nbPts2 } = action.payload;
            let team;
            let resultat =
                nbPts1 === nbPts2 ? "nul" : nbPts1 > nbPts2 ? "team1" : "team2";
            //update team1
            team = state.find((t) => t.id === team1);
            if (!team.matchs.includes(team2)) {
                team.matchs.push(team2);
                team.nbMatchs += 1;
                team.nbButsPlus += nbPts1;
                team.nbButsMinus += nbPts2;
                team.diffButs += nbPts1 - nbPts2;
                if (resultat === "nul") {
                    team.nbNuls += 1;
                    team.nbPts += 1;
                }
                //team1 WIN
                if (resultat === "team1") {
                    team.nbWin += 1;
                    team.nbPts += 3;
                }
                //team1 LOST
                if (resultat === "team2") {
                    team.nbLost += 1;
                }
            }
            //upadte team2
            team = state.find((t) => t.id === team2);
            if (!team.matchs.includes(team1)) {
                team.matchs.push(team1);
                team.nbMatchs = team.J + 1;
                team.nbButsPlus += nbPts2;
                team.nbButsMinus += nbPts1;
                team.diffButs += nbPts2 - nbPts1;
                if (resultat === "nul") {
                    team.nbNuls += 1;
                    team.nbPts += 1;
                }
                //team1 WIN
                if (resultat === "team2") {
                    team.nbWin += 1;
                    team.nbPts += 3;
                }
                //team2 LOST
                if (resultat === "team1") team.nbLost += 1;
            }
        },
        addMatchOld(state, action) {
            const { team1, team2 } = action.payload;
            let team;
            //update team1
            team = state.find((t) => t.id === team1);
            if (!team.matchs.includes(team2)) {
                team.matchs.push(team2);
            }
            //upadte team2
            team = state.find((t) => t.id === team2);
            if (!team.matchs.includes(team1)) {
                team.matchs.push(team1);
            }
        },
        updatePointsOld(state, action) {
            console.log("updtaepoints");
            //nbPts1 : nombre de buts de l'équipe en cours
            //nbPts2 : nombre de buts de l'équipe adverse
            const { teamToUpdate, nbPts1, nbPts2 } = action.payload;
            let resultat =
                nbPts1 === nbPts2 ? "nul" : nbPts1 > nbPts2 ? "win" : "lost";
            const team = state.find((t) => t.id === teamToUpdate);
            team.nbMatchs += 1;
            team.nbButsPlus += nbPts1;
            team.nbButsMinus += nbPts2;
            team.diffButs += nbPts1 - nbPts2;
            if (resultat === "nul") {
                team.nbNuls += 1;
                team.nbPts += 1;
            }
            if (resultat === "win") {
                team.nbWin += 1;
                team.nbPts += 3;
            }
            if (resultat === "lost") {
                team.nbLost += 1;
            }
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
