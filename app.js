const loadMeals =(searchText) =>{
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
fetch(url)
.then(res => res.json())
.then (data => displayMeals(data.meals))
}


const displayMeals =meals=>{
    
  const mealcontainer = document.getElementById('mealContainer')
  mealcontainer.innerHTML ='';
  meals.forEach(mealsItem => {

        const melDiv =document.createElement('div')
        melDiv.classList.add('col')
        melDiv.innerHTML =`    <div class="card h-100">
        <img src="${mealsItem.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mealsItem.strMeal}</h5>
          <p class="card-text">${mealsItem.strInstructions.slice(1, 200)}</p>

          <button onclick="loadMealDetails2(${mealsItem.idMeal})" type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetails">
  Details
</button>

        </div>
      </div>
        `
        mealcontainer.appendChild(melDiv)

    });

}


const searchMeal =()=>{
    // button clicked
    const searchText = document.getElementById('searchText').value;

    loadMeals(searchText)
    
};


// without await + async & click button change onclick btn function
// const loadMealDetails = Mealid =>{
//   const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Mealid}`
//   fetch (url) 
//   .then(res => res.json())
//   .then(data => displayModalDetails(data.meals[0]))
//   .catch(error =>console.log(error))
  
// }



//  with async & await and error handeling
const loadMealDetails2 = async(mealid) =>{
  const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
try{
  const res = await fetch(url);
const data = await res.json()
displayModalDetails(data.meals[0])
}
catch (error){
  console.log(error)
}

}

const displayModalDetails = meal =>{
  document.getElementById('detailsModalTitle').innerText = meal.strMeal;
  document.getElementById('mealdetailParagraph').innerText= meal.strInstructions.slice(201, 500);
  const melimage = document.getElementById('melimg')
  melimage.innerHTML =`<img class="img-fluid" src="${meal.strMealThumb}"> `

}


loadMeals('fish');