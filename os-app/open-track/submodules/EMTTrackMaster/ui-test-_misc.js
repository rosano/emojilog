const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackMaster_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMTTrackMasterToolbar', function () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTrackMasterToolbar, 'OLSKToolbar');
		});
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(EMTTrackMasterToolbar, 'OLSKMobileViewHeader');
		});
	
	});

	describe('EMTTrackMasterCreateButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackMasterCreateButton, 'OLSKLayoutButtonNoStyle');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackMasterCreateButton, 'OLSKLayoutElementTappable');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMTTrackMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackMasterDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('sends EMTTrackMasterDispatchCreate', function () {
				browser.assert.text('#TestEMTTrackMasterDispatchCreate', '1');
			});
		
		});
	
	});

	describe('EMTTrackMasterBody', function () {
		
		it('classes OLSKMobileViewBody', function () {
			browser.assert.hasClass(EMTTrackMasterBody, 'OLSKMobileViewBody');
		});
	
	});

	describe('EMTTrackMasterListItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackMasterListItems: JSON.stringify([{
					EMTJournalID: 'alfa',
					EMTJournalName: 'bravo',
				}]),
			});
		});

		it('sets binds EMTJournalName', function () {
			browser.assert.text(EMTTrackMasterListItemName, 'bravo');
		});


		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackMasterDispatchSelect', '0');
				browser.assert.text('#TestEMTTrackMasterDispatchSelectData', 'undefined');
			});
			
			before(function () {
				return browser.click(EMTTrackMasterListItem);
			});

			it('sends EMTTrackMasterDispatchSelect', function () {
				browser.assert.text('#TestEMTTrackMasterDispatchSelect', '1');
				browser.assert.text('#TestEMTTrackMasterDispatchSelectData', JSON.stringify({
					EMTJournalID: 'alfa',
					EMTJournalName: 'bravo',
				}));
			});
		
		});
		
	});

	describe('EMTTrackMasterListItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackMasterListItems: JSON.stringify([{
					EMTJournalID: 'alfa',
					EMTJournalName: 'bravo',
				}, {
					EMTJournalID: 'charlie',
					EMTJournalName: 'delta',
				}]),
				EMTTrackMasterListItemSelected: JSON.stringify({
					EMTJournalID: 'charlie',
					EMTJournalName: 'delta',
				}),
			});
		});

		it('classes 1', function () {
			browser.assert.elements('.EMTTrackMasterListItemSelected', 1);
			browser.assert.hasClass(`${ EMTTrackMasterListItem }:nth-child(2)`, 'EMTTrackMasterListItemSelected');
		});
		
	});

	describe.skip('EMTTrackMasterLauncherItemImportData', function test_EMTTrackMasterLauncherItemImportData() {

		before(function () {
			browser.assert.text('#TestEMTTrackMasterDispatchImportData', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('EMTTrackMasterLauncherItemImportData');
		});

		it('sends EMTTrackMasterDispatchImportData', function () {
			browser.assert.text('#TestEMTTrackMasterDispatchImportData', '1');
		});

	});

});
