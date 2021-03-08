const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const EMLJournal = require('../EMLJournal/main.js').default;

describe('EMLMemoErrors', function test_EMLMemoErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMLMemoErrors(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLMemoID not string', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoID: null,
		})), {
			EMLMemoID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLMemoID not filled', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoID: ' ',
		})), {
			EMLMemoID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLMemoJournalID not string', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoJournalID: null,
		})), {
			EMLMemoJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLMemoJournalID not filled', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoJournalID: ' ',
		})), {
			EMLMemoJournalID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLMemoCreationDate not date', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoCreationDate: new Date('alfa'),
		})), {
			EMLMemoCreationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoModificationDate not date', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoModificationDate: new Date('alfa'),
		})), {
			EMLMemoModificationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoEventDate not date', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoEventDate: new Date('alfa'),
		})), {
			EMLMemoEventDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoNotes not string', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid({
			EMLMemoNotes: null,
		})), {
			EMLMemoNotes: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.EMLMemoErrors(StubMemoObjectValid()), null);
	});

});

describe('EMLMemoDirectory', function test_EMLMemoDirectory() {

	it('returns string', function() {
		deepEqual(mod.EMLMemoDirectory(), 'eml_memos');
	});

});

describe('EMLMemoFolderPath', function test_EMLMemoFolderPath() {

	it('returns string', function() {
		const item = {
			EMLMemoID: Math.random().toString(),
			EMLMemoJournalID: Math.random().toString(),
			EMLMemoCreationDate: new Date(),
		};
		deepEqual(mod.EMLMemoFolderPath(item), [
			EMLJournal.EMLJournalFolderPath({
				EMLJournalID: item.EMLMemoJournalID,
			}) + mod.EMLMemoDirectory(),
			item.EMLMemoCreationDate.toJSON().split('T').shift(),
			item.EMLMemoID,
			].join('/') + '/');
	});

});

describe('EMLMemoObjectPath', function test_EMLMemoObjectPath() {

	it('returns string', function () {
		const item = StubMemoObjectValid();
		deepEqual(mod.EMLMemoObjectPath(item), mod.EMLMemoFolderPath(item) + 'main');
	});

});

describe('EMLMemoStub', function test_EMLMemoStub() {

	it('returns string', function() {
		const Journal = StubJournalObjectValid();
		const Memo = StubMemoObjectValid({
			EMLMemoCreationDate: new Date((new Date()).toJSON().slice(0, 10)),
		});
		deepEqual(mod.EMLMemoStub([
			EMLJournal.EMLJournalFolderPath(Journal) + mod.EMLMemoDirectory(),
			Memo.EMLMemoCreationDate.toJSON().slice(0, 10),
			Memo.EMLMemoID,
			'main',
			].join('/')), {
			EMLMemoID: Memo.EMLMemoID,
			EMLMemoJournalID: Journal.EMLJournalID,
			EMLMemoCreationDate: Memo.EMLMemoCreationDate,
		});
	});

});

describe('EMLMemoCreate', function test_EMLMemoCreate() {

	it('throws if param1 not object', function () {
		throws(function () {
			ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(null, StubJournalObjectValid());
		}, /EMLErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObjectValid(), {});
		}, /EMLErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObjectValid({
			EMLMemoNotes: null,
		}), StubJournalObjectValid()), {
			EMLMemoNotes: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubMemoObjectValid();
		strictEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(item, StubJournalObjectValid()), item);
	});

	it('sets EMLMemoID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid())).EMLMemoID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMLMemoCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid())).EMLMemoCreationDate < 100, true);
	});

	it('sets EMLMemoModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid())).EMLMemoModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const EMLMemoID = Math.random().toString();
		const item = StubMemoObject({
			EMLMemoID,
		});
		deepEqual((await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(item, StubJournalObjectValid())).EMLMemoID, EMLMemoID);
	});

});

describe('EMLMemoUpdate', function test_EMLMemoUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.EMLMemo.EMLMemoUpdate(null)
		}, /EMLErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.EMLMemo.EMLMemoUpdate(Object.assign(await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid()), {
			EMLMemoID: null,
		})), {
			EMLMemoID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid());
		strictEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoUpdate(item), item);
	});

	it('sets EMLMemoModificationDate', async function() {
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid());
		const date = mod.EMLMemoModificationDate;

		await ZDRTestingWrap.App.EMLMemo.EMLMemoUpdate(item);
		
		notStrictEqual(item.EMLMemoModificationDate, date);
		deepEqual(new Date() - item.EMLMemoModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const Journal = StubJournalObjectValid();
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoUpdate(StubMemoObjectValid({
			EMLMemoJournalID: Journal.EMLJournalID,
		}));
		deepEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoList(Journal), [item]);
	});

});

describe('EMLMemoList', function test_EMLMemoList() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.EMLMemo.EMLMemoDelete({}), /EMLErrorInputNotValid/);
	});

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoList(StubJournalObjectValid()), []);
	});

	it('returns array with existing items', async function() {
		const Journal = StubJournalObjectValid();
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), Journal);
		deepEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoList(Journal), [item]);
	});

});

describe('EMLMemoDelete', function test_EMLMemoDelete() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.EMLMemo.EMLMemoDelete({}), /EMLErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid());
		strictEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoDelete(item), item);
	});

	it('deletes EMLMemo', async function () {
		await ZDRTestingWrap.App.EMLMemo.EMLMemoDelete(await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid()))
		deepEqual(await ZDRTestingWrap.App.EMLMemo.EMLMemoList(StubJournalObjectValid()), []);
	});

	it('deletes EMLMemoFolder recursively', async function () {
		const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObject(), StubJournalObjectValid());

		await ZDRTestingWrap.App.ZDRStorageWriteObject(mod.EMLMemoFolderPath(item) + Math.random().toString() + '/' + Math.random().toString(), {
			[Math.random().toString()]: Math.random().toString(),
		});

		await ZDRTestingWrap.App.EMLMemo.EMLMemoDelete(item);

		deepEqual(await ZDRTestingWrap.App.ZDRStoragePathsRecursive(mod.EMLMemoFolderPath(item)), []);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.EMLMemoErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.EMLMemoObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.EMLMemoStub);
	});

});
