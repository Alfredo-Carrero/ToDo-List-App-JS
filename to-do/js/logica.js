// ELEMENTOS DEL DOM
const listaTareas = document.querySelector("#lista-tareas");
const areaTexto = document.querySelector("#agregar-tarea");
const botonAgregarTarea = document.querySelector("#boton-agregar");

// Recuperar las tareas almacenadas en el localStorage
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Evento agregar una nueva tarea
botonAgregarTarea.addEventListener("click", function () {
  const tarea = areaTexto.value;

  // No agregar tarea en blanco
  if (tarea === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  // Limpiar textarea
  areaTexto.value = "";

  // Crear la tarea como no completada
  const nuevaTarea = { texto: tarea, completada: false };
  tareas.push(nuevaTarea);
  actualizarLocalStorage();

  // Crear la tarea en la lista visual
  crearTarea(tarea);
});

// Evento cargar las tareas desde el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  // Mostrar todas las tareas guardadas
  tareas.forEach((tarea) => {
    crearTarea(tarea.texto, tarea.completada);
  });
});

/*-----------FUNCIONES-----------*/

// Función para actualizar el localStorage con las tareas
function actualizarLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para crear una tarea y agregarla a la lista
function crearTarea(tareaTexto, completada = false) {
  const elementoLista = document.createElement("li");

  const textoTarea = document.createElement("span");
  textoTarea.textContent = tareaTexto;

  // Si la tarea está completada, agregamos la clase para subrayarla
  if (completada) {
    textoTarea.classList.add("tarea-completada");
  }

  // Crear el icono completar tarea
  const botonCompletada = document.createElement("i");
  botonCompletada.classList.add(
    "fa-regular",
    "fa-circle-check",
    "boton-completada"
  );

  // Crear el icono de eliminar
  const botonEliminar = document.createElement("i");
  botonEliminar.classList.add("fa-regular", "fa-trash-can", "boton-eliminar");

  // Agregar los elementos al <li>
  elementoLista.appendChild(textoTarea);
  elementoLista.appendChild(botonCompletada);
  elementoLista.appendChild(botonEliminar);

  // Agregar el <li> a la lista de tareas
  listaTareas.appendChild(elementoLista);

  // Evento para completar la tarea
  botonCompletada.addEventListener("click", function () {
    textoTarea.classList.toggle("tarea-completada");

    // Tarea subrayada
    const tareaSubrayada = textoTarea.style.textDecoration === "underline";

    // Actualizar el estado de la tarea en el array
    const tareaIndex = tareas.findIndex((t) => t.texto === tareaTexto);

    if (tareaIndex !== -1) {
      // Cambiar el estado de la tarea (completada a no completada y viceversa)
      tareas[tareaIndex].completada = !tareas[tareaIndex].completada;

      if (tareas[tareaIndex].completada) {
        alert("Has completado la tarea!!");
      } else {
        alert("La tarea vuelve a estar disponible");
      }

      actualizarLocalStorage();
    }
  });

  // Evento para eliminar la tarea
  botonEliminar.addEventListener("click", function () {
    // Eliminar la tarea del array
    tareas = tareas.filter((t) => t.texto !== tareaTexto);

    // Eliminar la tarea de la vista
    elementoLista.remove();

    alert("Has eliminado la tarea!!");

    // Actualizar el localStorage
    actualizarLocalStorage();
  });
}
