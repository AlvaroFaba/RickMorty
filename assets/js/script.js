// Variables Globales
var numeroEpisodios;
var arrayPersonajesAgregados = [];

// Funcion de Lectura Principal
$(function () {
  init();
  $("#buscar").click((e) => {
    buscarPersonaje();
  });
  $("#limpiar").click((c) => {
    limpiar();
  });
});

function buscarPersonaje() {
  var idPersonaje = $("#inputBusqueda").val();
  obtenerPersonaje(idPersonaje);
  $("#inputBusqueda").focus();
}

function obtenerPersonaje(id) {
  $.ajax({
    type: "GET",
    url: `https://rickandmortyapi.com/api/character/${id}`,
    success: function (personaje) {
      $("#card").append(insertarPersonaje(personaje));
      addPersonajeList(personaje);
      generarGrafico();
    },
  });
}

function insertarPersonaje(personaje) {
  var card = `
    <div class="col-sm-12 col-md-4">
        <div class="card">
            <img src="${personaje.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <div>Status: ${personaje.status}</div>
                <div>Especie: ${personaje.species}</div>
            </div>
        </div>
    </div>`;

  return card;
}

function limpiar() {
  $("#card").empty();
  $("#inputBusqueda").focus();
  cleanPersonajeAgregados();
}

function getAllEpisodes() {
  $.ajax({
    type: "GET",
    url: "https://rickandmortyapi.com/api/episode",
    success: function (response) {
      numeroEpisodios = response.info.count;
    },
  });
}

function init() {
  getAllEpisodes();
}

function addPersonajeList(personaje) {
  var grafico_personaje = {
    id: personaje.id,
    label: personaje.name,
    y: personaje.episode.length,
  };
  arrayPersonajesAgregados.push(grafico_personaje);
}

function generarGrafico() {
  var options = {
    animationEnabled: true,
    theme: "dark1",
    title: {
      text: `Participación Total en ${numeroEpisodios} Episodios `,
      fontFamily: 'Lobster',
      fontSize: 30,
    },
    backgroundColor: "#202328",
    axisY: {
      maximum: numeroEpisodios,
      interval: 5,
    },
    data: [
      {
        type: "column",
        dataPoints: [...arrayPersonajesAgregados],
      },
    ],
  };
  $("#grafico").CanvasJSChart(options);
}

function cleanPersonajeAgregados(){
  arrayPersonajesAgregados = [];
  generarGrafico();
}