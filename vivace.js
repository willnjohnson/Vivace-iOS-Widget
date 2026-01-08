// Vivace iOS Widget
let w = new ListWidget()

let today = new Date()

// Helper Functions
function startOfRevolutionaryYear(date) {
  let year = date.getFullYear()
  let vend_start = new Date(year, 8, 22, 0, 0, 0) // Sept 22 at midnight local time
  if (date >= vend_start) {
    return { start: vend_start, year: year - 1792 + 1 }
  } else {
    let startPrev = new Date(year - 1, 8, 22, 0, 0, 0)
    return { start: startPrev, year: year - 1792 }
  }
}

function frenchMonthDay(date) {
  let { start, year } = startOfRevolutionaryYear(date)
  // Calculate days using local dates only
  let daysSince = Math.floor((date.setHours(0,0,0,0) - start.getTime()) / (1000 * 60 * 60 * 24))

  let monthIndex, dayInMonth
  if (daysSince < 360) {
    monthIndex = Math.floor(daysSince / 30)
    dayInMonth = (daysSince % 30) + 1
  } else {
    monthIndex = 12 // Sans-culottides
    dayInMonth = daysSince - 359
  }

  return { monthIndex, dayInMonth, year }
}

function getMonthName(index) {
  const months = [
    "Vendémiaire","Brumaire","Frimaire","Nivôse","Pluviôse","Ventôse",
    "Germinal","Floréal","Prairial","Messidor","Thermidor","Fructidor"
  ]
  return months[index] || "Sansculottides"
}

function getMonthColor(index) {
  return "#1A1A1A"
}

function getMonthEmoji(index) {
  const emojis = [
    "🍇", // Vendémiaire - grape
    "🍂", // Brumaire - fallen leaf
    "❄️", // Frimaire - snowflake
    "⛄", // Nivôse - snowman
    "🌧️", // Pluviôse - rain
    "🌬️", // Ventôse - wind
    "🌱", // Germinal - seedling
    "🌸", // Floréal - blossom
    "🌾", // Prairial - grain/meadow
    "☀️", // Messidor - sun
    "🔥", // Thermidor - fire
    "🍎", // Fructidor - apple
    "🎉"  // Sansculottides - celebration
  ]
  return emojis[index] || "📅"
}

function getTextColor(bgColor) {
  return Color.white()
}

function getItem(month, day) {
  const items = [
    // Vendémiaire
    [
        "Raisin",
        "Safran",
        "Châtaigne",
        "Colchique",
        "Cheval",
        "Balsamine",
        "Carotte",
        "Amaranthe",
        "Panais",
        "Cuve",
        "Pomme de terre",
        "Immortelle",
        "Potiron",
        "Réséda",
        "Âne",
        "Belle de nuit",
        "Citrouille",
        "Sarrasin",
        "Tournesol",
        "Pressoir",
        "Chanvre",
        "Pêche",
        "Navet",
        "Amaryllis",
        "Bœuf",
        "Aubergine",
        "Piment",
        "Tomate",
        "Orge",
        "Tonneau",
    ],
    // Brumaire
    [
        "Pomme",
        "Céleri",
        "Poire",
        "Betterave",
        "Oie",
        "Héliotrope",
        "Figue",
        "Scorsonère",
        "Alisier",
        "Charrue",
        "Salsifis",
        "Mâcre",
        "Topinambour",
        "Endive",
        "Dindon",
        "Chervis",
        "Cresson",
        "Dentelaire",
        "Grenade",
        "Herse",
        "Bacchante",
        "Azerole",
        "Garance",
        "Orange",
        "Faisan",
        "Pistache",
        "Macjonc",
        "Coing",
        "Cormier",
        "Rouleau",
    ],
    // Frimaire
    [
        "Raiponce",
        "Turneps",
        "Chicorée",
        "Nèfle",
        "Cochon",
        "Mâche",
        "Chou-fleur",
        "Miel",
        "Genièvre",
        "Pioche",
        "Cire",
        "Raifort",
        "Cèdre",
        "Sapin",
        "Chevreuil",
        "Ajonc",
        "Cyprès",
        "Lierre",
        "Sabine",
        "Hoyau",
        "Érable à sucre",
        "Bruyère",
        "Roseau",
        "Oseille",
        "Grillon",
        "Pignon",
        "Liège",
        "Truffe",
        "Olive",
        "Pelle",
    ],
    // Nivôse
    [
        "Tourbe",
        "Houille",
        "Bitume",
        "Soufre",
        "Chien",
        "Lave",
        "Terre végétale",
        "Fumier",
        "Salpêtre",
        "Fléau",
        "Granit",
        "Argile",
        "Ardoise",
        "Grès",
        "Lapin",
        "Silex",
        "Marne",
        "Pierre à chaux",
        "Marbre",
        "Van",
        "Pierre à plâtre",
        "Sel",
        "Fer",
        "Cuivre",
        "Chat",
        "Étain",
        "Plomb",
        "Zinc",
        "Mercure",
        "Crible",
    ],
    // Pluviôse
    [
        "Lauréole",
        "Mousse",
        "Fragon",
        "Perce-neige",
        "Taureau",
        "Laurier-thym",
        "Amadouvier",
        "Mézéréon",
        "Peuplier",
        "Coignée",
        "Ellébore",
        "Brocoli",
        "Laurier",
        "Avelinier",
        "Vache",
        "Buis",
        "Lichen",
        "If",
        "Pulmonaire",
        "Serpette",
        "Thlaspi",
        "Thimelé",
        "Chiendent",
        "Trainasse",
        "Lièvre",
        "Guède",
        "Noisetier",
        "Cyclamen",
        "Chélidoine",
        "Traîneau",
    ],
    // Ventôse
    [
        "Tussilage",
        "Cornouiller",
        "Violier",
        "Troène",
        "Bouc",
        "Asaret",
        "Alaterne",
        "Violette",
        "Marceau",
        "Bêche",
        "Narcisse",
        "Orme",
        "Fumeterre",
        "Vélar",
        "Chèvre",
        "Épinard",
        "Doronic",
        "Mouron",
        "Cerfeuil",
        "Cordeau",
        "Mandragore",
        "Persil",
        "Cochléaria",
        "Pâquerette",
        "Thon",
        "Pissenlit",
        "Sylvie",
        "Capillaire",
        "Frêne",
        "Plantoir",
    ],
    // Germinal
    [
        "Primevère",
        "Platane",
        "Asperge",
        "Tulipe",
        "Poule",
        "Bette",
        "Bouleau",
        "Jonquille",
        "Aulne",
        "Couvoir",
        "Pervenche",
        "Charme",
        "Morille",
        "Hêtre",
        "Abeille",
        "Laitue",
        "Mélèze",
        "Ciguë",
        "Radis",
        "Ruche",
        "Gainier",
        "Romaine",
        "Marronnier",
        "Roquette",
        "Pigeon",
        "Lilas",
        "Anémone",
        "Pensée",
        "Myrtille",
        "Greffoir",
    ],
    // Floréal
    [
        "Rose",
        "Chêne",
        "Fougère",
        "Aubépine",
        "Rossignol",
        "Ancolie",
        "Muguet",
        "Champignon",
        "Hyacinthe",
        "Râteau",
        "Rhubarbe",
        "Sainfoin",
        "Bâton d'or",
        "Chamerisier",
        "Ver à soie",
        "Consoude",
        "Pimprenelle",
        "Corbeille d'or",
        "Arroche",
        "Sarcloir",
        "Statice",
        "Fritillaire",
        "Bourrache",
        "Valériane",
        "Carpe",
        "Fusain",
        "Civette",
        "Buglosse",
        "Sénevé",
        "Houlette",
    ],
    // Prairial
    [
        "Luzerne",
        "Hémérocalle",
        "Trèfle",
        "Angélique",
        "Canard",
        "Mélisse",
        "Fromental",
        "Martagon",
        "Serpolet",
        "Faux",
        "Fraise",
        "Bétoine",
        "Pois",
        "Acacia",
        "Caille",
        "Œillet",
        "Sureau",
        "Pavot",
        "Tilleul",
        "Fourche",
        "Barbeau",
        "Camomille",
        "Chèvrefeuille",
        "Caille-lait",
        "Tanche",
        "Jasmin",
        "Verveine",
        "Thym",
        "Pivoine",
        "Chariot",
    ],
    // Messidor
    [
        "Seigle",
        "Avoine",
        "Oignon",
        "Véronique",
        "Mulet",
        "Romarin",
        "Concombre",
        "Échalote",
        "Absinthe",
        "Faucille",
        "Coriandre",
        "Artichaut",
        "Girofle",
        "Lavande",
        "Chamois",
        "Tabac",
        "Groseille",
        "Gesse",
        "Cerise",
        "Parc",
        "Menthe",
        "Cumin",
        "Haricot",
        "Orcanète",
        "Pintade",
        "Sauge",
        "Ail",
        "Vesce",
        "Blé",
        "Chalémie",
    ],
    // Thermidor
    [
        "Épeautre",
        "Bouillon blanc",
        "Melon",
        "Ivraie",
        "Bélier",
        "Prêle",
        "Armoise",
        "Carthame",
        "Mûre",
        "Arrosoir",
        "Panic",
        "Salicorne",
        "Abricot",
        "Basilic",
        "Brebis",
        "Guimauve",
        "Lin",
        "Amande",
        "Gentiane",
        "Écluse",
        "Carline",
        "Câprier",
        "Lentille",
        "Aunée",
        "Loutre",
        "Myrte",
        "Colza",
        "Lupin",
        "Coton",
        "Moulin",
    ],
    // Fructidor
    [
        "Prune",
        "Millet",
        "Lycoperdon",
        "Escourgeon",
        "Saumon",
        "Tubéreuse",
        "Sucrion",
        "Apocyn",
        "Réglisse",
        "Échelle",
        "Pastèque",
        "Fenouil",
        "Épine vinette",
        "Noix",
        "Truite",
        "Citron",
        "Cardère",
        "Nerprun",
        "Tagette",
        "Hotte",
        "Églantier",
        "Noisette",
        "Houblon",
        "Sorgho",
        "Écrevisse",
        "Bigarade",
        "Verge d'or",
        "Maïs",
        "Marron",
        "Panier",
    ]
  ]
  
  if (month <= 11) return items[month][day-1] || ""
  
  // Sans-culottides
  const sansculottides = [
    "La Fête de la Vertu",
    "La Fête du Génie",
    "La Fête du Travail",
    "La Fête de l'Opinion",
    "La Fête des Récompenses",
    "La Fête de la Révolution" // leap years only
  ]
  return sansculottides[day-1] || ""
}

// Compute Revolutionary Date
let { monthIndex, dayInMonth, year } = frenchMonthDay(today)
let monthName = getMonthName(monthIndex)
let item = getItem(monthIndex, dayInMonth)
let bgColor = getMonthColor(monthIndex)
let textColor = getTextColor(bgColor)

// Set background color
w.backgroundColor = new Color(bgColor)

// All widget sizes get emoji layout
let stack = w.addStack()
stack.layoutHorizontally()
stack.centerAlignContent()
  
// Left side - text content
let leftStack = stack.addStack()
leftStack.layoutVertically()
  
leftStack.addSpacer(4)
  
let dateStr = monthIndex < 12 
              ? `${monthName} ${dayInMonth}`
              : `${monthName} ${dayInMonth}`
  
let t1 = leftStack.addText(dateStr)
t1.font = Font.boldSystemFont(15)
t1.textColor = textColor
  
let t1b = leftStack.addText(`An ${year}`)
t1b.font = Font.systemFont(13)
t1b.textColor = textColor
  
leftStack.addSpacer(6)
  
if (item) {
  let t2 = leftStack.addText(`${item}`)
  t2.font = Font.systemFont(13)
  t2.textColor = textColor
}
  
leftStack.addSpacer(4)
  
// Right side - emoji
stack.addSpacer()
let emojiStack = stack.addStack()
emojiStack.layoutVertically()
emojiStack.centerAlignContent()
  
let emoji = emojiStack.addText(getMonthEmoji(monthIndex))
emoji.font = Font.systemFont(32)

if (config.runsInWidget) {
  Script.setWidget(w)
} else {
  w.presentMedium()
}
Script.complete()
