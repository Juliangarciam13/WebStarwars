const datesPeople = async () => {
    try {
        const databasePeople = await fetch('https://swapi.dev/api/people/',
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
        console.log(newArrayPeople);
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
            newDiv.innerHTML = card;
            parent.appendChild(newDiv);
        });
    });
});
