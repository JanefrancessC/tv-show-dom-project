//You can edit ALL of the code here
let allEpisodes; //= getAllEpisodes();
let allShows; //= getAllShows();
const rootElem = document.getElementById("root");
rootElem.setAttribute("class", "root");
let containerEl = document.getElementById("container");

// all shows

const loadShowList = (showID) => {
  const urlShows = `https://api.tvmaze.com/shows/${showID}/episodes`;
  fetch(urlShows)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((episodeList) => {
      allEpisodes = episodeList;

      makePageForEpisodes(allEpisodes);
    });
};

function displayAllShows(showList) {
  showList.forEach((show) => {
    let showContainer = document.createElement("section");
    showContainer.className = "show-container";
    containerEl.appendChild(showContainer);

    // showname
    const showName = document.createElement("h3");
    showName.className = "show-name";
    showName.innerText = `${show.name}`;
    // console.log(showName);
    showContainer.appendChild(showName);

    // populating the select show
    let optionShow = document.createElement("option");
    optionShow.innerHTML = `${show.name}`;
    selectShowEl.appendChild(optionShow);

    // show thumbnails
    const showImage = document.createElement("img");
    if (show.image) showImage.src = `${show.image.medium}`;
    else showImage.src = "image.png";
    showContainer.appendChild(showImage);

    //show genre
    const showGenre = document.createElement("p");
    showGenre.innerHTML = `<strong>Genre(s):</strong> ${show.genres}`;
    showContainer.appendChild(showGenre);

    //show rating
    const showRating = document.createElement("p");
    showRating.innerHTML = `<strong>Ratings:</strong> ${show.rating.average}`;
    showContainer.appendChild(showRating);

    //show status
    const showStatus = document.createElement("p");
    showStatus.innerHTML = `<strong>Status:</strong>${show.status}`;
    showContainer.appendChild(showStatus);

    //show runtiome
    const showRuntime = document.createElement("p");
    showRuntime.innerHTML = `<strong>Runtime:</strong>${show.runtime}`;
    showContainer.appendChild(showRuntime);

    //show summary

    const showSummary = document.createElement("p");
    showSummary.innerHTML = `${show.summary}`;
    showContainer.appendChild(showSummary);
  });
}

let showUrl;

let selectShowEl = document.getElementById("select-show");
selectShowEl.addEventListener("change", (e) => {
  let selectedTerm = e.target.value;
  console.log(selectedTerm);
  let showID;
  loadShowList(selectedTerm);
  let selectedShow = allShows.filter((show) => show.name === selectedTerm);
  // selectedShow.sort((a, b) => a + b)
  console.log(selectedShow);
  showID = selectedShow[0].id;
  console.log(showID);
  loadShowList(showID);

  containerEl.innerHTML = "";
  selectShowEl.style.display = "none";
  selectEl.style.display = "block";
  searchEl.style.display = "block";
  resetEl.style.display = "block";
  homeEl.style.display = "block";
});

// search show

let searchShowEl = document.getElementById("search-show");
searchShowEl.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  // console.log(searchTerm);
  const searchedShow = allShows.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchTerm) ||
      show.genres.includes(searchTerm) ||
      show.summary.toLowerCase().includes(searchTerm)
    );
  });
  // console.log(searchedShow);
  containerEl.innerHTML = "";
  displayAllShows(searchedShow);
});

// using the API fetch

const setup = async () => {
  const url = "https://api.tvmaze.com/shows";
  try {
    const response = fetch(url);
    allShows = await (await response).json();
    displayAllShows(allShows);
  } catch (error) {
    console.log(error);
  }
};

// displaying the data contents
function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("section");
    episodeContainer.setAttribute("class", "episode-container");
    containerEl.appendChild(episodeContainer);
    // episode name
    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = `${episode.name} - ${episodeCode(
      episode.season,
      episode.number
    )}`;
    episodeContainer.appendChild(episodeName);

    let optionEl = document.createElement("option");
    selectEl.appendChild(optionEl);
    optionEl.innerText = `${episodeCode(episode.season, episode.number)} - ${
      episode.name
    } `;

    // thumbnails

    const episodeImage = document.createElement("img");
    episodeImage.setAttribute("src", episode.image.medium);
    episodeContainer.appendChild(episodeImage);

    // episode summary

    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.className = "episode-summary";
    episodeContainer.appendChild(episodeSummary);
  });
}

function episodeCode(season, number) {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

// Search box
const searchEl = document.getElementById("search-field");
const displayCountEl = document.getElementById("display-count");
// displayCountEl.innerText = `Displaying ${allEpisodes.length}/73 episode(s)`;

searchEl.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const searchedEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  displayCountEl.innerText = `${searchedEpisodes.length} / ${allEpisodes.length} episode(s)`;
  // to clear the episode container, next line  || the next 3 lines
  // containerEl.innerHTML = "";
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  makePageForEpisodes(searchedEpisodes);
});

// select episode

let selectEl = document.getElementById("episodes");

selectEl.addEventListener("change", (e) => {
  let selectedEpisode = [];
  let selectedOption = e.target.value;
  allEpisodes.forEach((option) => {
    if (selectedOption.includes(option.name)) {
      selectedEpisode.push(option);
    }
  });
  displayCountEl.innerText = `${selectedEpisode.length} / ${allEpisodes.length} episode(s)`;
  // containerEl.innerHTML = "";
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  makePageForEpisodes(selectedEpisode);
});

// reset button

let resetEl = document.getElementById("btnReset");
resetEl.addEventListener("click", () => {
  selectEl.selectedIndex = 0;
  containerEl.innerHTML = "";
  makePageForEpisodes(allEpisodes);
});

// Back home button

let homeEl = document.getElementById("back");
homeEl.addEventListener("click", () => {
  selectShowEl.selectedIndex = 0;
  containerEl.innerHTML = "";
  displayAllShows(allShows);
  selectShowEl.style.display = "block";
  selectEl.style.display = "none";
  searchEl.style.display = "none";
  resetEl.style.display = "none";
  homeEl.style.display = "none";
});

window.onload = setup;
//  window.onload = loadShowList;
