/**
 * Created by August.Zhou on 2016/6/7.
 */


var app = angular.module("didiApp", ['myApp.services']);

/**
 * 封装原生$http请求
 */
angular
    .module('myApp.services', [])
    .factory('dataService', ['$http', function ($http) {
        var baseUrl = 'http://210.13.66.66:7080';

        var runRequest = function (isGet, path, params) {
            return isGet ? $http({
                method: 'GET',
                url: baseUrl + '/' + path + "?" + toUrl(params)
            }) : $http({
                method: 'POST',
                url: baseUrl + '/' + path,
                data: params
            });
        };

        function toUrl(obj) {
            var props = "";
            for (var p in obj) { // 方法
                if (typeof ( obj [p]) != " function ") {
                    props += p + "=" + obj [p] + "&";
                }
            }
            return props.substr(0, props.length - 1)
        }

        return {
            request: function (isGet, path, params) {
                return runRequest(isGet, path, params);
            }
        };
    }]);