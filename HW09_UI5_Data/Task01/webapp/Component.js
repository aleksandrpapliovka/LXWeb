sap.ui.define(
    ["sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/BindingMode"],

    function (UIComponent, JSONModel, BindingMode) {
        "use strict";

        return UIComponent.extend("hw09.t1.webapp.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                var oModel = new JSONModel({ button: { enabled: true } });
                oModel.setDefaultBindingMode(BindingMode.TwoWay);
                this.setModel(oModel);

                // Register the view with the message manager
                sap.ui.getCore().getMessageManager().registerObject(this.getRootControl(), true);
                
            }
        });
    });