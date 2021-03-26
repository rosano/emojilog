const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('EMLFeatureList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	uLocalized('EMLFeatureListArray').forEach(function (e, i) {

		describe('EMLFeatureListItemIdentity', function test_EMLFeatureListItemIdentity () {
			
			it('sets src', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'src', [
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureCalm.svg',
					][i]);
			});
			
			it('sets role', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'role', 'presentation');
			});

		});
		
	});

});
