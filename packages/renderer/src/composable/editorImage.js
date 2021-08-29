import sha256 from 'crypto-js/sha256';
import { useRoute } from 'vue-router';
import { useStorage } from './storage';

export function useEditorImage(editor) {
  const route = useRoute();
  const storage = useStorage();

  if (typeof editor !== 'object' || editor === null)
    return console.error('Editor is required');

  function setImage(url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
  function selectImage(applyImg) {
    return new Promise((resolve, reject) => {
      const { ipcRenderer, path } = window.electron;

      ipcRenderer
        .callMain('dialog:open', {
          properties: ['openFile'],
          filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
        })
        .then(async ({ canceled, filePaths }) => {
          if (canceled || filePaths.length === 0) return reject();

          try {
            const dataDir = await storage.get('dataDir', '', 'settings');
            const { ext, name } = path.parse(filePaths[0]);
            const fileName = sha256(name).toString() + ext;

            await ipcRenderer.callMain('fs:copy', {
              path: filePaths[0],
              dest: path.join(
                dataDir,
                'notes-assets',
                route.params.id,
                fileName
              ),
            });
            const imgPath = `assets://${route.params.id}/${fileName}`;

            if (applyImg) setImage(imgPath);

            resolve(imgPath);
          } catch (error) {
            console.error(error);
          }
        });
    });
  }

  return {
    set: setImage,
    select: selectImage,
  };
}
