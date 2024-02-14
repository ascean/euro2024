import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams } from "../../redux/teamSlice";
import Team from "../../components/team/Team";
import "./pageclassement.css"

const PageClassement = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [groups, setGroups] = useState({
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
    });

    const updateGroups = {
        A: teams
            .filter((team) => team.group === "A")
            .sort((a, b) => b.nbPts - a.nbPts),
        B: teams
            .filter((team) => team.group === "B")
            .sort((a, b) => b.nbPts - a.nbPts),
        C: teams
            .filter((team) => team.group === "C")
            .sort((a, b) => b.nbPts - a.nbPts),
        D: teams
            .filter((team) => team.group === "D")
            .sort((a, b) => b.nbPts - a.nbPts),
        E: teams
            .filter((team) => team.group === "E")
            .sort((a, b) => b.nbPts - a.nbPts),
        F: teams
            .filter((team) => team.group === "F")
            .sort((a, b) => b.nbPts - a.nbPts),
    };

    useEffect(() => {
        setGroups(updateGroups);
    }, []);

    return (
        <div>
            {Object.keys(groups).map((group) => (
                <div key={group}>
                    <h3>Groupe {group}</h3>
                    <ul className="list">
                        {groups[group].map((team, index) => (
                            <li key={index} className={index <= 1 ? "qualifie" : "elimine"}>
                                <Team team={team} order={index + 1} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default PageClassement;
