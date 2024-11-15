// Función para mostrar secciones con transición suave
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(seccion => seccion.classList.remove('activa'));
    const seccionActiva = document.getElementById(seccionId);
    seccionActiva.classList.add('activa');
    seccionActiva.style.opacity = 0;
    setTimeout(() => {
        seccionActiva.style.opacity = 1;
    }, 100);
}

// Datos simulados para horarios
const horarios = [
    { aula: "Aula 101", horario: "8:00 - 10:00", materia: "Matemáticas", modalidad: "Presencial" },
    { aula: "Aula 202", horario: "10:00 - 12:00", materia: "Física", modalidad: "Virtual" },
    { aula: "Aula 303", horario: "12:00 - 14:00", materia: "Química", modalidad: "Presencial" }
];

// Función para mostrar los horarios en la tabla
function mostrarHorarios() {
    const tablaHorarios = document.getElementById('tabla-horarios').getElementsByTagName('tbody')[0];
    tablaHorarios.innerHTML = ''; // Limpiar la tabla
    horarios.forEach(horario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${horario.aula}</td>
            <td>${horario.horario}</td>
            <td>${horario.materia}</td>
            <td>${horario.modalidad}</td>
        `;
        tablaHorarios.appendChild(fila);
    });
}

// Llamar a mostrarHorarios cuando la sección de horarios se muestra
document.getElementById('horarios').addEventListener('load', mostrarHorarios);

// Función para asignar aula nueva
function asignarAula() {
    const materia = document.getElementById('materia').value;
    const horario = document.getElementById('horario').value;
    const modalidad = document.getElementById('modalidad').value;

    if (materia && horario) {
        const nuevaAsignacion = { aula: `Aula ${Math.floor(Math.random() * 100) + 100}`, horario, materia, modalidad };
        horarios.push(nuevaAsignacion);

        // Mostrar mensaje emergente
        mostrarMensaje(`La asignación de aula ${nuevaAsignacion.aula} fue exitosa!`);

        // Limpiar formulario
        document.getElementById('form-asignacion').reset();

        // Volver a mostrar los horarios actualizados
        mostrarHorarios();
    } else {
        mostrarMensaje("Por favor, complete todos los campos.");
    }
}

// Función para mostrar mensaje emergente
function mostrarMensaje(mensaje) {
    const resultado = document.getElementById('resultado-asignacion');
    resultado.innerHTML = `<div class="alert alert-info">${mensaje}</div>`;
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 3000);
}

// Función para eliminar asignación
function eliminarAsignacion(aula) {
    const index = horarios.findIndex(horario => horario.aula === aula);
    if (index !== -1) {
        horarios.splice(index, 1);
        mostrarMensaje(`La asignación para ${aula} ha sido eliminada.`);
        mostrarHorarios();
    }
}

// Función de búsqueda en horarios
document.getElementById('buscarMateria').addEventListener('input', function() {
    const busqueda = this.value.toLowerCase();
    const tablaHorarios = document.getElementById('tabla-horarios').getElementsByTagName('tbody')[0];
    Array.from(tablaHorarios.rows).forEach(fila => {
        const materia = fila.cells[2].innerText.toLowerCase();
        if (materia.includes(busqueda)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
});

// Inicializar la tabla de horarios al cargar la página
window.onload = function() {
    mostrarHorarios();
};
