const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('EMLJournalStorageCollectionName', function test_EMLJournalStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mod.EMLJournalStorageCollectionName(), 'eml_journals');
	});

});

describe('EMLJournalStorageCollectionPath', function test_EMLJournalStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mod.EMLJournalStorageCollectionPath(), mod.EMLJournalStorageCollectionName() + '/');
	});

});

describe('EMLJournalStorageFolderPath', function test_EMLJournalStorageFolderPath() {

	it('throws error if blank', function() {
		throws(function() {
			mod.EMLJournalStorageFolderPath('');
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.EMLJournalStorageFolderPath('alfa'), mod.EMLJournalStorageCollectionPath() + 'alfa/');
	});

});

describe('EMLJournalStorageObjectPath', function test_EMLJournalStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mod.EMLJournalStorageObjectPath('');
		}, /EMLErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.EMLJournalStorageObjectPath('alfa'), mod.EMLJournalStorageFolderPath('alfa') + 'main');
	});

});

describe('EMLJournalStorageMatch', function test_EMLJournalStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mod.EMLJournalStorageMatch(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns false if no EMLJournalStorageCollectionPath', function() {
		deepEqual(mod.EMLJournalStorageMatch(mod.EMLJournalStorageObjectPath('alfa').replace(mod.EMLJournalStorageCollectionPath(), mod.EMLJournalStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no EMLJournalStorageObjectPath', function() {
		deepEqual(mod.EMLJournalStorageMatch(mod.EMLJournalStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mod.EMLJournalStorageMatch(mod.EMLJournalStorageObjectPath('alfa')), true);
	});

});

describe('EMLJournalStorageWrite', function test_EMLJournalStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mod.EMLJournalStorageWrite(EMLTestingStorageClient, null), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if not valid', async function() {
		deepEqual((await mod.EMLJournalStorageWrite(EMLTestingStorageClient, Object.assign(StubJournalObjectValid(), {
			EMLJournalID: null,
		}))).EMLErrors, {
			EMLJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubJournalObjectValid();

		deepEqual(await mod.EMLJournalStorageWrite(EMLTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.EMLJournalStorageWrite(EMLTestingStorageClient, StubJournalObjectValid()), StubJournalObjectValid());
	});

	context('relations', function () {

		const item = Object.assign(StubJournalObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mod.EMLJournalStorageWrite(EMLTestingStorageClient, item);
		});
		
		before(async function () {
			storage = Object.values(await mod.EMLJournalStorageList(EMLTestingStorageClient));
		});
		
		it('excludes from storage', function () {
			deepEqual(storage, [StubJournalObjectValid()]);
		});
		
		it('includes in outputData', function () {
			deepEqual(outputData, item);
		});

		it('updates inputData', function () {
			deepEqual(outputData === item, true);
		});
	
	});

});

describe('EMLJournalStorageList', function test_EMLJournalStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mod.EMLJournalStorageList(EMLTestingStorageClient), {});
	});

	it('returns existing EMLJournals', async function() {
		let item = await mod.EMLJournalStorageWrite(EMLTestingStorageClient, StubJournalObjectValid());
		deepEqual(Object.values(await mod.EMLJournalStorageList(EMLTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.EMLJournalStorageList(EMLTestingStorageClient)), [item.EMLJournalID]);
	});

});

describe('EMLJournalStorageDelete', function test_EMLJournalStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mod.EMLJournalStorageDelete(EMLTestingStorageClient, {})
		}, /EMLErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.EMLJournalStorageDelete(EMLTestingStorageClient, await mod.EMLJournalStorageWrite(EMLTestingStorageClient, StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMLJournal', async function() {
		await mod.EMLJournalStorageDelete(EMLTestingStorageClient, await mod.EMLJournalStorageWrite(EMLTestingStorageClient, StubJournalObjectValid()));
		deepEqual(await mod.EMLJournalStorageList(EMLTestingStorageClient), {});
	});

});
