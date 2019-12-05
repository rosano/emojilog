const EMTStorageModule = require('./os-app/_shared/EMTStorageModule/main.js');
const EMTDocumentStorage = require('./os-app/_shared/EMTDocument/storage.js');

(function EMTMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.EMTTestingStorageClient = require('./os-app/_shared/EMTStorageClient/main.js').EMTStorageClient({
			modules: [
				EMTStorageModule.EMTStorageModule([
					EMTDocumentStorage.EMTDocumentStorage,
				].map(function (e) {
					return {
						EMTCollectionStorageGenerator: e,
						EMTCollectionChangeDelegate: null,
					};
				}))
			],
		});

		done();
	});

	beforeEach(async function() {
		await uSerial([
			'emt_documents',
		].map(async function (e) {
			return await Promise.all(Object.keys(await global.EMTTestingStorageClient.emojitimer[e].EMTStorageList()).map(global.EMTTestingStorageClient.emojitimer[e].EMTStorageDelete));
		}));
	});
})();
