sap.ui.define([
	"sap/ui/core/UIComponent",
	"./model/models"
], function (UIComponent, Models) {
	debugger
	"use strict";
	return UIComponent.extend("delivery.Component", {
		metadata: {
			manifest: "json",
			config: {
				fullWidth: true
			}
		},
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(Models.createDeviceModel(), "Device");

			this.setModel(Models.createDeliveryModel(), "DeliveryModel");
			this.setModel(Models.createValueHelpModel(), "ValueHelpModel");
			this.getRouter().initialize();
		}
	});
});