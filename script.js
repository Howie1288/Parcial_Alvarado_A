const getCharactersBtn = document.getElementById('get-characters-btn');
const getLocationsBtn = document.getElementById('get-locations-btn');
const getEpisodesBtn = document.getElementById('get-episodes-btn');
const charactersContainer = document.getElementById('characters-container');
const locationsContainer = document.getElementById('locations-container');
const episodesContainer = document.getElementById('episodes-container');

// Función para limpiar el contenido de los contenedores
function clearContainers() {
  charactersContainer.innerHTML = '';
  locationsContainer.innerHTML = '';
  episodesContainer.innerHTML = '';
}

getCharactersBtn.addEventListener('click', async () => {
  try {
    clearContainers();

    const charactersResponse = await fetch('https://rickandmortyapi.com/api/character');
    const charactersData = await charactersResponse.json();
    const characters = charactersData.results;
    characters.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card');
      characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
      `;
      charactersContainer.appendChild(characterCard);
    });
  } catch (error) {
    console.error(error);
  }
});

getLocationsBtn.addEventListener('click', async () => {
  try {
    clearContainers();

    const locationsResponse = await fetch('https://rickandmortyapi.com/api/location');
    const locationsData = await locationsResponse.json();
    const locations = locationsData.results;
    locations.forEach(location => {
      const locationCard = document.createElement('div');
      locationCard.classList.add('location-card');
      locationCard.innerHTML = `
        <h2>${location.name}</h2>
        <p>Type: ${location.type}</p>
        <p>Dimension: ${location.dimension}</p>
      `;
      locationsContainer.appendChild(locationCard);
    });
  } catch (error) {
    console.error(error);
  }
});

getEpisodesBtn.addEventListener('click', async () => {
  try {
    clearContainers();

    const episodesResponse = await fetch('https://rickandmortyapi.com/api/episode');
    const episodesData = await episodesResponse.json();
    const episodes = episodesData.results;
    episodes.forEach(episode => {
      const episodeCard = document.createElement('div');
      episodeCard.classList.add('episode-card');
      episodeCard.innerHTML = `
        <h2>${episode.name}</h2>
        <p>Episode: ${episode.episode}</p>
        <p>Air Date: ${episode.air_date}</p>
      `;
      episodesContainer.appendChild(episodeCard);
    });
  } catch (error) {
    console.error(error);
  }
});
