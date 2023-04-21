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

const card = async (newArrayPeople) => {
    try {
        const dataCard = await fetch('./characters.html');
        const cardHtml = await dataCard.text();
        let cardHtmlContent = cardHtml;
        cardHtmlContent = cardHtmlContent.replace('{{name}}', newArrayPeople[0].name);
        cardHtmlContent = cardHtmlContent.replace('{{eye_color}}', newArrayPeople[0]['eye_color']);
        cardHtmlContent = cardHtmlContent.replace('{{hair_color}}', newArrayPeople[0]['hair_color']);
        cardHtmlContent = cardHtmlContent.replace('{{height}}', newArrayPeople[0].height);
        cardHtmlContent = cardHtmlContent.replace('{{gender}}', newArrayPeople[0].gender);
        cardHtmlContent = cardHtmlContent.replace('{{birth_year}}', newArrayPeople[0]['birth_year']);
        return cardHtmlContent;
    } catch (error) {
        console.error(error)
    }
}

datesPeople().then((newArrayPeople) => {
    const newDiv = document.createElement('div');
    card(newArrayPeople).then((returnCard) => {
        newDiv.innerHTML = returnCard;
        const parent = document.getElementById('container');
        parent.appendChild(newDiv);
    });
});

