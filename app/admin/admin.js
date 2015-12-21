'use strict';

angular.module('variantdatabase.admin', ['ngRoute', 'ui-notification'])

    .controller('AdminCtrl', ['$scope', 'Notification', '$http', function ($scope, Notification, $http) {

        //new pathogenicities for authorisation
        function getNewPathogenicitiesForAuthorisation() {
            $http.get('/api/variantdatabase/getnewpathogenicitiesforauthorisation', {

            }).then(function(response) {
                $scope.pathogenicitiesForAuthorisation = response.data;
            }, function(response) {
                Notification.error(response);
                console.log("ERROR: " + response);
            })
        }

        $scope.authoriseVariantPathogenicity = function(pathogenicityNodeId, addOrRemove){
            $http.post('/api/variantdatabase/authorisevariantpathogenicity',
                {
                    'PathogenicityNodeId' : pathogenicityNodeId,
                    'UserNodeId' : 0,
                    'AddorRemove' : addOrRemove
                })
                .then(function(response) {
                    Notification('Operation successful');
                    getNewPathogenicitiesForAuthorisation();
                }, function(response) {
                    Notification.error(response);
                    console.log("ERROR: " + response);
                });
        };

        //load widgets on page load
        getNewPathogenicitiesForAuthorisation();

    }]);