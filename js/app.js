import { recipes } from "./recettes.js";

let dropdownDiv = document.getElementsByClassName("dropdown-content");
let ingredientsArrays;
let appareilsArrays;
let ustensilsArrays;
let index = 0;
let filter;

async function init() {
    getIngredients();
    getAppareils();
    getUstensiles();
    dropdown();
    eachRecipe();
    triBarreRecherche();
}
init();


function getIngredients() {

    ingredientsArrays = recipes.reduce((accumulator, recipe) => {
        recipe.ingredients.forEach(ingredient => {
            ingredient.ingredient = ingredient.ingredient.toLowerCase();
            if (!accumulator.includes(ingredient.ingredient)) {
                accumulator.push(ingredient.ingredient);
            }
        });
        return accumulator;
    }, []);

    ingredientsArrays.forEach(ingredientsArray => {
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("class", "ingredient");
        link.classList.add("item-dropdown");
        link.textContent = ingredientsArray;
        link.setAttribute("index", index);
        index++;
        dropdownDiv[0].appendChild(link);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            
            event.currentTarget.style.display = "none";
            let getIndex = event.currentTarget.getAttribute("index");

            const selectedIngredient = event.target.textContent;
            const selectedListItem = document.createElement("li");
            selectedListItem.setAttribute("class", "selected");

            const selectedListItemText = document.createElement("p");
            selectedListItemText.setAttribute("class", "textEmpty");
            selectedListItemText.textContent = selectedIngredient;

            const selectedListItemImage = document.createElement("img");
            selectedListItemImage.setAttribute("src", "medias/Checked.png");
            selectedListItemImage.setAttribute("class", "checked");
            selectedListItemImage.setAttribute("alt", "checked");
            selectedListItemImage.setAttribute("index", getIndex);

            selectedListItem.appendChild(selectedListItemText);
            selectedListItem.appendChild(selectedListItemImage);
            document.getElementById("selectedRecipeItem").appendChild(selectedListItem);
            deleteElement();
            searchSelectedItem();
        })
    })
}

function getAppareils() {

    appareilsArrays = recipes.reduce((accumulator, recipe) => {
        recipe.appliance = recipe.appliance.toLowerCase();
        if (recipe.appliance && !accumulator.includes(recipe.appliance)) {
            accumulator.push(recipe.appliance);
        }
        return accumulator;
    }, []);

    appareilsArrays.forEach(appareilsArray => {
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("class", "appareil");
        link.classList.add("item-dropdown");
        link.textContent = appareilsArray;
        link.setAttribute("index", index);
        index++;
        dropdownDiv[1].appendChild(link);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            event.currentTarget.style.display = "none";
            let getIndex = event.currentTarget.getAttribute("index");

            const selectedAppareils = event.target.textContent;
            const selectedListItem = document.createElement("li");
            selectedListItem.setAttribute("class", "selected_2");
            selectedListItem.classList.add("selected");

            const selectedListItemText = document.createElement("p");
            selectedListItemText.setAttribute("class", "textEmpty");
            selectedListItemText.textContent = selectedAppareils;

            const selectedListItemImage = document.createElement("img");
            selectedListItemImage.setAttribute("src", "medias/Checked.png");
            selectedListItemImage.setAttribute("class", "checked");
            selectedListItemImage.setAttribute("alt", "checked");
            selectedListItemImage.setAttribute("index", getIndex);

            selectedListItem.appendChild(selectedListItemText);
            selectedListItem.appendChild(selectedListItemImage);
            document.getElementById("selectedRecipeItem").appendChild(selectedListItem);
            deleteElement();
            searchSelectedItem();
        })
    })

}

function getUstensiles() {

    ustensilsArrays = recipes.reduce((accumulator, recipe) => {
        recipe.ustensils.forEach(ustensil => {
            ustensil = ustensil.toLowerCase();
            if (!accumulator.includes(ustensil)) {
                accumulator.push(ustensil);
            }
        });
        return accumulator;
    }, []);

    ustensilsArrays.forEach(ustensilesArray => {
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("class", "ustensile");
        link.classList.add("item-dropdown");
        link.textContent = ustensilesArray;
        link.setAttribute("index", index);
        index++;
        dropdownDiv[2].appendChild(link);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            event.currentTarget.style.display = "none";
            let getIndex = event.currentTarget.getAttribute("index");

            const selectedUstensils = event.target.textContent;
            const selectedListItem = document.createElement("li");
            selectedListItem.setAttribute("class", "selected_3");
            selectedListItem.classList.add("selected");

            const selectedListItemText = document.createElement("p");
            selectedListItemText.setAttribute("class", "textEmpty");
            selectedListItemText.textContent = selectedUstensils;

            const selectedListItemImage = document.createElement("img");
            selectedListItemImage.setAttribute("src", "medias/Checked.png");
            selectedListItemImage.setAttribute("class", "checked");
            selectedListItemImage.setAttribute("alt", "checked");
            selectedListItemImage.setAttribute("index", getIndex);

            selectedListItem.appendChild(selectedListItemText);
            selectedListItem.appendChild(selectedListItemImage);
            document.getElementById("selectedRecipeItem").appendChild(selectedListItem);
            deleteElement();
            searchSelectedItem();
        })
    })
}

function dropdown() {
    const searchInputs = [...document.querySelectorAll(".search-input")];
    const searchInputBar = document.getElementById("searchBarDiv_bar");
    window.addEventListener("load", resetSearchInput);

    // Fonction pour réinitialiser la valeur de chaque searchInput
    function resetSearchInput() {
        searchInputs.forEach((searchInput) => {
            searchInput.value = "";
            searchInputBar.value = "";
        });
    }

    searchInputs.forEach((searchInput) => {
        searchInput.addEventListener("input", searchInputDropdown);
        searchInput.addEventListener("mouseover", svgRotate);
        searchInput.addEventListener("input", searchInputFunction); 

        function searchInputDropdown(event) {
            const filter = event.currentTarget.value.toLowerCase();
            const dropdownLinks = event.currentTarget.closest(".dropdown").querySelectorAll(".dropdown-content a");

            dropdownLinks.forEach(function (dropdownLink) {

                if (dropdownLink.innerHTML.toLowerCase().includes(filter)) {

                    dropdownLink.style.display = "block";
                } else {
                    dropdownLink.style.display = "none";
                }
            });
        };
    });
}

function eachRecipe() {
    const blocGlobal = document.getElementById("recipes-bloc");

    recipes.forEach(recipe => {
        let recipeDiv = document.createElement("div");
        recipeDiv.setAttribute("class", "recipeUnity");
        recipeDiv.setAttribute("id", recipe.id);

        const image = document.createElement("img");
        image.setAttribute("src", "./Medias/Plat.jpg");
        image.setAttribute("class", "imageRecipe");
        image.setAttribute("alt", " ");

        const divData = document.createElement("div");
        divData.setAttribute("class", "divData");
        let textData0 = document.createElement("div")
        textData0.setAttribute("class", "headerDivData");

        let textData1 = document.createElement("p");
        textData1.textContent = recipe.name;

        let wrapperTime = document.createElement("div");
        wrapperTime.setAttribute("class", "wrapperTime");

        let textData2 = document.createElement("p");
        textData2.setAttribute("class", "timeDiv");
        textData2.textContent = recipe.time + " min";

        let imgChrono = document.createElement("img");
        imgChrono.setAttribute("src", "medias/Clock.png")
        imgChrono.setAttribute("id", "imgChrono");

        let textData3 = document.createElement("div");
        textData3.setAttribute("class", "ingredient-list");
        let ingredientsList = recipe.ingredients.map(ingredient => {
            let str = document.createElement("p");
            str.setAttribute("class", "ingredient-item");

            str.textContent = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1);


            if (ingredient.quantity) {
                str.textContent += "  :  ";
                let quantity = document.createElement("span");
                quantity.textContent = ingredient.quantity;

                if (ingredient.unit) {
                    quantity.textContent += " " + ingredient.unit + " ";
                }
                str.appendChild(quantity);
            }

            textData3.appendChild(str);
        })



        let textData4 = document.createElement("p");
        textData4.textContent = recipe.description.slice(0, 173) + "...";
        textData4.setAttribute("class", "descriptionRecipe");

        blocGlobal.appendChild(recipeDiv);

        recipeDiv.appendChild(image);
        recipeDiv.appendChild(divData);
        divData.appendChild(textData0);
        textData0.appendChild(textData1);
        textData0.appendChild(wrapperTime);
        wrapperTime.appendChild(imgChrono);
        wrapperTime.appendChild(textData2);
        divData.appendChild(textData3);
        divData.appendChild(textData4);

    });
}

function triBarreRecherche() {
    const searchInput = document.getElementById("searchBarDiv_bar");
    searchInput.addEventListener("input", searchInputFunction);
}








function searchInputFunction(event) {
    filter = normalizeText(event.currentTarget.value);
    let idTabs = [];

    if (filter.length >= 3) {
        recipes.forEach(function (recipe) {

            let isMatch = false;
            //logique de recherche dans les ingrédients
            recipe.ingredients.forEach(ingredient => {
                if (normalizeText(ingredient.ingredient).includes(filter)) {
                    isMatch = true;
                }
            })

            //logique de recherche dans les appareils
            if (normalizeText(recipe.appliance).includes(filter)) {
                isMatch = true;
            }

            //logique de recherche dans les ustensiles
            recipe.ustensils.forEach(ustensil => {
                if (normalizeText(ustensil).includes(filter)) {
                    isMatch = true;
                }
            })

            //logique de recherche dans les appareils
            if (normalizeText(recipe.name).includes(filter)) {
                isMatch = true;
            }

            //si match, ajoute au tableau
            if (isMatch) {
                idTabs.push(recipe.id);
            }
        });

        // //masque les recipe de base
        // const allSelectRecipes = document.querySelectorAll(".recipeUnity")
        // allSelectRecipes.forEach(allSelectRecipe => {
        //     allSelectRecipe.style.display= "none";
        // })

        // //affiche les recipe correspondantes au filter
        // idTabs.forEach(idTab => {
        //     const recipeToDisplay = document.getElementById(idTab);
        //     recipeToDisplay.style.display = "block";
        // })

        const allSelectRecipes = document.querySelectorAll(".recipeUnity");
        allSelectRecipes.forEach(recipe => {
            recipe.style.display = idTabs.includes(parseInt(recipe.id)) ? "block" : "none";
        });
    }

    if (filter.length < 3) {
        const allSelectRecipes = document.querySelectorAll(".recipeUnity");
        allSelectRecipes.forEach(recipe => {
            recipe.style.display = "block";
        });
    }
}

function searchSelectedItem() {
    let selecteds = document.querySelectorAll(".selected");
    let idTabs = [];

    selecteds.forEach(selected => {
        let filter = normalizeText(selected.textContent);
        console.log(filter)

        recipes.forEach(function (recipe) {

            let isMatch = false;
            //logique de recherche dans les ingrédients
            recipe.ingredients.forEach(ingredient => {
                if (normalizeText(ingredient.ingredient).includes(filter)) {
                    isMatch = true;
                }
            })

            //logique de recherche dans les appareils
            if (normalizeText(recipe.appliance).includes(filter)) {
                isMatch = true;
            }

            //logique de recherche dans les ustensiles
            recipe.ustensils.forEach(ustensil => {
                if (normalizeText(ustensil).includes(filter)) {
                    isMatch = true;
                }
            })

            //logique de recherche dans les appareils
            if (normalizeText(recipe.name).includes(filter)) {
                isMatch = true;
            }

            //si match, ajoute au tableau
            if (isMatch) {
                idTabs.push(recipe.id);
            }
        });

        const allSelectRecipes = document.querySelectorAll(".recipeUnity");
        const crossCloses = document.querySelectorAll(".checked");

        allSelectRecipes.forEach(recipe => {
            recipe.style.display = idTabs.includes(parseInt(recipe.id)) ? "block" : "none";
            crossCloses.forEach(crossClose => {
                crossClose.addEventListener("click", () => {
                    recipe.style.display = 'block';
                });
            });
        });
    });
}

function svgRotate(event) {

    if (event.currentTarget.nextElementSibling.style.transform === "rotate(0turn)") {
        event.currentTarget.nextElementSibling.style.transform = "rotate(0.5turn)";
    } else {
        event.currentTarget.nextElementSibling.style.transform = "rotate(0turn)";
    }

}

function deleteElement() {
    const crossCloses = document.querySelectorAll(".checked");

    crossCloses.forEach(crossClose => {
        crossClose.addEventListener("click", (event) => {
            event.currentTarget.closest("li").style.display = "none";
            // event.currentTarget.removeAttribute("class");
            const index = crossClose.getAttribute('index');
            const target = document.querySelector(`.item-dropdown[index="${index}"]`);
            target.style.display = 'block';
        });
    });
}

function normalizeText(str) {
    return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
