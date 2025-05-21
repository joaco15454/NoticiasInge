let usuarioRegistrado = false;
let tipoUsuario = null;

function login(event) {
  event.preventDefault();
  tipoUsuario = document.querySelector('#login select').value;
  alert("Sesión iniciada (simulado)");
  usuarioRegistrado = true;
  document.getElementById('navbar').classList.remove('oculto');
  mostrarSeccion('noticias');
  //mostrarFormularioPreguntas();

  const btnCrear = document.getElementById('btn-crear-noticia');
  console.log(tipoUsuario)
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
  console.log("Entre a mostrar formulario")
  if (usuarioRegistrado) {
    console.log("Entre al if de usuario registrado")
    document.getElementById('form-pregunta').classList.remove('oculto');
  }
}

function enviarPregunta() {
  alert("Pregunta enviada (simulada).");
}
    
function volverInicio() {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.add('oculto'));
  document.getElementById('navbar').classList.add('oculto');
  document.getElementById('inicio').classList.remove('oculto');
}

