const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTemplate: '.EMLTemplate',

	EMLTemplateNameField: '.EMLTemplateNameField',
	
	EMLTemplateDiscardButton: '.EMLTemplateDiscardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTemplate_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLTemplateItem: JSON.stringify({
				EMLJournalName: 'alfa',
			}),
		});
	});

	it('shows EMLTemplate', function () {
		browser.assert.elements(EMLTemplate, 1);
	});

	it('shows EMLTemplateNameField', function () {
		browser.assert.elements(EMLTemplateNameField, 1);
	});

	it('shows EMLTemplateDiscardButton', function () {
		browser.assert.elements(EMLTemplateDiscardButton, 1);
	});

});
