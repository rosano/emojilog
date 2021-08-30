const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EMLTrackJournalsLogic = require('./ui-logic.js');

describe('EMLTrackJournals_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMLTrackJournalsHead', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLTrackJournalsHead, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLTrackJournalsHead, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLTrackJournalsHead, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('EMLTrackJournalsCreateButton', function test_EMLTrackJournalsCreateButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLTrackJournalsCreateButton, 'OLSKDecorButtonNoStyle');
		});
		
		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLTrackJournalsCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLTrackJournalsCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMLTrackJournalsCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTrackJournalsDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(EMLTrackJournalsCreateButton);
			});

			it('sends EMLTrackJournalsDispatchCreate', function () {
				browser.assert.text('#TestEMLTrackJournalsDispatchCreate', '1');
			});
		
		});
	
	});

	describe('EMLTrackJournalsCreateButtonImage', function test_EMLTrackJournalsCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLTrackJournalsCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	describe('OLSKCollection', function test_OLSKCollection () {

		const EMLJournalTouchDate = new Date();
		const item = {
			EMLJournalID: 'alfa',
			EMLJournalName: 'bravo',
			EMLJournalTouchDate,
		};
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackJournalsListItems: JSON.stringify([item]),
			});
		});

		it('sets OLSKCollectionChunkFunction', function () {
			browser.assert.elements('.OLSKCollectionChunkHeading', 1);
		});

		it('binds EMLJournalName', function () {
			browser.assert.text('.EMLTrackTimerLabel', 'bravo');
		});
		
	});

});
