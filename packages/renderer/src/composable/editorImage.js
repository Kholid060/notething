export function useEditorImage(editor) {
  if (typeof editor !== 'object' || editor === null)
    return console.error('Editor is required');

  function setImage(url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
  function selectImage(applyImg) {
    return new Promise((resolve, reject) => {
      const { ipcRenderer } = window.electron;

      ipcRenderer
        .callMain('dialog:open', {
          properties: ['openFile'],
          filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
        })
        .then(({ canceled, filePaths }) => {
          if (canceled || filePaths.length === 0) return reject();

          const imgPath = `assets://${filePaths[0]}`;

          if (applyImg) setImage(imgPath);

          resolve(imgPath);
        });
    });
  }

  return {
    set: setImage,
    select: selectImage,
  };
}
