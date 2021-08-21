export function debounce(callback, time = 200) {
  let interval;

  return (...args) => {
    clearTimeout(interval);

    return new Promise((resolve) => {
      interval = setTimeout(() => {
        interval = null;

        callback(...args);
        resolve();
      }, time);
    });
  };
}

export function sortArray({ data, key, order = 'asc' }) {
  if (!Array.isArray(data)) return console.error(`Data must be an array`);

  const sortedData = data.sort((a, b) => {
    let comparison = 0;
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    if (varA > varB) comparison = 1;
    else if (varA < varB) comparison = -1;

    return order === 'desc' ? comparison * -1 : comparison;
  });

  return sortedData;
}
