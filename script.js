// Obtener referencias a los elementos del DOM
const getCharacterButton = document.getElementById('get-character');
const characterNameSelect = document.getElementById('character-name');
const characterDataContainer = document.getElementById('character-data');

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

    // Almacenar los nombres de personajes ya mostrados
    const shownCharacters = new Set();
 // Procesar los datos según el tipo de endpoint
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
} catch (error) {
    console.log('Error:', error);
  }
}


// Agregar event listener al botón para obtener los datos al hacer clic
getCharacterButton.addEventListener('click', () => {
    const characterName = getSelectedValue(characterNameSelect);
    if (characterName) {
      const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`;
      fetchData(url, characterDataContainer);
    }
  });