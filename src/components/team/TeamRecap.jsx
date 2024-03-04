import { PATH_SVG } from "../../config";

const TeamRecap = ({ team, order }) => {
    return (
        <div className="recap-row">
            <div className="team">
                <div className="team-infos">
                    <div className="team-img">
                        <img
                            src={PATH_SVG + team.code + ".svg"}
                            alt={team.code}
                            width="30"
                        />
                    </div>
                    <h3 className="team-name">{team.name}</h3>
                </div>
            </div>
            <div className="score">{team.nbMatchs}</div>
            <div className="score">{team.nbWin}</div>
            <div className="score">{team.nbLost}</div>
            <div className="score">{team.nbNuls}</div>
            <div className="score">{team.nbGoalsPlus}</div>
            <div className="score">{team.nbGoalsMinus}</div>
            <div className="score">{team.diffGoals}</div>
            <div className="score">{team.nbPts}</div>
        </div>
    );
};

export default TeamRecap;
