const pokeName = document.querySelector(".pokemon__name");
const pokeNum = document.querySelector(".pokemon__number");
const pokeImg = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let buscaPokemon = 1;

const procuraPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const carregaPokemon = async (pokemon) => {
  pokeName.innerHTML = "Loading...";
  pokeNum.innerHTML = "";

  const data = await procuraPokemon(pokemon);

  if (data) {
    pokeImg.style.display = "block";
    pokeName.innerHTML = data.name;
    pokeNum.innerHTML = data.id;
    pokeImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    buscaPokemon = data.id;
  } else {
    pokeImg.style.display = "none";
    pokeName.innerHTML = "Not found :c";
    pokeNum.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  carregaPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (buscaPokemon > 1) {
    buscaPokemon -= 1;
    carregaPokemon(buscaPokemon);
  }
});

btnNext.addEventListener("click", () => {
    buscaPokemon += 1;
    carregaPokemon(buscaPokemon);
});

carregaPokemon(buscaPokemon);
