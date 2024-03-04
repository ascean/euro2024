import { PATH_SVG } from "../../config";

const TeamTournoi = ({ team, matchNumber, result }) => {

    return (
        <div className="team-tournoi">
            <div className="team-infos">
                <div className="team-img">
                    <img src={PATH_SVG + team.code + ".svg"} alt={team.code} />
                </div>
                <h3 className="team-name">{team.name}</h3>
                {result === "winner" && <span>🏆</span>}
            </div>
            <div className="team-points">{team.matchList[matchNumber][3]}</div>
        </div>
    );
};

export default TeamTournoi;
