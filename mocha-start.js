const RemoteStorage = require('remotestoragejs');

const EMT_Data = require('./os-app/_shared/EMT_Data/main.js').default;
const EMTJournalStorage = require('./os-app/_shared/EMTJournal/storage.js').default;
const EMTMemoStorage = require('./os-app/_shared/EMTMemo/storage.js').default;

(function EMTMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = EMT_Data.EMT_DataModule([
		EMTJournalStorage.EMTJournalStorageBuild,
		EMTMemoStorage.EMTMemoStorageBuild,
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

		StubJournalObjectValid(inputData) {
			return Object.assign({
				EMTJournalID: 'alfa',
				EMTJournalName: 'bravo',
				EMTJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMTJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
			}, inputData);
		},

		StubMemoObjectValid(inputData) {
			return Object.assign({
				EMTMemoID: 'charlie',
				EMTMemoJournalID: 'alfa',
				EMTMemoCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMTMemoModificationDate: new Date('2019-02-23T13:56:36Z'),
				EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMTMemoNotes: '',
			}, inputData);
		},

		uSerial (inputData) {
			return inputData.reduce(async function (coll, e) {
				return e.then(Array.prototype.concat.bind(await coll));
			}, Promise.resolve([]));
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
