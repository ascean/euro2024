import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
    name: "steps",
    // Ajout des valeurs par défaut
    initialState: {step:0},
    reducers: {
        // Réinitialiser le state des équipes
        initStateStep (state) {
            state.step = 0;
        },
        updateStep : (state, action)=> {
            // Incrémente la valeur de "step" dans l'état
            state.step = action.payload;
        },
    }
})

export const {updateStep, initStateStep} = stepSlice.actions
export default stepSlice.reducer;