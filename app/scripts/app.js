'use strict';

/**
 * @ngdoc overview
 * @name angularBookmarkApp
 * @description
 * # angularBookmarkApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .controller('MainCtrl', function($scope){
    $scope.categories = [
            {"id":0, "name": "Development"},
            {"id":1, "name": "Design"},
            {"id":2, "name": "Excercise"},
            {"id":3, "name": "Humor"}
          ];
    $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
      {"id": 1, "title": "Egghead", "url": "http://angularjs.org", "category": "Design"},
      {"id": 2, "title": "a List aprat", "url": "http://angularjs.org", "category": "Development"},
      {"id": 3, "title": "onepage love", "url": "http://angularjs.org", "category": "Excercise"},
      {"id": 4, "title": "mobilityu", "url": "http://angularjs.org", "category": "Design"},
      {"id": 5, "title": "robb wolf", "url": "http://angularjs.org", "category": "Excercise"},
      {"id": 6, "title": "sempr gif", "url": "http://angularjs.org", "category": "Design"},
      {"id": 7, "title": "wimp", "url": "http://angularjs.org", "category": "Humor"},
      {"id": 8, "title": "dump", "url": "http://angularjs.org", "category": "Humor"}
    ];
    $scope.currentCategory = null;

    function setCurrentCategory(category){
      $scope.currentCategory = category;

      cancelCreating();
      cancelEditing();

    }

    function isCurrentCategory(category){
      return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      
      // console.log(currentCategory);
    }

    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;

    //------------------------------------------------------------------------
    //   CRUD - Create, Read, Update, Delete
    //------------------------------------------------------------------------
    function resetCreateForm(){
      $scope.newBookmark = {
        title: '',
        url: '',
        category: $scope.currentCategory.name
      };
    }
    $scope.resetCreateForm = resetCreateForm;
    function createBookmark(bookmark){
      bookmark.id = $scope.bookmarks.length;
      $scope.bookmarks.push(bookmark);

      resetCreateForm();
    }
    $scope.createBookmark = createBookmark;

    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark){
      $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark){
      var index = _.findIndex($scope.bookmarks, function(b){
        return b.id == bookmark.id;
      });
      $scope.bookmarks[index] = bookmark;
      $scope.editedBookmark = null;
      $scope.isEditing = false;
    }

    function isSelectedBookmark(bookmarkId){
      return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
    }

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;

    function deleteBookmark(bookmark){
      _.remove($scope.bookmarks, function(b){
        return b.id == bookmark.id;
      });
    }

    $scope.deleteBookmark = deleteBookmark;
    //------------------------------------------------------------------------
    //   CREATING AND EDITING STATES
    //------------------------------------------------------------------------

    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating(){
      $scope.isCreating = true;
      $scope.isEditing = false;

      resetCreateForm();
    }

    function cancelCreating(){
      $scope.isCreating = false;
    }

    function startEditing(){
      $scope.isCreating = false;
      $scope.isEditing = true;
    }

    function cancelEditing(){
      $scope.isEditing = false;
    }

    function shouldShowCreating(){
      return $scope.currentCategory && !$scope.isEditing;
    }

    function shouldShowEditing(){
      return $scope.isEditing && !$scope.isCreating;
    }

    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowEditing = shouldShowEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    
  });









  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: function($scope){
  //         $scope.categories = [
  //           {"id":0, "name": "Development"},
  //           {"id":1, "name": "Design"},
  //           {"id":2, "name": "Excercise"},
  //           {"id":3, "name": "Humor"}
  //         ];
  //         // $scope.bookmarks = [
  //         //   {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
  //         //   {"id": 1, "title": "Egghead", "url": "http://angularjs.org", "category": "Design"},
  //         //   {"id": 2, "title": "a List aprat", "url": "http://angularjs.org", "category": "Development"},
  //         //   {"id": 3, "title": "onepage love", "url": "http://angularjs.org", "category": "Excercise"},
  //         //   {"id": 4, "title": "mobilityu", "url": "http://angularjs.org", "category": "Design"},
  //         //   {"id": 5, "title": "robb wolf", "url": "http://angularjs.org", "category": "Excercise"},
  //         //   {"id": 6, "title": "sempr gif", "url": "http://angularjs.org", "category": "Design"},
  //         //   {"id": 7, "title": "wimp", "url": "http://angularjs.org", "category": "Humor"},
  //         //   {"id": 8, "title": "dump", "url": "http://angularjs.org", "category": "Humor"}
  //         // ];
  //       },
  //       controllerAs: 'main'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
