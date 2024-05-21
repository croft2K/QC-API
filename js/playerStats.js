// Function to fetch player stats and redirect to a new page
function fetchAndDisplayPlayerStats(playerName) {
    
    fetch(`https://quake-stats.bethesda.net/api/v2/Player/Stats?name=${playerName}`)
        
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(playerStats => {
            console.log('Player Stats:', playerStats);  // Log the player stats
            document.getElementById('autocompleteInput').value ='';
            displayResults(playerStats);
            // Process the data and create HTML content
           // const htmlContent = generateHTML(data);

         
            
        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}



function displayResults(playerStats) {

    const name = playerStats.name;
    const elo = playerStats.playerRatings.duel.rating;
    const duelsPlayed = playerStats.playerRatings.duel.gamesCount;
    const deviation = playerStats.playerRatings.duel.deviation;
    

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

        const itemElement = document.createElement('div');
        itemElement.classList.add('result-item');

        const playerName = document.createElement('p');
        playerName.textContent = `${name}`; 

        const playerElo = document.createElement('p');
        playerElo.textContent = `Duel Rating ${elo}`;

        const playerDuelsPlayed = document.createElement('p');
        playerDuelsPlayed.textContent = `Duels Played ${duelsPlayed}`; 

        const playerDeviation = document.createElement('p');
        playerDeviation.textContent = `Deviation ${deviation}`; 

        itemElement.appendChild(playerName);
        itemElement.appendChild(playerElo);
        itemElement.appendChild(playerDuelsPlayed);
        itemElement.appendChild(playerDeviation);

        resultsContainer.appendChild(itemElement);
    } 


