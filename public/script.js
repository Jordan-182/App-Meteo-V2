// Déclaration clé d'API
const APIKEY = 'c04a6be2fb68c9aaffa796e49462ee99';

// Appel à l'API d'OpenWeather avec la ville en paramètre de fonction
let apiCall = function(city){
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('#temp').innerHTML =  data.main.temp + '°';
        document.querySelector('#city').innerHTML = "<i class='fa-solid fa-location-dot'></i> " + data.name;
        document.querySelector('#description').innerHTML = data.weather[0].description;
        document.querySelector('#humidity').innerHTML = "<i class='fa-solid fa-droplet'></i> " + data.main.humidity + '%';
        document.querySelector('#wind').innerHTML = "<i class='fa-solid fa-wind'></i> " + data.wind.speed + 'km/h';
        document.querySelector('#pressure').innerHTML = data.main.pressure + " hPa";
        
        // Appel de la fonction background une fois que les données sont récupérées
        background();
    })
    .catch(err => console.log('Erreur : ' + err));
}


// Ecouteur d'évènement sur la soumission du formulaire
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    let city = document.querySelector('#inputCity').value;
    apiCall(city);
});

// Adaptation background
function background(){
    // Récupération du texte de description
let descriptionText = document.querySelector("#description").textContent.trim();
// Sélection de l'élément body
let body = document.querySelector("body");
// Affichage du texte de description dans la console
console.log("Description récupérée :", descriptionText);
// Vérification du texte de description et application des styles appropriés
if(descriptionText === "couvert" || descriptionText === "nuageux") {
    // Changement de l'image de fond pour les conditions météorologiques "couvert" ou "nuageux"
    body.style.backgroundImage = "url('../public/src/darkClouds.jpg')";
    }
    else if(descriptionText === "orage" || descriptionText === "bruine" || descriptionText === "brume" || descriptionText === "légère pluie" || descriptionText === "bruine légère" || descriptionText === "pluie modérée") {
    // Changement de l'image de fond pour les conditions météorologiques "orage", "bruine", "légère pluie" ou "bruine légère"
    body.style.backgroundImage = "url('../public/src/rain.jpg')";
    }
    else if(descriptionText ==="chutes de neige" || descriptionText ==="légères chutes de neige"){
        body.style.backgroundImage = "url('../public/src/snow.jpg')";
    }
    else if(descriptionText ==="brume sèche"){
        body.style.backgroundImage = "url('../public/src/fog.jpg')";
    }
    else if(descriptionText === "partiellement nuageux"){
        body.style.backgroundImage = "url('../public/src/clouds.jpg')";
    }
    else {
        body.style.backgroundImage = "url('../public/src/blueSky.jpg')";
    }
}

// Appel par défaut au chargement de la page
apiCall('Lens');

// Fonction pour obtenir la position de l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
}

// Fonction de rappel pour traiter la position de l'utilisateur
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Utiliser les coordonnées pour obtenir la ville correspondante
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric&lang=fr`)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            // Utiliser la ville pour effectuer une recherche météorologique par défaut
            apiCall(cityName);
        })
        .catch(err => console.error('Erreur lors de la récupération de la ville:', err));
}

// Appel de la fonction pour obtenir la position de l'utilisateur au chargement de la page
getLocation();