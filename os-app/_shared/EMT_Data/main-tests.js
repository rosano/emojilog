const { throws, rejects, deepEqual } = require('assert');

const mainModule = require('./main.js').default;
const EMTJournalAction = require('../EMTJournal/action.js').default;
const EMTMemoAction = require('../EMTMemo/action.js').default;

describe('EMT_DataImport', function test_EMT_DataImport() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.EMT_DataImport(EMTTestingStorageClient, null);
		}, /EMTErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mainModule.EMT_DataImport(EMTTestingStorageClient, []);
		}, /EMTErrorInputNotValid/);
	});

	const uJournal = function (inputData) {
		return StubJournalObjectValid(Object.assign({
			$EMTJournalMemos: [],
		}, inputData));
	};

	context('EMTJournal', function () {
		
		it('rejects if not valid', async function () {
			await rejects(mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal({
				EMTJournalName: null,
			})]), /EMTErrorInputNotValid/);
		});

		it('returns array', async function () {
			const item = await mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal()]);

			deepEqual(item, [StubJournalObjectValid({
				EMTJournalID: item[0].EMTJournalID,
				EMTJournalCreationDate: item[0].EMTJournalCreationDate,
				EMTJournalModificationDate: item[0].EMTJournalModificationDate,
			})]);
		});

		it('removes $EMTJournalMemos', async function () {
			const item = await mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal()]);

			deepEqual(item[0].$EMTJournalMemos, undefined);
		});

		it('creates EMTJournal objects', async function () {
			const item = await mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal()]);

			deepEqual(await EMTJournalAction.EMTJournalActionList(EMTTestingStorageClient), item);
		});
	
	});

	context('$EMTJournalMemos', function () {
		
		it('rejects if not array', async function () {
			await rejects(mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal({
				$EMTJournalMemos: null,
			})]), /EMTErrorInputNotValid/);
		});

		it('rejects if not valid', async function () {
			await rejects(mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal({
				$EMTJournalMemos: [StubMemoObjectValid({
					EMTMemoNotes: null,
				})],
			})]), /EMTErrorInputNotValid/);
		});

		it('creates EMTMemo objects', async function () {
			const item = StubMemoObjectValid();

			delete item.EMTMemoID;
			delete item.EMTMemoJournalID;

			const list = await EMTMemoAction.EMTMemoActionList(EMTTestingStorageClient, (await mainModule.EMT_DataImport(EMTTestingStorageClient, [uJournal({
				$EMTJournalMemos: [item],
			})]))[0]);

			deepEqual(list, [Object.assign(item, {
				EMTMemoID: list[0].EMTMemoID,
				EMTMemoJournalID: list[0].EMTMemoJournalID,
			})]);
		});
	
	});

});
