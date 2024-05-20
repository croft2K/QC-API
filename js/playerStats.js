// Function to fetch player stats
function fetchPlayerStats(playerName) {
    fetch(`https://quake-stats.bethesda.net/api/v2/Player/Stats?name=${playerName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Player Stats:', data);  // Log the player stats
            // Handle the player stats data as needed
        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}

// Handle Enter key press to fetch player stats
document.getElementById('autocompleteInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let playerName = this.value;
        if (playerName) {
            fetchPlayerStats(playerName);
        }
    }
});
