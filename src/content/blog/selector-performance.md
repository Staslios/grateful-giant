---
title: 'Guida galattica sui selettori'
description: 'Come funzionano i selettori'
pubDate: '11 04 2025'
snippet: '// ✅ Good practice
    
    const userSelector = (state) => state.auth.user
    const user = useSelector(userSelector);
    
    // 🚫 Bad practice

    const { user } = useSelector((state) => state.auth);
  '
---

## 1 - Il _destructuring_ è il tuo nemico.

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

Per evitare render superflui, è meglio selezionare solo la proprietà specifica che ci serve.

```js
// ✅ Optimal
const user = useSelector((state) => state.auth.user);

// 🚫 Bad
const { user } = useSelector((state) => state.auth);
```

## 2 - Dichiara i selettori esplicitamente, non usare le funzioni anonime
Prendiamo di esempio il seguente blocco di codice:
```js
// itemList è un array
const itemList = useSelector((state) => state.shoppingCart.itemList);
```
### Il problema
Dovremmo aspettarci che `const itemList` si aggiorni soltanto quando `state.shoppingCart.itemList` ha un cambio di 
valore, invece non è cosi, si aggiorna ad ogni render.

Questo avviene per un motivo importante, **le funzioni anonime vengono ricreate nuovamente ad ogni render**.

### La soluzione
**Usare le funzioni anonime va bene per i primitivi come stringhe, booleani o numeri**.

Ma dove alla fine ci sono oggetti o liste la funzione anonima fa perdere il potere galattico del selettore, in quanto 
oggetti e liste sono comparate per referenza e non per valore.

La soluzione ad ogni modo è semplice: **dichiarare il selettore esplicitamente**

```js
// ✅ Optimal
const itemListSelector = (state) => state.shoppingCart.itemList;
const itemList = useSelector(itemListSelector);

// 🚫 Bad
const itemList = useSelector((state) => state.shoppingCart.itemList);
```

## 3 - Oggetti e liste sono comparati per referenza.
### Il problema
sono stanco vado a nanna ciaoo

### La soluzione
comprare i valori possiamo usare lo `shallowEqual` di `react-redux`.

```js
// ✅ Optimal++
import { shallowEqual, useSelector } from 'react-redux';

const itemListSelector = (state) => state.shoppingCart.itemList;
const itemList = useSelector(itemListSelector, shallowEqual );
```

---

## In sintesi
Se vogliamo creare un selettore galattico dobbiamo:  
1. Evitare il destructuring.
2. Dichiarare il selettore esplicitamente con `const` oppure `function`.
3. Per oggetti e array dobbiamo usare lo `shallowEqual` di `react-redux`.



