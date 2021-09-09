const packageJSON = require('./package.json');

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: packageJSON.version,
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
  win: {
    target: 'nsis',
    artifactName: '${productName}Setup-${arch}.${ext}',
  },
};

module.exports = config;
