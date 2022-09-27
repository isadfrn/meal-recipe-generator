const baseUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const mealContainer = document.querySelector('.meal__container');
const infoContainer = document.querySelector('.info__container');
let showInfoActive = false;

async function fetchMeal() {
  const response = await fetch(baseUrl);
  const responseParse = await response.json();
  return responseParse.meals[0];
}

async function generateMeal() {
  const mealInfo = await fetchMeal();
  const mealContainerExists = document.querySelector('.meal__info');

  if (mealContainerExists) {
    mealContainer.removeChild(mealContainerExists);
  }

  mealContainer.insertAdjacentHTML(
    'beforeend',
    `
      <div class="meal__info">
        <h2 class="meal__name">${mealInfo.strMeal}</h2>
        <div class="meal__tags">
          <h3>Category: ${mealInfo.strCategory}</h3>
          <h3>Area: ${mealInfo.strArea}</h3>
        </div>
        <img src="${mealInfo.strMealThumb}" alt="${mealInfo.strMeal}"/>
        <div class="meal__list">
          <ul class="meal__ingredients">
          </ul>
        </div>
      </div>
    `,
  );

  const mealIngredients = document.querySelector('.meal__ingredients');

  for (let i = 1; i <= 20; i++) {
    const ingredientName = `strIngredient${i}`;
    const measureName = `strMeasure${i}`;

    if (mealInfo[ingredientName] !== '' && mealInfo[ingredientName] !== null) {
      mealIngredients.insertAdjacentHTML(
        'beforeend',
        `
        <li>
          <span>${
            mealInfo[ingredientName].charAt(0).toUpperCase() + mealInfo[ingredientName].slice(1)
          }</span>
          <span>${mealInfo[measureName]}</span>
        </li>
        `,
      );
    }
  }

  mealIngredients.insertAdjacentHTML(
    'beforeend',
    `
      <p class="meal__howto">
        ${mealInfo.strInstructions}
      </p>
    `,
  );
}
