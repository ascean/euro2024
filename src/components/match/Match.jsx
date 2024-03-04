import { useSelector } from "react-redux";
import { allTeams } from "../../redux/teamSlice";
import Team from "../team/Team";

// Composant Match pour représenter un match entre deux équipes
const Match = ({ team1, team2, nbPts1, nbPts2 }) => {
    const teams = useSelector(allTeams);
    const infosTeam1 = teams.find((t) => t.id === team1);
    const infosTeam2 = teams.find((t) => t.id === team2);
    return (
        <div className="match">
            <Team team={infosTeam1} order={null} />
            <div className="ballon">
                <div>{nbPts1}</div>
                <div>⚽</div>
                <div>{nbPts2}</div>
            </div>
            <Team team={infosTeam2} order={null} />
        </div>
    );
};

export default Match;
