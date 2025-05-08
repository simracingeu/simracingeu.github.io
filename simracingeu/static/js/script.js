const acLogo = document.getElementById('ac-logo');
const acOptions = document.getElementById('ac-options');
const addCommunityBtn = acOptions.querySelector('button:nth-child(3)'); 
const addDriverBtn = acOptions.querySelector('button:nth-child(3)');
const gameContainer = document.querySelector('.game-container'); 
const viewCommunitiesBtn = document.getElementById('view-communities-btn');
const viewCalendarBtn = document.getElementById('view-calendar-btn');
const communitiesListContainer = document.getElementById('communities-list');
const driverCommunitySelect = document.getElementById('driver-community');
const baseUrl = 'http://localhost:8000/api'
//'http://192.168.1.20/api'

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

acLogo.addEventListener('click', function() {
    var options = document.getElementById('ac-options');
    if (options.style.display === 'none') {
        options.style.display = 'block';
    } else {
        options.style.display = 'none';
    }
});

addCommunityBtn.addEventListener('click', function() {
    gameContainer.style.display = 'none';
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Add New Community</h2>';
    
    const form = document.createElement('form');
    form.id = 'add-community-form';
    
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nombre de la comunidad:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;
    
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Descripción:';
    const descInput = document.createElement('textarea');
    descInput.name = 'description';
    descInput.rows = 3;
    
    const countryLabel = document.createElement('label');
    countryLabel.textContent = 'País:';
    const countryInput = document.createElement('input');
    countryInput.type = 'text';
    countryInput.name = 'country';
    
    const logoLabel = document.createElement('label');
    logoLabel.textContent = 'Logo:';
    const logoInput = document.createElement('input');
    logoInput.type = 'file';
    logoInput.name = 'logo';
    logoInput.accept = 'image/*';
    
    const discordLabel = document.createElement('label');
    discordLabel.textContent = 'Discord URL:';
    const discordInput = document.createElement('input');
    discordInput.type = 'url';
    discordInput.name = 'discord_url';
    
    const websiteLabel = document.createElement('label');
    websiteLabel.textContent = 'Página Web:';
    const websiteInput = document.createElement('input');
    websiteInput.type = 'url';
    websiteInput.name = 'website_url';
    
    const patreonLabel = document.createElement('label');
    patreonLabel.textContent = 'Patreon URL:';
    const patreonInput = document.createElement('input');
    patreonInput.type = 'url';
    patreonInput.name = 'patreon_url';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Enviar';
    
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.textContent = 'Volver';
    backButton.className = 'form-button';
    backButton.addEventListener('click', () => {
        communitiesListContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        acOptions.style.display = 'none';
    });
    
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(countryLabel);
    form.appendChild(countryInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(logoLabel);
    form.appendChild(logoInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(discordLabel);
    form.appendChild(discordInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(websiteLabel);
    form.appendChild(websiteInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(patreonLabel);
    form.appendChild(patreonInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitBtn);
    form.appendChild(backButton);
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('description', descInput.value);
        formData.append('country', countryInput.value);
        formData.append('discord_url', discordInput.value);
        formData.append('website_url', websiteInput.value);
        formData.append('patreon_url', patreonInput.value);
        if(logoInput.files[0]) {
            formData.append('logo', logoInput.files[0]);
        }
        
        try {
            const response = await fetch(`${baseUrl}/communities/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });
            
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            alert('Comunidad creada exitosamente!');
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear la comunidad. Por favor intente nuevamente.');
        }
    });
    
    communitiesListContainer.appendChild(form);
});

addDriverBtn.addEventListener('click', async function() {
    gameContainer.style.display = 'none';
    
    try {
        const response = await fetch(`${baseUrl}/communities/`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const communities = await response.json();
        
        driverCommunitySelect.innerHTML = '';
        communities.forEach(community => {
            const option = document.createElement('option');
            option.value = community.id;
            option.textContent = community.name;
            driverCommunitySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading communities:', error);
        alert('Error loading communities. Please try again.');
    }
});



viewCommunitiesBtn.addEventListener('click', async function() {
    console.log('"View communities" button clicked.');
    gameContainer.style.display = 'none'; 
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2><p>Loading...</p>';
    
    try {
        const response = await fetch(`${baseUrl}/communities/`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const communities = await response.json();
        
        communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2>';
        
        if (communities.length === 0) {
            communitiesListContainer.innerHTML += '<p>No communities found.</p>';
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.className = 'form-button';
            backButton.addEventListener('click', () => {
                communitiesListContainer.style.display = 'none';
                gameContainer.style.display = 'flex';
                acOptions.style.display = 'none';
            });
            communitiesListContainer.appendChild(backButton);
            return;
        }
        
        communities.forEach(community => {
            const communityElement = document.createElement('div');
            communityElement.style.border = '1px solid #ccc';
            communityElement.style.marginBottom = '10px';
            communityElement.style.padding = '10px';
            
            const nameElement = document.createElement('h3');
            nameElement.textContent = community.name;
            
            if (community.logo_url) {
                const logoElement = document.createElement('img');
                logoElement.src = community.logo_url.startsWith('http') ? community.logo_url : `${baseUrl}${community.logo_url}`;
                logoElement.alt = `${community.name} logo`;
                logoElement.style.maxWidth = '200px';
                logoElement.style.width = '200px';
                logoElement.style.height = 'auto';
                logoElement.style.marginTop = '5px';
                nameElement.appendChild(document.createElement('br'));
                nameElement.appendChild(logoElement);
            }
            
            const driversCountElement = document.createElement('p');
            driversCountElement.textContent = `Drivers: ${community.drivers_count || 0}`;
            driversCountElement.style.textAlign = 'right';
            driversCountElement.style.marginLeft = 'auto';
            
            communityElement.appendChild(nameElement);
            communityElement.appendChild(driversCountElement);
            communitiesListContainer.appendChild(communityElement);
        });
        
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = 'form-button';
        backButton.addEventListener('click', () => {
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        });
        communitiesListContainer.appendChild(backButton);
        
    } catch (error) {
        console.error('Error loading communities:', error);
        communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2><p>Error loading communities. Please try again later.</p>';
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = 'form-button';
        backButton.addEventListener('click', () => {
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        });
        communitiesListContainer.appendChild(backButton);
    }
}); 

viewCalendarBtn.addEventListener('click', async function() {
    console.log('"View event calendar" button clicked.'); 
    gameContainer.style.display = 'none'; 
    communitiesListContainer.style.display = 'block'; 
    communitiesListContainer.innerHTML = '<h2>Event Calendar</h2><p>Loading events...</p>'; 

    try { 
        const response = await fetch(`${baseUrl}/events/`); 
        if (!response.ok) { 
            throw new Error(`HTTP Error: ${response.status}`); 
        } 
        const events = await response.json(); 

        communitiesListContainer.innerHTML = '<h2>Event Calendar</h2>'; 

        if (events.length === 0) { 
            communitiesListContainer.innerHTML += '<p>No events scheduled yet.</p>'; 
            const backButton = document.createElement('button'); 
            backButton.textContent = 'Back'; 
            backButton.className = 'form-button'; 
            backButton.addEventListener('click', () => { 
                communitiesListContainer.style.display = 'none'; 
                gameContainer.style.display = 'flex'; 
                acOptions.style.display = 'none'; 
            }); 
            communitiesListContainer.appendChild(backButton); 
            return; 
        } 

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.style.border = '1px solid #ccc';
            eventElement.style.marginBottom = '10px';
            eventElement.style.padding = '10px';
            
            const eventName = document.createElement('h3');
            eventName.textContent = event.nombre;
            eventName.style.padding = '10px';
            
            const eventDateInfo = document.createElement('p');
            const [dateStr, timeStr] = event.fecha.replace('Z', '').split('T');
            const [year, month, day] = dateStr.split('-');
            const [hours, minutes] = timeStr.split(':');
            const eventDate = new Date(year, month-1, day, hours, minutes);
            const formattedDate = eventDate.toLocaleDateString('es-ES');
            const formattedTime = eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
            eventDateInfo.textContent = `Date: ${formattedDate} Starts at: ${formattedTime.replace('.', ':')}`;
            eventDateInfo.style.padding = '10px';

            eventElement.appendChild(eventName);
            eventElement.appendChild(eventDateInfo);
            communitiesListContainer.appendChild(eventElement);
        });

    } catch (error) { 
        console.error('Error loading events:', error); 
        communitiesListContainer.innerHTML = '<h2>Event Calendar</h2><p>Error loading events. Please try again later.</p>'; 
        const backButton = document.createElement('button'); 
        backButton.textContent = 'Back'; 
        backButton.className = 'form-button';
        backButton.style.marginTop = '1rem'; 
        backButton.addEventListener('click', () => { 
            communitiesListContainer.style.display = 'none'; 
            gameContainer.style.display = 'flex'; 
            acOptions.style.display = 'none'; 
        }); 
        communitiesListContainer.appendChild(backButton); 
    } 
});


