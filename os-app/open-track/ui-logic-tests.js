const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('EMLTrackDocumentCount', function test_EMLTrackDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.EMLTrackDocumentCount(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.EMLTrackDocumentCount([]), 0);
	});

	it('excludes if not invalid', function () {
		deepEqual(mod.EMLTrackDocumentCount([null]), 0);
	});

	it('excludes if valid', function () {
		const item = uRandomInt();
		deepEqual(mod.EMLTrackDocumentCount(Array.from(Array(item)).map(function () {
			return StubJournalObjectValid();
		})), 0);
	});

	it('counts EMLJournalChildCount', function () {
		const item = Array.from(Array(uRandomInt())).map(function () {
			return StubJournalObjectValid({
				EMLJournalChildCount: uRandomInt(),
			});
		});
		deepEqual(mod.EMLTrackDocumentCount(item), item.reduce(function (coll, item) {
			return coll + item.EMLJournalChildCount;
		}, 0));
	});

});