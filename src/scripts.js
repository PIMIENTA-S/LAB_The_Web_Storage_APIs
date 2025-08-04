let pokemonActual = null;

// function buscarPokemon() {
//   const contenedor = document.getElementById("favoritos");
//    contenedor.innerHTML = "";
//   const nombre = document.getElementById("pokemonInput").value.toLowerCase();
//   const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
//   const result = document.getElementById("result");
//   const imagenes = ["img/pokedex3.png", "img/pokedex2.png", "img/pokedex1.png"];

//   imagenes.forEach(i => {
//     setTimeout(() => {
//       result.innerHTML = `
//     <img src="${i}"
//   `
//     }, 1000);    
//   });


//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       pokemonActual = {
//         nombre: data.name,
//         imagen: data.sprites.other.dream_world.front_default || data.sprites.other["official-artwork"].front_default
//       };

//       result.innerHTML = `
//         <div class="favorito-card result-card">
//             <h3>${pokemonActual.nombre}</h3>
//             <img src="${pokemonActual.imagen}" alt="${pokemonActual.nombre}">
//             <button onclick="saveFavorite()">Guardar como favorito</button>
//         </div>
//       `;
//     })
//     .catch(() => {
//       alert("¡Error! Pokémon no encontrado");
//       pokemonActual = null;
//     });
// }

function buscarPokemon() {
  const contenedor_all = document.getElementById("favoritos-all");
  contenedor_all.innerHTML = "";

  const nombre = document.getElementById("pokemonInput").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
  const result = document.getElementById("result");

  const imagenes = ["img/pokedex3.png", "img/pokedex2.png", "img/pokedex1.png"];
  let indice = 0;

  function mostrarCuentaRegresiva() {
    if (indice < imagenes.length) {
      result.innerHTML = `<img class="imagen-cuenta" src="${imagenes[indice]}">`;
      indice++;
      setTimeout(mostrarCuentaRegresiva, 1000); // muestra la siguiente en 1 segundo
    } else {
      buscarEnAPI(); // cuando termine la cuenta regresiva, busca el Pokémon
    }
  }

  function buscarEnAPI() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        pokemonActual = {
          nombre: data.name,
          imagen: data.sprites.other.dream_world.front_default || data.sprites.other["official-artwork"].front_default
        };

        result.innerHTML = `
          <div class="favorito-card result-card">
              <h3>${pokemonActual.nombre}</h3>
              <img src="${pokemonActual.imagen}" alt="${pokemonActual.nombre}">
              <button onclick="saveFavorite()">Guardar como favorito</button>
          </div>
        `;
      })
      .catch(() => {
        alert("¡Error! Pokémon no encontrado");
        mostrarFavoritos();
      });
  }

  

  mostrarCuentaRegresiva(); // Inicia animación de cuenta regresiva
}


function saveFavorite() {
  if (!pokemonActual) return;

  // console.log(pokemonActual)

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  console.log(favoritos)

  const yaExiste = favoritos.some(p => p.nombre === pokemonActual.nombre);

  if (!yaExiste) {
    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  } else {
    console.log("Pokemon ya esta almacenado en favoritos")
  }
}


function mostrarFavoritos() {
  document.getElementById("result").style.display = "none";
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedor_all = document.getElementById('favoritos-all');
  contenedor_all.innerHTML = "";


  const title_favoritos = document.createElement('h2');
  title_favoritos.textContent = 'FAVORITOS';
  title_favoritos.id = 'favoritos-title';
  contenedor_all.prepend(title_favoritos);

  const contenedor_cards = document.createElement('div')
  contenedor_cards.id = 'favoritos';
  contenedor_cards.classList.add('favoritos-container');
  contenedor_all.append(contenedor_cards);

  favoritos.forEach(p => {
    contenedor_cards.innerHTML += `
    <div class="favorito-card">
        <h4>${p.nombre.toUpperCase()}</h4>
        <img src="${p.imagen}" alt="${p.nombre}">
    </div>
    `;
  });
}













