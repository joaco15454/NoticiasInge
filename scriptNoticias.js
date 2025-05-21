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

        if (id === 69) {
          // Crear noticia
          document.getElementById("mensajeDireccion").innerText = "✅ Dirección válida y geolocalizada correctamente.";
          mostrarMapaCrear(lat, lng);
        } else {
          // Noticias existentes
          mostrarMapa(direccion, id, lat, lng);
        }
      } else {
        if (id === 0) {
          document.getElementById("mensajeDireccion").innerText = "❌ No se pudo normalizar la dirección. Intenta con otra.";
          document.getElementById("mapaDireccion").innerHTML = "";
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      }
    })
    .catch(error => {
      console.error("Error al normalizar la dirección:", error);
      if (id === 69) {
        document.getElementById("mensajeDireccion").innerText = "⚠️ Error al conectar con el servicio de geolocalización.";
        document.getElementById("mapaDireccion").innerHTML = "";
      }
    });
}

function mostrarMapaCrear(lat, lng) {
  // Limpia el contenedor por si ya se había creado un mapa antes
  document.getElementById("mapaDireccion").innerHTML = "";
  const mapa = L.map('mapaDireccion').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Ubicación encontrada')
    .openPopup();
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
  if (noticia.direccion !== null && noticia.direccion.trim() !== "") {
    html += "<div>";
    html += "<p><strong>Dirección:</strong> " + noticia.direccion + "</p>";
    html += "<button onclick=\"normalizarDireccion('" + noticia.direccion + "'," + noticia.id + ")\">Ver dirección en el mapa</button>";
    html += "</div>";
    html += "<div id='mapa" + noticia.id + "' style='height: 300px; width: 100%; margin-top: 10px;'></div>";
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
  // Tomar datos del formulario
  const titulo = document.getElementById("tituloNoticia").value;
  const descripcion = document.getElementById("descripcionNoticia").value;
  const direccion = document.getElementById("direccionNoticia").value;
  const tipo = document.getElementById("tipoNoticia").value;

  // Crear un objeto noticia temporal
  const noticiaTemp = {
    id: 9999, // ID ficticio para evitar conflictos
    titulo,
    descripcion,
    direccion: direccion.trim() === "" ? null : direccion,
    pregunta1: "Ejemplo de pregunta de un vecino",
    respuesta1: "Ejemplo de respuesta del administrador.",
    pregunta2: "Otra consulta común.",
    respuesta2: "Otra respuesta común.",
    tipo
  };

  // Generar el HTML con la misma función que se usa para mostrar noticias
  const divPreview = document.getElementById("previsualizacion");
  divPreview.innerHTML = "";
  const noticiaHTML = mostrarNoticia(noticiaTemp);
  divPreview.appendChild(noticiaHTML);
  divPreview.style.display = "block";

  // Si la dirección es válida, intentar normalizar y mostrar mapa
  if (noticiaTemp.direccion) {
    normalizarDireccion(noticiaTemp.direccion, noticiaTemp.id);
  }
}
