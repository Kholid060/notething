import Store from 'electron-store';
import prefrence from './preference.store';

const schema = {
	notes: {},
};

export default new Store({
	schema,
	cwd: prefrence.dataDir,
});
