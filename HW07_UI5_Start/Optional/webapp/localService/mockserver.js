sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {

			var oUriParameters = new UriParameters(window.location.href);

			// create
			var oMockServer = new MockServer({
				rootUri: "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc/"
            });

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			var sPath = "../localService";
            oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
		}
	};

});