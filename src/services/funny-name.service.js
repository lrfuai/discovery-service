
const Adjetivos = [
    "acertado", "adecuado", 
    "adaptable", "ágil", "afable", "agradable", "amable", "alegre", "apto", 
    "atento", "bondadoso", "bonito", "bueno", "capaz", "caritativo", "compasivo", "coherente", 
    "competente", "constante", "cordial", "contento", "decidido", "diligente", "discreto", "dialogante", 
    "detallista", "educado", "eficaz", "eficiente", "emprendedor", "encantador", "estupendo", "excepcional", 
    "exigente", "experto", "extraordinario", "fantástico", "feliz", "fiel", "firme", "genial", "hábil", 
    "hablador", "hermoso", "honrado", "ingenioso", "independiente", "interesante", "justo", "leal", "lógico",
    "maravilloso", "meticuloso", "metódico", "motivador", "minucioso", "notable", "negociador", "optimista", 
    "ordenado", "organizado", "orientado", "objetivo", "paciente", "prudente", "precavido", "persistente", 
    "perseverante", "pacífico", "preparado", "polivalente", "positivo", "previsor", "productivo", "puntual", 
    "protector", "razonable", "rápido", "recto", "respetuoso", "responsable", "sabio", "seguro", "tenaz", 
    "tolerante", "tranquilo", "único", "válido", "valiente", "versado"
];

const Animales = [
    "abeja","águila","araña","avispa","ballena","bisonte","búfalo","burro","caballo","camello","canario",
    "cangrejo","canguro","caracol","cebra","cerdo","chimpancé","ciervo","cisne","cocodrilo","elefante",
    "escarabajo","escorpión","foca","gallina","gallo", "gato","golondrina","hipopótamo","hormiga","jabalí",
    "jirafa","león","loro","mosca","mosquito","oso","oveja","perdiz","perro","pingüino","pollo","saltamontes",
    "serpiente","tigre","topo","toro","tortuga","vaca","zorro"    
];

const randomInt = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);

module.exports = {
    get: () => `${Animales[randomInt(0,Animales.length-1)]} ${Adjetivos[randomInt(0,Adjetivos.length-1)]}`,
};
