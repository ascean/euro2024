import { useDispatch, useSelector } from "react-redux";
import { addMatchId, allTeams } from "../../redux/teamSlice";
import { useNavigate } from "react-router-dom";
import Match from "../../components/match/Match";
import "./pagematchs.css";
import { useEffect, useState } from "react";

const PageMatchs = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const teamsPlayOff = teams.filter((team) => team.playoff !== null);
    const navigate = useNavigate();
    const [groupMatches, setGroupMatches] = useState({});

    useEffect(() => {
        // Redirection vers la page des barrages si le nombre d'équipes en play-off est égal à 12
        if (teamsPlayOff.length === 12) {
            navigate("/barrages");
        }
    }, []);

    // On renvoie un nombre aléatoire entre une valeur min (incluse) et une valeur max (exclue)
    const getRandomArbitrary = (min = 0, max = 5) => {
        return Math.trunc(Math.random() * (max - min) + min);
    };

    //déclenché au premier rendu de la composante. 
    //Génération des matchs pour chaque groupe : generateGroupMatches()
    //Mise à jour des points dans le store Redux en fonction de ces matchs updatePoints()
    useEffect(() => {
        
        /**
         * Génération la liste dess matchs pour chaque groupe
         * Appelle generateMatches
         * @param {*} groupTeams Tableau d'objets correspondant à un groupe d'équipe : 1 objet = 1 équipe
         * @returns tableau de tableaux de match [id équipe, id adversaire, nbbuts équipe, nbbuts adversaire]
         */
                function generateGroupMatches(groupTeams) {
                    const allMatches = [];
                    //pour chaque équipe du groupe, lance la génération des matchs
                    for (let i = 0; i < groupTeams.length; i++) {
                        const teamId = groupTeams[i].id;
                        generateMatches(groupTeams, teamId, allMatches);
                    }
                    return allMatches;
                }
        

        /**
         * génère une liste des matchs pour une équipe spécifique en vérifiant si un match entre cette équipe 
         * et les autres équipes du groupe a déjà été ajouté, et si ce n'est pas le cas, elle l'ajoute à la liste des matchs.
         * @param {*} teams ensemble des 4 équipes d'un groupe
         * @param {*} teamId équipe dont on veut générer les maths
         * @param {*} allMatches ensemble des 6 matchs générés pour chaque groupe
         * On ajoute les maths au fur et à mesure
         * chaque match est un array[id équipe, id adversaire, nbbuts équipe, nbbuts adversaire]
         */
        function generateMatches(teams, teamId, allMatches) {
            for (let i = 0; i < teams.length; i++) {
                //vérifie si l'équipe actuelle n'est pas la même que l'équipe passée en paramètre.
                if (teams[i].id !== teamId) {
                    // Vérifier si le match entre l'équipe teamId et l'équipe adverse a déjà été ajouté dans allMatches
                    const existingMatch = allMatches.some((match) => {
                        return (
                            (match[0] === teamId && match[1] === teams[i].id) ||
                            (match[0] === teams[i].id && match[1] === teamId)
                        );
                    });
                    //Si aucun match n'existe entre les deux équipes, nous ajoutons ce match à allMatches
                    if (!existingMatch) {
                        allMatches.push([
                            teamId,
                            teams[i].id,
                            getRandomArbitrary(),
                            getRandomArbitrary(),
                        ]);
                    }
                }
            }
        }


        // Générer les matchs pour chaque groupe
        const updatedGroupMatches = {};
        ["A", "B", "C", "D", "E", "F"].forEach((group) => {
            const groupTeams = teams.filter((team) => team.group === group);
            updatedGroupMatches[group] = generateGroupMatches(groupTeams);
        });

        
        /**
         * Mise à jour des points dans le store
         * @param {*} allMatches Ensemble de tous les matchs de tous les groupes
        */
        const updatePoints = (allMatches) => {
            allMatches.forEach((match) => {
                dispatch(
                    addMatchId({
                        team1: match[0],
                        team2: match[1],
                        nbPts1: match[2],
                        nbPts2: match[3],
                    })
                );
            });
        };
        
        // Mise à jour de groupMatches avec les nouvelles valeurs pour rendu avec les valeurs mises à jour
        setGroupMatches(updatedGroupMatches);

        //mise à jour des points
        updatePoints(Object.values(updatedGroupMatches).flat());

    }, []);

    return (
        <div>
            <p>Liste des matchs</p>
            <ul>
                <div className="all-groups">
                    {Object.keys(groupMatches).map((group) => (
                        <div key={group} className="group-matches">
                            <h2>Groupe {group}</h2>
                            {groupMatches[group].map((match, index) => (
                                <Match
                                    key={index}
                                    team1={match[0]}
                                    team2={match[1]}
                                    nbPts1={match[2]}
                                    nbPts2={match[3]}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default PageMatchs;
