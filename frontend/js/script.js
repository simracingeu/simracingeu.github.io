const acLogo = document.getElementById('ac-logo');
const acOptions = document.getElementById('ac-options');
const addCommunityBtn = acOptions.querySelector('button:nth-child(1)'); 
const addDriverBtn = acOptions.querySelector('button:nth-child(3)');
const addCommunityForm = document.getElementById('add-community-form');
const addDriverForm = document.getElementById('add-driver-form');
const cancelAddCommunityBtn = document.getElementById('cancel-add-community');
const cancelAddDriverBtn = document.getElementById('cancel-add-driver');
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
    addCommunityForm.style.display = 'block';
    addDriverForm.style.display = 'none';
});

addDriverBtn.addEventListener('click', async function() {
    gameContainer.style.display = 'none';
    addCommunityForm.style.display = 'none';
    addDriverForm.style.display = 'block';
    
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

cancelAddCommunityBtn.addEventListener('click', function() {
    addCommunityForm.style.display = 'none'; 
    gameContainer.style.display = 'flex'; 
    acOptions.style.display = 'none'; 
});

cancelAddDriverBtn.addEventListener('click', function() {
    addDriverForm.style.display = 'none';
    gameContainer.style.display = 'flex';
    acOptions.style.display = 'none';
});

viewCommunitiesBtn.addEventListener('click', async function() {
    console.log('"View communities" button clicked.');
    gameContainer.style.display = 'none'; 
    addCommunityForm.style.display = 'none';
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
    addCommunityForm.style.display = 'none';
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Event Calendar</h2><p>Coming soon...</p>'; 

    try {
        const response = await fetch(`${baseUrl}/communities?game=ac`); 
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const communities = await response.json();

        communitiesListContainer.innerHTML = '<h2>Assetto Corsa Communities</h2>'; 

        if (communities.length === 0) {
            communitiesListContainer.innerHTML += '<p>No communities registered for this game.</p>';
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
            communityElement.style.display = 'flex';
            communityElement.style.alignItems = 'center';

            const img = document.createElement('img');
            img.src = community.logo_url;
            img.alt = `${community.name} Logo`;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.marginRight = '10px';

            const infoDiv = document.createElement('div');
            const nameElement = document.createElement('p');
            nameElement.textContent = `Name: ${community.name}`;
            const statusElement = document.createElement('p');
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
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.style.marginTop = '1rem'; 
        backButton.addEventListener('click', () => {
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none'; 
        });
        communitiesListContainer.appendChild(backButton);
    }
});

addCommunityForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

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
    formData.append('logo', communityImage);
    formData.append('game', 'AC');

    try {
        const csrftoken = getCookie('csrftoken');

        const response = await fetch(`${baseUrl}/communities/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert('Community added successfully!');
            addCommunityForm.reset();
            addCommunityForm.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } else {
            let errorText = `Server error: ${response.status} ${response.statusText}`;
            try {
                const errorResult = await response.json();
                errorText += ` - ${errorResult.message || JSON.stringify(errorResult)}`;
            } catch (e) {
                try {
                    const textError = await response.text();
                    if (textError) errorText += ` - ${textError}`;
                } catch (e2) {}
            }
            console.error(errorText);
            alert(`Error adding community: ${errorText}`);
        }
    } catch (error) {
        console.error('Network error or error submitting the form:', error);
        alert('Network error trying to add the community. Check the console for more details.');
    }
});

addDriverForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const driverNameInput = document.getElementById('driver-name');
    const driverImageInput = document.getElementById('driver-image');
    const driverCommunityInput = document.getElementById('driver-community');
    const driverSteamIdInput = document.getElementById('driver-steam-id');
    
    const driverName = driverNameInput.value;
    const driverImage = driverImageInput.files[0];
    const communityId = driverCommunityInput.value;
    const steamId = driverSteamIdInput.value;
    
    if (!driverName || !communityId) {
        alert('Please fill in the required fields.');
        return;
    }
    
    const formData = new FormData();
    formData.append('nombre', driverName);
    if (driverImage) {
        formData.append('imagen', driverImage);
    }
    formData.append('comunidad', communityId);
    if (steamId) {
        formData.append('steam_id', steamId);
    }
    
    try {
        const response = await fetch(`${baseUrl}/drivers/`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert('Driver added successfully!');
            addCommunityForm.reset(); 
            addCommunityForm.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } else {
            let errorText = `Server error: ${response.status} ${response.statusText}`;
            try {
                const errorResult = await response.json();
                errorText += ` - ${errorResult.message || JSON.stringify(errorResult)}`;
            } catch (e) {
                try {
                    const textError = await response.text();
                    if (textError) errorText += ` - ${textError}`;
                } catch (e2) {

                }
            }
            console.error(errorText);
            alert(`Error adding community: ${errorText}`);
        }
    } catch (error) {
        console.error('Network error or error submitting the form:', error);
        alert('Network error trying to add the community. Check the console for more details.');
    }
});