const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackViewportFooter: '.EMTTrackViewportFooter',

	EMTTrackStorageWidget: '#EMTTrackStorageWidget',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackMaster', function () {
		browser.assert.elements('.EMTTrackMaster', 1);
	});

	it('hides EMTTrackMasterListItem', function () {
		browser.assert.elements('.EMTTrackMasterListItem', 0);
	});

	it('shows EMTTrackDetail', function () {
		browser.assert.elements('.EMTTrackDetail', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('shows EMTTrackViewportFooter', function () {
		browser.assert.elements(EMTTrackViewportFooter, 1);
	});

	it('shows EMTTrackStorageWidget', function () {
		browser.assert.elements(EMTTrackStorageWidget, 1);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	context('create', function () {
		
		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('shows EMTTrackMasterListItem', function () {
			browser.assert.elements('.EMTTrackMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});
	
	});

	context('delete', function () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMTTrackDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('hides OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMTTrackDetailToolbarDiscardButton');
				});
			});

			it('hides EMTTrackMasterListItem', function () {
				browser.assert.elements('.EMTTrackMasterListItem', 0);
			});

			it('shows OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});
		
	});

});
