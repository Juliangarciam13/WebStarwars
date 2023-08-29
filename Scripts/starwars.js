const imgs = [
    {
        src: '../Imgs/femaleIcon.png'
    },
    {
        src: '../Imgs/maleIcon.png'
    },
    {
        src: '../Imgs/IconRobot.png'
    }
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imgs.length);
    return imgs[randomIndex];
}

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
                'height': result.height,
                'gender': result.gender,
            }
        });
        peopleData = newArrayPeople;

        loader.style.display = 'none';

        return newArrayPeople;
    } catch (error) {
        console.error(error);
    }
}

const card = async (person) => {
    try {
        const dataCard = await fetch('../Public/characters.html');
        const cardHtml = await dataCard.text();
        const randomImage = getRandomImage().src;
        let cardHtmlContent = cardHtml
            .replace('{{name}}', person.name)
            .replace('{{height}}', person.height)
            .replace('{{gender}}', person.gender);
        cardHtmlContent = cardHtmlContent.replace('{{image}}', randomImage);
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
            newDiv.innerHTML = card;
            parent.appendChild(newDiv);
        });

        loader.style.display = 'none';
    });
});

const buttonRight = document.querySelector('.myButtonRight');
const buttonLeft = document.querySelector('.myButtonLeft');
let page = 2;

buttonRight.addEventListener('click', async () => {
    try {
        const nextDatabasePeople = await fetch(`https://swapi.dev/api/people/?page=${page}`, { method: 'GET' });
        const nextJsonDataPeople = await nextDatabasePeople.json();
        const results = nextJsonDataPeople.results;

        if (results.length === 0) {
            console.log('No more results.');
        } else {
            const nextArrayPeople = results.map((result) => {
                return {
                    'name': result.name,
                    'height': result.height,
                    'gender': result.gender,
                }
            });

            const parent = document.getElementById('container');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            const cards = await Promise.all(nextArrayPeople.map(person => card(person)));
            cards.forEach((card) => {
                const newDiv = document.createElement('div');
                newDiv.innerHTML = card;
                parent.appendChild(newDiv);
            });

            page++;

        }
    } catch (error) {
        console.error(error);
    }
});

buttonLeft.addEventListener('click', async () => {
    if (page > 2) {
        page -= 2;
        await buttonRight.click();
    } else {
        console.log('No previous results.');
    }
});

