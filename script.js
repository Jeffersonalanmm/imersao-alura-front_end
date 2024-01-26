const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`)
    .then((response) => response.json())
    .then((results) => displayResults(filterResults(results, searchTerm)));
}

function filterResults(results, searchTerm) {
  // Usa uma expressão regular para buscar correspondências parciais no nome do artista
  const regex = new RegExp(searchTerm, 'i');
  return results.filter((artist) => regex.test(artist.name));
}

function displayResults(results) {
  hidePlaylists();

  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  if (results.length > 0) {
    // Exibe apenas o primeiro resultado
    artistImage.src = results[0].urlImg;
    artistName.innerText = results[0].name;
    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.classList.add("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
