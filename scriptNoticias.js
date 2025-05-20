/*Primera Noticia*/ 
function enviarPregunta1() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion1() {
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
          mostrarMapa1(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa1(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: España 508, San Miguel')
    .openPopup();
}



/*Segunda Noticia*/ 
function enviarPregunta2() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion2() {
    const direccion = 'Avenida Presidente Juan Domingo Perón 1602, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa2(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa2(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Avenida Presidente Juan Domingo Perón 1602, San Miguel')
    .openPopup();
}

/*Tercera Noticia */
function enviarPregunta3() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion3() {
    const direccion = 'Pringles 1102, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa3(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa3(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Pringles 1102, San Miguel')
    .openPopup();
}

/*Cuarta Noticia */

function enviarPregunta4() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion4() {
    const direccion = 'Italia 900, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa4(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa4(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Italia 900, San Miguel')
    .openPopup();
}

/*Quinta Noticia*/

function enviarPregunta5() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion5() {
    const direccion = 'Pardo 1500, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa5(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa5(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Pardo 1500, San Miguel')
    .openPopup();
}

/*Sexta Noticia*/

function enviarPregunta6() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion6() {
    const direccion = 'Zuviría 2100, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa6(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa6(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Zuviría 2100, San Miguel')
    .openPopup();
}

/*Septima Noticia */

function enviarPregunta7() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion7() {
    const direccion = 'Avenida Doctor Ricardo Balbín 2300, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa7(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa7(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Avenida Doctor Ricardo Balbín 2300, San Miguel')
    .openPopup();
}

/*Octava Noticia */

function enviarPregunta8() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion8() {
    const direccion = 'Blasco Ibañes 2700, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa8(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa8(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Blasco Ibañes 2700, San Miguel')
    .openPopup();
}


/*Novena Noticia */

function enviarPregunta9() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion9() {
    const direccion = 'Avenida Gaspar Campos 4700 , San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa9(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa9(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Avenida Gaspar Campos 4700, San Miguel')
    .openPopup();
}

/*Decima Noticia */

function enviarPregunta10() {
  alert("Pregunta enviada (simulada).");
}

function normalizarDireccion10() {
    const direccion = 'Maestro Eduardo Ferreyra 2200, San Miguel'; 
  
    const direccionCodificada = encodeURIComponent(direccion);
  
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionCodificada}&geocodificar=true`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          const resultado = data.direccionesNormalizadas[0];
          const lat = resultado.coordenadas.y;
          const lng = resultado.coordenadas.x;
          mostrarMapa10(lat, lng);
        } else {
          alert("No se encontraron resultados para la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al normalizar la dirección:", error);
      });
}
  
function mostrarMapa10(lat, lng) {
  const mapa = L.map('mapa').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa)
    .bindPopup('Dirección: Maestro Eduardo Ferreyra 2200, San Miguel')
    .openPopup();
}