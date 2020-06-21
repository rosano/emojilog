const RemoteStorage = require('remotestoragejs');

const EMT_Data = require('./os-app/_shared/EMT_Data/main.js').default;
const EMTDocumentStorage = require('./os-app/_shared/EMTDocument/storage.js').default;

(function EMTMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = EMT_Data.EMT_DataModule([
		EMTDocumentStorage.EMTDocumentStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function() {
		global.EMTTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.EMTTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(async function() {
		return await global.EMTTestingStorageClient[storageModule.name].__DEBUG._OLSKRemoteStorageReset();
	});
})();
