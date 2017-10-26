/*
   Copyright 2017 Anders Riise Mæhlum, Varun Sivapalan & Jonas Kirkemyr

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/


/* Main module */
angular.module('tilesApi', ['ui.router', 'tilesApi.controllers', 'tilesApi.services'])

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html'
			})
			.state('users', {
				url: '/users',
				templateUrl: '/users.html',
				controller: 'UsersCtrl',
				resolve: {
					userPromise: ['users', function (users) {
						return users.getAll();
					}]
				}
			})
			.state('user', {
				url: '/users/{id}',
				templateUrl: '/user.html',
				controller: 'UserCtrl',
				resolve: {
					user: ['$stateParams', 'users', function ($stateParams, users) {
						return users.get($stateParams.id);
					}]
				}
			})
			.state('tiles', {
				url: '/users/{userId}/{tileId}',
				templateUrl: '/tile.html',
				controller: 'TileCtrl',
				resolve: {
					userId: ['$stateParams', function ($stateParams) {
						return $stateParams.userId;
					}],
					tileId: ['$stateParams', function ($stateParams) {
						return $stateParams.tileId;
					}],
					tile: ['$stateParams', 'tiles', function ($stateParams, tiles) {
						return tiles.get($stateParams.userId, $stateParams.tileId);
					}],
					registeredWebhooksPromise: ['$stateParams', 'webhooks', function ($stateParams, webhooks) {
						return webhooks.getRegistered($stateParams.userId, $stateParams.tileId);
					}]
				}
			})
			.state('applications', {
				url: '/applications',
				templateUrl: '/applications.html',
				controller: 'ApplicationsCtrl',
				resolve: {
					applicationPromise: ['applications', function (applications) {
						return applications.getAll();
					}],
					userPromise: ['users', function (users) {
						return users.getAll();
					}]
				}
			})
			.state('application', {
				url: '/applications/{applicationId}',
				templateUrl: '/application.html',
				controller: 'ApplicationCtrl',
				resolve: {
					application: ['$stateParams', 'applications', function ($stateParams, applications) {
						return applications.get($stateParams.applicationId);
					}],
					ifttthooksPromise: ['$stateParams', 'apphooks', function ($stateParams, apphooks) {
						return apphooks.getIfttthooks($stateParams.applicationId);
					}],
					tilehooksPromise: ['$stateParams', 'apphooks', function ($stateParams, apphooks) {
						return apphooks.getTilehooks($stateParams.applicationId);
					}],
					primitivePromise: ['primitives', function (primitives) {
						return primitives.getAll();
					}]
				}
			})
			.state('primitives', {
				url: '/primitives',
				templateUrl: '/primitives.html',
				controller: 'PrimitiveCtrl',
				resolve: {
					primitivePromise: ['primitives', function (primitives) {
						return primitives.getAll();
					}]
				}
			});


		$urlRouterProvider.otherwise('home');
	}]);



angular.module('tilesDocs', ['ui.router', 'tilesDocs.controllers', 'tilesApi.services'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('docs-main1', {
				url: '/docs-main1',
				templateUrl: '/docs-main1.html',
				controller: 'DocsCtrl'
			})
			.state('docs-main2', {
				url: '/docs-main2',
				templateUrl: '/docs-main2.html',
				controller: 'DocsCtrl'
			})
			.state('docs-main3', {
				url: '/docs-main3',
				templateUrl: '/docs-main3.html',
				controller: 'DocsCtrl'
			})
			.state('docs-main4', {
				url: '/docs-main4',
				templateUrl: '/docs-main4.html',
				controller: 'DocsCtrl'
			})
			.state('docs-main5', {
				url: '/docs-main5',
				templateUrl: '/docs-main5.html',
				controller: 'DocsCtrl'
			})

			.state('docs-app0', {
				url: '/docs-app0',
				templateUrl: '/docs-app0.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app1', {
				url: '/docs-app1',
				templateUrl: '/docs-app1.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app2', {
				url: '/docs-app2',
				templateUrl: '/docs-app2.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app3', {
				url: '/docs-app3',
				templateUrl: '/docs-app3.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app4', {
				url: '/docs-app4',
				templateUrl: '/docs-app4.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app5', {
				url: '/docs-app5',
				templateUrl: '/docs-app5.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app6', {
				url: '/docs-app6',
				templateUrl: '/docs-app6.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app7', {
				url: '/docs-app7',
				templateUrl: '/docs-app7.html',
				controller: 'DocsCtrl'
			})
			.state('docs-app8', {
				url: '/docs-app8',
				templateUrl: '/docs-app8.html',
				controller: 'DocsCtrl'
			})

			.state('docs-ext0', {
				url: '/docs-ext0',
				templateUrl: '/docs-ext0.html',
				controller: 'DocsCtrl'
			})
			.state('docs-ext1', {
				url: '/docs-ext1',
				templateUrl: '/docs-ext1.html',
				controller: 'DocsCtrl'
			})
			.state('docs-ext2', {
				url: '/docs-ext2',
				templateUrl: '/docs-ext2.html',
				controller: 'DocsCtrl'
			})
			.state('docs-ext3', {
				url: '/docs-ext3',
				templateUrl: '/docs-ext3.html',
				controller: 'DocsCtrl'
			})
			.state('docs-ext4', {
				url: '/docs-ext4',
				templateUrl: '/docs-ext4.html',
				controller: 'DocsCtrl'
			})

			.state('docs-js1', {
				url: '/docs-js1',
				templateUrl: '/docs-js1.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js2', {
				url: '/docs-js2',
				templateUrl: '/docs-js2.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js3', {
				url: '/docs-js3',
				templateUrl: '/docs-js3.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js4', {
				url: '/docs-js4',
				templateUrl: '/docs-js4.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js5', {
				url: '/docs-js5',
				templateUrl: '/docs-js5.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js6', {
				url: '/docs-js6',
				templateUrl: '/docs-js6.html',
				controller: 'DocsCtrl'
			})
			.state('docs-js7', {
				url: '/docs-js7',
				templateUrl: '/docs-js7.html',
				controller: 'DocsCtrl'
			})

			.state('docs-re1', {
				url: '/docs-re1',
				templateUrl: '/docs-re1.html',
				controller: 'DocsCtrl'
			})
			.state('docs-re2', {
				url: '/docs-re2',
				templateUrl: '/docs-re2.html',
				controller: 'DocsCtrl'
			})
			.state('docs-re3', {
				url: '/docs-re3',
				templateUrl: '/docs-re3.html',
				controller: 'DocsCtrl'
			})
			.state('docs-re4', {
				url: '/docs-re4',
				templateUrl: '/docs-re4.html',
				controller: 'DocsCtrl'
			})
			.state('docs-re5', {
				url: '/docs-re5',
				templateUrl: '/docs-re5.html',
				controller: 'DocsCtrl'
			});

		$urlRouterProvider.otherwise('docs-main1');
	}]);
