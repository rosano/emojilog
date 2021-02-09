const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('sets meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('sets meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	describe('EMLTrackViewportFooter', function test_EMLTrackViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(EMLTrackViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, 'RP_X')) }')`);
		});

		after(function () {
			browser.pressButton('.OLSKModalViewCloseButton');
		});

	});

	describe('EMLTrackStorageToolbar', function test_EMLTrackStorageToolbar () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLTrackStorageToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLTrackStorageToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(EMLTrackStorageToolbar, 'OLSKCommonEdgeTop');
		});
		
		it('classes OLSKStorageToolbar', function () {
			browser.assert.hasClass(EMLTrackStorageToolbar, 'OLSKStorageToolbar');
		});
	
	});

	describe('ImportData', function test_ImportData() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_ImportFileData');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify([StubJournalObjectValid({
					EMLJournalName: 'zulu',
					$EMLJournalMemos: [StubMemoObjectValid({
						EMLMemoID: 'alfa',
					}), StubMemoObjectValid({
						EMLMemoID: 'bravo',
					})],
				})]);

				return dialog;
			});
		});

		it('creates journal', function () {
			browser.assert.text('.EMLTrackMasterListItemName', 'zulu');
		});

		context('click', function () {

			before(function () {
				return browser.pressButton('.EMLTrackMasterListItem');
			});
			
			it('creates memo', function () {
				browser.assert.elements('.EMLBrowseListItem', 2);
			});
		
		});
		
	});

	context('create', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton(EMLTrackMasterCreateButton);
		});

		it('focuses EMLTemplateFormNameField', function() {
			browser.assert.hasFocus('.EMLTemplateFormNameField');
		});

		describe('EMLTrackMasterListItem', function test_EMLTrackMasterListItem () {

			before(function () {
				return browser.pressButton('.EMLTemplateToolbarDoneButton');
			});

			before(function () {
				return browser.pressButton('.EMLBrowseListToolbarCloseButton');
			});

			it('classes OLSKDecorButtonNoStyle', function() {
				browser.assert.hasClass('.EMLTrackMasterListItem', 'OLSKDecorButtonNoStyle');
			});

			it('classes OLSKDecorTappable', function() {
				browser.assert.hasClass('.EMLTrackMasterListItem', 'OLSKDecorTappable');
			});
		
		});

	});

});
