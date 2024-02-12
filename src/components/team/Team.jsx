import { PATH_SVG } from "../../config";

const Team = (team) => {
    return (
        <div>
            <img
                src={PATH_SVG + team.team.code + ".svg"}
                alt={team.team.code}
                width="30"
            />
            <p>{team.team.name}</p>
        </div>
    );
};

export default Team;
