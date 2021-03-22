const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = OLSKTestingFormatted;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLTrack_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EMLTrackTitle'));
		});

		it('localizes EMLTrackLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('EMLTrackLauncherItemImportJSON', uLocalized('EMLTrackLauncherItemImportJSONText'));
		});

		it('localizes EMLTrackLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('EMLTrackLauncherItemExportJSON', uLocalized('EMLTrackLauncherItemExportJSONText'));
		});

		describe('EMLTrackLauncherItemImportJSON', function test_EMLTrackLauncherItemImportJSON() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not filled', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = ' ';

							return dialog;
						});
					}, uLocalized('EMLTrackLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not json', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not json', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = 'alfa';

							return dialog;
						});
					}, uLocalized('EMLTrackLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not valid', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = JSON.stringify({
								[Math.random().toString()]: Math.random().toString(),
							});

							return dialog;
						});
					}, uLocalized('EMLTrackLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
		});

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKAproposHeadingText'));
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

		describe('tongue', function test_tongue() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			kDefaultRoute.OLSKRouteLanguageCodes.filter(function (e) {
				return e !== OLSKRoutingLanguage;
			}).forEach(function (e) {

				const signature = 'OLSKLanguageSwitcherLauncherItemSwitch-' + e;

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', signature);
				});

				it(`shows ${ signature }`, function () {
					browser.assert.elements('.LCHLauncherPipeItem', 1);
				});

			});

			after(function () {
				browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		context('EMLTrackLauncherItemExportSelectedJSON', function test_EMLTrackLauncherItemExportSelectedJSON () {
			
			before(function () {
				return browser.pressButton('.EMLTrackMasterCreateButton');
			});

			before(function () {
				return browser.pressButton('.OLSKModalViewCloseButton');
			});

			it('localizes EMLTrackLauncherItemExportSelectedJSON', function () {
				return browser.assert.OLSKLauncherItemText('EMLTrackLauncherItemExportSelectedJSON', uLocalized('EMLTrackLauncherItemExportSelectedJSONText'));
			});
		
		});

	});

});
