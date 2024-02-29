const Round8 = ({ teams }) => {
    const selectedTeams = teams.filter((team)=> team.round8!==0).sort((a,b)=>a.order8-b.order8)
    return (

        <ul>
            <p>8ème de finale</p>
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
                                            {console.log(pair[0].name)}
                                            <p>Order8: {pair[0].order8}</p>
                                            <p>Round8: {pair[0].round8}</p>
 {/* recup du 4ème match de MatchList = 8ème de finale */}
                                            {pair[0].matchList &&
                                                pair[0].matchList.length >=4 &&
                                                pair[0].matchList[3][0] === 8 && (
                                                    <p>
                                                        {
                                                            pair[0].matchList.find(
                                                                (array) =>
                                                                    array[0] ===
                                                                    8
                                                            )[3]
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                        {<div>⚽ </div>}
                                        <div>
                                            <p>
                                                {pair[1].name}({pair[1].group})
                                            </p>
                                            <p>Order8: {pair[1].order8}</p>
                                            <p>Round8: {pair[1].round8}</p>
 {/* recup du 4ème match de MatchList = 8ème de finale */}
                                            {pair[1].matchList &&
                                                pair[1].matchList.length >=4 &&
                                                pair[1].matchList[3][0] === 8 && (
                                                    <p>
                                                        {
                                                            pair[1].matchList.find(
                                                                (array) =>
                                                                    array[0] ===
                                                                    8
                                                            )[3]
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                </ul>
    )
}
export default Round8;