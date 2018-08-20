'use strict'

angular.module('pokemonApp', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'assets/views/home.html',
            controller: 'pokemonCtrl'
        })
        
        .when('/search', {
            templateUrl: 'assets/views/bydate.html',
            controller: 'searchCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
})

.controller("searchCtrl", function($scope, saveService, pokemonService){
	$("#getInfo").on("click", function(e){
		var date1 = $("#date1").val();
		var date2 = $("#date2").val();
		
		saveService.getObject(owned).then(function(data){
			$scope.naam = data.name; 
			$scope.types = data.types;
			$scope.trainer = data.trainer;
			$scope.gender = data.gender;
			$scope.owned = data.owned;
			
			
		}, function(err){
			pokemonService.getAllPokemons().then(function(data){
				for(var i = 0; data.length; i++){
					if(data[i].owned > date1 && data[i].owned < date2){
						var doc = {};
						doc.name = data[i].name;
						doc.types = data[i].types;
						doc.trainer = data[i].trainer;
						doc.gender = data[i].gender;
						doc.owned = data[i].owned;
						saveService.setObject(name, doc);
						
						console.log(data);
						$scope.naam = data.name; 
						$scope.types = data.types;
						$scope.trainer = data.trainer;
						$scope.gender = data.gender;
						$scope.owned = data.owned;;
						
					};
				};
			});
		});
	});
})

.controller("pokemonCtrl", function($scope, $route, pokemonService){
    pokemonService.getAllPokemons().then(function(data){
		$scope.pokemons = data;
	});
})



.service('pokemonService', function($http, $q){
	this.getAllPokemons = function(){
		var q = $q.defer();
		var url = 'http://localhost:5984/pokemon/fd002477492739e548ed5a0754001645';
		
		$http.get(url).then(function(data){
			var all = data.data;
			q.resolve(all);
		}, function(err){
			q.reject(err);
		});	
		
		return q.promise;
	};
})



.service('saveService', function($http, $q){
	this.setObject = function(key, value){
		$http.put("../../" + key, value);
	};
	
	this.getObject = function(key){
		var q = $q.defer();
		$http.get("../../" + key).then(function(data){
			q.resolve(data.data);
		}, function(err){
			q.reject(err);
		});
		return q.promise;
	}
});