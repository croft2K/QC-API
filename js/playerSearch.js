document.getElementById('autocompleteInput').addEventListener('input', function() {
    let input = this.value;
    let autocompleteList = document.getElementById('autocomplete-list');
    
    // Clear any existing suggestions
    autocompleteList.innerHTML = '';

    if (!input) return false;

    // Fetch data from the API
    fetch(`https://quake-stats.bethesda.net/api/v2/Player/Search?term=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);  // Log the received data

            // Check if the data array has player objects
            if (data && Array.isArray(data) && data.length > 0) {
                data.forEach(player => {
                    console.log('Player:', player);  // Log each player
                    
                    // Check if the player object has the name property
                    if (player && player.entityName) {
                        let suggestionItem = document.createElement('div');
                        suggestionItem.innerHTML = player.entityName;

                        // Add click event listener to fill the input box and fetch stats
                        suggestionItem.addEventListener('click', function() {
                            document.getElementById('autocompleteInput').value = this.innerHTML;
                            autocompleteList.innerHTML = '';
                            fetchAndDisplayPlayerStats(this.innerHTML);
                        });

                        // Handle Enter key press to fetch player stats
                        document.getElementById('autocompleteInput').addEventListener('keydown', function(event) {
                            if (event.key === 'Enter') {
                                let playerName = this.value;
                                if (playerName) {
                                    fetchAndDisplayPlayerStats(playerName);
                                }
                            }
                        });

                        autocompleteList.appendChild(suggestionItem);
                    } else {
                        console.error('Player object does not have a name property:', player);
                    }
                });
            } else {
                console.error('Data format is not as expected or empty array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Close the autocomplete list when clicking outside of it
document.addEventListener('click', function(e) {
    let autocompleteList = document.getElementById('autocomplete-list');
    if (e.target !== document.getElementById('autocompleteInput')) {
        autocompleteList.innerHTML = '';
    }
});
