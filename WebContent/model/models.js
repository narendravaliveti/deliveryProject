sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	debugger
	"use strict";
	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createDeliveryModel: function () {
			return new JSONModel("model/model.json");
		},

		createValueHelpModel: function () {
			return new JSONModel("model/valueHelp.json");
		}
	};
});