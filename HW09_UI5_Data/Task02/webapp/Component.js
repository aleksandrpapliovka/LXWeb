sap.ui.define(
    ["sap/ui/core/UIComponent",
     "sap/ui/model/json/JSONModel"],

    function (UIComponent, JSONModel) {
        "use strict";

        return UIComponent.extend("hw09.t2.webapp.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                
                // call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                var sUrl = "https://services.odata.org/TripPinRESTierService/People";

                $.ajax({
                    url     : sUrl,
                    type    : "GET",
                    dataType: "json",
                    context : this, 
                    error   : function() {
                        alert('Get Model Error');				
                    },
                    success : function(oData) {
                        this.setModel(new JSONModel(oData));
                    }		
                });                
            }
        });
    });