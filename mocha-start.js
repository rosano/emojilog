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

(function EMLMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'emojitimer',
				ZDRScopeSchemas: [
					require('./os-app/_shared/EMLJournal/main.js').default,
					require('./os-app/_shared/EMLMemo/main.js').default,
					require('./os-app/_shared/EMLSetting/main.js').default,
					require('./os-app/_shared/EMLTransport/main.js').default,
				],
			}],
			_ZDRParamDispatchJSONPreStringify: require('OLSKObject').default.OLSKObjectSafeCopy,
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function EMLMochaStubs() {
	Object.entries({

		StubJournalObject(inputData) {
			return Object.assign({
				EMLJournalName: 'bravo',
			}, inputData);
		},

		StubJournalObjectValid(inputData) {
			return StubJournalObject(Object.assign({
				EMLJournalID: 'alfa',
				EMLJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMLJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
			}, inputData));
		},

		StubMemoObject(inputData) {
			return Object.assign({
				EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoNotes: '',
			}, inputData);
		},

		StubMemoObjectValid(inputData) {
			return StubMemoObject(Object.assign({
				EMLMemoID: 'charlie',
				EMLMemoJournalID: 'alfa',
				EMLMemoCreationDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoModificationDate: new Date('2019-02-23T13:56:36Z'),
			}, inputData));
		},

		StubSettingObjectValid (inputData = {}) {
			return Object.assign({
				EMLSettingKey: Math.random().toString(),
				EMLSettingValue: Math.random().toString(),
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
