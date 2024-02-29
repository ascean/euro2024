const Round4 = ({ teams }) => {
    const selectedTeams = teams
        .filter((team) => team.round4 !== 0)
        .sort((a, b) => a.order4 - b.order4);
    console.log(selectedTeams);
    return (
        <ul>
            <p>Quart de finale</p>
            {selectedTeams &&
                selectedTeams
                    .reduce((pairs, team, index) => {
                        if (index % 2 === 0) {
                            pairs.push(selectedTeams.slice(index, index + 2));
                        }
                        return pairs;
                    }, [])
                    .map((pair, index) => (
                        <li key={"pair_" + index}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <p>
                                        {pair[0].name}({pair[0].group})
                                    </p>
                                    <p>Order4: {pair[0].order4}</p>
                                    <p>Round4: {pair[0].round4}</p>
                                    {/* recup du 5ème match de MatchList = quart de finale */}
                                    {pair[0].matchList &&
                                        pair[0].matchList.length >=5 &&
                                        pair[0].matchList[4][0] === 4 && (
                                            <p>
                                                {
                                                    pair[0].matchList[4][3]
                                                }
                                            </p>
                                        )}
                                </div>
                                {<div>⚽ </div>}
                                <div>
                                    <p>
                                        {pair[1].name}({pair[1].group})
                                    </p>
                                    <p>Order4: {pair[1].order4}</p>
                                    <p>Round4: {pair[1].round4}</p>
                                    {/* recup du 5ème match de MatchList = quart de finale */}
                                    {pair[1].matchList &&
                                        pair[1].matchList.length >=5 &&
                                        pair[1].matchList[4][0] === 4 && (
                                            <p>
                                                {
                                                pair[1].matchList[4][3]
                                                }
                                            </p>
                                        )}
                                </div>
                            </div>
                        </li>
                    ))}
        </ul>
    );
};
export default Round4;
