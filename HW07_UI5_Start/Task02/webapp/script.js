sap.ui.define(

["sap/ui/core/mvc/XMLView"], 
    
function (XMLView) {
	"use strict";

    XMLView.create({
        viewName: "hw07.t2.webapp.view.App",
    }).then(function (oView) {
		oView.placeAt("content");
	});

});
