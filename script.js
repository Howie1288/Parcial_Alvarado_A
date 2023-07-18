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
      // Si la respuesta contiene una lista de resultados (personajes)
      data.results.forEach((result) => {
        const characterElement = document.createElement('div');
        characterElement.innerHTML = `
          <h3>${result.name}</h3>
          <p>Status: ${result.status}</p>
          <p>Species: ${result.species}</p>
          <p>Gender: ${result.gender}</p>
        `;
        container.appendChild(characterElement);
      });
    } else {
      // Si la respuesta contiene un solo resultado (ubicación o episodio)
      const infoElement = document.createElement('div');
      infoElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.type || data.air_date}</p>
      `;
      container.appendChild(infoElement);
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
