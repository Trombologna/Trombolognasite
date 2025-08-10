# script.js
script_js = """// Trombologna minimal JS (no build step)
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Joke of the day (deterministic by day-of-year)
  const jokes = [
    "Bologna–San Lazzaro in 12 minuti. Se parti nel 2025, arrivi nel 2036.",
    "Deviazioni del 14: ora passa in via Marte, poi svolta su Plutone.",
    "Cantiere notturno: perfetto per chi soffre di insonnia e ama il rumore dei martelli pneumatici.",
    "Segnale luminoso: verde. Semaforo: rosso. Cantiere: infinito.",
    "Cartello: 'Ci scusiamo per il disagio'. Il disagio: 'Accetto volentieri le scuse, rimango comunque'.",
    "Nuova fermata 'Forse': ci passi vicino, ma non ci arrivi mai.",
    "Il Comune promette: entro l’anno togliamo metà dei cantieri. Quale metà? Quella che riapriamo domani.",
    "Parcheggi: prima li togliamo, poi li ridipingeremo sui muri. Innovazione!",
    "Nuova tecnologia: asfalto quantistico. È sia steso che scavato finché non lo guardi.",
    "Il tram? C’è. Funziona? Schrodinger dice che dipende da dove guardi.",
    "A Bologna il GPS ha due modalità: 'evita traffico' e 'evita cantieri'. Non sono compatibili.",
    "Senso unico alternato: per i pedoni, in single file, con pass ordinato del rosario.",
    "Mappa ufficiale: zona rossa, zona arancione, zona… marmellata.",
    "Breaking: trovato un tratto senza lavori. Era un cortile privato.",
    "Slogan: 'Bologna corre'. Certo: via dalle transenne."
  ];

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const joke = jokes[dayOfYear % jokes.length];
  const target = document.getElementById('joke-of-day');
  if (target) target.textContent = joke;
});
"""
