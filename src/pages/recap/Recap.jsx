import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { gotoHome } from "../../utils/matchUtils";
import { allTeams } from "../../redux/teamSlice";
import TeamRecap from "../../components/team/TeamRecap";
import { updateStep } from "../../redux/stepSlice";

/**
 * Affiche un tableau des équipes, par groupe, avec Victoires, défaites, Nuls, Buts marqués, Buts encaissés, Différence de buts,Nombre de points
 * @returns
 */
const Recap = () => {
    const navigate = useNavigate();
    const teams = useSelector(allTeams);
    const dispatch = useDispatch();
    const step = useSelector((state) => state.steps.step);

    useEffect(() => {
        const shouldGoToHome = gotoHome(step, 7);
        if (!shouldGoToHome) {
            navigate("/");
        }
    }, [navigate, teams]);

    useEffect(() => {
        if (step === 6) dispatch(updateStep(7));
    }, []);

    return (
        <div>
            <h1 className="title">Recap scores </h1>
            <p className="legende no-mobile"></p>
            <div className="recap-container">
                {["A", "B", "C", "D", "E", "F"].map((group) => (
                    <div className="recap-group" key={"group" + group}>
                        <div className="recap-head">
                            <h2 className="no-mobile">Groupe {group}</h2>
                            <h2 className="mobile">Gr {group}</h2>
                            <div className="score">
                                <div className="no-mobile">Points</div>
                                <div className="mobile">Pts</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Matchs</div>
                                <div className="mobile">J</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Victoires</div>
                                <div className="mobile">G</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Nuls</div>
                                <div className="mobile">N</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Défaites</div>
                                <div className="mobile">P</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Buts marqués</div>
                                <div className="mobile">BP</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Buts encaissés</div>
                                <div className="mobile">BE</div>
                            </div>
                            <div className="score">
                                <div className="no-mobile">Différence de buts</div>
                                <div className="mobile">Diff</div>
                            </div>
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
