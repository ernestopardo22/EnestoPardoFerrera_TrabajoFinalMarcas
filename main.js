const API_URL = 'http://localhost:5008';

// ==========================================
// GESTIÓN DE TABS
// ==========================================
function cambiarTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
tab.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    // Cargar datos según el tab
    if (tabName === 'recetas') {
cargarRecetas();
    } else if (tabName === 'origen') {
cargarOrigen();
    } else if (tabName === 'estadisticas') {
cargarEstadisticas();
    }
}

// ==========================================
// CARGAR RECETAS
// ==========================================
async function cargarRecetas() {
    try {
const response = await fetch(`${API_URL}/recetas`);
const recetas = await response.json();
mostrarRecetas(recetas);
    } catch (error) {
mostrarMensaje('recetas', 'Error al cargar recetas: ' + error.message, 'error');
    }
}

function mostrarRecetas(recetas) {
    const container = document.getElementById('listaRecetas');
    
    if (!recetas || recetas.length === 0) {
container.innerHTML = '<p class="loading">No hay recetas disponibles</p>';
return;
    }

    container.innerHTML = recetas.map(receta => `
<div class="receta-card">
    <h3>${receta.nombre}</h3>
    <p>${receta.descripcion}</p>
    
    <div class="receta-info">
<span class="badge badge-${receta.dificultad}">${receta.dificultad}</span>
<span>⏱️ ${receta.tiempo} min</span>
<span>👥 ${receta.raciones} raciones</span>
    </div>

    <div style="margin-top: 10px;">
<strong>Ingredientes:</strong>
<ul class="ingredientes-list">
    ${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
</ul>
    </div>

    <div class="receta-actions">
<button class="btn btn-warning" onclick="editarReceta('${receta.id}')">✏️ Editar</button>
<button class="btn btn-danger" onclick="eliminarReceta('${receta.id}')">🗑️ Eliminar</button>
    </div>
</div>
    `).join('');
}

// ==========================================
// FILTROS
// ==========================================
async function aplicarFiltros() {
    try {
const nombre = document.getElementById('filtroNombre').value;
const dificultad = document.getElementById('filtroDificultad').value;
const tiempoMin = document.getElementById('filtroTiempoMin').value;
const tiempoMax = document.getElementById('filtroTiempoMax').value;

let url = `${API_URL}/recetas`;
const params = new URLSearchParams();

// Usar endpoint de búsqueda avanzada si hay filtros
if (nombre || dificultad) {
    url = `${API_URL}/recetas/busqueda/avanzada`;
    if (nombre) params.append('nombre', nombre);
    if (dificultad) params.append('dificultad', dificultad);
} else if (tiempoMin || tiempoMax) {
    url = `${API_URL}/recetas/filtrar/tiempo`;
    if (tiempoMin) params.append('min', tiempoMin);
    if (tiempoMax) params.append('max', tiempoMax);
}

const queryString = params.toString();
const fullUrl = queryString ? `${url}?${queryString}` : url;

const response = await fetch(fullUrl);
const data = await response.json();

const recetas = data.recetas || data;
mostrarRecetas(recetas);
    } catch (error) {
mostrarMensaje('recetas', 'Error al aplicar filtros: ' + error.message, 'error');
    }
}

function limpiarFiltros() {
    document.getElementById('filtroNombre').value = '';
    document.getElementById('filtroDificultad').value = '';
    document.getElementById('filtroTiempoMin').value = '';
    document.getElementById('filtroTiempoMax').value = '';
    cargarRecetas();
}

// ==========================================
// CRUD RECETAS
// ==========================================
function abrirModalCrear() {
    document.getElementById('modalTitulo').textContent = 'Nueva Receta';
    document.getElementById('formReceta').reset();
    document.getElementById('recetaId').value = '';
    document.getElementById('modalReceta').classList.add('active');
}

async function editarReceta(id) {
    try {
const response = await fetch(`${API_URL}/recetas/${id}`);
const receta = await response.json();

document.getElementById('modalTitulo').textContent = 'Editar Receta';
document.getElementById('recetaId').value = receta.id;
document.getElementById('recetaNombre').value = receta.nombre;
document.getElementById('recetaDescripcion').value = receta.descripcion;
document.getElementById('recetaDificultad').value = receta.dificultad;
document.getElementById('recetaTiempo').value = receta.tiempo;
document.getElementById('recetaRaciones').value = receta.raciones;
document.getElementById('recetaIngredientes').value = receta.ingredientes.join(', ');
document.getElementById('recetaPasos').value = receta.pasos.join('; ');

document.getElementById('modalReceta').classList.add('active');
    } catch (error) {
mostrarMensaje('recetas', 'Error al cargar receta: ' + error.message, 'error');
    }
}

async function guardarReceta(event) {
    event.preventDefault();

    const id = document.getElementById('recetaId').value;
    const receta = {
id: id || undefined,
nombre: document.getElementById('recetaNombre').value,
descripcion: document.getElementById('recetaDescripcion').value,
dificultad: document.getElementById('recetaDificultad').value,
tiempo: parseInt(document.getElementById('recetaTiempo').value),
raciones: parseInt(document.getElementById('recetaRaciones').value),
ingredientes: document.getElementById('recetaIngredientes').value.split(',').map(i => i.trim()),
pasos: document.getElementById('recetaPasos').value.split(';').map(p => p.trim())
    };

    try {
let response;
if (id) {
    // Actualizar
    response = await fetch(`${API_URL}/actualizar-receta`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(receta)
    });
} else {
    // Crear
    response = await fetch(`${API_URL}/guardar-receta`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(receta)
    });
}

if (response.ok) {
    mostrarMensaje('recetas', `Receta ${id ? 'actualizada' : 'creada'} exitosamente`, 'success');
    cerrarModal('modalReceta');
    cargarRecetas();
} else {
    mostrarMensaje('recetas', 'Error al guardar la receta', 'error');
}
    } catch (error) {
mostrarMensaje('recetas', 'Error: ' + error.message, 'error');
    }
}

async function eliminarReceta(id) {
    if (!confirm('¿Estás seguro de eliminar esta receta?')) return;

    try {
const response = await fetch(`${API_URL}/borrar-receta`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
});

if (response.ok) {
    mostrarMensaje('recetas', 'Receta eliminada exitosamente', 'success');
    cargarRecetas();
} else {
    mostrarMensaje('recetas', 'Error al eliminar la receta', 'error');
}
    } catch (error) {
mostrarMensaje('recetas', 'Error: ' + error.message, 'error');
    }
}

// ==========================================
// ORIGEN
// ==========================================
async function cargarOrigen() {
    try {
const response = await fetch(`${API_URL}/origen_recetas`);
const origenes = await response.json();
mostrarOrigen(origenes);
    } catch (error) {
mostrarMensaje('origen', 'Error al cargar orígenes: ' + error.message, 'error');
    }
}

function mostrarOrigen(origenes) {
    const container = document.getElementById('listaOrigen');
    
    if (!origenes || origenes.length === 0) {
container.innerHTML = '<p class="loading">No hay orígenes disponibles</p>';
return;
    }

    container.innerHTML = origenes.map(origen => `
<div class="receta-card">
    <h3>Origen ID: ${origen.id}</h3>
    <p><strong>Autóctono:</strong> ${origen.autoctono ? '✅ Sí' : '❌ No'}</p>
    <div class="receta-actions">
<button class="btn btn-danger" onclick="eliminarOrigen('${origen.id}')">🗑️ Eliminar</button>
    </div>
</div>
    `).join('');
}

function abrirModalOrigenCrear() {
    document.getElementById('formOrigen').reset();
    document.getElementById('modalOrigen').classList.add('active');
}

async function guardarOrigen(event) {
    event.preventDefault();

    const origen = {
autoctono: document.getElementById('origenAutoctono').value === 'true'
    };

    try {
const response = await fetch(`${API_URL}/guardar-origen-receta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(origen)
});

if (response.ok) {
    mostrarMensaje('origen', 'Origen creado exitosamente', 'success');
    cerrarModal('modalOrigen');
    cargarOrigen();
} else {
    mostrarMensaje('origen', 'Error al crear el origen', 'error');
}
    } catch (error) {
mostrarMensaje('origen', 'Error: ' + error.message, 'error');
    }
}

async function eliminarOrigen(id) {
    if (!confirm('¿Estás seguro de eliminar este origen?')) return;

    try {
const response = await fetch(`${API_URL}/borrar-origen-receta`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
});

if (response.ok) {
    mostrarMensaje('origen', 'Origen eliminado exitosamente', 'success');
    cargarOrigen();
} else {
    mostrarMensaje('origen', 'Error al eliminar el origen', 'error');
}
    } catch (error) {
mostrarMensaje('origen', 'Error: ' + error.message, 'error');
    }
}

// ==========================================
// ESTADÍSTICAS
// ==========================================
async function cargarEstadisticas() {
    try {
// Cargar estadísticas de totales
const totalesResponse = await fetch(`${API_URL}/estadisticas/totales`);
const totales = await totalesResponse.json();

// Cargar estadísticas de tiempos
const tiemposResponse = await fetch(`${API_URL}/recetas/estadisticas/tiempos`);
const tiempos = await tiemposResponse.json();

// Cargar agrupación por dificultad
const dificultadResponse = await fetch(`${API_URL}/recetas/agrupar/dificultad`);
const dificultad = await dificultadResponse.json();

mostrarEstadisticas(totales, tiempos, dificultad);
    } catch (error) {
document.getElementById('statsContainer').innerHTML = 
    `<p class="error">Error al cargar estadísticas: ${error.message}</p>`;
    }
}

function mostrarEstadisticas(totales, tiempos, dificultad) {
    const statsContainer = document.getElementById('statsContainer');
    const chartContainer = document.getElementById('chartContainer');

    // Mostrar cards de estadísticas
    statsContainer.innerHTML = `
<div class="stat-card">
    <h3>Total Recetas</h3>
    <div class="stat-value">${totales.total_recetas}</div>
</div>
<div class="stat-card">
    <h3>Tiempo Medio</h3>
    <div class="stat-value">${tiempos.tiempo_medio} min</div>
</div>
<div class="stat-card">
    <h3>Tiempo Mínimo</h3>
    <div class="stat-value">${tiempos.tiempo_minimo} min</div>
</div>
<div class="stat-card">
    <h3>Tiempo Máximo</h3>
    <div class="stat-value">${tiempos.tiempo_maximo} min</div>
</div>
<div class="stat-card">
    <h3>Autóctonas</h3>
    <div class="stat-value">${totales.recetas_autoctonas}</div>
</div>
<div class="stat-card">
    <h3>No Autóctonas</h3>
    <div class="stat-value">${totales.recetas_no_autoctonas}</div>
</div>
    `;

    // Mostrar gráfico de dificultad
    chartContainer.innerHTML = `
<h3>Recetas por Dificultad</h3>
<div style="margin-top: 20px;">
    ${dificultad.agrupacion.map(item => `
<div style="margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
<strong>${item.dificultad.charAt(0).toUpperCase() + item.dificultad.slice(1)}</strong>
<span>${item.cantidad} recetas</span>
    </div>
    <div style="background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
<div style="background: ${
    item.dificultad === 'fácil' ? '#2ecc71' : 
    item.dificultad === 'media' ? '#f39c12' : '#e74c3c'
}; height: 100%; width: ${(item.cantidad / totales.total_recetas * 100)}%; 
transition: width 0.3s;"></div>
    </div>
</div>
    `).join('')}
</div>
    `;
}

// ==========================================
// UTILIDADES
// ==========================================
function cerrarModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function mostrarMensaje(seccion, mensaje, tipo) {
    const container = document.getElementById(`mensaje${seccion.charAt(0).toUpperCase() + seccion.slice(1)}`);
    container.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
    setTimeout(() => {
container.innerHTML = '';
    }, 3000);
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
event.target.classList.remove('active');
    }
}

// Cargar recetas al iniciar
cargarRecetas();
   