const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

describe('EMLMemoModelErrorsFor', function test_EMLMemoModelErrorsFor() {

	it('throws error if not object', function () {
		throws(function () {
			mod.EMLMemoModelErrorsFor(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLMemoID not string', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoID: null,
		})), {
			EMLMemoID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLMemoID not filled', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoID: ' ',
		})), {
			EMLMemoID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLMemoJournalID not string', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoJournalID: null,
		})), {
			EMLMemoJournalID: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLMemoJournalID not filled', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoJournalID: ' ',
		})), {
			EMLMemoJournalID: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLMemoCreationDate not date', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoCreationDate: new Date('alfa'),
		})), {
			EMLMemoCreationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoModificationDate not date', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoModificationDate: new Date('alfa'),
		})), {
			EMLMemoModificationDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoEventDate not date', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoEventDate: new Date('alfa'),
		})), {
			EMLMemoEventDate: [
				'EMLErrorNotDate',
			],
		});
	});

	it('returns object if EMLMemoNotes not string', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(Object.assign(StubMemoObjectValid(), {
			EMLMemoNotes: null,
		})), {
			EMLMemoNotes: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.EMLMemoModelErrorsFor(StubMemoObjectValid()), null);
	});

});
