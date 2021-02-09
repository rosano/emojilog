const RemoteStorage = require('remotestoragejs');

const EML_Data = require('./os-app/_shared/EML_Data/main.js').default;
const EMLJournalStorage = require('./os-app/_shared/EMLJournal/storage.js').default;
const EMLMemoStorage = require('./os-app/_shared/EMLMemo/storage.js').default;

(function EMLMochaStorage() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	const storageModule = EML_Data.EML_DataModule([
		EMLJournalStorage.EMLJournalStorageBuild,
		EMLMemoStorage.EMLMemoStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function() {
		global.EMLTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.EMLTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(function() {
		return global.EMLTestingStorageClient[storageModule.name].__DEBUG.__OLSKRemoteStorageReset();
	});
})();

(function EMLMochaStubs() {
	Object.entries({

		StubJournalObjectValid(inputData) {
			return Object.assign({
				EMLJournalID: 'alfa',
				EMLJournalName: 'bravo',
				EMLJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMLJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
			}, inputData);
		},

		StubMemoObjectValid(inputData) {
			return Object.assign({
				EMLMemoID: 'charlie',
				EMLMemoJournalID: 'alfa',
				EMLMemoCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoModificationDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoNotes: '',
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
