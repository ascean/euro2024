import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { gotoHome } from "../../utils/matchUtils";
import { allTeams } from "../../redux/teamSlice";
import TeamRecap from "../../components/team/TeamRecap";

const Recap = () => {
    const navigate = useNavigate();
    const teams = useSelector(allTeams);

    useEffect(() => {
        const shouldGoToHome = gotoHome(teams);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);
    return (
        <div>
            <h1 className="title">Recap scores</h1>
            <div className="recap-container">
                {["A", "B", "C", "D", "E", "F"].map((group) => (
                    <div className="recap-group" key={"group" + group}>
                        <div className="recap-head">
                            <h2>Groupe {group}</h2>
                            <div className="score">Nombre de matchs</div>
                            <div className="score">Victoires</div>
                            <div className="score">Défaites</div>
                            <div className="score">Nuls</div>
                            <div className="score">Buts marqués</div>
                            <div className="score">Buts encaissés</div>
                            <div className="score">Différence de buts</div>
                            <div className="score">Nombre de points</div>
                        </div>
                        <div className="recap-rows">
                            {teams
                                .filter((team) => team.group === group)
                                .map((team) => (
                                    <div key={team.name}>
                                        <TeamRecap team={team} order={null} />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recap;
