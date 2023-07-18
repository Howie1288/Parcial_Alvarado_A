// Obtener referencias a los elementos del DOM
const getCharacterButton = document.getElementById('get-character');
const characterNameSelect = document.getElementById('character-name');
const characterDataContainer = document.getElementById('character-data');
const getLocationButton = document.getElementById('get-location');
const locationIdSelect = document.getElementById('location-id');
const locationDataContainer = document.getElementById('location-data');
const getEpisodeButton = document.getElementById('get-episode');
const episodeIdSelect = document.getElementById('episode-id');
const episodeDataContainer = document.getElementById('episode-data');

// Función para obtener el valor seleccionado de un select
function getSelectedValue(selectElement) {
  return selectElement.value;
}

// Función para realizar una solicitud GET a la API y procesar la respuesta
async function fetchData(url, container) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Limpiar el contenedor antes de mostrar los nuevos datos
    container.innerHTML = '';

    // Procesar los datos según el tipo de endpoint
    if (data.results) {
      // Caso de datos de personaje
      const shownCharacters = new Set();

      data.results.forEach((result) => {
        if (!shownCharacters.has(result.name)) {
          shownCharacters.add(result.name);

          const characterElement = document.createElement('div');
          characterElement.classList.add('character-card');

          const characterImage = document.createElement('img');
          characterImage.src = result.image;
          characterImage.alt = result.name;
          characterElement.appendChild(characterImage);

          const characterInfo = document.createElement('div');
          characterInfo.classList.add('character-info');
          characterInfo.innerHTML = `
            <h3>${result.name}</h3>
            <p>Status: ${result.status}</p>
            <p>Species: ${result.species}</p>
            <p>Gender: ${result.gender}</p>
          `;
          characterElement.appendChild(characterInfo);

          container.appendChild(characterElement);
        }
      });
    } else if (data.type === 'Location') {
      // Caso de datos de ubicación
      const locationElement = document.createElement('div');
      locationElement.classList.add('location-card');

      const locationInfo = document.createElement('div');
      locationInfo.classList.add('location-info');
      locationInfo.innerHTML = `
        <h3>${data.name}</h3>
        <p>Type: ${data.type}</p>
        <p>Dimension: ${data.dimension}</p>
      `;
      locationElement.appendChild(locationInfo);

      container.appendChild(locationElement);
    } else if (data.type === 'Episode') {
      // Caso de datos de episodio
      const episodeElement = document.createElement('div');
      episodeElement.classList.add('episode-card');

      const episodeInfo = document.createElement('div');
      episodeInfo.classList.add('episode-info');
      episodeInfo.innerHTML = `
        <h3>${data.name}</h3>
        <p>Episode: ${data.episode}</p>
        <p>Air Date: ${data.air_date}</p>
      `;
      episodeElement.appendChild(episodeInfo);

      container.appendChild(episodeElement);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Agregar event listener al botón para obtener los datos de personaje al hacer clic
getCharacterButton.addEventListener('click', () => {
  const characterName = getSelectedValue(characterNameSelect);
  if (characterName) {
    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`;
    fetchData(url, characterDataContainer);
  }
});

// Agregar event listener al botón para obtener los datos de ubicación al hacer clic
getLocationButton.addEventListener('click', () => {
  const locationId = getSelectedValue(locationIdSelect);
  if (locationId) {
    const url = `https://rickandmortyapi.com/api/location/${encodeURIComponent(locationId)}`;
    fetchData(url, locationDataContainer);
  }
});

// Agregar event listener al botón para obtener los datos de episodio al hacer clic
getEpisodeButton.addEventListener('click', () => {
  const episodeId = getSelectedValue(episodeIdSelect);
  if (episodeId) {
    const url = `https://rickandmortyapi.com/api/episode/${encodeURIComponent(episodeId)}`;
    fetchData(url, episodeDataContainer);
  }
});
