const uiComponents = import.meta.globEager('../components/ui/*.vue');

function registerComponents(app, components, prefix) {
  Object.keys(components).forEach((path) => {
    const [fileName] = /[^/]*$/.exec(path);
    const [name] = fileName.split('.');
    const componentName = `${prefix}${name}`;

    app.component(componentName, components[path].default);
  });
}

export default function (app) {
  registerComponents(app, uiComponents, 'Ui');
}
