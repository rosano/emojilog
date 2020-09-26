const RemoteStorage = require('remotestoragejs');

const EMT_Data = require('./os-app/_shared/EMT_Data/main.js').default;
const EMTJournalStorage = require('./os-app/_shared/EMTJournal/storage.js').default;

(function EMTMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = EMT_Data.EMT_DataModule([
		EMTJournalStorage.EMTJournalStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function() {
		global.EMTTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.EMTTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(function() {
		return global.EMTTestingStorageClient[storageModule.name].__DEBUG.__OLSKRemoteStorageReset();
	});
})();

(function EMTMochaStubs() {
	Object.entries({
		StubDocumentObjectValid() {
			return {
				EMTJournalID: 'alfa',
				EMTJournalName: 'bravo',
				EMTJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMTJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
			};
		},
	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
