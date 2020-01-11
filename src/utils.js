function generateRandomStringStates(str) {
  let store = [];
  if (!str) {
    return store;
  }
  const exploded = Array.from(str);
  store.push([...exploded]);

  function shuffleLetters(i) {
    let newArr = [...exploded];
    let randIndex = Math.floor(Math.random() * (Math.floor(str.length - i)));
    let oldChr = newArr[i];
    newArr[i] = newArr[randIndex];
    newArr[randIndex] = oldChr;
    return newArr;
  }
  exploded.forEach((_, i) => {
    let updated = shuffleLetters(i);
    while (updated === store[store.length - 1]) {
      updated = shuffleLetters(i);
    }
    store.push([...updated]);
  })
  return [
    ...store,
    ...store.slice(0, store.length-1).reverse()
  ];
};

export { generateRandomStringStates };
