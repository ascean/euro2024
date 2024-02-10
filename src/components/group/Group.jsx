// Group.jsx

import { useSelector } from "react-redux";
import Team from "../team/Team";
import { allTeams } from "../../redux/teamSlice";

const Group = () => {
    const teams = useSelector(allTeams);

    const groupedTeams = teams
        .filter(team => team.group!==null)
        .reduce((acc, team) => {
        if (!acc[team.group]) {
            acc[team.group] = [];
        }
        acc[team.group].push(team);
        return acc;
    }, {});

    return (
        <>
            {Object.keys(groupedTeams).map((group) => (
                <div key={group}>
                    <h2>Groupe {group}</h2>
                    <ul>
                        {groupedTeams[group].map((team) => (
                            <li key={team.id}> <Team team={team} /></li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default Group;
