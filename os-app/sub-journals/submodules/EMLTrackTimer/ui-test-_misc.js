const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EMLTrackTimerLogic = require('./ui-logic.js');

describe('EMLTrackTimer_Misc', function () {

	const EMLTrackTimerEventDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.max(1, Date.now() % 10));
	const EMLTrackTimerText = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLTrackTimerEventDate,
			EMLTrackTimerText,
		});
	});

	describe('OLSKSundial', function test_OLSKSundial () {
		
		it('sets OLSKSundialLines', function () {
			browser.assert.elements('.OLSKSundialLine', EMLTrackTimerLogic.EMLTrackTimerLines(EMLTrackTimerEventDate, new Date()));
		});

	});

	describe('EMLTrackTimerLabel', function test_EMLTrackTimerLabel () {
		
		it('binds EMLTrackTimerText', function () {
			browser.assert.elements(EMLTrackTimerLabel, EMLTrackTimerText);
		});

	});

});
