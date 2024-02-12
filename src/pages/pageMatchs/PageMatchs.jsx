import { useSelector } from "react-redux";
import { allTeams } from "../../redux/teamSlice";
import { Link } from "react-router-dom";
import Match from "../../components/match/Match";
import "./pagematchs.css"

const PageMatchs = () => {
    const teams = useSelector(allTeams);

    // Fonction pour générer les matchs pour une équipe spécifique
    function generateMatches(teams, teamId, allMatches) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id !== teamId) {
                // Vérifier si le match entre ces deux équipes a déjà été ajouté
                const existingMatch = allMatches.some((match) => {
                    return (
                        (match[0] === teamId && match[1] === teams[i].id) ||
                        (match[0] === teams[i].id && match[1] === teamId)
                    );
                });
                if (!existingMatch) {
                    allMatches.push([
                        teamId,
                        teams[i].id,
                        teams[i].name,
                    ]);
                }
            }
        }
    }

    // Fonction pour générer tous les matchs pour un groupe de 4 équipes
    function generateGroupMatches(groupTeams) {
        const allMatches = [];
        for (let i = 0; i < groupTeams.length; i++) {
            const teamId = groupTeams[i].id;
            generateMatches(groupTeams, teamId, allMatches);
        }
        return allMatches;
    }

    // Générer les matchs pour chaque groupe
    const groupMatches = {};
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach((group) => {
        const groupTeams = teams.filter((team) => team.group === group);
        groupMatches[group] = generateGroupMatches(groupTeams);
    });

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
