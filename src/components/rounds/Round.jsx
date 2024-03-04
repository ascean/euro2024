import TeamTournoi from "../team/TeamTournoi";

const Round = ({ teams, round }) => {
    const selectedTeams = teams
        .filter((team) => team[`round${round}`] !== 0)
        .sort((a, b) => a[`order${round}`] - b[`order${round}`]);

    let matchNumber
    if (round === 8) matchNumber = 3;
    if (round === 4) matchNumber = 4;
    if (round === 2) matchNumber = 5;
    if (round === 1) matchNumber = 6;

    const corresp = [
        [8, 0],
        [4, 1],
        [2, 2],
        [1, 3],
    ];
    const listTitle = [
        "Huitième de finale",
        "Quart de finale",
        "Demi-finale",
        "Finale",
    ];
    // Recherche du numéro passé en paramètre dans la première colonne de corresp
    const index = corresp.findIndex(([num]) => num === round);

    // Récupération de l'élément de roundTitle correspondant à la valeur de la deuxième colonne de corresp
    const roundTitle = index !== -1 ? listTitle[corresp[index][1]] : null;

    return (
        <div className="tournoi-column">
            <ul className="round">
            <h2>{roundTitle}</h2>
                {selectedTeams &&
                    selectedTeams
                        .reduce((pairs, team, index) => {
                            if (index % 2 === 0) {
                                pairs.push(
                                    selectedTeams.slice(index, index + 2)
                                );
                            }
                            return pairs;
                        }, [])
                        .map((pair, index) => (
                            <li
                                key={"pair_" + index}
                                className="match-container"
                            >
                                <TeamTournoi
                                    team={pair[0]}
                                    matchNumber={matchNumber}
                                    result={
                                        pair[0].matchList[matchNumber][3] >
                                        pair[0].matchList[matchNumber][4]
                                            ? "winner"
                                            : "loser"
                                    }
                                />
                                <TeamTournoi
                                    team={pair[1]}
                                    matchNumber={matchNumber}
                                    result={
                                        pair[1].matchList[matchNumber][3] >
                                        pair[1].matchList[matchNumber][4]
                                            ? "winner"
                                            : "loser"
                                    }
                                />
                            </li>
                        ))}
            </ul>
        </div>
    );
};
export default Round;
