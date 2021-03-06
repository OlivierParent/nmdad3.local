/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.blog')
        .factory('UserArticleResourceFactory', UserArticleResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    UserArticleResourceFactory.$inject = [
        // Angular
        '$resource',
        // Custom
        'UriFactory'
    ];

    function UserArticleResourceFactory(
        // Angular
        $resource,
        // Custom
        UriFactory
    ) {
        var url = UriFactory.getApi('users/:user_id/articles/:article_id.:format');

        var paramDefaults = {
            user_id   : '@id',
            article_id: '@id',
            format    : 'json'
        };

        var actions = {
            'update': {
                method: 'PUT'
            }
        };

        return $resource(url, paramDefaults, actions);
    }

})();
