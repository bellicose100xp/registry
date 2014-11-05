(function(){

    angular
        .Module('registry',['firebase'])
        .controller('mainController',mainController)

    function mainController($firebase){

        var mc = this;

        var ref = new Firebase("https://buggy.firebaseio.com/");
        var sync = $firebase(ref);

        mc.data = sync.$asArray();



    }


}());