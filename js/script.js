// ELEMENTOS DEL DOM
const listaTareas = document.querySelector("#lista-tareas");
const areaTexto = document.querySelector("#agregar-tarea");
const botonAgregarTarea = document.querySelector("#boton-agregar");

// Función para agregar una nueva tarea
botonAgregarTarea.addEventListener("click", function () {
  var tarea = areaTexto.value;
  // console.log(tarea);

  // No agregar tarea en blanco
  if (tarea === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  // Limpiar textarea
  areaTexto.value = "";

  // Crear el <li> que representa una tarea
  const elementoLista = document.createElement("li");

  // Crear el texto de la tarea
  const textoTarea = document.createElement("span");
  textoTarea.textContent = tarea;

  // Crear los iconos de completar y eliminar
  const botonCompletada = document.createElement("i");
  botonCompletada.classList.add(
    "fa-regular",
    "fa-circle-check",
    "boton-completada"
  );

  const botonEliminar = document.createElement("i");
  botonEliminar.classList.add("fa-regular", "fa-trash-can", "boton-eliminar");

  // Agregar los elementos al <li>
  elementoLista.appendChild(textoTarea);
  elementoLista.appendChild(botonCompletada);
  elementoLista.appendChild(botonEliminar);

  // Agregar el <li> a la lista de tareas
  listaTareas.appendChild(elementoLista);

  // Asignar los eventos a los iconos después de agregar la tarea
  botonCompletada.addEventListener("click", function () {
    textoTarea.classList.toggle("tarea-completada"); // Solo subraya el texto
    alert("Has completado la tarea!!");
    console.log("Has clickado completar la tarea!!");
  });

  botonEliminar.addEventListener("click", function () {
    elementoLista.remove(); // Eliminar la tarea
    alert("Has eliminado la tarea!");
    console.log("Has clickado eliminar la tarea!!");
  });
});
