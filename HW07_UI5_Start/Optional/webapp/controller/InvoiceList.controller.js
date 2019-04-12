sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"],

    function (Controller, JSONModel, formatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("hw07.t2.webapp.controller.InvoiceList", {
            
            formatter: formatter,

            onInit: function() {

                var oViewModel = new JSONModel({
                    currency: "EUR"
                });

                this.getView().setModel(oViewModel, "lView");
            },

            onFilterInvoices: function(oEvent) {

                var aFilter = [];

                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                };

                var oList = this.byId("invoiceList");
                var oBind = oList.getBinding("items");
                oBind.filter(aFilter);
            }
        });
    });