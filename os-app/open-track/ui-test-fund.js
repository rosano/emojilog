const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		
		kDefaultRoute,

		ParamProject: 'RP_007',
		
		ParamTriggerGate () {
			return browser.pressButton('.EMLBrowseCreateButton');
		},

		async ParamBeforeCreate () {
			await browser.pressButton('.EMLTrackMasterCreateButton');

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
