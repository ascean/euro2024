import { useSelector } from "react-redux";
import Team from "../team/Team";
import { allTeams } from "../../redux/teamSlice";

const Hat = (hat) => {
    const selectedTeams = useSelector(allTeams)
    return (
        <>
            <h2>Chapeau {hat.hat}</h2>
            <ul className="list">
                {/* Filtrer les équipes par chapeau */}
                {selectedTeams
                    .filter((team) => team.hat === hat.hat & team.playoff===null)
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
