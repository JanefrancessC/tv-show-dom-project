//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
rootElem.setAttribute("class", "root");
let containerEl = document.getElementById("container");

function setup() {
  makePageForEpisodes(allEpisodes);
}
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

searchEl.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const searchedEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  displayCountEl.innerText = `${searchedEpisodes.length} / ${allEpisodes.length} episode(s)`;
  containerEl.innerHTML = "";
  makePageForEpisodes(searchedEpisodes);
});

// select episode

let selectEl = document.getElementById("episodes");
let optionEl = document.createElement("option");

allEpisodes.forEach((episode) => {
  let optionEl = document.createElement("option");
  selectEl.appendChild(optionEl);

  optionEl.innerText = `${episodeCode(episode.season, episode.number)} - ${
    episode.name
  } `;
});

selectEl.addEventListener("change", (e) => {
  let selectedEpisode = [];
  let selectedOption = e.target.value;
  allEpisodes.forEach((option) => {
    if (selectedOption.includes(option.name)) {
      selectedEpisode.push(option);
    }
  });

  containerEl.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
});
// reset

let resetEl = document.getElementById("btnReset");
resetEl.addEventListener("click", () => {
  selectEl.selectedIndex = 0;
  containerEl.innerHTML = "";
  makePageForEpisodes(allEpisodes);
});

window.onload = setup;
