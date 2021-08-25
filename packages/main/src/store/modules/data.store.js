/* eslint-disable no-mixed-spaces-and-tabs */
import Store from 'electron-store';
import settings from './settings.store';

const schema = {
	notes: {
		type: 'object',
    patternProperties: {
      '[A-Za-z0-9_-]': {
      	type: 'object',
      	properties: {
      		id: { type: 'string', default: '' },
      		title: { type: 'string', default: '' },
      		content: { type: 'object', default: { type: 'doc', content: [] } },
      		labels: { type: 'array', default: [] },
      		createdAt: { type: 'number', default: Date.now() },
      		updatedAt: { type: 'number', default: Date.now() },
      		isBookmarked: { type: 'boolean', default: false },
      		isArchived: { type: 'boolean', default: false },
      	},
      },
    },
	},
  labels: {
    type: 'array',
  },
};

const store =  new Store({
	schema,
	cwd: settings.dataDir,
});

console.log(store.path);

export default store;
