const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

describe('EMTMemoModelErrorsFor', function test_EMTMemoModelErrorsFor() {

	it('throws error if not object', function () {
		throws(function () {
			mod.EMTMemoModelErrorsFor(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns object if EMTMemoID not string', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoID: null,
		})), {
			EMTMemoID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTMemoID not filled', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoID: ' ',
		})), {
			EMTMemoID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTMemoJournalID not string', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoJournalID: null,
		})), {
			EMTMemoJournalID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns object if EMTMemoJournalID not filled', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoJournalID: ' ',
		})), {
			EMTMemoJournalID: [
				'EMTErrorNotFilled',
			],
		});
	});

	it('returns object if EMTMemoCreationDate not date', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoCreationDate: new Date('alfa'),
		})), {
			EMTMemoCreationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTMemoModificationDate not date', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoModificationDate: new Date('alfa'),
		})), {
			EMTMemoModificationDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTMemoEventDate not date', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoEventDate: new Date('alfa'),
		})), {
			EMTMemoEventDate: [
				'EMTErrorNotDate',
			],
		});
	});

	it('returns object if EMTMemoNotes not string', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMTMemoNotes: null,
		})), {
			EMTMemoNotes: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.EMTMemoModelErrorsFor(StubMemoObjectValid()), null);
	});

});
