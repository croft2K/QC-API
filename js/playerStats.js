// Function to fetch player stats and redirect to a new page
function fetchAndDisplayPlayerStats(playerName) {
    fetch(`https://quake-stats.bethesda.net/api/v2/Player/Stats?name=${playerName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Player Stats:', data);  // Log the player stats

            // Process the data and create HTML content
            const htmlContent = generateHTML(data);

            // Redirect to a new page with the HTML content
            redirectToNewPage(htmlContent);
        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}

// Function to generate HTML content based on player stats data
function generateHTML(playerStatsData) {
    // Extract relevant information from player stats data and generate HTML content
    const playerName = playerStatsData.name;
    const duelRating = playerStatsData.playerRatings.duel.rating;
    const deaths = playerStatsData.deaths;
    const htmlContent = `
        <h1>Player Stats</h1>
        <h2>Name: ${playerName}</h2>
        <p>Duel Rating: ${duelRating}</p>
        <p>Deaths: ${deaths}</p>
        <!-- Add more HTML content here as needed -->
    `;
    return htmlContent;
}

// Function to redirect to a new page with HTML content
function redirectToNewPage(htmlContent) {
    // Create a new Blob containing the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a URL object from the Blob
    const url = URL.createObjectURL(blob);

    // Redirect to the new page
    window.location.href = url;
}

// Handle Enter key press to fetch player stats
document.getElementById('autocompleteInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let playerName = this.value;
        if (playerName) {
            fetchAndDisplayPlayerStats(playerName);
        }
    }
});

