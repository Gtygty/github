/**
 * Created by August.Zhou on 2016/6/7.
 */


app.controller("LocationController", function ($scope, $q, dataService) {
    function City(cityId, cityName) {
        this.cityId = cityId;
        this.cityName = cityName;
    }

    function Location(city, address, displayname, lat, lng) {
        this.city = city;
        this.address = address;
        this.displayname = displayname;
        this.lat = lat;
        this.lng = lng;
    }


    $scope.loc = {}
    $scope.loc.startLoc = new Location({}, "", "请输入您上车地址", 0, 0);
    $scope.loc.endLoc = new Location({}, "", "请输入您的目的地址", 0, 0);
    $scope.loc.defaultCity = {};

    console.log($scope.loc.startLoc)

    if (!navigator.geolocation) {
        $scope.enableLocation = false;
        message.showMessage({
            'btnTxt': '我知道了',
            'content': '未授权使用定位，请检查设置后重试。'
        });
    } else {
        $scope.enableLocation = true;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var cords = position.coords;
                $scope.loc.startLoc.lat = cords.latitude;
                $scope.loc.startLoc.lng = cords.longitude;
                dataService.request(true, "didi/common/getLocation", {
                    lat: cords.latitude,
                    lng: cords.longitude
                }).success(function (response) {
                    // alert(angular.toJson(response));
                    $scope.loc.startLoc.displayname = response.data.displayname;
                    $scope.loc.startLoc.address = response.data.address;
                    var city = new City(response.data.cityId, response.data.cityName);
                    $scope.loc.startLoc.city = city
                    $scope.loc.defaultCity = city;
                });
            },
            function (error) {
                var errorTypes = {1: "位置服务被拒绝", 2: "获取不到位置信息", 3: "获取位置信息超时"};
                alert(errorTypes[error.code] + ":,不能确定当前地理位置");
            }
        );
    }
    dataService.request(true, "didi/common/getCitys", {})
        .success(function (response) {
            $scope.cityGroups = response.data;
        });


});