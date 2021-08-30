const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTrackJournals: '.EMLTrackJournals',
	
	EMLTrackJournalsHead: '.EMLTrackJournalsHead',
	EMLTrackJournalsCreateButton: '.EMLTrackJournalsCreateButton',
	EMLTrackJournalsCreateButtonImage: '.EMLTrackJournalsCreateButtonImage',

	EMLTrackJournalsListItem: '.EMLTrackJournalsListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTrackJournals_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLTrackJournals', function () {
		browser.assert.elements(EMLTrackJournals, 1);
	});

	it('shows EMLTrackJournalsHead', function () {
		browser.assert.elements(EMLTrackJournalsHead, 1);
	});

	it('shows EMLTrackJournalsCreateButton', function () {
		browser.assert.elements(EMLTrackJournalsCreateButton, 1);
	});

	it('shows EMLTrackJournalsCreateButtonImage', function () {
		browser.assert.elements(EMLTrackJournalsCreateButtonImage, 1);
	});

	it('shows OLSKCollection', function () {
		browser.assert.elements('.OLSKCollection', 1);
	});

	it('hides EMLTrackJournalsListItem', function () {
		browser.assert.elements(EMLTrackJournalsListItem, 0);
	});

	context('EMLTrackJournalsListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackJournalsListItems: JSON.stringify([StubJournalObjectValid()]),
			});
		});

		it('shows EMLTrackJournalsListItem', function () {
			browser.assert.elements(EMLTrackJournalsListItem, 1);
		});

		it('shows EMLTrackTimer', function () {
			browser.assert.elements('.EMLTrackTimer', 1);
		});
		
	});

});
