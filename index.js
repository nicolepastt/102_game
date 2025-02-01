/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';


// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

//MY CODE FOR NAVIGATION BAR
// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const gamesMenu = document.querySelector('#games-page');
  let scrollPos = window.scrollY;


  if (scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (scrollPos < 1600) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    gamesMenu.classList.remove('highlight');
    return;
  } else if (scrollPos < 2345) {
    gamesMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//SEARCHING MY CODE
function search_game() {
    let query = document.getElementById("searchInput").value.trim().toLowerCase();
    let searchGames = GAMES_JSON.find(game => game.name.toLowerCase().includes(query)); 
    if (searchGames) {
        // Create a pop-up with the game's details
        alert(`
        🎮 Game: ${searchGames.name}
        🏆 Description: ${searchGames.description}
        🎮 Backers: ${searchGames.backers}
        `);
    } else {
        alert(`No game found "${query}". Please try again!`);
    }
}

// Event Listener
document.querySelector(".search-button").addEventListener("click", search_game);

document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search_game(); 
    }
});

///////

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    //adding for LOOP
    for (let i = 0; i< games.length; i++){
        const game = games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        //inner html because we need to layout the structure, can't put 1 game one by one
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img" /> 
        <h3>${game.name}</h3> 
        <p>${game.description}</p> 
        
         <p class = "label">Backers: ${game.backers.toLocaleString()}</p> `; 


         gamesContainer.appendChild(gameCard);


    }

}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions"); //num-contri are in html file already

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0)
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;// money dollar sign 



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGame = GAMES_JSON.length;
gamesCard.innerHTML = totalGame.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const failedGames = GAMES_JSON.filter(game=> game.pledged < game.goal); //less than goal, the < represents that


    // use the function we previously created to add the unfunded games to the DOM
    //secret key
    console.log("Unfunded games- ", failedGames);
    addGamesToPage(failedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const addunfunGame = GAMES_JSON.filter(game=> game.pledged >= game.goal);


    // use the function we previously created to add unfunded games to the DOM

    console.log("Funded Games:", addunfunGame);
    addGamesToPage(addunfunGame);


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
//given to use addgamestopage
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section - given
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
//copying over from earlier

const totalDisplay = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);


const totalGames = GAMES_JSON.length;

const unfundCt= GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const companyMsg = `
A total of $${totalDisplay.toLocaleString()} has been raised for ${totalGames} games. 
Currently, ${unfundCt} game${unfundCt === 1 ? '' : 's'} remain unfunded.
We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
//create new paragraph
//adding element description Container like earleir process
console.log("Company message: ", companyMsg);
const paragraph = document.createElement("p"); 

paragraph.innerHTML = companyMsg;
 // Append  description container 
 descriptionContainer.appendChild(paragraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
//given
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
//first element is most funded given

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
// use destructuring and the spread operator to grab the first and second games
const [bigGame, runnerUp] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const bigGameElement = document.createElement("p"); 

bigGameElement.innerHTML = `🏆 ${bigGame.name}`; 
firstGameContainer.appendChild(bigGameElement); 

// do the same for the runner up item
const runnerUpElement = document.createElement("p"); 
runnerUpElement.innerHTML = `🥈 ${runnerUp.name}`; 
secondGameContainer.appendChild(runnerUpElement);

