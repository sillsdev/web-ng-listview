// Declare app level module which depends on filters, and services
angular.module('palaso.sample.listview', ['palaso.ui.listview'])
	.controller('ListViewSampleCtrl', ['$scope', function($scope) {
		$scope.things = [
             { name: 'Thomas' },
             { name: 'Wendy' },
             { name: 'Farmer Pickles' },
             { name: 'Scoop' },
             { name: 'Muck' },
             { name: 'Dizzy' },
             { name: 'Roley' },
             { name: 'Lofty' },
             { name: 'Travis' },
             { name: 'Skip' },
             { name: 'Trix' },
             { name: 'Benny' },
             { name: 'Sumsy' },
             { name: 'Packer' },
             { name: 'Dodger' },
        ];
	}])
	;