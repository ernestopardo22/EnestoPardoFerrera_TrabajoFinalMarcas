const express = require("express");
const app = express();
const port = 1111;

app.use(express.json());
app.listen(port, () => 
    console.log("Servidor abierto por fin!")
)

let recetas = [
    {
      "id": "rec_001",
      "nombre": "Tortilla de Patatas",
      "descripcion": "Tortilla española jugosa con cebolla caramelizada",
      "dificultad": "media",
      "tiempo": 40,
      "raciones": 4,
      "ingredientes": ["patatas", "huevos", "cebolla", "aceite de oliva", "sal"],
      "pasos": ["Pelar y cortar patatas en láminas", "Freír patatas y cebolla a fuego medio", "Batir huevos y mezclar con las patatas escurridas", "Cuajar la mezcla en la sartén", "Dar la vuelta con un plato y terminar de cuajar"]
    },
    {
      "id": "rec_002",
      "nombre": "Paella Valenciana",
      "descripcion": "Arroz caldoso con pollo, conejo y verduras",
      "dificultad": "difícil",
      "tiempo": 75,
      "raciones": 6,
      "ingredientes": ["arroz bomba", "pollo", "conejo", "judías verdes", "garrofón", "tomate", "azafrán", "aceite de oliva", "agua"],
      "pasos": ["Sofreír el pollo y conejo hasta dorar", "Añadir verduras y rehogar", "Incorporar el tomate rallado", "Añadir el arroz y rehogar 2 minutos", "Verter el caldo caliente y cocinar 20 minutos", "Reposar 5 minutos antes de servir"]
    },
    {
      "id": "rec_003",
      "nombre": "Gazpacho Andaluz",
      "descripcion": "Sopa fría de tomate ideal para verano",
      "dificultad": "fácil",
      "tiempo": 15,
      "raciones": 4,
      "ingredientes": ["tomates maduros", "pepino", "pimiento verde", "ajo", "pan duro", "aceite de oliva", "vinagre", "sal"],
      "pasos": ["Lavar y trocear todas las verduras", "Remojar el pan en agua", "Triturar todo junto en una batidora", "Añadir aceite y vinagre al gusto", "Emulsionar bien", "Enfriar en nevera al menos 2 horas"]
    },
    {
      "id": "rec_004",
      "nombre": "Brownie de Chocolate",
      "descripcion": "Bizcocho de chocolate crujiente por fuera y tierno por dentro",
      "dificultad": "media",
      "tiempo": 50,
      "raciones": 8,
      "ingredientes": ["chocolate negro", "mantequilla", "azúcar", "huevos", "harina", "nueces", "esencia de vainilla"],
      "pasos": ["Derretir chocolate y mantequilla al baño maría", "Batir huevos con azúcar hasta blanquear", "Mezclar el chocolate derretido con los huevos", "Incorporar harina tamizada y nueces", "Hornear a 180°C durante 25-30 minutos"]
    },
    {
      "id": "rec_005",
      "nombre": "Lentejas con Chorizo",
      "descripcion": "Plato de cuchara tradicional español",
      "dificultad": "media",
      "tiempo": 60,
      "raciones": 6,
      "ingredientes": ["lentejas", "chorizo", "cebolla", "zanahoria", "pimiento verde", "ajo", "hoja de laurel", "pimentón", "aceite de oliva"],
      "pasos": ["Poner lentejas en remojo la noche anterior", "Sofreír verduras picadas", "Añadir el chorizo y rehogar", "Incorporar las lentejas y cubrir con agua", "Añadir laurel y pimentón", "Cocer 45 minutos hasta que estén tiernas"]
    },
    {
      "id": "rec_006",
      "nombre": "Ensalada César",
      "descripcion": "Ensalada fresca con pollo crujiente y salsa César",
      "dificultad": "fácil",
      "tiempo": 20,
      "raciones": 2,
      "ingredientes": ["lechuga romana", "pechuga de pollo", "queso parmesano", "crutones", "anchoas", "yema de huevo", "mostaza", "aceite de oliva", "limón"],
      "pasos": ["Lavar y trocear la lechuga", "Cocinar el pollo a la plancha y cortar en tiras", "Preparar la salsa César emulsionando los ingredientes", "Mezclar todo en un bol grande", "Añadir queso parmesano rallado por encima"]
    },
    {
      "id": "rec_007",
      "nombre": "Crema de Calabaza",
      "descripcion": "Crema suave y reconfortante de calabaza asada",
      "dificultad": "fácil",
      "tiempo": 35,
      "raciones": 4,
      "ingredientes": ["calabaza", "cebolla", "puerro", "patata", "zanahoria", "caldo de verduras", "nata", "aceite de oliva"],
      "pasos": ["Sofreír la cebolla y el puerro", "Añadir la calabaza, patata y zanahoria troceadas", "Cubrir con caldo de verduras", "Cocer 20 minutos", "Triturar hasta obtener textura cremosa", "Añadir nata y mezclar"]
    },
    {
      "id": "rec_008",
      "nombre": "Mousse de Limón",
      "descripcion": "Postre ligero y refrescante con textura aireada",
      "dificultad": "media",
      "tiempo": 30,
      "raciones": 4,
      "ingredientes": ["limones", "huevos", "azúcar", "nata para montar", "gelatina neutra", "galletas para decorar"],
      "pasos": ["Exprimir el zumo de los limones", "Calentar zumo con azúcar hasta disolver", "Montar la nata bien fría", "Mezclar con el zumo y los huevos temperados", "Añadir gelatina disuelta", "Repartir en vasitos y enfriar 3 horas"]
    },
    {
      "id": "rec_009",
      "nombre": "Pasta Carbonara",
      "descripcion": "Pasta italiana con salsa cremosa de huevo y queso",
      "dificultad": "media",
      "tiempo": 25,
      "raciones": 4,
      "ingredientes": ["spaghetti", "huevos", "queso pecorino", "queso parmesano", "panceta", "pimienta negra", "sal"],
      "pasos": ["Cocer la pasta en agua con sal", "Mientras, dorar la panceta en sartén", "Batir los huevos con los quesos rallados", "Escurrir la pasta y mezclar con la panceta", "Añadir la mezcla de huevo fuera del fuego", "Remover rápido para que emulsione"]
    },
    {
      "id": "rec_010",
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
      "id": "rec_001",
      "autoctono": true
    },
    {
      "id": "rec_002",
      "autoctono": true
    },
    {
      "id": "rec_003",
      "autoctono": true
    },
    {
      "id": "rec_004",
      "autoctono": false
    },
    {
      "id": "rec_005",
      "autoctono": true
    },
    {
      "id": "rec_006",
      "autoctono": false
    },
    {
      "id": "rec_007",
      "autoctono": false
    },
    {
      "id": "rec_008",
      "autoctono": false
    },
    {
      "id": "rec_009",
      "autoctono": false
    },
    {
      "id": "rec_010",
      "autoctono": false
    }
  ]