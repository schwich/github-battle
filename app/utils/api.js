const id = "YOUR_CLIENT_ID";
const secret = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret${secret}`;

async function getProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`); // todo add ${params} at the end if I need to add API key
    return response.json();
}

async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    return response.json();
}

function getStarCount(repos) {
    return repos.reduce((count, repo) => { // don't NEED an arrow function here
        return count + repo.stargazers_count; // could destructure stargazers_count, and use implicit return
    }, 0);
}

function calculateScore(profile, repos) {
    let followers = profile.followers; // don't need let here either; since its a function, var with function scope is fine
    let totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}


async function getUserData(player) {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ]);
    return {
        profile,
        score: calculateScore(profile, repos)
    }
}

function sortPlayers(players) {
    return players.sort((a, b) => {
        return b.score - a.score
    });
}


export async function battle(players) {
    try {
        const results = await Promise.all(players.map(getUserData));
    }
    catch (error) {
        handleError(error);
    }

    return results === null
        ? results
        : sortPlayers(results);
}

export async function fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1000+language:${language}&sort=stars&order=desc&type=Repositories`);
    try {
        const response = await fetch(encodedURI);
        const repos = await response.json();
    }
    catch (error) {
        handleError(error);
    }

    return repos.items;
}
