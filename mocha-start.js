(function EMLMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'emojilog',
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
				EMLJournalName: Math.random().toString(),
			}, inputData);
		},

		StubJournalObjectValid(inputData) {
			return StubJournalObject(Object.assign({
				EMLJournalID: Math.random().toString(),
				EMLJournalCreationDate: new Date(),
				EMLJournalModificationDate: new Date(),
			}, inputData));
		},

		StubFieldObject(inputData) {
			return Object.assign({
				EMLFieldName: Math.random().toString(),
			}, inputData);
		},

		StubFieldObjectValid(inputData) {
			return StubFieldObject(Object.assign({
				EMLFieldID: Math.random().toString(),
				EMLFieldCreationDate: new Date(),
				EMLFieldModificationDate: new Date(),
			}, inputData));
		},

		StubMemoObject(inputData) {
			return Object.assign({
				EMLMemoEventDate: new Date(),
				EMLMemoNotes: Math.random().toString(),
			}, inputData);
		},

		StubMemoObjectValid(inputData) {
			return StubMemoObject(Object.assign({
				EMLMemoID: Math.random().toString(),
				EMLMemoJournalID: Math.random().toString(),
				EMLMemoCreationDate: new Date(),
				EMLMemoModificationDate: new Date(),
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
