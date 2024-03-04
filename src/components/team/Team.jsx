import { PATH_SVG } from "../../config";

const Team = ({ team, order }) => {
    return (
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
    );
};

export default Team;
