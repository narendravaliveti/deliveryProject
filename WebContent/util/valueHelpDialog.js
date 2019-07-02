sap.ui.define([], function () {
	"use strict";
	return {

		//----value help dialog creation----//
		fnValueHelpDialogCreation: function (sTable, sKey, sTitle, oSource) {
			return new sap.m.SelectDialog({
				title: sTitle,
				search: this.handleValueHelpSearch,
				confirm: [this.handleValueHelpClose, oSource],
				cancel: [this.handleValueHelpClose, oSource],
				items: {
					path: 'ValueHelpModel>/' + sTable,
					factory: function (sIdx, oContext) {
						return new sap.m.StandardListItem({
							title: "{ValueHelpModel>" + sKey + "}"
						});
					}
				}
			}).addStyleClass("dialogButtons");
		},

		//----value help dialog search bar handling----//
		handleValueHelpSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"name",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		//----value help confirm and close handling----//
		handleValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var input = this;
				input.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
			oEvent.getSource().destroy();
		}
	};
});