"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var fetch_api_data_service_1 = require("./fetch-api-data.service");
describe('FetchApiDataService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(fetch_api_data_service_1.FetchApiDataService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
