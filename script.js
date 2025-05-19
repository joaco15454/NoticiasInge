let usuarioActual = null; // 'vecino', 'admin' o 'invitado'

let noticias = []; // Aquí cargaremos las noticias desde noticias.json

async function cargarNoticias() {
  const contenedor = document.getElementById("noticias-container");
  contenedor.innerHTML = "";

  // Si no se cargaron noticias aún, las cargamos desde JSON
  if (noticias.length === 0) {
    try {
      const response = await fetch("noticias.json");
      noticias = await response.json();

      // Agregamos campo preguntas a cada noticia para no romper el código actual
      noticias = noticias.map((n, i) => ({
        id: i + 1,
        titulo: n.titulo,
        descripcion: n.descripcion,
        direccion: n.direccion || "Dirección no disponible",
        lat: n.lat,
        lng: n.lng,
        preguntas: [], // Inicializamos vacío para preguntas
      }));
    } catch (error) {
      alert("Error al cargar las noticias");
      return;
    }
  }

  noticias.forEach((noticia) => {
    const article = document.createElement("article");
    article.classList.add("noticia");

    article.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p>${noticia.descripcion}</p>
      <div id="direccion-${noticia.id}">
        <p><strong>Dirección: </strong>${noticia.direccion}</p>
        <button onclick="mostrarMapa(${noticia.lat}, ${noticia.lng}, '${
      noticia.direccion
    }', ${noticia.id})" ${
      noticia.lat && noticia.lng ? "" : "disabled"
    }>Ver dirección en el mapa</button>
      </div>
      <div id="mapa-${
        noticia.id
      }" style="height: 300px; width: 100%; margin-top:10px;"></div>
      <div class="preguntas">
        <h4>Preguntas y respuestas</h4>
        ${
          noticia.preguntas
            .map(
              (p) => `
          <div class="pregunta">
            <p><strong>${p.autor}:</strong> ${p.texto}</p>
            <p><strong>Admin:</strong> ${p.respuesta}</p>
          </div>`
            )
            .join("") || "<p>No hay preguntas todavía.</p>"
        }
      </div>
      <div id="form-pregunta-${noticia.id}" class="${
      usuarioActual === "vecino" || usuarioActual === "admin" ? "" : "oculto"
    }">
        <textarea placeholder="Escribí tu pregunta..." required></textarea>
        <button onclick="enviarPregunta(${noticia.id})">Enviar pregunta</button>
      </div>
    `;

    contenedor.appendChild(article);
  });
}

function mostrarMapa(lat, lng, direccion, id) {
  if (!lat || !lng) {
    alert("No hay coordenadas disponibles para esta dirección.");
    return;
  }

  const mapaId = `mapa-${id}`;
  const mapaDiv = document.getElementById(mapaId);

  // Limpia mapa anterior
  mapaDiv.innerHTML = "";

  const map = L.map(mapaId).setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup(direccion).openPopup();
}

function enviarPregunta(idNoticia) {
  if (usuarioActual !== "vecino" && usuarioActual !== "admin") {
    alert("Debes estar registrado para hacer preguntas.");
    return;
  }

  const formDiv = document.getElementById(`form-pregunta-${idNoticia}`);
  const textarea = formDiv.querySelector("textarea");

  if (!textarea.value.trim()) {
    alert("La pregunta no puede estar vacía.");
    return;
  }

  // Guardamos la pregunta en el array
  const noticia = noticias.find((n) => n.id === idNoticia);
  noticia.preguntas.push({
    autor: usuarioActual === "admin" ? "Admin" : "Vecino",
    texto: textarea.value.trim(),
    respuesta: "Pendiente de respuesta",
  });

  textarea.value = "";

  cargarNoticias();
}

function mostrarSeccion(seccionId) {
  document.querySelectorAll(".pantalla").forEach((pantalla) => {
    pantalla.classList.add("oculto");
  });

  document.getElementById(seccionId).classList.remove("oculto");

  if (seccionId === "noticias") {
    cargarNoticias();
  }
}

function entrarComoInvitado() {
  usuarioActual = "invitado";
  document.getElementById("navbar").classList.remove("oculto");
  document.getElementById("btn-crear-noticia").style.display = "none";
  mostrarSeccion("noticias");
}

function login(event) {
  event.preventDefault();
  const tipoUsuario = event.target.querySelector("select").value;
  usuarioActual = tipoUsuario;

  document.getElementById("navbar").classList.remove("oculto");

  if (usuarioActual === "admin") {
    document.getElementById("btn-crear-noticia").style.display = "block";
  } else {
    document.getElementById("btn-crear-noticia").style.display = "none";
  }

  mostrarSeccion("noticias");
}

function volverInicio() {
  usuarioActual = null;
  document.getElementById("navbar").classList.add("oculto");
  mostrarSeccion("inicio");
}

function crearNoticia(event) {
  event.preventDefault();

  if (usuarioActual !== "admin") {
    alert("Solo el administrador puede crear noticias.");
    return;
  }

  const titulo = document.getElementById("tituloNoticia").value.trim();
  const descripcion = document
    .getElementById("descripcionNoticia")
    .value.trim();
  const direccion = document.getElementById("direccionNoticia").value.trim();

  if (!titulo || !descripcion || !direccion) {
    alert("Completa todos los campos.");
    return;
  }

  noticias.push({
    id: noticias.length + 1,
    titulo,
    descripcion,
    direccion,
    lat: null,
    lng: null,
    preguntas: [],
  });

  alert("Noticia creada con éxito.");
  mostrarSeccion("noticias");
  cargarNoticias();
}

function registrarse(event) {
  event.preventDefault();
  alert("Funcionalidad de registro no implementada en este ejemplo.");
}
