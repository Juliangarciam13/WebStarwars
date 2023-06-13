let peopleData = [];
const datesPeople = async () => {
    const apiUrl = 'https://swapi.dev/api/people/';
    try {
        const databasePeople = await fetch(apiUrl,
            { method: 'GET' });
        const jsonDataPeople = await databasePeople.json();
        const results = jsonDataPeople.results;
        const newArrayPeople = results.map((result) => {
            return {
                'name': result.name,
                'eye_color': result['eye_color'],
                'hair_color': result['hair_color'],
                'height': result.height,
                'gender': result.gender,
                'birth_year': result['birth_year'],
            }
        });
        peopleData = newArrayPeople;
        return newArrayPeople;
    } catch (error) {
        console.error(error);
    }
}

const card = async (person) => {
    try {
        const dataCard = await fetch('./characters.html');
        const cardHtml = await dataCard.text();
        let cardHtmlContent = cardHtml
            .replace('{{name}}', person.name)
            .replace('{{eye_color}}', person['eye_color'])
            .replace('{{hair_color}}', person['hair_color'])
            .replace('{{height}}', person.height)
            .replace('{{gender}}', person.gender)
            .replace('{{birth_year}}', person['birth_year']);
        return cardHtmlContent;
    } catch (error) {
        console.error(error)
    }
}

datesPeople().then((newArrayPeople) => {
    const cardPromises = newArrayPeople.map(person => card(person));
    Promise.all(cardPromises).then((cards) => {
        const parent = document.getElementById('container');
        cards.forEach((card) => {
            const newDiv = document.createElement('div');
            const image = document.createElement('img');
            /*if (newArrayPeople.gender === 'female') {
                image.src = './Imgs/femaleIcon.png';
            } else if (newArrayPeople.gender === 'male') {
                image.src = './Imgs/maleIcon.png';
            } else {
                image.src = './Imgs/IconRobot.png';
            };*/
            newDiv.appendChild(image);
            newDiv.innerHTML = card;
            parent.appendChild(newDiv);
        });
    });
});

const button = document.querySelector('.myButtonRight');

let page = 2;
button.addEventListener('click', async () => {
    await datesPeople(`https://swapi.dev/api/people/?page=${page}`);
    page++;
});
/*button.addEventListener('click', async () => {
    try {
        const nextDatabasePeople = await fetch('https://swapi.dev/api/people/?page=2',
            { method: 'GET' });
      
      
    } catch (error) {
        console.error(error);
    }
});*/
/*const nextCards = async () => {
    try {
        const nextDatabasePeople = await fetch('https://swapi.dev/api/people/?page=2',
            { method: 'GET' });
        const nextJsonDataPeople = await nextDatabasePeople.json();
        const results = nextJsonDataPeople.results;
        const nextArrayPeople = results.map((result) => {
            return {
                'name': result.name,
                'eye_color': result['eye_color'],
                'hair_color': result['hair_color'],
                'height': result.height,
                'gender': result.gender,
                'birth_year': result['birth_year'],
            }
        });
        return nextArrayPeople;

    }
    catch (error) {
        console.error(error)
    }
}*/

