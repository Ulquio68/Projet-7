import { recipes } from "./recettes.js";

let dropdownDiv = document.getElementsByClassName("dropdown-content");
let index = 0;
let filter;
let idTabs = [];
let selectedItems = {
    searchInput: "",
    ingredientTags: [],
    applianceTags: [],
    ustensilsTags: []
};

async function init() {
    getIngredients();
    getAppareils();
    getUstensiles();
    dropdown();
    eachRecipe();
    triBarreRecherche();
    window.addEventListener("load", resetSearchInput);
}
init();

//créé les liens inredients dans le dropdown 1
function getIngredients() {

    let ingredientsArrays = recipes.reduce((accumulator, recipe) => {
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
        if (link.text.length > 30) {
            link.style.fontSize = "12px"
        }
        index++;
        dropdownDiv[0].appendChild(link);

        link.addEventListener("click", (event) => {
            resetSearchInputNoBar();
            event.preventDefault();
            selectedItems.ingredientTags.push(event.target.textContent);


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

            if (selectedListItemText.textContent.length > 30) {
                selectedListItemText.style.fontSize = "11px"
            }

            selectedListItem.appendChild(selectedListItemText);
            selectedListItem.appendChild(selectedListItemImage);
            document.getElementById("selectedRecipeItem").appendChild(selectedListItem);
            //deleteElement sinon cross ne marche pas
            deleteElement(event);
            //permet de trier la recette selon le selectionné
            globalSearch();
        })
    })
}

//créé les liens appareils dans le dropdown 2
function getAppareils() {

    let appareilsArrays = recipes.reduce((accumulator, recipe) => {
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
            resetSearchInputNoBar();
            event.preventDefault();
            event.currentTarget.style.display = "none";
            let getIndex = event.currentTarget.getAttribute("index");
            selectedItems.applianceTags.push(event.target.textContent);


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
            //deleteElement sinon cross ne marche pas
            deleteElement(event);
            //permet de trier la recette selon le selectionné
            globalSearch();
        })
    })
}

//créé les liens ustensiles dans le dropdown 3
function getUstensiles() {

    let ustensilsArrays = recipes.reduce((accumulator, recipe) => {
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
            resetSearchInputNoBar();
            event.preventDefault();
            event.currentTarget.style.display = "none";
            let getIndex = event.currentTarget.getAttribute("index");
            selectedItems.ustensilsTags.push(event.target.textContent);


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
            //deleteElement sinon cross ne marche pas
            deleteElement(event);
            //permet de trier la recette selon le selectionné
            globalSearch();
        })
    })
}

//affiche le dropdown par rapport au texte tapé dans la recherche des dropdown
function dropdown() {
    const searchInputs = [...document.querySelectorAll(".search-input")];

    searchInputs.forEach((searchInput) => {
        searchInput.addEventListener("input", searchInputDropdown);
        searchInput.addEventListener("mouseover", svgRotate);

        function searchInputDropdown(event) {
            const filter = normalizeText(event.currentTarget.value.toLowerCase());
            const dropdownLinks = event.currentTarget.closest(".dropdown").querySelectorAll(".dropdown-content a");

            dropdownLinks.forEach(function (dropdownLink) {


                if (normalizeText(dropdownLink.innerHTML).includes(filter)) {

                    dropdownLink.style.display = "block";
                } else {
                    dropdownLink.style.display = "none";
                }
            });
        };
    });
}

//créé l'affichage de chaque recette
function eachRecipe() {
    const blocGlobal = document.getElementById("recipes-bloc");

    recipes.forEach(recipe => {
        let recipeDiv = document.createElement("div");
        recipeDiv.setAttribute("class", "recipeUnity");
        recipeDiv.setAttribute("id", recipe.id);

        const image = document.createElement("div");
        image.setAttribute("class", "imageRecipe");

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
        recipe.ingredients.map(ingredient => {
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

//appelle la function de recherche quand on tape du texte dans la barre générale
function triBarreRecherche() {
    const searchInput = document.getElementById("searchBarDiv_bar");
    searchInput.addEventListener("input", searchInputFunction);

    //cherche par rapport à la barre de recherche
    function searchInputFunction(event) {

        filter = normalizeText(event.currentTarget.value);

        if (filter.length >= 3) {
            selectedItems.searchInput = filter;
            globalSearch();
        } else {
            selectedItems.searchInput = "";
            globalSearch();
        }
    }
}






//cherche par rapport à la var selectedItems
function globalSearch() {
    idTabs = [];
    const allSelectRecipes = document.querySelectorAll(".recipeUnity");

    recipes.forEach(function (recipe) {
        let isMatch = true;
        //logique de recherche dans les ingrédients
        selectedItems.ingredientTags.forEach(tag => {
            if (!recipe.ingredients.some(ingredient => normalizeText(ingredient.ingredient).includes(normalizeText(tag)))) {
                isMatch = false;
            }
        })

        //logique de recherche dans les appareils
        selectedItems.applianceTags.forEach(applianceTag => {
            if (selectedItems.applianceTags.length > 0 && !normalizeText(recipe.appliance).includes(normalizeText(applianceTag))) {
                isMatch = false;
            }
        })


        //logique de recherche dans les ustensiles
        selectedItems.ustensilsTags.forEach(tag => {
            if (!recipe.ustensils.some(ustensil => normalizeText(ustensil).includes(normalizeText(tag)))) {
                isMatch = false;
            }
        })

// logique de recherche dans le champ de recherche
if (selectedItems.searchInput !== "") {
    const searchWords = selectedItems.searchInput.split(" ");
    const recipeName = normalizeText(recipe.name);
    const recipeIngredients = recipe.ingredients.map(ingredient => normalizeText(ingredient.ingredient)).join(" ");
    const recipeDescription = normalizeText(recipe.description);
    const recipeUstensils = recipe.ustensils.map(ustensil => normalizeText(ustensil));

    let foundSearchWords = 0;
    let searchWordsLength = searchWords.length;

    for (let i = 0; i < searchWordsLength; i++) {
        let searchWord = normalizeText(searchWords[i]);
        if (recipeName.indexOf(searchWord) !== -1) {
            foundSearchWords++;
        } else {
            let recipeIngredientsWords = recipeIngredients.split(" ");
            let recipeIngredientsWordsLength = recipeIngredientsWords.length;
            for (let j = 0; j < recipeIngredientsWordsLength; j++) {
                if (recipeIngredientsWords[j].indexOf(searchWord) !== -1) {
                    foundSearchWords++;
                    break;
                }
            }
            if (recipeDescription.indexOf(searchWord) !== -1) {
                foundSearchWords++;
            }
            let recipeUstensilsLength = recipeUstensils.length;
            for (let k = 0; k < recipeUstensilsLength; k++) {
                if (recipeUstensils[k].indexOf(searchWord) !== -1) {
                    foundSearchWords++;
                    break;
                }
            }
        }
    }

    if (foundSearchWords === 0) {
        isMatch = false;
    }
}

        //si match, ajoute au tableau
        if (isMatch) {
            idTabs.push(recipe.id);
        }
    });

    allSelectRecipes.forEach(recipe => {
        recipe.style.display = idTabs.includes(parseInt(recipe.id)) ? "block" : "none";
    });

    updateDropdownIngredients();
    updateDropdownAppareils();
    updateDropdownUstensiles();
    affichageSentenceWithoutRecipe();
}

//au clic de la cross ca rajoute le a dans le dropdown concerné
function deleteElement() {
    const crossCloses = document.querySelectorAll(".checked");

    crossCloses.forEach(crossClose => {
        crossClose.addEventListener("click", (event) => {
            event.currentTarget.closest("li").style.display = "none";
            const index = crossClose.getAttribute('index');
            const target = document.querySelector(`.item-dropdown[index="${index}"]`);
            event.currentTarget.style.display = 'block';
            //ici j'ai modif target par event.currentTarget si jamais faut reset

            let clickedItem = event.currentTarget.closest("li").textContent;

            for (let i in selectedItems) {
                if (Array.isArray(selectedItems[i])) {
                    let index = selectedItems[i].indexOf(clickedItem);
                    if (index !== -1) {
                        selectedItems[i].splice(index, 1);
                    }
                }
            }
            globalSearch();
        });
    });
}

//rotate le svg
function svgRotate(event) {
    if (event.currentTarget.nextElementSibling.style.transform === "rotate(0turn)") {
        event.currentTarget.nextElementSibling.style.transform = "rotate(0.5turn)";
    } else {
        event.currentTarget.nextElementSibling.style.transform = "rotate(0turn)";
    }
}

//applatit le texte
function normalizeText(str) {
    return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// Fonction pour réinitialiser la valeur de chaque searchInput
function resetSearchInput() {
    const searchInputs = [...document.querySelectorAll(".search-input")];
    const searchInputBar = document.getElementById("searchBarDiv_bar");

    searchInputBar.value = "";
    searchInputs.forEach((searchInput) => {
        searchInput.value = "";

    });
}

// Fonction pour réinitialiser la valeur de chaque searchInput
function resetSearchInputNoBar() {
    const searchInputs = [...document.querySelectorAll(".search-input")];

    searchInputs.forEach((searchInput) => {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
    });
}

//met à jour le dropDown ingrédients
function updateDropdownIngredients() {
    let recipesStillHere = [];
    recipes.forEach(recipe => {
        if (idTabs.includes(recipe.id)) {
            recipesStillHere.push(recipe)
        }
    })

    let ingredientsArrays = recipesStillHere.reduce((accumulator, recipe) => {
        recipe.ingredients.forEach(ingredient => {
            ingredient.ingredient = ingredient.ingredient.toLowerCase();
            if (!accumulator.includes(ingredient.ingredient)) {
                accumulator.push(ingredient.ingredient);
            }
        });
        return accumulator;
    }, []);

    dropdownDiv[0].innerHTML = "";

    ingredientsArrays.forEach(ingredientsArray => {
        if (!selectedItems.ingredientTags.includes(ingredientsArray)) {
            let link = document.createElement("a");

            link.setAttribute("href", "#");
            link.setAttribute("class", "ingredient");
            link.classList.add("item-dropdown");
            link.textContent = ingredientsArray;
            link.setAttribute("index", index);
            if (link.text.length > 30) {
                link.style.fontSize = "12px"
            }
            index++;
            dropdownDiv[0].appendChild(link);
    
            link.addEventListener("click", (event) => {
                resetSearchInputNoBar();
                event.preventDefault();
                selectedItems.ingredientTags.push(event.target.textContent);

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

                if (selectedListItemText.textContent.length > 30) {
                    selectedListItemText.style.fontSize = "11px"
                }
    
                selectedListItem.appendChild(selectedListItemText);
                selectedListItem.appendChild(selectedListItemImage);
                document.getElementById("selectedRecipeItem").appendChild(selectedListItem);
                //deleteElement sinon cross ne marche pas
                deleteElement(event);
                //permet de trier la recette selon le selectionné
                globalSearch();
            })
        }
    })
}

//met à jour le dropDown appareils
function updateDropdownAppareils() {
    let recipesStillHere = [];
    recipes.forEach(recipe => {
        if (idTabs.includes(recipe.id)) {
            recipesStillHere.push(recipe)
        }
    })

    let appareilsArrays = recipesStillHere.reduce((accumulator, recipe) => {
        recipe.appliance = recipe.appliance.toLowerCase();
        if (recipe.appliance && !accumulator.includes(recipe.appliance)) {
            accumulator.push(recipe.appliance);
        }
        return accumulator;
    }, []);

    dropdownDiv[1].innerHTML = "";

    appareilsArrays.forEach(appareilsArray => {
        if (!selectedItems.applianceTags.includes(appareilsArray)) {
            let link = document.createElement("a");
            link.setAttribute("href", "#");
            link.setAttribute("class", "appareil");
            link.classList.add("item-dropdown");
            link.textContent = appareilsArray;
            link.setAttribute("index", index);
            index++;
            dropdownDiv[1].appendChild(link);
    
            link.addEventListener("click", (event) => {
                resetSearchInputNoBar();
                event.preventDefault();
                let getIndex = event.currentTarget.getAttribute("index");
                selectedItems.applianceTags.push(event.target.textContent);
    
    
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
                //deleteElement sinon cross ne marche pas
                deleteElement(event);
                //permet de trier la recette selon le selectionné
                globalSearch();
            })
        }
    })
}

//met à jour le dropDown ustensiles
function updateDropdownUstensiles() {
    let recipesStillHere = [];
    recipes.forEach(recipe => {
        if (idTabs.includes(recipe.id)) {
            recipesStillHere.push(recipe)
        }
    })

    let ustensilsArrays = recipesStillHere.reduce((accumulator, recipe) => {
        recipe.ustensils.forEach(ustensil => {
            ustensil = ustensil.toLowerCase();
            if (!accumulator.includes(ustensil)) {
                accumulator.push(ustensil);
            }
        });
        return accumulator;
    }, []);

    dropdownDiv[2].innerHTML = "";

    ustensilsArrays.forEach(ustensilesArray => {
        if (!selectedItems.ustensilsTags.includes(ustensilesArray)) {
            let link = document.createElement("a");
            link.setAttribute("href", "#");
            link.setAttribute("class", "ustensile");
            link.classList.add("item-dropdown");
            link.textContent = ustensilesArray;
            link.setAttribute("index", index);
            index++;
            dropdownDiv[2].appendChild(link);
    
            link.addEventListener("click", (event) => {
                resetSearchInputNoBar();
                event.preventDefault();
                event.currentTarget.style.display = "none";
                let getIndex = event.currentTarget.getAttribute("index");
                selectedItems.ustensilsTags.push(event.target.textContent);
    
    
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
                //deleteElement sinon cross ne marche pas
                deleteElement(event);
                //permet de trier la recette selon le selectionné
                globalSearch();
            })
        }
    })
}

//affiche la phrase si y a zéro recettes trouvées
function affichageSentenceWithoutRecipe() {
    const sentence = document.getElementById("alerte-zero");
    const recipes = document.querySelectorAll('.recipeUnity');
  
    let isAnyRecipeDisplayed = false;
    for (const recipe of recipes) {
      if (recipe.style.display !== "none") {
        isAnyRecipeDisplayed = true;
      }
    }
  
    if (!isAnyRecipeDisplayed) {
      sentence.style.display = "flex";
    } else {
      sentence.style.display = "none";
    }
}
