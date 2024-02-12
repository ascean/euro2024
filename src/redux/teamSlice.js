import { createSlice } from "@reduxjs/toolkit";
import { TEAMS } from "../datas/teams";

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
        updateTeamHat: (state, action) => {
            const id = action.payload;
            const teamToUpdate = state.find((team) => team.id === id);
            if (teamToUpdate) {
                teamToUpdate.playoff = null;
                console.log("update playoff", id);
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
        addMatchId(state, action) {
            const { team1, team2, nbPts1, nbPts2 } = action.payload;
            console.log(nbPts1, nbPts2);
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
                team.diffButs += (nbPts1 - nbPts2)
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
                team.diffButs += (nbPts2 - nbPts1)
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
    },
});

export const allTeams = (state) => state.teams;

export const {
    updateTeamHat,
    clearTeamsPlayoff,
    updateTeamGroupAndOrder,
    addMatchId,
} = teamSlice.actions;
export default teamSlice.reducer;
