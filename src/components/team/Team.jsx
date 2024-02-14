import { PATH_SVG } from "../../config";

const Team = ({team, order}) => {
    return (
        <div>
            <img
                src={PATH_SVG + team.code + ".svg"}
                alt={team.code}
                width="30"
            />
            <p>{team.name}</p>
            <p>{team.nbPts} points</p>
            <p>{order}</p>
            {order<3 ? <p>Qualifié</p> : <p>Eliminé</p>}
        </div>
    );
};

export default Team;
