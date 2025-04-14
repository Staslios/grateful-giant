---
title: 'I selettori e il destructuring sono una pessima combo'
description: 'Come funzionano i selettori'
pubDate: '11 04 2025'
snippet: '// ✅ Good practice

    const user = useSelector((state) => state.auth.user);
    
    // 🚫 Bad practice

    const { user } = useSelector((state) => state.auth);
  '
---

Da bravi e moderni sviluppatori abbiamo imparato cos'è il [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring), 
successivamente abbiamo imparato che [cos'è un selettore](https://react-redux.js.org/api/hooks#useselector), 
probabilmente tramite redux/toolkit.

Facendo 2 + 2 abbiamo ritenuto che fosse cosa saggia e giusta combinare i due per ottenere quel mix di performance e 
comodità di sviluppo creando snippet simili a questo.

```js
const { user } = useSelector((state) => state.auth);
```

### Il problema
Di base sembra una riga di codice comoda ed elegante ma ha un problema, è che React deve confrontare l’intero oggetto 
`state.auth` con il precedente. E anche se user non è cambiato, ma un'altra proprietà di auth sì, il componente verrà 
comunque ri-renderizzato inutilmente.

### La soluzione
Malgrado scriveremo `user` due volte all'interno della stessa riga, l'utilizzo corretto è il seguente:

```js
const user = useSelector((state) => state.auth.user);
```

In questo caso, React confronta il valore restituito `user` con il precedente, e aggiorna il componente solo se cambia
quel specifico valore e non l'oggetto padre.

> Per evitare render superflui, è meglio selezionare solo la proprietà specifica che ci serve.

```js
// ✅ Optimal
const user = useSelector((state) => state.auth.user);

// 🚫 Bad
const { user } = useSelector((state) => state.auth);
```
### In sintesi
Usare il destructuring all'interno di `useSelector` sembra innocuo, ma può portare a problemi di performance.  
È sempre meglio selezionare **esattamente ciò che ti serve**, così React potrà fare confronti più precisi e renderizzare
solo quando vi è un aggiornamento reale.



