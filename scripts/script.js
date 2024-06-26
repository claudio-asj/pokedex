// funcao chamada ao clicar no btn de pesquisar pokemon
async function searchPokemon() {
  const input = document.getElementById("id-pokemon").value;

  const pokemon = await getPokemonById(input);

  if (pokemon == false) {
    alert(`This pokemon ${input} dont exist`);
  } else {
    const response = {
      name: getName(pokemon),
      img: getImg(pokemon),
      types: getTypes(pokemon),
    };

    console.log(response);

    printPokemons(response);
  }
}

// funcao que busca as informações do pokemon dado o id dele e retorna o Object pokemon
async function getPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = null;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => (response = data))
    .catch((error) => {
      console.log(error);
      response = false;
    });

  return response;
}

function getName(pokemon) {
  return pokemon.forms[0].name;
}

function getImg(pokemon) {
  return pokemon.sprites.front_default;
}

function getTypes(pokemon) {
  let types = [];

  pokemon.types.forEach((type) => {
    types.push(type.type.name);
  });

  return types;
}

function printPokemons(pokemon) {

  let typesHtml = "";
  pokemon.types.forEach((type) =>{
    typesHtml += `<div class="type ${type}">${type}</div>`
  })

  const html = `
      <div id="img-pokemon">
        <img src="${pokemon.img}" alt="" />
      </div>
      
      <div id="about-pokemon">
        <div id="name">${pokemon.name}</div>
        <div id="types">
          ${typesHtml}
        </div>
      </div>`;

    const modal = document.getElementById("modal")
    modal.style.display = 'flex'
    modal.innerHTML = html;
}
