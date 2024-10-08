const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonLiButton = document.getElementById("pokemonLiButton")
const modal = document.getElementById("modal")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <button id="pokemonLiButton" class="pokeButton" onclick="showModal(${pokemon.number})"><li class="pokemon ${pokemon.type}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}Detail">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li></button>
    `
}

function convertPokemonDetailsToModal(pokemon){
    return `
        <div id="pokemon-details" class="pokeDetail ${pokemon.type}Detail">
                <div class="modal-content ${pokemon.type}Detail">
                    <div class="detailsPoke ${pokemon.type}Detail">
                        <button onclick= hideModal() id="close-details" type="button">Fechar</button>
                        <p class="number">#${pokemon.number}</p>
                        <p class="name">${pokemon.name}</p>
                        <div class="types">
                                ${pokemon.types.map((type) => `<span class="type ${type}Detail">${type}</span>`).join('')}
                        </div>
                        <p class="pokePhoto">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </p>
                        <p>
                        <ol class="pokeInfo">        
                            <li><span class="tituloInfo">Peso</span><span>${pokemon.weight}</span></li>
                            <li><span class="tituloInfo">Altura</span><span>${pokemon.height}</span></li>
                        </ol>
                        </p>
                    </div>
                </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function showModal(pokemonNumber){
    modal.classList.add("show-modal")
    pokeApi.getPokemons(offset, limit).then(pokemons => {
        const selectedPokemon = pokemons.find(pokemon => pokemon.number === pokemonNumber)
        if (selectedPokemon) {
            loadPokemonsDetails(selectedPokemon)
        }
    })
}

function loadPokemonsDetails(pokemon){
        const newHtml = convertPokemonDetailsToModal(pokemon)
        modal.innerHTML += newHtml
}
function hideModal(){
    const elemento = document.getElementById("modal")
    elemento.classList.remove("show-modal")
    const elementoDetail = document.getElementById("pokemon-details")
    elementoDetail.remove("pokemon-details")
}
