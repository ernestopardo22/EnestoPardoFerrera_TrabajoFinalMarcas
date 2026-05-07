const express = require("express");
const app = express();
const port = 5008;

app.use(express.json());
app.listen(port, () => 
    console.log("Servidor de Ernesto abierto")
)

let recetas = [
    {
      "id": "1",
      "nombre": "Tortilla de Patatas",
      "descripcion": "Tortilla española jugosa con cebolla caramelizada",
      "dificultad": "media",
      "tiempo": 40,
      "raciones": 4,
      "ingredientes": ["patatas", "huevos", "cebolla", "aceite de oliva", "sal"],
      "pasos": ["Pelar y cortar patatas en láminas", "Freír patatas y cebolla a fuego medio", "Batir huevos y mezclar con las patatas escurridas", "Cuajar la mezcla en la sartén", "Dar la vuelta con un plato y terminar de cuajar"]
    },
    {
      "id": "2",
      "nombre": "Paella Valenciana",
      "descripcion": "Arroz caldoso con pollo, conejo y verduras",
      "dificultad": "difícil",
      "tiempo": 75,
      "raciones": 6,
      "ingredientes": ["arroz bomba", "pollo", "conejo", "judías verdes", "garrofón", "tomate", "azafrán", "aceite de oliva", "agua"],
      "pasos": ["Sofreír el pollo y conejo hasta dorar", "Añadir verduras y rehogar", "Incorporar el tomate rallado", "Añadir el arroz y rehogar 2 minutos", "Verter el caldo caliente y cocinar 20 minutos", "Reposar 5 minutos antes de servir"]
    },
    {
      "id": "3",
      "nombre": "Gazpacho Andaluz",
      "descripcion": "Sopa fría de tomate ideal para verano",
      "dificultad": "fácil",
      "tiempo": 15,
      "raciones": 4,
      "ingredientes": ["tomates maduros", "pepino", "pimiento verde", "ajo", "pan duro", "aceite de oliva", "vinagre", "sal"],
      "pasos": ["Lavar y trocear todas las verduras", "Remojar el pan en agua", "Triturar todo junto en una batidora", "Añadir aceite y vinagre al gusto", "Emulsionar bien", "Enfriar en nevera al menos 2 horas"]
    },
    {
      "id": "4",
      "nombre": "Brownie de Chocolate",
      "descripcion": "Bizcocho de chocolate crujiente por fuera y tierno por dentro",
      "dificultad": "media",
      "tiempo": 50,
      "raciones": 8,
      "ingredientes": ["chocolate negro", "mantequilla", "azúcar", "huevos", "harina", "nueces", "esencia de vainilla"],
      "pasos": ["Derretir chocolate y mantequilla al baño maría", "Batir huevos con azúcar hasta blanquear", "Mezclar el chocolate derretido con los huevos", "Incorporar harina tamizada y nueces", "Hornear a 180°C durante 25-30 minutos"]
    },
    {
      "id": "5",
      "nombre": "Lentejas con Chorizo",
      "descripcion": "Plato de cuchara tradicional español",
      "dificultad": "media",
      "tiempo": 60,
      "raciones": 6,
      "ingredientes": ["lentejas", "chorizo", "cebolla", "zanahoria", "pimiento verde", "ajo", "hoja de laurel", "pimentón", "aceite de oliva"],
      "pasos": ["Poner lentejas en remojo la noche anterior", "Sofreír verduras picadas", "Añadir el chorizo y rehogar", "Incorporar las lentejas y cubrir con agua", "Añadir laurel y pimentón", "Cocer 45 minutos hasta que estén tiernas"]
    },
    {
      "id": "6",
      "nombre": "Ensalada César",
      "descripcion": "Ensalada fresca con pollo crujiente y salsa César",
      "dificultad": "fácil",
      "tiempo": 20,
      "raciones": 2,
      "ingredientes": ["lechuga romana", "pechuga de pollo", "queso parmesano", "crutones", "anchoas", "yema de huevo", "mostaza", "aceite de oliva", "limón"],
      "pasos": ["Lavar y trocear la lechuga", "Cocinar el pollo a la plancha y cortar en tiras", "Preparar la salsa César emulsionando los ingredientes", "Mezclar todo en un bol grande", "Añadir queso parmesano rallado por encima"]
    },
    {
      "id": "7",
      "nombre": "Crema de Calabaza",
      "descripcion": "Crema suave y reconfortante de calabaza asada",
      "dificultad": "fácil",
      "tiempo": 35,
      "raciones": 4,
      "ingredientes": ["calabaza", "cebolla", "puerro", "patata", "zanahoria", "caldo de verduras", "nata", "aceite de oliva"],
      "pasos": ["Sofreír la cebolla y el puerro", "Añadir la calabaza, patata y zanahoria troceadas", "Cubrir con caldo de verduras", "Cocer 20 minutos", "Triturar hasta obtener textura cremosa", "Añadir nata y mezclar"]
    },
    {
      "id": "8",
      "nombre": "Mousse de Limón",
      "descripcion": "Postre ligero y refrescante con textura aireada",
      "dificultad": "media",
      "tiempo": 30,
      "raciones": 4,
      "ingredientes": ["limones", "huevos", "azúcar", "nata para montar", "gelatina neutra", "galletas para decorar"],
      "pasos": ["Exprimir el zumo de los limones", "Calentar zumo con azúcar hasta disolver", "Montar la nata bien fría", "Mezclar con el zumo y los huevos temperados", "Añadir gelatina disuelta", "Repartir en vasitos y enfriar 3 horas"]
    },
    {
      "id": "9",
      "nombre": "Pasta Carbonara",
      "descripcion": "Pasta italiana con salsa cremosa de huevo y queso",
      "dificultad": "media",
      "tiempo": 25,
      "raciones": 4,
      "ingredientes": ["spaghetti", "huevos", "queso pecorino", "queso parmesano", "panceta", "pimienta negra", "sal"],
      "pasos": ["Cocer la pasta en agua con sal", "Mientras, dorar la panceta en sartén", "Batir los huevos con los quesos rallados", "Escurrir la pasta y mezclar con la panceta", "Añadir la mezcla de huevo fuera del fuego", "Remover rápido para que emulsione"]
    },
    {
      "id": "10",
      "nombre": "Tarta de Queso",
      "descripcion": "Tarta de queso cremosa estilo La Viña",
      "dificultad": "media",
      "tiempo": 70,
      "raciones": 8,
      "ingredientes": ["queso crema", "huevos", "azúcar", "nata líquida", "harina", "mantequilla", "galletas", "esencia de vainilla"],
      "pasos": ["Triturar galletas y mezclar con mantequilla derretida para la base", "Forzar el molde con la mezcla", "Batir el queso con el azúcar", "Incorporar huevos uno a uno", "Añadir nata, harina y vainilla", "Hornear a 200°C durante 40 minutos"]
    }
  ]

let origen_recetas = [
    {
      "id": "1",
      "autoctono": true
    },
    {
      "id": "2",
      "autoctono": true
    },
    {
      "id": "3",
      "autoctono": true
    },
    {
      "id": "4",
      "autoctono": false
    },
    {
      "id": "5",
      "autoctono": true
    },
    {
      "id": "6",
      "autoctono": false
    },
    {
      "id": "7",
      "autoctono": false
    },
    {
      "id": "8",
      "autoctono": false
    },
    {
      "id": "9",
      "autoctono": false
    },
    {
      "id": "10",
      "autoctono": false
    }
  ]

  /*
  Operaciones básicas sobre el recurso principal
  */
app.get("/recetas", (req,res) => {
  return res.json(recetas);
})  

app.get("/recetas/:id", (req,res) => {
  const receta = recetas.find(r => r.id == req.params.id);
  return res.json(receta);
})

app.post("/guardar-receta", (req,res) =>{
    let nuevaReceta = {
        id: recetas.length+1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        dificultad: req.body.dificultad,
        tiempo: req.body.tiempo,
        raciones: req.body.raciones,
        ingredientes: req.body.ingredientes,
        pasos: req.body.pasos
    }
    recetas.push(nuevaReceta);
    return res.status(200).json(nuevaReceta)
} )

app.put("/actualizar-receta", (req,res) => {
    recetas[req.body.id-1].nombre = req.body.nombre;
    recetas[req.body.id-1].descripcion = req.body.descripcion;
    recetas[req.body.id-1].dificultad = req.body.dificultad;
    recetas[req.body.id-1].tiempo = req.body.tiempo;
    recetas[req.body.id-1].raciones = req.body.raciones;
    recetas[req.body.id-1].ingredientes = req.body.ingredientes;
    recetas[req.body.id-1].pasos = req.body.pasos;

    return res.json(recetas[req.body.id-1])
})

app.delete("/borrar-receta", (req,res) => {
    const index = recetas.findIndex(a => a.id == req.body.id)
    recetas.splice(index, 1)
    return res.send("Receta con id " + req.body.id + " eliminada.")
})


/*
Operaciones sobre el recurso secundario
*/
app.get("/origen_recetas", (req,res) => {
  return res.json(origen_recetas);
})  

app.get("/origen_recetas/:id", (req,res) => {
  const recetasec = origen_recetas.find(r => r.id == req.params.id);
  return res.json(recetasec);
})

app.post("/guardar-origen-receta", (req,res) =>{
    let nuevoOrigenReceta = {
        id: origen_recetas.length+1,
        autoctono: req.body.autoctono
    }
    origen_recetas.push(nuevoOrigenReceta);
    return res.status(200).json(nuevoOrigenReceta)
} )

app.delete("/borrar-origen-receta", (req,res) => {
    const index = origen_recetas.findIndex(a => a.id == req.body.id)
    origen_recetas.splice(index, 1)
    return res.send("Origen de receta con id " + req.body.id + " eliminada.")
})

/*
Búsquedas y filtros
*/

//Filtrar por dificultad (búsqueda parcial)
app.get("/recetas/filtrar/dificultad", (req, res) => {
    try {
        const dificultad = req.query.dificultad;
        
        if (!dificultad) {
            return res.status(400).json({ error: "Debe proporcionar una dificultad de receta" });
        }
        
        const resultados = recetas.filter(c => 
            c.dificultad.toLowerCase().includes(dificultad.toLowerCase())
        );
        
        res.status(200).json({
            total: resultados.length,
            recetas: resultados
        });
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar recetas" });
    }
});

//Filtrar por tiempo (min y/o max)
app.get('/recetas/filtrar/tiempo', (req, res) => {
    try {
        const min = req.query.min ? parseFloat(req.query.min) : 0;
        const max = req.query.max ? parseFloat(req.query.max) : Infinity;
        
        const resultados = recetas.filter(c => c.tiempo >= min && c.tiempo <= max);
        
        res.status(200).json({
            filtro: `tiempo entre ${min} y ${max}`,
            total: resultados.length,
            recetas: resultados
        });
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar por tiempo" });
    }
});

//Filtrar por múltiples campos simultáneamente
app.get('/recetas/busqueda/avanzada', (req, res) => {
    try {
        let resultados = [...recetas];
        
        // Filtrar por nombre
        if (req.query.nombre) {
            resultados = resultados.filter(c => 
                c.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
            );
        }
        
        // Filtrar por raciones
        if (req.query.racionesMinimas) {
            const racionesMinimas = parseInt(req.query.racionesMinimas);
            resultados = resultados.filter(c => c.raciones >= racionesMinimas);
        }
        
        // Filtrar por tamaño
        if (req.query.dificultad) {
            resultados = resultados.filter(c => 
                c.dificultad.toLowerCase() === req.query.dificultad.toLowerCase()
            );
        }
        
        res.status(200).json({
            filtros_aplicados: req.query,
            total: resultados.length,
            recetas: resultados
        });
    } catch (error) {
        res.status(500).json({ error: "Error en búsqueda avanzada" });
    }
});

//Ordenar recetas por campo (ascendente/descendente)
app.get('/recetas/ordenar/:campo', (req, res) => {
    try {
        const campo = req.params.campo;
        const orden = req.query.orden || 'asc'; // asc o desc
        
        if (!['nombre', 'descripcion', 'dificultad', 'tiempo', 'raciones', 'ingredientes', 'pasos'].includes(campo)) {
            return res.status(400).json({ 
                error: "Campo inválido",
                camposValidos: ['nombre', 'descripcion', 'dificultad', 'tiempo', 'raciones', 'ingredientes', 'pasos']
            });
        }
        
        const resultados = [...recetas].sort((a, b) => {
            if (orden === 'desc') {
                return a[campo] > b[campo] ? -1 : 1;
            }
            return a[campo] > b[campo] ? 1 : -1;
        });
        
        res.status(200).json({
            ordenado_por: campo,
            orden: orden,
            total: resultados.length,
            recetas: resultados
        });
    } catch (error) {
        res.status(500).json({ error: "Error al ordenar las recetas" });
    }
});

/*
Endpoints de estadística y utilidades
*/ 

//Calcular tiempo medio, máximo y mínimo
app.get('/recetas/estadisticas/tiempos', (req, res) => {
    try {
        if (recetas.length === 0) {
            return res.status(404).json({ error: "No hay recetas registradas" });
        }
        
        const tiempos = recetas.map(c => c.tiempo);
        const tiempoMedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
        const tiempoMaximo = Math.max(...tiempos);
        const tiempoMinimo = Math.min(...tiempos);
        
        res.status(200).json({
            total_recetas: recetas.length,
            tiempo_medio: tiempoMedio.toFixed(2),
            tiempo_maximo: tiempoMaximo,
            tiempo_minimo: tiempoMinimo
        });
    } catch (error) {
        res.status(500).json({ error: "Error al calcular estadísticas" });
    }
});

//Obtener las N recetas con más raciones o menos raciones de la misma dificultad
app.get('/recetas/top/:cantidad', (req, res) => {
    try {
        const cantidad = req.params.cantidad; // 'caros' o 'baratos'
        const n = parseInt(req.query.n) || 3;
        
        if (!['contundentes', 'escasos'].includes(cantidad)) {
            return res.status(400).json({ 
                error: "Tipo inválido",
                tiposValidos: ['contundentes', 'escasos']
            });
        }
        
        const ordenados = [...recetas].sort((a, b) => 
            cantidad === 'contundentes' ? b.raciones - a.raciones : a.raciones - b.raciones
        );
        
        const top = ordenados.slice(0, n);
        
        res.status(200).json({
            cantidad: `Top ${n} más ${cantidad}`,
            total: top.length,
            recetas: top
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener top recetas" });
    }
});

//Obtener total de registros
app.get('/estadisticas/totales', (req, res) => {
    try {
        res.status(200).json({
            total_recetas: recetas.length,
            total_origen_recetas: origen_recetas.length,
            recetas_autoctonas: origen_recetas.filter(c => c.autoctono).length,
            recetas_no_autoctonas: origen_recetas.filter(c => !c.autoctono).length
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener totales" });
    }
});

//Agrupar recetas por dificultad
app.get('/recetas/agrupar/dificultad', (req, res) => {
    try {
        const agrupados = recetas.reduce((acc, receta) => {
            if (!acc[receta.dificultad]) {
                acc[receta.dificultad] = [];
            }
            acc[receta.dificultad].push(receta);
            return acc;
        }, {});
        
        const resultado = Object.keys(agrupados).map(dificultad => ({
            dificultad: dificultad,
            cantidad: agrupados[dificultad].length,
            recetas: agrupados[dificultad]
        }));
        
        res.status(200).json({
            total_dificultades: resultado.length,
            agrupacion: resultado
        });
    } catch (error) {
        res.status(500).json({ error: "Error al agrupar recetas" });
    }
});