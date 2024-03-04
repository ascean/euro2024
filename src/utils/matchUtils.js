// On renvoie un nombre aléatoire entre une valeur min (incluse) et une valeur max (exclue)
const getRandomArbitrary = (min = 0, max = 5) => {
    return Math.trunc(Math.random() * (max - min) + min);
};

/**
 * Génération la liste dess matchs pour chaque groupe
 * Appelle generateMatches
 * @param {*} groupTeams Tableau d'objets correspondant à un groupe d'équipe : 1 objet = 1 équipe
 * @returns tableau de tableaux de match [id équipe, id adversaire, nbbuts équipe, nbbuts adversaire]
 */
export function generateGroupMatches(groupTeams) {
    const allMatches = [];
    //pour chaque équipe du groupe, lance la génération des matchs
    for (let i = 0; i < groupTeams.length; i++) {
        const teamId = groupTeams[i].id;
        generateMatches(groupTeams, teamId, allMatches);
    }
    return allMatches;
}

/**
 * génère une liste des matchs pour une équipe spécifique en vérifiant si un match entre cette équipe
 * et les autres équipes du groupe a déjà été ajouté, et si ce n'est pas le cas, elle l'ajoute à la liste des matchs.
 * @param {*} teams ensemble des 4 équipes d'un groupe
 * @param {*} teamId équipe dont on veut générer les maths
 * @param {*} allMatches ensemble des 6 matchs générés pour chaque groupe
 * On ajoute les maths au fur et à mesure
 * chaque match est un array[id équipe, id adversaire, nbbuts équipe, nbbuts adversaire]
 */
export function generateMatches(teams, teamId, allMatches) {
    for (let i = 0; i < teams.length; i++) {
        //vérifie si l'équipe actuelle n'est pas la même que l'équipe passée en paramètre.
        if (teams[i].id !== teamId) {
            // Vérifier si le match entre l'équipe teamId et l'équipe adverse a déjà été ajouté dans allMatches
            const existingMatch = allMatches.some((match) => {
                return (
                    (match[1] === teamId && match[2] === teams[i].id) ||
                    (match[1] === teams[i].id && match[2] === teamId)
                );
            });
            //Si aucun match n'existe entre les deux équipes, nous ajoutons ce match à allMatches
            if (!existingMatch) {
                allMatches.push([
                    1,
                    teamId,
                    teams[i].id,
                    getRandomArbitrary(),
                    getRandomArbitrary(),
                ]);
            }
        }
    }
}

export function playGame(step, team1, team2) {
    if (step && team1 && team2) {
        let score1 = 0;
        let score2 = 0;
        while (score1 === score2) {
            score1 = getRandomArbitrary();
            score2 = getRandomArbitrary();
        }
        const game = [step, team1.id, team2.id, score1, score2];
        return game;
    }
}

export function gotoHome(teams) {
    // Redirection vers la page Home si le nombre d'équipes en play-off est égal à 12
    const teamsPlayOff = teams.filter((team) => team.playoff !== null);
    return teamsPlayOff.length === 12 ? false : true;
}
