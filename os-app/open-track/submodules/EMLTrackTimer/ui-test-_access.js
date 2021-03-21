const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTrackTimer: '.EMLTrackTimer',
	
	EMLTrackTimerLabel: '.EMLTrackTimerLabel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTrackTimer_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLTrackTimer', function () {
		browser.assert.elements(EMLTrackTimer, 1);
	});

	it('shows OLSKSundial', function () {
		browser.assert.elements('.OLSKSundial', 1);
	});

	it('shows OLSKProgressRing', function () {
		browser.assert.elements('.OLSKProgressRing', 1);
	});

	it('shows EMLTrackTimerLabel', function () {
		browser.assert.elements(EMLTrackTimerLabel, 1);
	});

});
