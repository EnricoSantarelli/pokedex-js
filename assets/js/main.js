const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonToCard(pokemon) {
  return `
        <main class="${pokemon.types[0]}">
        <header class="details">
        <a href="index.html" class="arrow"><i class="ph ph-arrow-left"></i></a>
        <h1 class="pokemon_name">${pokemon.name}</h1>
        <div class="characteristics">
        <ol class="pokemon_types">
        ${pokemon.types.map((type) => `<li class="pokemon_type ${type}">${type}</li>`).join("")}
        </ol>
            <span class="pokemon_number">#${pokemon.number}</span>
        </div>
        </header>
        <section class="principal">
        <img
            src=${pokemon.photo}
            alt=${pokemon.name}
            class="image"
        />
        <ol class="stats">
            <li class="stat">
            <div class="values">
                <p class="atributte">HP</p>
                <p class="value">${pokemon.hp}</p>
            </div>

            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
            <li class="stat">
            <div class="values">
                <p class="atributte">Attack</p>
                <p class="value">${pokemon.attack}</p>
            </div>
            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
            <li class="stat">
            <div class="values">
                <p class="atributte">Defense</p>
                <p class="value">${pokemon.defense}</p>
            </div>
            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
            <li class="stat">
            <div class="values">
                <p class="atributte">Sp. Atk</p>
                <p class="value">${pokemon.sp_atk}</p>
            </div>
            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
            <li class="stat">
            <div class="values">
                <p class="atributte">Sp. Def</p>
                <p class="value">${pokemon.sp_def}</p>
            </div>
            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
            <li class="stat">
            <div class="values">
                <p class="atributte">Speed</p>
                <p class="value">${pokemon.speed}</p>
            </div>
            <div class="indicator">
                <div class="progress ${pokemon.types[0]}"></div>
            </div>
            </li>
        </ol>
        </section>
    </main>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

    for (let element of pokemonList.children) {
      element.addEventListener("click", () => {
        pokeApi
          .getPokemonCard(element.children[1].innerHTML)
          .then((pokemon) => {
            const newCardHtml = convertPokemonToCard(pokemon)
            const body = document.getElementsByTagName("body")
            body[0].innerHTML = newCardHtml;
            const bars  = document.getElementsByClassName("progress")

            bars[0].style.width =`${pokemon.hp}%`
            bars[1].style.width =`${pokemon.attack}%`
            bars[2].style.width =`${pokemon.defense}%`
            bars[3].style.width =`${pokemon.sp_atk}%`
            bars[4].style.width =`${pokemon.sp_def}%`
            bars[5].style.width =`${pokemon.speed}%`

          });
      });
    }
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
