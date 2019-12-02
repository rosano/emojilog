exports.OLSKControllerSharedMiddlewares = function() {
	return {
		EMTSharedGitHubLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').EMTSharedGitHubLinkGuard(process.env))
		},
	};
};

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'_shared/__external',
	];
};
