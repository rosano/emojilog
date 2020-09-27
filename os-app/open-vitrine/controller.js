exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTVitrineRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				EMTVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked').setOptions({
					gfm: true,
					headerIds: false,
				})(require('fs').readFileSync(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
					EMTVitrineTokenTrackURL: res.locals.OLSKCanonicalLocalizedFor('EMTTrackRoute'),
					EMT_SHARED_GITHUB_URL: process.env.EMT_SHARED_GITHUB_URL,
					EMT_SHARED_DONATE_URL: process.env.EMT_SHARED_DONATE_URL,
					EMTVitrineDescription: res.locals.OLSKLocalized('EMTVitrineDescription'),
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguages: ['en'],
		OLSKRouteMiddlewares: [
			'EMTSharedGitHubLinkGuardMiddleware',
			'EMTSharedDonateLinkGuardMiddleware',
		],
	}];
};
