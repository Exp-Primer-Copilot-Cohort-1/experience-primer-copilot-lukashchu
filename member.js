function skillsMember() {
    return {
        restrict: 'E',  // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'templates/skills-member.html',
        scope: {
            member: '='
        },
        controller: function($scope) {
            $scope.skills = $scope.member.skills;
        }
    }
}