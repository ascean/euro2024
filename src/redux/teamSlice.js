import { createSlice } from "@reduxjs/toolkit";
import { TEAMS } from "../datas/teams";

export const teamSlice = createSlice({
    name: "teams",
    initialState: TEAMS.map((team) => ({ ...team, group: null, order: null })), // Ajout de group et order à chaque équipe
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
            return state.map(team => {
                if (team.id === id) {
                    return {
                        ...team,
                        group,
                        order
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
    },
});

export const allTeams = (state) => state.teams;

// export const selectedTeams = createSelector([allTeams], (teams) =>
//     teams.filter((team) => team.playoff === null)
// );
// export const selectTeamsPlayOff = createSelector([allTeams], (teams) =>
//     teams.filter((team) => team.playoff !== null)
// );

export const { updateTeamHat, clearTeamsPlayoff, updateTeamGroupAndOrder } =
    teamSlice.actions;
export default teamSlice.reducer;
