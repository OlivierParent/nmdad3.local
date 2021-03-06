/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.blog')
        .controller('ImageCtrl', ImageCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    ImageCtrl.$inject = [
        // Angular
        '$log',
        '$state',
        '$timeout',
        // ngCordova
        '$cordovaFileTransfer',
        // Custom
        'UserImageResourceFactory'
    ];

    function ImageCtrl(
        // Angular
        $log,
        $state,
        $timeout,
        // ngCordova
        $cordovaFileTransfer,
        // Custom
        UserImageResourceFactory
    ) {

        // ViewModel
        // =========
        var vm = this;

        vm.title = 'New Image';
        vm.form = {
            image: {
                title: 'Title'
            }
        };
        vm.data = {
            image: {}
        };
        vm.image = {};

        $log.log($state.current.name);
        switch ($state.current.name) {
            case 'blog_image_new':
                newImage();
                break;
            default:
                break;
        }

        // Functions
        // =========

        // New Article
        // -----------

        function newImage() {
            $log.info('newImage');
            vm.post = postImage;
        }

        function postImage() {
            $log.info('postImage:', vm.image);

            var params = {
                    user_id: 2,
                    format: null
                },
                postData = {
                    image: vm.image
                };

            UserImageResourceFactory
                .save(
                    params,
                    postData,
                    postImageSuccess,
                    postImageError
                );
        }

        function postImageError(error) {
            $log.error('postImageError:', error);
        }

        function postImageSuccess(resource, responseHeader) {
            $log.log('postImageSuccess:', resource, responseHeader());
            postImageFile(responseHeader().location);
        }

        function postImageFile(location) {
            $log.info('postImageFile');

            var jpeg = true,
                server = location + '/file/',
                fileName = jpeg ? 'test.jpg' : 'test.png',
                targetPath = cordova.file.applicationDirectory + "www/" + fileName,
                options = {
                    fileKey: 'imageFile',
                    fileName: fileName,
                    httpMethod: 'POST',
                    mimeType: jpeg ? 'image/jpg' : 'image/png'
                },
                trustAllHosts = true;

            $cordovaFileTransfer.upload(server, targetPath, options, trustAllHosts)
                .then(
                    postImageFileSuccess,
                    postImageFileError,
                    postImageFileProgress
                );
        }

        function postImageFileError(error) {
            $log.error('postImageFileError:', error);
        }

        function postImageFileSuccess(response) {
            $log.log('postImageFileSuccess:', response);
            $state.go('blog');
        }

        function postImageFileProgress(progress) {
            $timeout(function () {
                vm.uploadProgress = (progress.loaded / progress.total) * 100;
            });
        }

    }

})();
