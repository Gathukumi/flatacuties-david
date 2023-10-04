// Your code here
const characterBar = document.getElementById('character-bar');
const characterName = document.getElementById('name');
const characterImg = document.getElementById('image');
const voteCount = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const resetButton = document.getElementById('reset-btn'); // Add this line to select the reset button
// Update char info
const getIndividualCharacter = (charItem) => {
  characterName.textContent = charItem.name;
  characterImg.src = charItem.image;
  characterImg.alt = charItem.name;
  voteCount.textContent = charItem.votes;
};
// Fetch 
fetch('http://localhost:4000/characters')
  .then((response) => response.json())
  .then((data) => {
    getIndividualCharacter(data[0]); // Display the first character by default

    // Loop 
    data.forEach((charItem) => {
      const charName = document.createElement('span');
      charName.textContent = charItem.name;
      charName.className = 'character-name';

      // Add a click event listener 
      charName.addEventListener('click', () => {
        getIndividualCharacter(charItem);
      });

      characterBar.appendChild(charName);
    });
  });
// Add a submit event listener to the votes form
votesForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const votesInput = document.getElementById('votes');
  const votes = parseInt(votesInput.value, 10);

  if (!isNaN(votes)) {
    // Update the vote count in the character details
    const currentVotes = parseInt(voteCount.textContent, 10);
    voteCount.textContent = currentVotes + votes;
    // Clear the votes input field
    votesInput.value = '';
  }
});
// Add a click event listener to the reset button
resetButton.addEventListener('click', () => {
  // Reset the vote count to zero
  voteCount.textContent = '0';
});