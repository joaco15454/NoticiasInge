let usuarioRegistrado = false;
let tipoUsuario = null;

function login(event) {
  event.preventDefault();
  tipoUsuario = document.querySelector('#login select').value;
  alert("Sesión iniciada (simulado)");
  usuarioRegistrado = true;
  document.getElementById('navbar').classList.remove('oculto');
  mostrarSeccion('noticias');
  mostrarFormularioPreguntas();

  const btnCrear = document.getElementById('btn-crear-noticia');
  if (tipoUsuario === 'admin') {
    btnCrear.style.display = 'inline-block';
  } else {
    btnCrear.style.display = 'none';
  }

  mostrarSeccion("noticias");
}

function registrarse(event) {
  event.preventDefault();
  alert("¡Registro exitoso (simulado)!");
  usuarioRegistrado = true;
  document.getElementById('navbar').classList.remove('oculto');
  mostrarSeccion('noticias');
  mostrarFormularioPreguntas();
}

function entrarComoInvitado() {
  document.getElementById('navbar').classList.remove('oculto');
  mostrarSeccion('noticias');
  mostrarFormularioPreguntas();
}

function mostrarSeccion(id) {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');
}

function mostrarFormularioPreguntas() {
  if (usuarioRegistrado) {
    document.getElementById('form-pregunta').classList.remove('oculto');
  }
}

function enviarPregunta() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion() {
    const direccion = 'España 508, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: España 508, San Miguel')
    .openPopup();
}
    
function volverInicio() {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.add('oculto'));
  document.getElementById('navbar').classList.add('oculto');
  document.getElementById('inicio').classList.remove('oculto');
}

