import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import {  updateTeamHat } from "../../redux/teamSlice";
import {  allTeams } from "../../redux/teamSlice";
import { useState } from "react";
import Team from "../../components/team/Team";
import Hat from "../../components/hat/Hat";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams)
    console.log(teams);
    const teamsPlayOff = teams.filter((team) => team.playoff !== null)
    console.log(teamsPlayOff);
    // const teamsWithHat = useSelector(selectedTeams);
    // const teamsPlayOff = useSelector(selectTeamsPlayOff);
    const [showPlayoff, setShowPlayoff] = useState(true);

    // Obtenir les chapeaux uniques présents dans les équipes
    const uniqueHats = [1, 2, 3, 4];

    /**
     * Tirage au sort parmi les playoff pour trouver les équipes qui complètent le chapeau 4
     */
    const handleClick = () => {
        const selectRandomTeams = (teamsPlayOff) => {
            const randomIndices = [];
            while (randomIndices.length < 3 && teamsPlayOff.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * teamsPlayOff.length
                );
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }
            return randomIndices.map((index) => teamsPlayOff[index].id);
        };

        const selectedTeamIds = selectRandomTeams(teamsPlayOff);
        for (let i = 0; i < selectedTeamIds.length; i++) {
            const selectedTeamId = selectedTeamIds[i];
            dispatch(updateTeamHat(selectedTeamId));
        }
        setShowPlayoff(false);
        
    };
    const teams2 = useSelector(allTeams);
    console.log(teams2);

    // const handleGroup = () => {
    //     const teamsCopy = [...teamsWithHat]; // Copie des équipes
    //     const groups = { A: [], B: [], C: [], D: [], E: [], F: [] }; // Initialisation des groupes

    //     let teamIndex = 0; // Index de l'équipe dans chaque "hat"

    //     // Parcours des équipes
    //     teamsCopy
    //         .sort((a, b) => a.hat - b.hat)
    //         .forEach((team) => {
    //             const { hat } = team; // Récupération du "hat" de l'équipe
    //             const group = String.fromCharCode(65 + teamIndex); // Calcul du groupe (A, B, C, etc.)
    //             groups[group].push(team); // Ajout de l'équipe au groupe correspondant

    //             // Passage à l'équipe suivante dans le "hat"
    //             teamIndex = (teamIndex + 1) % 6;
    //         });

    //     // Dispatch de l'action pour ajouter les équipes dans chaque groupe
    //     let order = 1; // Initialisation de l'ordre
    //     Object.entries(groups).forEach(([group, teams]) => {
    //         teams.forEach((team) => {
    //             // console.log(team);
    //             console.log(group);
    //             // console.log(order);
    //             dispatch(updateTeamGroupAndOrder({ team: team, group: group, order }));

    //             order ==4 ? order = 1 : order++; // Incrémentation de l'ordre pour la prochaine équipe
    //         });
    //     });
    // };

    return (
        <div>
            <button onClick={handleClick}>Tirage au sort</button>
            <Link to="/groupes">Groupes</Link>
            <div>
                <p>Liste des équipes sélectionnées</p>
                <ul>
                    {/* Générer une liste pour chaque chapeau */}
                    {uniqueHats.map((hat) => (
                        <li key={"chapeau" + hat}>
                            <Hat hat={hat} />
                        </li>
                    ))}
                </ul>
            </div>
            {showPlayoff && (
                <div>
                    <p>Liste des équipes en ballotage</p>
                    {/* Générer une liste pour chaque chapeau */}
                    <ul className="list">
                        {/* Filtrer les équipes par chapeau */}
                        {teamsPlayOff.map((team, index) => (
                            <li key={index}>
                                <Team team={team} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
