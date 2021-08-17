function invokeEvent(name, param) {
  const { ipcRenderer } = window.electron;

  return ipcRenderer.callMain(`storage:${name}`, param);
}

export function useStorage(name = 'data') {
  return {
    get: (key, def, storeName) =>
      invokeEvent('get', { name: storeName || name, key, def }),
    set: (key, value, storeName) =>
      invokeEvent('set', { name: storeName || name, key, value }),
    has: (key, storeName) =>
      invokeEvent('has', { name: storeName || name, key }),
    delete: (key, storeName) =>
      invokeEvent('delete', { name: storeName || name, key }),
    clear: (storeName) => invokeEvent('clear', storeName || name),
  };
}
