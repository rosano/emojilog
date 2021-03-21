const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EMLTrackMasterLogic = require('./ui-logic.js');

describe('EMLTrackMaster_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMLTrackMasterHead', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLTrackMasterHead, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLTrackMasterHead, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLTrackMasterHead, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('EMLTrackMasterCreateButton', function test_EMLTrackMasterCreateButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLTrackMasterCreateButton, 'OLSKDecorButtonNoStyle');
		});
		
		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLTrackMasterCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLTrackMasterCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMLTrackMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTrackMasterDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(EMLTrackMasterCreateButton);
			});

			it('sends EMLTrackMasterDispatchCreate', function () {
				browser.assert.text('#TestEMLTrackMasterDispatchCreate', '1');
			});
		
		});
	
	});

	describe('EMLTrackMasterCreateButtonImage', function test_EMLTrackMasterCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLTrackMasterCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	describe('EMLTrackMasterListItem', function() {

		const EMLJournalTouchDate = new Date();
		const item = {
			EMLJournalID: 'alfa',
			EMLJournalName: 'bravo',
			EMLJournalTouchDate,
		};
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackMasterListItems: JSON.stringify([item]),
			});
		});

		it('sets aria-label', function () {
			browser.assert.attribute(EMLTrackMasterListItem, 'aria-label', EMLTrackMasterLogic.EMLTrackMasterAccessibilitySummary(item))
		});

		it('binds EMLJournalName', function () {
			browser.assert.text('.EMLTrackTimerLabel', 'bravo');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTrackMasterDispatchSelect', '0');
				browser.assert.text('#TestEMLTrackMasterDispatchSelectData', 'undefined');
			});
			
			before(function () {
				return browser.click(EMLTrackMasterListItem);
			});

			it('sends EMLTrackMasterDispatchSelect', function () {
				browser.assert.text('#TestEMLTrackMasterDispatchSelect', '1');
				browser.assert.text('#TestEMLTrackMasterDispatchSelectData', JSON.stringify(item));
			});
		
		});
		
	});

});
