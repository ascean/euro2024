import { useSelector } from "react-redux";
import Team from "../team/Team";
import { selectedTeams } from "../../redux/teamSlice";

const Hat = (hat) => {
    const teamsWithHat = useSelector(selectedTeams);
    return (
        <>
            <h2>Chapeau {hat.hat}</h2>
            <ul className="list">
                {/* Filtrer les équipes par chapeau */}
                {teamsWithHat
                    .filter((team) => team.hat === hat.hat)
                    .map((team, index) => (
                        <li key={index}>
                            <Team team={team} />
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default Hat;
