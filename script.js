const acLogo = document.getElementById('ac-logo');
const acOptions = document.getElementById('ac-options');
const addCommunityBtn = acOptions.querySelector('button:nth-child(1)'); 
const addCommunityForm = document.getElementById('add-community-form');
const cancelAddCommunityBtn = document.getElementById('cancel-add-community');
const gameContainer = document.querySelector('.game-container'); 
const viewCommunitiesBtn = document.getElementById('view-communities-btn'); // Referencia al nuevo botón
const communitiesListContainer = document.getElementById('communities-list'); // Referencia al contenedor de la lista

acLogo.addEventListener('click', function() {
    var options = document.getElementById('ac-options');
    if (options.style.display === 'none') {
        options.style.display = 'block';
    } else {
        options.style.display = 'none';
    }
});

// Mostrar formulario al hacer clic en 'Añadir comunidad'
addCommunityBtn.addEventListener('click', function() {
    gameContainer.style.display = 'none'; // Ocultar selección de juegos
    addCommunityForm.style.display = 'block'; // Mostrar formulario
});

// Ocultar formulario y mostrar selección de juegos al hacer clic en 'Cancelar'
cancelAddCommunityBtn.addEventListener('click', function() {
    addCommunityForm.style.display = 'none'; // Ocultar formulario
    gameContainer.style.display = 'flex'; // Mostrar selección de juegos
    acOptions.style.display = 'none'; // Asegurarse que las opciones iniciales estén ocultas
});

// Controlador para el botón 'Ver comunidades'
viewCommunitiesBtn.addEventListener('click', async function() {
    console.log('"View communities" button clicked.');
    gameContainer.style.display = 'none'; 
    addCommunityForm.style.display = 'none';
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2><p>Loading...</p>'; // Loading message

    try {
        // TODO: Reemplazar con la URL real del endpoint cuando esté disponible
        const response = await fetch('/api/communities?game=ac'); 
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const communities = await response.json();

        // Limpiar el contenedor antes de añadir nuevos elementos
        communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2>'; 

        if (communities.length === 0) {
            communitiesListContainer.innerHTML += '<p>No communities registered for this game.</p>';
            return;
        }

        communities.forEach(community => {
            const communityElement = document.createElement('div');
            communityElement.style.border = '1px solid #ccc';
            communityElement.style.marginBottom = '10px';
            communityElement.style.padding = '10px';
            communityElement.style.display = 'flex';
            communityElement.style.alignItems = 'center';

            const img = document.createElement('img');
            // TODO: Asegurarse que la API devuelva la URL completa de la imagen o construirla
            img.src = community.imageUrl; // Asumiendo que la API devuelve 'imageUrl'
            img.alt = `${community.name} Logo`;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.marginRight = '10px';

            const infoDiv = document.createElement('div');
            const nameElement = document.createElement('p');
            nameElement.textContent = `Name: ${community.name}`;
            const statusElement = document.createElement('p');
            // Asumiendo que la API devuelve un booleano 'isAuthorized'
            statusElement.textContent = `Status: ${community.isAuthorized ? 'Authorized' : 'Pending authorization'}`;
            statusElement.style.fontWeight = community.isAuthorized ? 'bold' : 'normal';
            statusElement.style.color = community.isAuthorized ? 'green' : 'orange';

            infoDiv.appendChild(nameElement);
            infoDiv.appendChild(statusElement);

            communityElement.appendChild(img);
            communityElement.appendChild(infoDiv);
            communitiesListContainer.appendChild(communityElement);
        });

    } catch (error) {
        console.error('Error loading communities:', error);
        communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2><p>Error loading communities. Please try again later.</p>';
    }
});

// Manejar el envío del formulario
addCommunityForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío real del formulario

    const communityNameInput = document.getElementById('community-name');
    const communityImageInput = document.getElementById('community-image');
    const communityName = communityNameInput.value;
    const communityImage = communityImageInput.files[0];

    if (!communityName || !communityImage) {
        alert('Please fill in all fields.');
        return;
    }

    const formData = new FormData();
    formData.append('name', communityName);
    formData.append('image', communityImage);

    try {
        // Cambia '/api/add-community' por la URL real de tu Vercel Function
        const response = await fetch('/api/add-community', {
            method: 'POST',
            body: formData // No necesitas 'Content-Type': 'multipart/form-data', fetch lo hace automáticamente con FormData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert('Community added successfully!');
            // Opcional: Limpiar formulario y volver a la vista principal
            addCommunityForm.reset(); // Limpiar el formulario
            addCommunityForm.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } else {
            // Intentar leer el cuerpo del error si existe
            let errorText = `Server error: ${response.status} ${response.statusText}`;
            try {
                const errorResult = await response.json();
                errorText += ` - ${errorResult.message || JSON.stringify(errorResult)}`;
            } catch (e) {
                // No se pudo parsear el JSON del error, usar el texto plano si existe
                try {
                    const textError = await response.text();
                    if (textError) errorText += ` - ${textError}`;
                } catch (e2) { /* Ignorar si no se puede leer el texto */ }
            }
            console.error(errorText);
            alert(`Error adding community: ${errorText}`);
        }
    } catch (error) {
        console.error('Network error or error submitting the form:', error);
        alert('Network error trying to add the community. Check the console for more details.');
    }
});