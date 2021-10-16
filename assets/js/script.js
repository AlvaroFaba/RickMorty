$(function () {
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
      console.log(personaje);
      $("#card").append(insertarPersonaje(personaje));
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
}
