import { createSlice, createSelector } from "@reduxjs/toolkit";
import { TEAMS } from "../datas/teams";

export const teamSlice = createSlice({
    name: "teams",
    initialState: TEAMS,
    reducers: {
        updateTeamHat: (state, action) => {
            const id = action.payload;
            console.log(action.payload);
            const teamToUpdate = state.find((team) => team.id === id);
            if (teamToUpdate) {
                teamToUpdate.playoff = null;
            }
        },
        clearTeamsPlayoff: (state) => {
            if (state.teamsPlayOff) {
                state.teamsPlayOff.splice(0, state.teamsPlayOff.length);
            }
        },
    },
});

export const allTeams = (state) => state.teams;

export const selectedTeams = createSelector([allTeams], (teams) =>
    teams.filter((team) => team.playoff === null)
);
export const selectTeamsPlayOff = createSelector([allTeams], (teams) =>
    teams.filter((team) => team.playoff !== null)
);

export const { updateTeamHat, clearTeamsPlayoff } = teamSlice.actions;
export default teamSlice.reducer;
