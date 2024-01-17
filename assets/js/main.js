const form = document.getElementById('form');
const input = document.getElementById('input');
const mainResults = document.getElementById('recipes');
const resultCount = document.getElementById('result-count');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    mainResults.innerHTML = '';

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5a095273a4624c4496872f4674ee9c6e&query=${input.value}&addRecipeInformation=true`)
    .then( response => response.json())
    .then( data => {
        
        console.log(data);

        resultCount.innerHTML =`Total Results: ${data.results.length}` ;
        data.results.forEach( recipe => {

            const elements = {
                div: document.createElement('div'),
                img: document.createElement('img'),
                h2: document.createElement('h2'),
                p: document.createElement('p')
            }
            
            elements.div.className = 'recipe';
            elements.h2.innerHTML = recipe.title;
            elements.img.src = recipe.image;
            elements.p.textContent = 'see more';

            elements.div.appendChild(elements.h2);
            elements.div.appendChild(elements.img);
            elements.div.appendChild(elements.p);
            
            mainResults.appendChild(elements.div);

            elements.div.addEventListener('click', () => getDetails(recipe.id));
        })
    })
    .catch(err => console.error(err));
});

function getDetails(id){
    window.location.href = `details.html?id=${id}`;
}