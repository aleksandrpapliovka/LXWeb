sap.ui.define(
    ["sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/resource/ResourceModel",
        "./controller/HelloDialog"],

    function (UIComponent, JSONModel, ResourceModel, HelloDialog) {
        "use strict";

        return UIComponent.extend("hw07.t2.webapp.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                this.setModel(new JSONModel({ recipient: { name: "World" } }));

                // set dialog
                this._helloDialog = new HelloDialog(this.getRootControl());
            },

            exit : function() {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },
    
            openHelloDialog : function () {
                this._helloDialog.open();
            }            
        });
    });