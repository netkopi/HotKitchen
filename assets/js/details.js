const container = document.getElementById('container');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=5a095273a4624c4496872f4674ee9c6e&includeNutrition=false`)
.then( response => response.json())
.then( data => {
    console.log(data);

    const elements = {
        img: document.getElementById('img'),
        h2: document.getElementById('title'),
        summary_p: document.getElementById('summary'),
        ul: document.getElementById('ingradients-list'),
        ol: document.getElementById('steps-list'),
        type_div: document.getElementById('dish-type')

    }
    elements.img.src = data.image;
    elements.h2.textContent = data.title;
    elements.summary_p.innerHTML = data.summary;

    if( data.dishTypes.length > 1){
        data.dishTypes.forEach( type => {
            const type_p = document.createElement('p');
            type_p.textContent = type;
            elements.type_div.appendChild(type_p);
        });
    }else {
        const type_p = document.createElement('p');
        type_p.textContent = data.dishTypes;
        elements.type_div.appendChild(type_p);
    }



    data.extendedIngredients.forEach( ingredients => {
        const li_ingradients = document.createElement('li');
        li_ingradients.textContent = ingredients.original;

        elements.ul.appendChild(li_ingradients);
    });

    data.analyzedInstructions[0].steps.forEach( step => {
        const li_steps = document.createElement('li');
        li_steps.textContent = `${step.number}.) ${step.step}`;
        elements.ol.appendChild(li_steps);
    })


})
.catch(err => console.error(err));