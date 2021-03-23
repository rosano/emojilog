const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject').default;

describe('EMLJournalErrors', function test_EMLJournalErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMLJournalErrors(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLJournalID not string', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
			EMLJournalID: null,
		})), {
			EMLJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLJournalID not filled', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
			EMLJournalID: ' ',
		})), {
			EMLJournalID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLJournalName not string', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
			EMLJournalName: null,
		})), {
			EMLJournalName: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLJournalCreationDate not date', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
			EMLJournalCreationDate: new Date('alfa'),
		})), {
			EMLJournalCreationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLJournalModificationDate not date', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
			EMLJournalModificationDate: new Date('alfa'),
		})), {
			EMLJournalModificationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.EMLJournalErrors(StubJournalObjectValid()), null);
	});

	context('EMLJournalTouchDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
				EMLJournalTouchDate: new Date('alfa'),
			})), {
				EMLJournalTouchDate: [
					'EMLErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
				EMLJournalTouchDate: new Date(),
			})), null);
		});

	});

	context('EMLJournalFields', function () {

		it('returns object if not array', function () {
			deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
				EMLJournalFields: null,
			})), {
				EMLJournalFields: [
					'EMLErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.EMLJournalErrors(StubJournalObjectValid({
				EMLJournalFields: [],
			})), null);
		});

		it('throws if not valid', function () {
			throws(function () {
				mod.EMLJournalErrors(StubJournalObjectValid({
					EMLJournalFields: [{}],
				}))
			}, /EMLErrorInputNotValid/);
		});

	});

});

describe('EMLFieldErrors', function test_EMLFieldErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMLFieldErrors(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLFieldID not string', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid({
			EMLFieldID: null,
		})), {
			EMLFieldID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLFieldID not filled', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid({
			EMLFieldID: ' ',
		})), {
			EMLFieldID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLFieldName not string', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid({
			EMLFieldName: null,
		})), {
			EMLFieldName: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLFieldCreationDate not date', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid({
			EMLFieldCreationDate: new Date('alfa'),
		})), {
			EMLFieldCreationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLFieldModificationDate not date', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid({
			EMLFieldModificationDate: new Date('alfa'),
		})), {
			EMLFieldModificationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.EMLFieldErrors(StubFieldObjectValid()), null);
	});

});

describe('EMLFieldGenerate', function test_EMLFieldGenerate() {

	it('returns object', function() {
		strictEqual(typeof mod.EMLFieldGenerate(), 'object');
	});

	it('sets EMLFieldID to unique value', function() {
		const items = Array.from(Array(10)).map(function (e) {
			return mod.EMLFieldGenerate().EMLFieldID;
		});
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMLFieldName', function() {
		deepEqual(mod.EMLFieldGenerate().EMLFieldName, '');
	});

	it('sets EMLFieldCreationDate', function() {
		deepEqual(new Date() - mod.EMLFieldGenerate().EMLFieldCreationDate < 100, true);
	});

	it('sets EMLFieldModificationDate', function() {
		deepEqual(new Date() - mod.EMLFieldGenerate().EMLFieldModificationDate < 100, true);
	});

});

describe('EMLJournalDirectory', function test_EMLJournalDirectory() {

	it('returns string', function() {
		deepEqual(mod.EMLJournalDirectory(), 'eml_journals');
	});

});

describe('EMLJournalFolderPath', function test_EMLJournalFolderPath() {

	it('returns string', function() {
		const EMLJournalID = Math.random().toString();
		deepEqual(mod.EMLJournalFolderPath({
			EMLJournalID,
		}), mod.EMLJournalDirectory() + '/' + EMLJournalID + '/');
	});

});

describe('EMLJournalObjectPath', function test_EMLJournalObjectPath() {

	it('returns string', function() {
		const item = {
			EMLJournalID: Math.random().toString(),
		};
		deepEqual(mod.EMLJournalObjectPath(item), mod.EMLJournalFolderPath(item) + 'main');
	});

});

describe('EMLJournalStub', function test_EMLJournalStub() {

	it('returns string', function() {
		const EMLJournalID = Math.random().toString();
		deepEqual(mod.EMLJournalStub(`${ mod.EMLJournalDirectory() }/${ EMLJournalID }/main`), {
			EMLJournalID,
		});
	});

});

describe('EMLJournalCreate', function test_EMLJournalCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(null)
		}, /EMLErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject({
			EMLJournalName: null,
		})), {
			EMLJournalName: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubJournalObjectValid();
		strictEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(item), item);
	});

	it('sets EMLJournalID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject())).EMLJournalID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMLJournalCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject())).EMLJournalCreationDate < 100, true);
	});

	it('sets EMLJournalModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject())).EMLJournalModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubJournalObjectValid();
		deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(Object.assign({}, item)), item);
	});

	context('relations', function () {

		const memory = StubJournalObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.EMLJournal.EMLJournalList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('EMLJournalUpdate', function test_EMLJournalUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(null)
		}, /EMLErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(Object.assign(await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject()), {
			EMLJournalID: null,
		})), {
			EMLJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject());
		strictEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(item), item);
	});

	it('sets EMLJournalModificationDate', async function() {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject());
		const date = item.EMLJournalModificationDate;

		await ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(item);
		
		notStrictEqual(item.EMLJournalModificationDate, date);
		deepEqual(new Date() - item.EMLJournalModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(StubJournalObjectValid());
		deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalList(), [item]);
	});

	context('relations', function () {

		const memory = StubJournalObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.EMLJournal.EMLJournalUpdate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.EMLJournal.EMLJournalList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('EMLJournalList', function test_EMLJournalList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObjectValid());

		deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalList(), [item]);
	});

});

describe('EMLJournalDelete', function test_EMLJournalDelete() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.EMLJournal.EMLJournalDelete({}), /EMLErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject());
		strictEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalDelete(item), item);
	});

	it('deletes EMLJournal', async function () {
		await ZDRTestingWrap.App.EMLJournal.EMLJournalDelete(await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject()))
		deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalList(), []);
	});

	it('deletes EMLJournalFolder recursively', async function () {
		const item = await ZDRTestingWrap.App.EMLJournal.EMLJournalCreate(StubJournalObject());

		await ZDRTestingWrap.App.ZDRStorageWriteObject(mod.EMLJournalFolderPath(item) + Math.random().toString() + '/' + Math.random().toString(), {
			[Math.random().toString()]: Math.random().toString(),
		});

		await ZDRTestingWrap.App.EMLJournal.EMLJournalDelete(item);

		deepEqual(await ZDRTestingWrap.App.ZDRStoragePathsRecursive(mod.EMLJournalFolderPath(item)), []);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.EMLJournalErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.EMLJournalObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.EMLJournalStub);
	});

});
