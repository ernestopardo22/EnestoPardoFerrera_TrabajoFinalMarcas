# EnestoPardoFerrera_TrabajoFinalMarcas
Trabajo Final De Marcas

## Temática

Este trabajo trata sobre una API de recetas, con dos recursos principales:
- Recetas: Variable donde se almacenan todas las recetas
- Origen de las recetas: Variable donde se almacena el origen de cada receta

## Endpoints

### Operaciones básicas sobre el recurso principal

- Obtener todas las recetas: */recetas*
- Obtener una receta concreta mediante su id: */recetas/1*
- Crear una nueva receta: */guardar-receta*
- Modificar una receta existente: */actualizar-receta*
- Eliminar una receta: */borrar-receta*

### Operaciones sobre el recurso secundario

- Obtener todos los orígenes: */origen_recetas*
- Obtener el origen mediante un id: */origen_recetas/1*
- Crear un nuevo origen: */guardar-origen-receta*
- Eliminar un origen: */borrar-origen-receta*

### Búsquedas y filtros

- Filtrar por dificultad (búsqueda parcial): */recetas/filtrar/dificultad?dificultad=media*
- Filtrar por tiempo (min y/o max): */recetas/filtrar/tiempo?min=30&max=60*
- Filtrar por múltiples campos simultáneamente: */recetas/busqueda/avanzada?nombre=tortilla&dificultad=media&racionesMinimas=4*
- Ordenar recetas por campo (ascendente/descendente): */recetas/ordenar/:campo?orden=asc*

### Endpoints de estadísticas y utilidades

- Calcular tiempo medio, máximo y mínimo: */recetas/estadisticas/tiempos*
- Obtener las N recetas con más raciones o menos raciones de la misma dificultad: */recetas/top/:cantidad?n=3*
- Obtener total de registros: */estadisticas/totales*
- Agrupar recetas por dificultad: */recetas/agrupar/dificultad*

