const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({}).map(function (e) {
	return global[e.shift()] = e.pop();
});

const kTesting = {
	StubJournalObjectValid() {
		return {
			EMLJournalID: 'alfa',
			EMLJournalName: '',
			EMLJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMLJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMLBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
		});
	});

	it('shows EMLBrowseList', function () {
		browser.assert.elements('.EMLBrowseList', 1);
	});

	it('hides EMLBrowseListItem', function () {
		browser.assert.elements('.EMLBrowseListItem', 0);
	});

	it('shows EMLBrowseInfo', function () {
		browser.assert.elements('.EMLBrowseInfo', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMLBrowseInfoForm', function () {
		browser.assert.elements('.EMLBrowseInfoForm', 0);
	});

	it('hides EMLBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherFakeItemProxy', 0);
	});

	it('shows EMLBrowseLauncherItemExport', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseLauncherItemExport', 1);
	});

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCreateButton');
		});

		it('shows EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMLBrowseInfoForm', function () {
			browser.assert.elements('.EMLBrowseInfoForm', 1);
		});

	});

	context('select', function test_select() {

		it('shows EMLBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
		});

		it('hides EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides EMLBrowseInfoForm', function () {
			browser.assert.elements('.EMLBrowseInfoForm', 0);
		});

	});

});
