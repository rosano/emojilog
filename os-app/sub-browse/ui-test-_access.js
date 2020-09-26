const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({}).map(function (e) {
	return global[e.shift()] = e.pop();
});

const kTesting = {
	StubJournalObjectValid() {
		return {
			EMTJournalID: 'alfa',
			EMTJournalName: '',
			EMTJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMTJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMTBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
		});
	});

	it('shows EMTBrowseList', function () {
		browser.assert.elements('.EMTBrowseList', 1);
	});

	it('hides EMTBrowseListItem', function () {
		browser.assert.elements('.EMTBrowseListItem', 0);
	});

	it('shows EMTBrowseInfo', function () {
		browser.assert.elements('.EMTBrowseInfo', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMTBrowseInfoForm', function () {
		browser.assert.elements('.EMTBrowseInfoForm', 0);
	});

	it('hides EMTBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMTBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCreateButton');
		});

		it('shows EMTBrowseListItem', function () {
			browser.assert.elements('.EMTBrowseListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMTBrowseInfoForm', function () {
			browser.assert.elements('.EMTBrowseInfoForm', 1);
		});

	});

	context('select', function test_select() {

		it('shows EMTBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('EMTBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.EMTBrowseInfoToolbarDiscardButton');
		});

		it('hides EMTBrowseListItem', function () {
			browser.assert.elements('.EMTBrowseListItem', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides EMTBrowseInfoForm', function () {
			browser.assert.elements('.EMTBrowseInfoForm', 0);
		});

	});

});
