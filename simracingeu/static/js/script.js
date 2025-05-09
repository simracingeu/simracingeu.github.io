const acLogo = document.getElementById('ac-logo');
const acOptions = document.getElementById('ac-options');
const addCommunityBtn = acOptions.querySelector('button:nth-child(2)'); 
const addDriverBtn = acOptions.querySelector('button:nth-child(3)');
const gameContainer = document.querySelector('.game-container'); 
const viewCalendarBtn = document.getElementById('view-calendar-btn');
const communitiesListContainer = document.getElementById('communities-list');
const driverCommunitySelect = document.getElementById('driver-community');
const baseUrl = window.BASE_API_URL || 'http://localhost:8000/api';



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
    document.querySelector('p').style.display = 'none';
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Add New Community</h2>';
    
    const form = document.createElement('form');
    form.id = 'add-community-form';
    
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Community name:';
    nameLabel.className = 'form-label';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.name = 'name';
    nameInput.required = true;
    
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description:';
    descLabel.className = 'form-label';
    const descInput = document.createElement('textarea');
    descInput.className = 'form-control';
    descInput.name = 'description';
    descInput.rows = 3;
    
    const countryLabel = document.createElement('label');
    countryLabel.textContent = 'Country:';
    countryLabel.className = 'form-label';
    const countryInput = document.createElement('select');
    countryInput.className = 'form-select';
    countryInput.name = 'country';
    countryInput.required = true;
    
    const euCountries = [
        'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
        'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
        'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
        'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
    ];
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a country --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    countryInput.appendChild(defaultOption);
    
    euCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        
        option.textContent = country;
        
        countryInput.appendChild(option);
    });
    
    const logoLabel = document.createElement('label');
    logoLabel.textContent = 'Logo:';
    logoLabel.className = 'form-label';
    const logoInput = document.createElement('input');
    logoInput.type = 'file';
    logoInput.className = 'form-control';
    logoInput.name = 'logo';
    logoInput.accept = 'image/*';
    
    const discordLabel = document.createElement('label');
    discordLabel.textContent = 'Discord URL:';
    discordLabel.className = 'form-label';
    const discordInput = document.createElement('input');
    discordInput.type = 'url';
    discordInput.className = 'form-control';
    discordInput.name = 'discord_url';
    
    const websiteLabel = document.createElement('label');
    websiteLabel.textContent = 'Website:';
    websiteLabel.className = 'form-label';
    const websiteInput = document.createElement('input');
    websiteInput.type = 'url';
    websiteInput.className = 'form-control';
    websiteInput.name = 'website_url';
    
    const patreonLabel = document.createElement('label');
    patreonLabel.textContent = 'Patreon URL:';
    patreonLabel.className = 'form-label';
    const patreonInput = document.createElement('input');
    patreonInput.type = 'url';
    patreonInput.className = 'form-control';
    patreonInput.name = 'patreon_url';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Submit';
    
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'btn btn-secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        communitiesListContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        acOptions.style.display = 'none';
        document.querySelector('p').style.display = 'block';
    });
    
    const formGroup = document.createElement('div');
    formGroup.className = 'mb-3';
    formGroup.appendChild(nameLabel);
    formGroup.appendChild(nameInput);
    form.appendChild(formGroup);
    
    const descGroup = document.createElement('div');
    descGroup.className = 'mb-3';
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);
    form.appendChild(descGroup);
    
    const countryGroup = document.createElement('div');
    countryGroup.className = 'mb-3';
    countryGroup.appendChild(countryLabel);
    countryGroup.appendChild(countryInput);
    form.appendChild(countryGroup);
    
    const logoGroup = document.createElement('div');
    logoGroup.className = 'mb-3';
    logoGroup.appendChild(logoLabel);
    logoGroup.appendChild(logoInput);
    form.appendChild(logoGroup);
    
    const discordGroup = document.createElement('div');
    discordGroup.className = 'mb-3';
    discordGroup.appendChild(discordLabel);
    discordGroup.appendChild(discordInput);
    form.appendChild(discordGroup);
    
    const websiteGroup = document.createElement('div');
    websiteGroup.className = 'mb-3';
    websiteGroup.appendChild(websiteLabel);
    websiteGroup.appendChild(websiteInput);
    form.appendChild(websiteGroup);
    
    const patreonGroup = document.createElement('div');
    patreonGroup.className = 'mb-3';
    patreonGroup.appendChild(patreonLabel);
    patreonGroup.appendChild(patreonInput);
    form.appendChild(patreonGroup);
    
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Contact Email';
    emailLabel.className = 'form-label';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.className = 'form-control';
    emailInput.name = 'contact_email';
    
    const emailGroup = document.createElement('div');
    emailGroup.className = 'mb-3';
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    form.appendChild(emailGroup);
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'd-flex gap-2';
    buttonGroup.appendChild(submitBtn);
    buttonGroup.appendChild(backButton);
    form.appendChild(buttonGroup);
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('description', descInput.value);
        formData.append('country', countryInput.value);
        formData.append('discord_url', discordInput.value);
        formData.append('website_url', websiteInput.value);
        formData.append('patreon_url', patreonInput.value);
        formData.append('contact_email', emailInput.value);
        if(logoInput.files[0]) {
            formData.append('logo', logoInput.files[0]);
        }
        
        try {
            const response = await fetch(`${baseUrl}communities/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });
            
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            alert('Community created successfully!');
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating community. Please try again.');
        }
    });
    
    communitiesListContainer.appendChild(form);
});

addDriverBtn.addEventListener('click', async function() {
    gameContainer.style.display = 'none';
    document.querySelector('p').style.display = 'none';
    communitiesListContainer.style.display = 'block';
    communitiesListContainer.innerHTML = '<h2>Add New Driver</h2>';
    
    const form = document.createElement('form');
    form.id = 'add-driver-form';
    
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Driver name:';
    nameLabel.className = 'form-label';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.name = 'name';
    nameInput.required = true;
    
    const communityLabel = document.createElement('label');
    communityLabel.textContent = 'Community:';
    communityLabel.className = 'form-label';
    const communitySelect = document.createElement('select');
    communitySelect.className = 'form-select';
    communitySelect.name = 'community';
    communitySelect.required = true;
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a community --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    communitySelect.appendChild(defaultOption);
    
    try {
        const response = await fetch(`${baseUrl}communities/`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const communities = await response.json();
        
        communities.forEach(community => {
            const option = document.createElement('option');
            option.value = community.id;
            option.textContent = community.name;
            communitySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading communities:', error);
        alert('Error loading communities. Please try again.');
    }
    
    const avatarLabel = document.createElement('label');
    avatarLabel.textContent = 'Avatar:';
    avatarLabel.className = 'form-label';
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.className = 'form-control';
    avatarInput.name = 'avatar';
    avatarInput.accept = 'image/*';
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Submit';
    
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'btn btn-secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        communitiesListContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        acOptions.style.display = 'none';
        document.querySelector('p').style.display = 'block';
    });
    
    const nameGroup = document.createElement('div');
    nameGroup.className = 'mb-3';
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    form.appendChild(nameGroup);
    
    const communityGroup = document.createElement('div');
    communityGroup.className = 'mb-3';
    communityGroup.appendChild(communityLabel);
    communityGroup.appendChild(communitySelect);
    form.appendChild(communityGroup);
    
    const avatarGroup = document.createElement('div');
    avatarGroup.className = 'mb-3';
    avatarGroup.appendChild(avatarLabel);
    avatarGroup.appendChild(avatarInput);
    form.appendChild(avatarGroup);
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'd-flex gap-2';
    buttonGroup.appendChild(submitBtn);
    buttonGroup.appendChild(backButton);
    form.appendChild(buttonGroup);
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', nameInput.value);
        formData.append('comunidad', communitySelect.value);
        if(avatarInput.files[0]) {
            formData.append('avatar', avatarInput.files[0]);
        }
        
        try {
            const response = await fetch(`${baseUrl}drivers/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });
            
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            alert('Driver created successfully!');
            communitiesListContainer.style.display = 'none';
            gameContainer.style.display = 'flex';
            acOptions.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating driver. Please try again.');
        }
    });
    
    communitiesListContainer.appendChild(form);
});




viewCalendarBtn.addEventListener('click', async function() {
    const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
    calendarModal.show();
    
    const modalBody = document.querySelector('#calendarModal .modal-body');
    modalBody.innerHTML = '<p>Loading events...</p>'; 

    try {
            const response = await fetch(`/calendar/?modal=true&game=1`); 
            if (!response.ok) { 
                throw new Error(`HTTP Error: ${response.status}`); 
            } 
            const template = await response.text();
            modalBody.innerHTML = template;

    } catch (error) { 
        console.error('Error loading events:', error); 
        modalBody.innerHTML = '<h2>Event Calendar</h2><p>Error loading events. Please try again later.</p>'; 
        const backButton = document.createElement('button'); 
        backButton.textContent = 'Back'; 
        backButton.className = 'btn btn-secondary mt-3';
        backButton.addEventListener('click', () => { 
            calendarModal.hide();
        }); 
        modalBody.appendChild(backButton); 
    } 
});


