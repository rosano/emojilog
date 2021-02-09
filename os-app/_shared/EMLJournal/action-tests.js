const { rejects, deepEqual } = require('assert');

const mod = require('./action.js').default;
const EMLMemoAction = require('../EMLMemo/action.js').default;

const uJournal = function (inputData) {
	return Object.assign({
		EMLJournalName: 'alfa',
	}, inputData);
};

describe('EMLJournalActionCreate', function test_EMLJournalActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mod.EMLJournalActionCreate(EMLTestingStorageClient, null), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if not valid', async function() {
		deepEqual((await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal({
			EMLJournalName: null,
		}))).EMLErrors, {
			EMLJournalName: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns EMLJournal', async function() {
		let item = await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal());

		deepEqual(item, uJournal({
			EMLJournalID: item.EMLJournalID,
			EMLJournalCreationDate: item.EMLJournalCreationDate,
			EMLJournalModificationDate: item.EMLJournalModificationDate,
		}));
	});

	it('sets EMLJournalID to unique value', async function() {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal())).EMLJournalID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMLJournalCreationDate to now', async function() {
		deepEqual(new Date() - (await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal())).EMLJournalCreationDate < 100, true);
	});

	it('sets EMLJournalModificationDate to now', async function() {
		deepEqual(new Date() - (await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal())).EMLJournalModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		deepEqual(await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid()), StubJournalObjectValid());
	});

});

describe('EMLJournalActionUpdate', function test_EMLJournalActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mod.EMLJournalActionUpdate(EMLTestingStorageClient, null), /EMLErrorInputNotValid/);
	});

	it('returns object with EMLErrors if not valid', async function() {
		deepEqual((await mod.EMLJournalActionUpdate(EMLTestingStorageClient, Object.assign(await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid()), {
			EMLJournalID: null,
		}))).EMLErrors, {
			EMLJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns EMLJournal', async function() {
		let itemCreated = await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid());

		let item = await mod.EMLJournalActionUpdate(EMLTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			EMLJournalModificationDate: item.EMLJournalModificationDate,
		}));
	});

	it('sets EMLJournalModificationDate to now', async function() {
		deepEqual(new Date() - (await mod.EMLJournalActionUpdate(EMLTestingStorageClient, await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid()))).EMLJournalModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mod.EMLJournalActionUpdate(EMLTestingStorageClient, Object.assign(StubJournalObjectValid(), {
			EMLJournalID: 'alfa',
			EMLJournalCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(StubJournalObjectValid(), {
			EMLJournalID: item.EMLJournalID,
			EMLJournalCreationDate: item.EMLJournalCreationDate,
			EMLJournalModificationDate: item.EMLJournalModificationDate,
		}));
	});

});

describe('EMLJournalActionDelete', function test_EMLJournalActionDelete() {

	it('rejects if not valid', async function() {
		await rejects(mod.EMLJournalActionDelete(EMLTestingStorageClient, {}), /EMLErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.EMLJournalActionDelete(EMLTestingStorageClient, await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMLJournal', async function() {
		await mod.EMLJournalActionDelete(EMLTestingStorageClient, await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid()));
		deepEqual(await mod.EMLJournalActionList(EMLTestingStorageClient), []);
	});

	it('deletes EMLMemos', async function () {
		const item = await mod.EMLJournalActionCreate(EMLTestingStorageClient, uJournal());

		await EMLMemoAction.EMLMemoActionCreate(EMLTestingStorageClient, {
			EMLMemoEventDate: new Date(),
			EMLMemoNotes: '',
		}, item);

		await mod.EMLJournalActionDelete(EMLTestingStorageClient, item);
		deepEqual(await EMLMemoAction.EMLMemoActionList(EMLTestingStorageClient, item), []);
	});

});

describe('EMLJournalActionList', function test_EMLJournalActionList() {

	it('returns array', async function() {
		deepEqual(await mod.EMLJournalActionList(EMLTestingStorageClient), []);
	});

	it('returns array with existing EMLJournals', async function() {
		let item = await mod.EMLJournalActionCreate(EMLTestingStorageClient, StubJournalObjectValid());

		deepEqual(await mod.EMLJournalActionList(EMLTestingStorageClient), [item]);
	});

});
