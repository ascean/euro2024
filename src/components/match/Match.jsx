import {  useSelector } from "react-redux";
import {  allTeams } from "../../redux/teamSlice";
import Team from "../team/Team";

// Composant Match pour représenter un match entre deux équipes
const Match = ({ team1, team2, nbPts1, nbPts2 }) => {
    const teams = useSelector(allTeams);
    const infosTeam1 = teams.find((t) => t.id === team1);
    const infosTeam2 = teams.find((t) => t.id === team2);
    return (
        <div>
            <div className="match">

                <Team team={infosTeam1} order={null} />
                <span>
                    {" "}
                    {nbPts1}⚽ {nbPts2}
                </span>
                <Team team={infosTeam2} order={null} />
            </div>
        </div>
    );
};

export default Match;
