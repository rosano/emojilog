exports.OLSKControllerRoutes = function() {
	return {
		EMTCommonIdentityRedirect: {
			OLSKRoutePath: '/identity.svg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: '/_shared/EMTRootLink/ui-assets/identity.svg',
		},
	};
};

exports.OLSKControllerSharedMiddlewares = function() {
	return {
		EMTSharedDonateLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').EMTSharedDonateLinkGuard(process.env));
		},
		EMTSharedGitHubLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').EMTSharedGitHubLinkGuard(process.env));
		},
	};
};

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'_shared/__external',
	];
};
