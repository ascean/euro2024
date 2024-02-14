import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTeams } from "../../redux/teamSlice";
import Team from "../../components/team/Team";
import "./pageeliminatoire.css";

const PageEliminatoire = () => {
    const dispatch = useDispatch();
    const teams = useSelector(allTeams);
    const [bestTeams, setBestTeams] = useState([]);

    const getBestTeams = () => {
        const twoBestTeams = {};
        ["A", "B", "C", "D", "E", "F"].flatMap((group) => {
            twoBestTeams[group] = teams
                .filter((team) => team.group === group)
                .sort((a, b) => b.nbPts - a.nbPts)
                .slice(0, 2);
        })
        
        return Object.values(twoBestTeams).flat();
    };

    const shakeArray = (tab) => {
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
            return tab;
        
    }

    useEffect(() => {
        const orderedTeams = getBestTeams()
        
        setBestTeams(shakeArray(orderedTeams));
    }, []);

    return (
        <div >
            <button>Jouer</button>
            {bestTeams.map((team) => (
                <p key={team.id} className="best-team">{team.name}{" "}{team.group }</p>
            ))}
        </div>
    );
};
export default PageEliminatoire;
