// AllGroups.jsx

import { useDispatch, useSelector } from "react-redux";
import { updateTeamGroupAndOrder } from "../../redux/teamSlice";
import { allTeams } from "../../redux/teamSlice";
import Hat from "../../components/hat/Hat";
import { useEffect, useState } from "react";
import Group from "../../components/group/Group";

const AllGroups = () => {
    const dispatch = useDispatch();

    const teams = useSelector(allTeams);

    const handleGroup = () => {
        // Index de l'équipe dans chaque hat
        let teamIndex = 0;

        let order = 1; // Initialisation de l'ordre
        // Parcours des équipes
        teams.filter((team) => team.playoff == null)
            .sort((a, b) => a.hat - b.hat)
            .forEach((team) => {
                const { id } = team; // Récupération de l'id de l'équipe
                const group = String.fromCharCode(65 + teamIndex); // Calcul du groupe (A, B, C, etc.)
                dispatch(updateTeamGroupAndOrder({ id, group, order }));
                // Passage à l'équipe suivante dans le "hat"
                teamIndex = (teamIndex + 1) % 6;
                order++;
            });
    };

    useEffect(() => {
        // Appeler handleGroup une fois après le premier rendu
        handleGroup();
    }, []); // Dépendance vide pour exécuter une seule fois après le premier rendu

    return (
        <div>
            <p>Liste des équipes sélectionnées</p>
            <ul>
                {/* Générer une liste pour chaque chapeau */}
                <Group />
            </ul>
        </div>
    );
};
export default AllGroups;
