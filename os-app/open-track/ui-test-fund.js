const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKFund = require('OLSKFund');

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('EMLTrack_Fund', function () {

	describe('OLSKAppToolbarFundButton', function test_OLSKAppToolbarFundButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		context('not connected', function () {

			before(function () {
				browser.assert.elements('.EMLTrackStorageToolbar', 0);
			});
			
			context('click', function () {

				it('alerts', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton('.OLSKAppToolbarFundButton');
					}, uLocalized('OLSKRemoteStorageConnectConfirmText'));
				});

				it('shows EMLTrackStorageToolbar', function () {
					browser.assert.elements('.EMLTrackStorageToolbar', 1);
				});

				context('cancel', function () {

					before(function () {
						return browser.pressButton('.OLSKAppToolbarCloudButton');
					});

					before(function () {
						browser.assert.elements('.EMLTrackStorageToolbar', 0);
					});
					
					before(function () {
						return browser.OLSKConfirm(function () {
							return browser.pressButton('.OLSKAppToolbarFundButton');
						}, function (dialog) {
							dialog.response = false;

							return dialog;
						});
					});

					it('does nothing', function () {
						browser.assert.elements('.EMLTrackStorageToolbar', 0);
					});
				
				});
				
			});
		
		});

		context('connected', function () {

			before(function () {
				return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
			});

			before(function () {
				return browser.evaluate(`window.location.hash = Math.random().toString();`);
			});

			before(function () {
				return browser.pressButton('.OLSKAppToolbarFundButton');
			});

			it('opens OLSKWebView', function () {
				browser.assert.attribute('.OLSKWebViewWindowButton', 'href', OLSKFund.OLSKFundURL({
					ParamFormURL: process.env.OLSK_FUND_FORM_URL,
					ParamProject: 'RP_007',
					ParamIdentity: 'ZDR_FAKE_CLOUD_IDENTITY',
					ParamHomeURL: browser.window.location.origin + browser.window.location.pathname,
				}));
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKFundWebViewTitleText'));
			});

			context('receive_message', function () {
				
				before(function () {
					return browser.evaluate(`window.postMessage({
						OLSK_FUND_CLUE: Math.random().toString(),
					}, window.location.href)`);
				});

				before(function () {
					return browser.wait({ duration: 1000 });
				});

				it('closes OLSKWebView', function () {
					browser.assert.elements('.OLSKWebView', 0);
				});
			
			});

		});

	});

	describe('OLSKAppToolbarFundLimit', function test_OLSKAppToolbarFundLimit() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('starts at EML_FUND_DOCUMENT_LIMIT', function () {
			browser.assert.text('.OLSKAppToolbarFundLimit', process.env.EML_FUND_DOCUMENT_LIMIT);
		});

		context('create_journal', function () {
			
			before(function () {
				return browser.pressButton('.EMLTrackMasterCreateButton');
			});

			before(function () {
				return browser.pressButton('.OLSKModalViewCloseButton');
			});

			before(function () {
				return browser.pressButton('.EMLBrowseCloseButton');
			});

			it('shows EMLTrackMasterListItem', function () { // #hotfix-invisible-until-assert
				browser.assert.elements('.EMLTrackMasterListItem', 1);
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.EML_FUND_DOCUMENT_LIMIT - 0).toString());
			});
		
		});

		context('create_memo', function () {
			
			before(function () {
				return browser.click('.EMLTrackMasterListItem');
			});

			before(function () {
				return browser.pressButton('.EMLBrowseCreateButton');
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.EML_FUND_DOCUMENT_LIMIT - 1).toString());
			});
		
		});

		context('remove_memo', function () {
			
			before(function () {
				return browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.EML_FUND_DOCUMENT_LIMIT - 0).toString());
			});
		
		});

		context('remove_journal', function () {
			
			before(function () {
				return browser.pressButton('.EMLBrowseFormButton');
			});

			before(function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMLTemplateDiscardButton');
				});
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', process.env.EML_FUND_DOCUMENT_LIMIT - 0);
			});
		
		});

		context.skip('sync', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateJournal');
			});			

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateMemo');
			});			

			it('updates number', function () {
				browser.assert.elements('.OLSKAppToolbarFundLimit', process.env.EML_FUND_DOCUMENT_LIMIT - 1);
			});

		});

	});

	context('OLSKFundDispatchProgress', function test_OLSKFundDispatchProgress () {

		before(function () {
			return browser.OLSKLauncherRun('OLSKFundLauncherItemFakeFlipProgress');
		});

		it('sets OLSKAppToolbarFundShowProgress', function () {
			return browser.assert.elements('.OLSKAppToolbarFundProgress', 1);
		});

		after(function () {
			return browser.OLSKLauncherRun('OLSKFundLauncherItemFakeFlipProgress');
		});
	
	});

	describe('OLSKFundResponseIsPresent', function test_OLSKFundResponseIsPresent () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				FakeOLSKFundResponseIsPresent: true,
			});
		});

		it('hides OLSKAppToolbarFundButton', function () {
			browser.assert.elements('.OLSKAppToolbarFundButton', 0);
		});

		it('hides OLSKAppToolbarFundLimit', function () {
			browser.assert.elements('.OLSKAppToolbarFundLimit', 0);
		});

	});

	describe('OLSKFundSetupPostPay', function test_OLSKFundSetupPostPay () {

		before(function () {
			return browser.visit(OLSKTestingCanonical(kDefaultRoute) + '#clue=' + Math.random().toString());
		});
		
		before(function () {
			return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
		});

		it('shows OLSKFundLauncherItemClearClue', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearClue', 1);
		});
	
	});

	describe('clue', function test_clue () {

		const clue = Math.random().toString();

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
		});

		before(function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearClue', 0);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemEnterClue');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				return Object.assign(dialog, {
					response: clue,
				});
			});
		});

		it('shows OLSKFundLauncherItemClearClue', function () {
			browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearClue', 1);
		});

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKAproposFeedbackValue', function () {
				browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, 'RP_007+' + clue)) }')`);
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

	});

	describe('OLSKFundGate', function test_OLSKFundGate () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeFundDocumentLimit');
		});

		before(function () {
			return browser.click('.EMLTrackMasterListItem');
		});

		it('alerts', function() {
			browser.assert.OLSKConfirmQuestion(function () {
				return browser.pressButton('.EMLBrowseCreateButton');
			}, uLocalized('OLSKFundGateText'));
		});

		it('shows EMLTrackStorageToolbar', function () {
			browser.assert.elements('.EMLTrackStorageToolbar', 1);
		});

		context('cancel', function () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarCloudButton');
			});

			before(function () {
				browser.assert.elements('.EMLTrackStorageToolbar', 0);
			});
			
			before(function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMLBrowseCreateButton');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: false,
					});
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.EMLTrackStorageToolbar', 0);
			});
		
		});

	});

	describe('document_limit', function test_document_limit () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeFundDocumentLimit');
		});

		context('create_memo', function () {
			
			before(function () {
				return browser.click('.EMLTrackMasterListItem');
			});

			it('shows OLSKFundGate', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton('.EMLBrowseCreateButton');
				}, uLocalized('OLSKFundGateText'));
			});
		
		});

	});

	describe('OLSKFundLauncherItemFakeTier2Proxy', function test_OLSKFundLauncherItemFakeTier2Proxy () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('hides OLSKFundLauncherItemFakeTier2Proxy', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemFakeTier2Proxy', 0);
		});

		context('Tier2 no bundle', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('OLSKFundLauncherItemFakeTier2WithNoBundle');
			});

			it('hides OLSKFundLauncherItemFakeTier2Proxy', function () {
				return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemFakeTier2Proxy', 0);
			});
		
		});

		context('Tier2', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('OLSKFundLauncherItemFakeTier2WithBundle');
			});

			it('shows OLSKFundLauncherItemFakeTier2Proxy', function () {
				return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemFakeTier2Proxy', 1);
			});
		
		});
	
	});

});
