const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;

const kTesting = {
	StubDocumentObject() {
		return {
			EMTDocumentName: 'alfa',
		};
	},
	uSerial (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	},
	uSleep (inputData) {
		let endTime = new Date().getTime();
		while (new Date().getTime() < endTime + inputData) {}
	},
};

describe('EMTDocumentActionCreate', function test_EMTDocumentActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			EMTDocumentName: null,
		}))).EMTErrors, {
			EMTDocumentName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTDocument', async function() {
		let item = await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			EMTDocumentID: item.EMTDocumentID,
			EMTDocumentCreationDate: item.EMTDocumentCreationDate,
			EMTDocumentModificationDate: item.EMTDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets EMTDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).EMTDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets EMTDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).EMTDocumentCreationDate < 100, true);
	});

	it('sets EMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).EMTDocumentModificationDate < 100, true);
	});

});

describe('EMTDocumentActionUpdate', function test_EMTDocumentActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTDocumentActionUpdate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTDocumentActionUpdate(EMTTestingStorageClient, Object.assign(await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject()), {
			EMTDocumentID: null,
		}))).EMTErrors, {
			EMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTDocument', async function() {
		let itemCreated = await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		let item = await mainModule.EMTDocumentActionUpdate(EMTTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			EMTDocumentModificationDate: item.EMTDocumentModificationDate,
		}));
	});

	it('sets EMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.EMTDocumentActionUpdate(EMTTestingStorageClient, await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject()))).EMTDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.EMTDocumentActionUpdate(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			EMTDocumentID: 'alfa',
			EMTDocumentCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			EMTDocumentID: item.EMTDocumentID,
			EMTDocumentCreationDate: item.EMTDocumentCreationDate,
			EMTDocumentModificationDate: item.EMTDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('EMTDocumentActionDelete', function test_EMTDocumentActionDelete() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.EMTDocumentActionDelete(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.EMTDocumentActionDelete(EMTTestingStorageClient, await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())), {
			statusCode: 200,
		});
	});

	it('deletes EMTDocument', async function() {
		await mainModule.EMTDocumentActionDelete(EMTTestingStorageClient, await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject()));
		deepEqual(await mainModule.EMTDocumentActionList(EMTTestingStorageClient), []);
	});

});

describe('EMTDocumentActionList', function test_EMTDocumentActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.EMTDocumentActionList(EMTTestingStorageClient), []);
	});

	it('returns array with existing EMTDocuments', async function() {
		let item = await mainModule.EMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(await mainModule.EMTDocumentActionList(EMTTestingStorageClient), [item]);
	});

});
