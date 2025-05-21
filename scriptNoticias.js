function normalizarDireccion(direccion, id) {
  const direccionCodificada = encodeURIComponent(direccion);

  const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
        const resultado = data.direccionesNormalizadas[0];
        const lat = resultado.coordenadas.y;
        const lng = resultado.coordenadas.x;
        mostrarMapa(direccion, id, lat, lng);
      } else {
        alert("No se encontraron resultados para la dirección.");
      }
    })
    .catch(error => {
      console.error("Error al normalizar la dirección:", error);
    });
}

function mostrarMapa(direccion, id, lat, lng) {
  const mapa = L.map('mapa' + id).setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: ' + direccion)
    .openPopup();
}

function filtrarNoticias() {
  fetch("noticias.json")
    .then(response => response.json())
    .then(noticias => {
      let buscarPor = "";
      let tipo = "";
      let texto = "";
      let filtradas = [];

      buscarPor = document.getElementById("selectBuscarPor").value;
      texto = document.getElementById("inputBuscar").value;
      /*Nos fijamos si se busca por titulo o contenido*/ 
      if (buscarPor === "titulo") {
        filtradas = noticias.filter(n => n.titulo.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));
      } else {
        filtradas = noticias.filter(n => n.descripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));
      }
      /*Nos fijamos que tipo de noticia se busca */
      tipo = document.getElementById("selectTipo").value;
      if (tipo !== "") {
        filtradas = noticias.filter(n => n.tipo === tipo);
      }
      /*Se hace para mostrar en pantalla la noticia y limpiarla para otra busqueda */
      const div = document.getElementById("divNoticias");
      div.innerHTML = "";

      /*Recorremos las noticias filtradas en un ciclo par mostrarlas en pantalla */
      filtradas.forEach(n => {
        const noticia = mostrarNoticia(n);
        div.appendChild(noticia);
      });
      document.getElementById("noticiasFiltradas").classList.remove('oculto');
    })
    .catch(error => console.error('Error al cargar JSON de noticias:', error));
}

function mostrarNoticia(noticia) {
  /*Usamos html en js directamente */
  let div = document.createElement("div");
  let html = "<h3>" + noticia.titulo + "</h3> ";
  html += "<p>" + noticia.descripcion + "</p>";
  html += " <div> ";
  html += "  <p><strong>Dirección: </strong> ";
  html += noticia.direccion + "</p>";
  html += " <button onclick=\"normalizarDireccion('" + noticia.direccion + "'," + noticia.id + ")\">Ver dirección en el mapa</button>";
  html += " </div> ";
  html += " <div id='mapa" + noticia.id + "' style='height: 300px; width: 100%;'></div>";
  html += "<div class='preguntas'>";
  html += "<h4> Preguntas y respuestas </h4>";
  html += "<div class='pregunta'>";
  html += "<p><strong>Vecino 1:</strong>" + noticia.pregunta1 + "</p>";
  html += "<p><strong>Admin:</strong>" + noticia.respuesta1 + "</p>";
  html += "<p><strong>Vecino 2:</strong>" + noticia.pregunta2 + "</p>";
  html += "<p><strong>Admin:</strong>" + noticia.respuesta2 + "</p>";
  div.innerHTML = html;
  return div;
}