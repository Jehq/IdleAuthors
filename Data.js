"use strict";

const words = [
    [], // Zero letter words

    [], // One letter words

    [], // Two letter words

    ["jar", "war", "bee", "wan", "owe", "era", "hit", "bet", "red", "bus", "ass", "buy", "sky", "pat", "pen", "dry", "log", "bow", "pet", "tip", "bug", "rug", "dad", "lot", "ban", "lie", "fun", "pie", "gap", "aid", "god", "use", "gut", "lay", "fee", "can", "new", "van", "rip", "sue", "kit", "ski", "can", "ill", "one", "dam", "dot", "fit", "bit", "mad", "art", "key", "oak", "ice", "fan", "age", "pan", "cap", "toe", "hit", "nod", "end", "hot", "pad", "bay", "day", "sir", "lie", "tub", "law", "egg", "leg", "hat", "nut", "ego", "fog", "bed", "sum", "bag", "dna", "big", "mom", "bad", "tax", "tin", "ban", "bar", "aim", "dip", "pop", "spy", "old", "cut", "ink", "fat", "far", "tap", "rob", "mix", "tag"],

    ["clue", "chop", "echo", "beef", "weak", "need", "play", "lone", "sail", "main", "fuel", "good", "date", "beam", "visa", "pace", "bath", "rock", "desk", "bean", "rest", "mere", "flee", "oven", "glad", "back", "live", "fire", "bulk", "deem", "wrap", "pick", "luck", "tune", "soak", "fair", "barn", "earn", "wave", "odds", "lead", "park", "trap", "term", "spot", "lion", "form", "free", "room", "disc", "lime", "tilt", "hour", "palm", "hunt", "fist", "bike", "soul", "fall", "ship", "will", "stop", "aunt", "yard", "lawn", "boss", "mass", "rain", "hero", "deal", "cook", "vote", "seal", "coin", "lake", "view", "type", "wind", "lock", "sigh", "feel", "spin", "fire", "rose", "diet", "lend", "hook", "kill", "drum", "lean", "mark", "rice", "file", "pure", "news", "tire", "icon", "cool", "rare", "link"],

    ["allow", "claim", "drink", "light", "pilot", "visit", "scale", "first", "admit", "photo", "mouth", "piece", "carry", "water", "catch", "grant", "lunch", "sight", "total", "broad", "least", "third", "start", "enter", "shirt", "order", "angry", "stick", "drink", "dress", "union", "cheap", "extra", "guess", "clean", "share", "order", "store", "chief", "along", "value", "other", "never", "black", "apply", "south", "thank", "large", "group", "media", "grade", "enemy", "after", "stand", "sound", "peace", "abuse", "might", "laugh", "ocean", "plate", "power", "agree", "voice", "ahead", "after", "movie", "adopt", "block", "argue", "fewer", "ready", "route", "cloud", "could", "would", "night", "dozen", "local", "range", "brown", "young", "party", "trust", "wrong", "sound", "close", "below", "crowd", "front", "begin", "price", "earth", "sport", "basis", "forth", "quick", "whose", "actor", "works"],

    ["museum", "search", "become", "before", "change", "victim", "launch", "camera", "advice", "emerge", "public", "policy", "rating", "motion", "pursue", "enough", "coffee", "bridge", "family", "former", "fourth", "mirror", "yellow", "survey", "recall", "direct", "ethnic", "inside", "mental", "almost", "remove", "nobody", "record", "appear", "barely", "except", "return", "extent", "finish", "depend", "figure", "reform", "before", "source", "supply", "target", "report", "answer", "expect", "divide", "enough", "system", "follow", "relate", "little", "locate", "writer", "crisis", "others", "planet", "critic", "belief", "gather", "listen", "reveal", "island", "female", "police", "itself", "future", "artist", "recent", "affair", "expand", "thanks", "matter", "desire", "second", "corner", "health", "region", "spread", "repeat", "charge", "notion", "appeal", "church", "reason", "afraid", "affect", "pretty", "effect", "expert", "entire", "studio", "beside", "engage", "afford", "screen", "simple"],

    ["picture", "kitchen", "explore", "compare", "hearing", "someone", "connect", "hundred", "however", "balance", "central", "federal", "perhaps", "service", "similar", "protect", "setting", "meeting", "account", "husband", "analyst", "thought", "control", "already", "product", "liberal", "neither", "regular", "african", "section", "usually", "economy", "mention", "stretch", "several", "reality", "measure", "between", "writing", "pattern", "another", "nuclear", "respond", "version", "conduct", "declare", "measure", "justice", "average", "surgery", "exactly", "predict", "airport", "finally", "western", "feeling", "average", "billion", "message", "project", "purpose", "attract", "station", "require", "soldier", "confirm", "forward", "develop", "opinion", "attempt", "because", "whether", "outside", "anybody", "instead", "beneath", "explain", "examine", "general", "teacher", "session", "respect", "comment", "receive", "species", "college", "content", "private", "benefit", "welcome", "provide", "failure", "variety", "present", "defense", "prepare", "prevent", "towards", "chicken", "million"],

    ["conclude", "northern", "negative", "teaching", "maintain", "customer", "exchange", "straight", "activity", "separate", "material", "congress", "position", "computer", "somewhat", "research", "decision", "audience", "division", "recently", "national", "identity", "economic", "employee", "somebody", "internet", "resident", "investor", "producer", "personal", "consider", "progress", "criminal", "daughter", "possible", "although", "announce", "directly", "probably", "training", "attitude", "industry", "analysis", "positive", "capacity", "chairman", "cultural", "medicine", "critical", "magazine", "indicate", "separate", "physical", "property", "minority", "catholic", "regional", "together", "approach", "election", "abortion", "location", "military", "everyone", "marriage", "domestic", "powerful", "director", "movement", "reporter", "complete", "document", "anywhere", "possibly", "interest", "pleasure", "neighbor", "complete", "category", "majority", "hospital", "contract", "attorney", "evidence", "religion", "supposed", "whatever", "district", "building", "familiar", "organize", "consumer", "painting", "learning", "language", "tomorrow", "argument", "violence", "surround", "reaction"]
];

const buttonsW = [];

const buttonNamesW = [
    "One Liner",
    "Comic Strip",
    "Poem",
    "Picture Book",
    "Short Story",
    "Graphic Novel",
    "English Dictionary",
    "Fiction Series",
    "Multi Subject Textbook",
    "Global Dictionary",
    "Encyclopedia Set",
    "Complete Joke Book",
    "Galactic Dictionary",
    "Worldwide Phonebook",
    "Wikipedia",
    "Earth's Complete History",
    "Intergalactic Guidebook",
    "Local Group Star Census",
    "The Internet",
    "Universal Dictionary"
]

const costsW = [
    5.00 * Math.pow(10, 0),
    5.00 * Math.pow(10, 1),
    5.00 * Math.pow(10, 2),
    5.00 * Math.pow(10, 3),
    5.00 * Math.pow(10, 4),
    5.00 * Math.pow(10, 5),
    5.00 * Math.pow(10, 6),
    5.00 * Math.pow(10, 7),
    5.00 * Math.pow(10, 8),
    5.00 * Math.pow(10, 9),
    5.00 * Math.pow(10, 10),
    5.00 * Math.pow(10, 11),
    5.00 * Math.pow(10, 12),
    5.00 * Math.pow(10, 13),
    5.00 * Math.pow(10, 14),
    5.00 * Math.pow(10, 15),
    5.00 * Math.pow(10, 16),
    5.00 * Math.pow(10, 17),
    5.00 * Math.pow(10, 18),
    5.00 * Math.pow(10, 19)
]

const incomeW = [
    1.00 * Math.pow(10, -1),
    1.00 * Math.pow(10, 0),
    1.00 * Math.pow(10, 1),
    1.00 * Math.pow(10, 2),
    1.00 * Math.pow(10, 3),
    1.00 * Math.pow(10, 4),
    1.00 * Math.pow(10, 5),
    1.00 * Math.pow(10, 6),
    1.00 * Math.pow(10, 7),
    1.00 * Math.pow(10, 8),
    1.00 * Math.pow(10, 9),
    1.00 * Math.pow(10, 10),
    1.00 * Math.pow(10, 11),
    1.00 * Math.pow(10, 12),
    1.00 * Math.pow(10, 13),
    1.00 * Math.pow(10, 14),
    1.00 * Math.pow(10, 15),
    1.00 * Math.pow(10, 16),
    1.00 * Math.pow(10, 17),
    1.00 * Math.pow(10, 18),
]

const buttonsM = [];

const buttonNamesM = [
    "Rock and Chisel",
    "Charcoal",
    "Quill Pen",
    "Marker",
    "Typewriter",
    "Keyboard",
    "Speech To Text",
    "Diamond Pen",
    "Robot",
    "Super Computer",
    "Fractal Tipped Pencil",
    "Transcriber Legion",
    "Uranium Pen",
    "Gravitational Data Cruncher",
    "Fusion Text Engine",
    "Photon Tracer",
    "Divine Writer",
    "Black Hole Pen",
    "Celestial Word Processor",
    "Text Diety"
]

const costsM = [
    2.00 * Math.pow(10, 0),
    2.00 * Math.pow(10, 1),
    2.00 * Math.pow(10, 2),
    2.00 * Math.pow(10, 3),
    2.00 * Math.pow(10, 4),
    2.00 * Math.pow(10, 5),
    2.00 * Math.pow(10, 6),
    2.00 * Math.pow(10, 7),
    2.00 * Math.pow(10, 8),
    2.00 * Math.pow(10, 9),
    2.00 * Math.pow(10, 10),
    2.00 * Math.pow(10, 11),
    2.00 * Math.pow(10, 12),
    2.00 * Math.pow(10, 13),
    2.00 * Math.pow(10, 14),
    2.00 * Math.pow(10, 15),
    2.00 * Math.pow(10, 16),
    2.00 * Math.pow(10, 17),
    2.00 * Math.pow(10, 18),
    2.00 * Math.pow(10, 19),
]

const incomeM = [
    5.00 * Math.pow(10, -2),
    5.00 * Math.pow(10, -1),
    5.00 * Math.pow(10, 0),
    5.00 * Math.pow(10, 1),
    5.00 * Math.pow(10, 2),
    5.00 * Math.pow(10, 3),
    5.00 * Math.pow(10, 4),
    5.00 * Math.pow(10, 5),
    5.00 * Math.pow(10, 6),
    5.00 * Math.pow(10, 7),
    5.00 * Math.pow(10, 8),
    5.00 * Math.pow(10, 9),
    5.00 * Math.pow(10, 10),
    5.00 * Math.pow(10, 11),
    5.00 * Math.pow(10, 12),
    5.00 * Math.pow(10, 13),
    5.00 * Math.pow(10, 14),
    5.00 * Math.pow(10, 15),
    5.00 * Math.pow(10, 16),
    5.00 * Math.pow(10, 17),
]

var wordBank = [];

for (let wordList of words) {
    for (let word of wordList) {
        wordBank.push(word);
    }
}

const tickRate = 60;
let tickLength = 1000 / tickRate;

const wpmField = document.getElementById("wpmField");
const progress = document.getElementById("progress");
let WPM = 0;
let recordWPM = 0;

const currencyFieldW = document.getElementById("currencyFieldW");
const buttonFieldW = document.getElementById("buttonFieldW");
let buttonNumberW = 0;
let buttonCountW = [];
let wordCount = 0;
let wordTotal = 0;
let wordIncome = 0;
let wordsTyped = 0;

const currencyFieldM = document.getElementById("currencyFieldM");
const buttonFieldM = document.getElementById("buttonFieldM");
let buttonNumberM = 0;
let buttonCountM = [];
let moneyCount = 0;
let moneyTotal = 0;
let moneyIncome = 0;

const displayField = document.getElementById("displayField");
let displayLength = 100;
let displayWords = [];

const inputField = document.getElementById("inputField");

const flexField = document.getElementById("flexField");
let flexHTML = "";
let statsHTML = "";
let timeHours = 0;
let achievementsHTML = "";
let upgradesHTML = "";