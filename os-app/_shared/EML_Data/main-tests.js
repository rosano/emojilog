const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js').default;
const EMLJournalAction = require('../EMLJournal/action.js').default;
const EMLMemoAction = require('../EMLMemo/action.js').default;

describe('EML_DataImport', function test_EML_DataImport() {

	it('throws if not array', function () {
		throws(function () {
			mod.EML_DataImport(EMLTestingStorageClient, null);
		}, /EMLErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mod.EML_DataImport(EMLTestingStorageClient, []);
		}, /EMLErrorInputNotValid/);
	});

	const uJournal = function (inputData) {
		return StubJournalObjectValid(Object.assign({
			$EMLJournalMemos: [],
		}, inputData));
	};

	context('EMLJournal', function () {
		
		it('rejects if not valid', async function () {
			await rejects(mod.EML_DataImport(EMLTestingStorageClient, [uJournal({
				EMLJournalName: null,
			})]), /EMLErrorInputNotValid/);
		});

		it('returns array', async function () {
			const item = await mod.EML_DataImport(EMLTestingStorageClient, [uJournal()]);

			deepEqual(item, [StubJournalObjectValid({
				EMLJournalID: item[0].EMLJournalID,
				EMLJournalCreationDate: item[0].EMLJournalCreationDate,
				EMLJournalModificationDate: item[0].EMLJournalModificationDate,
			})]);
		});

		it('removes $EMLJournalMemos', async function () {
			const item = await mod.EML_DataImport(EMLTestingStorageClient, [uJournal()]);

			deepEqual(item[0].$EMLJournalMemos, undefined);
		});

		it('creates EMLJournal objects', async function () {
			const item = await mod.EML_DataImport(EMLTestingStorageClient, [uJournal()]);

			deepEqual(await EMLJournalAction.EMLJournalActionList(EMLTestingStorageClient), item);
		});
	
	});

	context('$EMLJournalMemos', function () {
		
		it('rejects if not array', async function () {
			await rejects(mod.EML_DataImport(EMLTestingStorageClient, [uJournal({
				$EMLJournalMemos: null,
			})]), /EMLErrorInputNotValid/);
		});

		it('rejects if not valid', async function () {
			await rejects(mod.EML_DataImport(EMLTestingStorageClient, [uJournal({
				$EMLJournalMemos: [StubMemoObjectValid({
					EMLMemoNotes: null,
				})],
			})]), /EMLErrorInputNotValid/);
		});

		it('creates EMLMemo objects', async function () {
			const item = StubMemoObjectValid();

			delete item.EMLMemoID;
			delete item.EMLMemoJournalID;

			const list = await EMLMemoAction.EMLMemoActionList(EMLTestingStorageClient, (await mod.EML_DataImport(EMLTestingStorageClient, [uJournal({
				$EMLJournalMemos: [item],
			})]))[0]);

			deepEqual(list, [Object.assign(item, {
				EMLMemoID: list[0].EMLMemoID,
				EMLMemoJournalID: list[0].EMLMemoJournalID,
			})]);
		});
	
	});

});

describe('EML_DataExport', function test_EML_DataExport() {

	it('throws if not array', function () {
		throws(function () {
			mod.EML_DataExport(EMLTestingStorageClient, null);
		}, /EMLErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mod.EML_DataExport(EMLTestingStorageClient, []);
		}, /EMLErrorInputNotValid/);
	});

	it('returns array', async function () {
		deepEqual(Array.isArray(await mod.EML_DataExport(EMLTestingStorageClient, [StubJournalObjectValid()])), true);
	});

	it('copies input', async function () {
		const item = StubJournalObjectValid();
		deepEqual((await mod.EML_DataExport(EMLTestingStorageClient, [item]))[0] !== item, true);
	});

	it('strips dynamic attributes', async function () {
		const item = StubJournalObjectValid({
			$alfa: 'bravo',
		});
		deepEqual((await mod.EML_DataExport(EMLTestingStorageClient, [item]))[0].$alfa, undefined);
	});

	context('$EMLJournalMemos', function () {
		
		it('sets to EMLMemo objects', async function () {
			const item = await EMLMemoAction.EMLMemoActionCreate(EMLTestingStorageClient, StubMemoObjectValid(), StubJournalObjectValid());

			deepEqual(await mod.EML_DataExport(EMLTestingStorageClient, [StubJournalObjectValid()]), [Object.assign(StubJournalObjectValid(), {
				$EMLJournalMemos: await EMLMemoAction.EMLMemoActionList(EMLTestingStorageClient, StubJournalObjectValid()),
			})]);
		});
	
	});

});

