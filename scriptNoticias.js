function normalizarDireccion(direccion, id) {
  const direccionCodificada = encodeURIComponent(direccion);
  const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const sugerenciasDiv = document.getElementById("sugerenciasDireccion");
      sugerenciasDiv.innerHTML = "";
      const mapaDiv = document.getElementById("mapaDireccion");
      if (id === 73) mapaDiv.innerHTML = "";

      const mensaje = document.getElementById("mensajeDireccion");

      if (
        data.direccionesNormalizadas &&
        data.direccionesNormalizadas.length > 0
      ) {
        const resultados = data.direccionesNormalizadas;

        if (id === 73 && resultados.length > 1) {
          let html =
            "<p><strong>¿Quisiste decir alguna de estas direcciones?</strong></p><ul>";
          resultados.forEach((dir) => {
            html += `<li>${dir.direccion}</li>`;
          });
          html += "</ul>";
          sugerenciasDiv.innerHTML = html;
          mensaje.innerText =
            "⚠️ Se encontraron múltiples coincidencias. Por favor, especificá mejor la dirección.";
          return;
        }

        const primerResultado = resultados[0];
        if (primerResultado.coordenadas) {
          const lat = primerResultado.coordenadas.y;
          const lng = primerResultado.coordenadas.x;

          if (id === 73) {
            const mapaDiv = document.getElementById("mapaDireccion");
            mapaDiv.innerHTML = "";
            mensaje.innerText = "✅ Dirección encontrada y geolocalizada.";
            mostrarMapaCrear(lat, lng);
          } else {
            mostrarMapa(direccion, id, lat, lng);
          }
        } else {
          if (id === 73) {
            mensaje.innerText =
              "⚠️ Dirección válida pero sin coordenadas. No se puede mostrar el mapa.";
          }
        }
      } else {
        if (id === 73) {
          mensaje.innerText =
            "❌ No se pudo encontrar la dirección. Intenta ser más específico.";
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      }
    })
    .catch((error) => {
      console.error("Error al normalizar la dirección:", error);
      if (id === 73) {
        document.getElementById("mensajeDireccion").innerText =
          "⚠️ Error al conectar con el servicio de normalización.";
        document.getElementById("mapaDireccion").innerHTML = "";
      }
    });
}

let mapaCrearInstance = null;

function mostrarMapaCrear(lat, lng) {
  if (mapaCrearInstance) {
    mapaCrearInstance.remove();
    mapaCrearInstance = null;
  }

  mapaCrearInstance = L.map("mapaDireccion").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapaCrearInstance);

  L.marker([lat, lng])
    .addTo(mapaCrearInstance)
    .bindPopup("Ubicación encontrada")
    .openPopup();
}

function mostrarMapa(direccion, id, lat, lng) {
  const mapa = L.map("mapa" + id).setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  L.marker([lat, lng])
    .addTo(mapa)
    .bindPopup("Dirección: " + direccion)
    .openPopup();
}

function filtrarNoticias() {
  fetch("noticias.json")
    .then((response) => response.json())
    .then((noticias) => {
      let buscarPor = "";
      let tipo = "";
      let texto = "";
      let filtradas = [];

      buscarPor = document.getElementById("selectBuscarPor").value;
      texto = document.getElementById("inputBuscar").value;
      if (buscarPor === "titulo") {
        filtradas = noticias.filter((n) =>
          n.titulo.toLocaleLowerCase().includes(texto.toLocaleLowerCase())
        );
      } else {
        filtradas = noticias.filter((n) =>
          n.descripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase())
        );
      }
      tipo = document.getElementById("selectTipo").value;
      if (tipo !== "") {
        filtradas = noticias.filter((n) => n.tipo === tipo);
      }
      const div = document.getElementById("divNoticias");
      div.innerHTML = "";

      filtradas.forEach((n) => {
        const noticia = mostrarNoticia(n);
        div.appendChild(noticia);
      });
      document.getElementById("noticiasFiltradas").classList.remove("oculto");
    })
    .catch((error) =>
      console.error("Error al cargar JSON de noticias:", error)
    );
}

function mostrarNoticia(noticia) {
  let div = document.createElement("div");
  let html = "<h3>" + noticia.titulo + "</h3> ";
  html += "<p>" + noticia.descripcion + "</p>";
  if (noticia.direccion !== null && noticia.direccion.trim() !== "") {
    html += "<div>";
    html += "<p><strong>Dirección:</strong> " + noticia.direccion + "</p>";
    html +=
      "<button onclick=\"normalizarDireccion('" +
      noticia.direccion +
      "'," +
      noticia.id +
      ')">Ver dirección en el mapa</button>';
    html += "</div>";
    html +=
      "<div id='mapa" +
      noticia.id +
      "' style='height: 300px; width: 100%; margin-top: 10px;'></div>";
  }

  html += "<div class='preguntas'>";
  html += "<h4>Preguntas y respuestas</h4>";
  html += "<div class='pregunta'>";
  html += "<p><strong>Vecino 1:</strong> " + noticia.pregunta1 + "</p>";
  html += "<p><strong>Admin:</strong> " + noticia.respuesta1 + "</p>";
  html += "<p><strong>Vecino 2:</strong> " + noticia.pregunta2 + "</p>";
  html += "<p><strong>Admin:</strong> " + noticia.respuesta2 + "</p>";
  html += "</div></div>";

  div.innerHTML = html;
  return div;
}

function previsualizarNoticia() {
  const titulo = document.getElementById("tituloNoticia").value;
  const descripcion = document.getElementById("descripcionNoticia").value;
  const direccion = document.getElementById("direccionNoticia").value;
  const tipo = document.getElementById("tipoNoticia").value;

  const noticiaTemp = {
    id: 9999,
    titulo,
    descripcion,
    direccion: direccion.trim() === "" ? null : direccion,
    pregunta1: "Ejemplo de pregunta de un vecino",
    respuesta1: "Ejemplo de respuesta del administrador.",
    pregunta2: "Otra consulta común.",
    respuesta2: "Otra respuesta común.",
    tipo,
  };

  const divPreview = document.getElementById("previsualizacion");
  divPreview.innerHTML = "";
  const noticiaHTML = mostrarNoticia(noticiaTemp);
  divPreview.appendChild(noticiaHTML);
  divPreview.style.display = "block";

  if (noticiaTemp.direccion) {
    normalizarDireccion(noticiaTemp.direccion, noticiaTemp.id);
  }
}
