const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubDocumentObjectValid() {
		return {
			EMTDocumentID: 'alfa',
			EMTDocumentName: 'bravo',
			EMTDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMTDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMTDocumentMetalWrite', function test_EMTDocumentMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			EMTDocumentID: null,
		}))).EMTErrors, {
			EMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns EMTDocument', async function() {
		let item = await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

	context('relations', function () {

		const memory = Object.assign(kTesting.StubDocumentObjectValid(), {
			$alfa: 'bravo',
		});
		let storage = [];

		before(async function () {
			await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, memory);
		});
		
		before(async function () {
			storage = Object.values(await mainModule.EMTDocumentMetalList(EMTTestingStorageClient));
		});
		
		it('ignores property', function () {
			deepEqual(storage, [Object.assign(kTesting.StubDocumentObjectValid(), {
				'@context': memory['@context'],
			})]);
		});

		it('clones object', function () {
			deepEqual(memory.$alfa, 'bravo');
		});
	
	});

});

describe('EMTDocumentMetalList', function test_EMTDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.EMTDocumentMetalList(EMTTestingStorageClient), {});
	});

	it('returns existing EMTDocuments', async function() {
		let item = await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.EMTDocumentMetalList(EMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.EMTDocumentMetalList(EMTTestingStorageClient)), [item.EMTDocumentID]);
	});

});

describe('EMTDocumentMetalDelete', function test_EMTDocumentMetalDelete() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.EMTDocumentMetalDelete(EMTTestingStorageClient, {}), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.EMTDocumentMetalDelete(EMTTestingStorageClient, await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes EMTDocument', async function() {
		await mainModule.EMTDocumentMetalDelete(EMTTestingStorageClient, await mainModule.EMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid()));
		deepEqual(await mainModule.EMTDocumentMetalList(EMTTestingStorageClient), {});
	});

});
