exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTVitrineRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
				EMTVitrineContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {
					EMTVitrineTokenTrackURL: res.locals.OLSKCanonicalLocalizedFor('EMTTrackRoute'),

					EMT_SHARED_GITHUB_URL: process.env.EMT_SHARED_GITHUB_URL,
					EMT_SHARED_DONATE_URL: process.env.EMT_SHARED_DONATE_URL,
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguages: ['en'],
	}];
};
