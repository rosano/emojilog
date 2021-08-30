const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		
		kDefaultRoute,

		ParamProject: process.env.ROCO_SHARED_PROJECT_ID,
		
		ParamTriggerGate () {
			return browser.pressButton('.EMLBrowseCreateButton');
		},

		async ParamBeforeCreate () {
			await browser.pressButton('.EMLTrackJournalsCreateButton');

			return browser.pressButton('.OLSKModalViewCloseButton');
		},

		ParamCreateDocument () {
			return browser.pressButton('.EMLBrowseCreateButton');
		},

		ParamDeleteDocument () {
			return browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeSyncCreateMemo');
		},

	});
	
});
