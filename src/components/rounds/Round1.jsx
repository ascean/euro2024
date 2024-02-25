const Round1 = ({ teams }) => {
    const selectedTeams = teams
        .filter((team) => team.round1 !== 0)
        .sort((a, b) => a.order1 - b.order1);
    return (
        <ul>
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
                                    <p>Order1: {pair[0].order1}</p>
                                    <p>Round1: {pair[0].round1}</p>
                                    {pair[0].matchList &&
                                        pair[0].matchList.length > 0 &&
                                        pair[0].matchList[
                                            pair[0].matchList.length - 2
                                        ][0] === 8 && (
                                            <p>
                                                {
                                                    pair[0].matchList.find(
                                                        (array) =>
                                                            array[0] === 8
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
                                    <p>Order1: {pair[1].order1}</p>
                                    <p>Round1: {pair[1].round1}</p>
                                    {pair[1].matchList &&
                                        pair[1].matchList.length > 0 &&
                                        pair[1].matchList[
                                            pair[1].matchList.length - 1
                                        ][0] === 8 && (
                                            <p>
                                                {
                                                    pair[1].matchList.find(
                                                        (array) =>
                                                            array[0] === 8
                                                    )[3]
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
export default Round1;
