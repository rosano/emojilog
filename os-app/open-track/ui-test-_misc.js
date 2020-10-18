const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrack_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns link:apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.EMT_TOUCH_ICON_URL);
	});
	
	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('assigns meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('assigns meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	describe('EMTTrackStorageToolbar', function test_EMTTrackStorageToolbar () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTrackStorageToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTTrackStorageToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKStorageToolbar', function () {
			browser.assert.hasClass(EMTTrackStorageToolbar, 'OLSKStorageToolbar');
		});
	
	});

	describe('EMTTrackViewportFooter', function test_EMTTrackViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(EMTTrackViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbar', function test_OLSKAppToolbar () {

		it('sets OLSKAppToolbarDonateURL', function () {
			browser.assert.attribute('.OLSKAppToolbarDonateLink', 'href', process.env.EMT_SHARED_DONATE_URL);
		});

	});

	describe('ImportData', function test_ImportData() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMTTrackLauncherItemDebug_ImportFileData');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify([StubJournalObjectValid({
					EMTJournalName: 'zulu',
					$EMTJournalMemos: [StubMemoObjectValid({
						EMTMemoID: 'alfa',
					}), StubMemoObjectValid({
						EMTMemoID: 'bravo',
					})],
				})]);

				return dialog;
			});
		});

		it('creates journal', function () {
			browser.assert.text('.EMTTrackMasterListItemName', 'zulu');
		});

		context('click', function () {

			before(function () {
				return browser.pressButton('.EMTTrackMasterListItem');
			});
			
			it('creates memo', function () {
				browser.assert.elements('.EMTBrowseListItem', 2);
			});
		
		});
		
	});

	context('create', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('focuses EMTTemplateFormNameField', function() {
			browser.assert.hasFocus('.EMTTemplateFormNameField');
		});

		describe('EMTTrackMasterListItem', function test_EMTTrackMasterListItem () {

			before(function () {
				return browser.pressButton('.EMTTemplateToolbarDoneButton');
			});

			before(function () {
				return browser.pressButton('.EMTBrowseListToolbarCloseButton');
			});

			it('classes OLSKLayoutButtonNoStyle', function() {
				browser.assert.hasClass('.EMTTrackMasterListItem', 'OLSKLayoutButtonNoStyle');
			});

			it('classes OLSKLayoutElementTappable', function() {
				browser.assert.hasClass('.EMTTrackMasterListItem', 'OLSKLayoutElementTappable');
			});
		
		});

	});

});
