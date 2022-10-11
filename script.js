//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
}
// displaying the data contents
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.setAttribute("class", "root");
  const containerEl = document.querySelector(".container");
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
const searchField = document.getElementById("search-field");

searchField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  //  let allEpisodes = [];
  console.log(searchString);
  const pickedEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  //makePageForEpisodes(pickedEpisodes);
  console.log(pickedEpisodes)
});
window.onload = setup;
