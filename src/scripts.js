// const pokemon = document.getElementById("pokemonInput").value.toLowerCase();

// const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

// console.log(pokemon)


// function buscarPokemon(){
//     fetch(url) 
//      .then(function(response) { 
//      return response.json(); 
//      }) 
//      .then(function(data) { 
//      // Datos del Pokémon aquí 
//      console.log(data);
//      }) 
//      .catch(function(error) { 
//      alert("¡Error! Pokémon no encontrado"); 
//      }); 

// }

// paula

let pokemonActual = null;

function buscarPokemon() {
    const contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "";
  const nombre = document.getElementById("pokemonInput").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      pokemonActual = {
        nombre: data.name,
        imagen: data.sprites.front_default
      };

      document.getElementById("result").innerHTML = `
        <h3>${pokemonActual.nombre}</h3>
        <img src="${pokemonActual.imagen}" alt="${pokemonActual.nombre}">
        <button onclick="saveFavorite()">Guardar como favorito</button>
      `;
    })
    .catch(() => {
      alert("¡Error! Pokémon no encontrado");
      pokemonActual = null;
    });
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
    } else{
        console.log("Pokemon ya esta almacenado en favoritos")
    }
  }


function mostrarFavoritos() {
    document.getElementById("result").innerHTML = ""
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const contenedor = document.getElementById("favoritos");
contenedor.innerHTML = "";


favoritos.forEach(p => {
    contenedor.innerHTML += `
    <div>
        <h4>${p.nombre}</h4>
        <img src="${p.imagen}" alt="${p.nombre}">
    </div>
    `;
});
}














// .then(res => res.json())
// .then(data => {