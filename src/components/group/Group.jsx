import { useSelector } from "react-redux";
import Team from "../team/Team";
import { allTeams } from "../../redux/teamSlice";

const Group = () => {
    const teams = useSelector(allTeams);

    const groupedTeams = teams
        .filter((team) => team.group !== null)
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
                <li key={group} className="wrapper-container">
                    <h2>Groupe {group}</h2>
                    <ul className="wrapper-teams group">
                        {groupedTeams[group]
                            .sort((a, b) => a.order - b.order)
                            .map((team) => (
                                <li key={team.id} className="wrapper-team">
                                    {" "}
                                    <Team team={team} order={null} />
                                </li>
                            ))}
                    </ul>
                </li>
            ))}
        </>
    );
};

export default Group;
