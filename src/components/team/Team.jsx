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
            <p>{team.team.group}</p>
            <p>{team.team.order}</p>
        </div>
    );
};

export default Team;
