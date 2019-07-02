sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../formatter/formatter",
	"sap/ui/model/Filter",
	"../util/valueHelpDialog"
], function (oController, Formatter, Filter, ValueHelp) {
	"use strict";
	return oController.extend("delivery.controller.App", {
		formatter: Formatter,

		//----creating damage and location dialog box----//
		fnDamageNLocationDialogCreation: function () {
			if (!this.getView().oCreateDamageNLocationDialog) {
				this.getView().oCreateDamageNLocationDialog = new sap.m.Dialog({
					customHeader: new sap.m.Toolbar({
						content: [
							new sap.m.ToolbarSpacer({}),
							new sap.m.Label({
								design: sap.m.LabelDesign.Bold,
								text: "{i18n>damageNLocation}"
							}).addStyleClass("H3Title"),
							new sap.m.ToolbarSpacer({})
						]
					}),
					content: [
						new sap.m.HBox({
							direction: sap.m.FlexDirection.Column,
							width: "100%",
							items: [
								new sap.m.Label({
									text: "{i18n>damage}",
								}).addStyleClass("customHeaderLabel sapUiSmallMarginBegin"),
								new sap.m.TextArea("damageTextArea", {
									rows: 8,
									width: "90%",
									value: "{DeliveryModel>/damageNLocation/damage}"
								}).addStyleClass("sapUiSmallMarginBegin"),
								new sap.m.Label({
									text: "{i18n>location}",
								}).addStyleClass("customHeaderLabel sapUiSmallMarginBegin"),
								new sap.m.TextArea("locationTextArea", {
									rows: 8,
									width: "90%",
									value: "{DeliveryModel>/damageNLocation/location}"
								}).addStyleClass("sapUiSmallMarginBegin")
							]
						})
					],
					buttons: [
						new sap.m.Button({
							text: "Cancel",
							press: [this.fnDamageNLocationDialogCancel, this]
						}).addStyleClass("redBorderBtn"),
						new sap.m.Button({
							text: "Save",
							press: [this.fnDamageNLocationDialogSave, this]
						}).addStyleClass("redBorderBtn")
					]
				}).addStyleClass("dialogButtons");
				this.getView().addDependent(this.getView().oCreateDamageNLocationDialog);
			}

		},

		//----factory method to generate table columns----//
		fnODTabCols: function (sIdx, oContext) {
			if (oContext.getObject().key === "col2") {
				return new sap.m.Column({
					hAlign: sap.ui.core.TextAlign.Center,
					width: "18rem",
					header: new sap.m.Text({
						text: "{i18n>" + oContext.getObject().label + "}"
					}).addStyleClass("product-details-clm")
				});
			} else {
				return new sap.m.Column({
					hAlign: sap.ui.core.TextAlign.Center,
					header: new sap.m.Text({
						text: "{i18n>" + oContext.getObject().label + "}"
					}).addStyleClass("product-details-clm")
				});
			}
		},

		//----factory method to generate table columnListItems----//
		fnODTabItems: function () {
			return new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: "{DeliveryModel>col1}"
					}),
					new sap.m.HBox({
						items: [
							new sap.m.Image({
								width: "120px",
								src: "{DeliveryModel>col2/imgSrc}"
							}),
							new sap.m.VBox({
								items: [
									new sap.m.Text({
										text: "{DeliveryModel>col2/title}"
									}).addStyleClass("boldFont"),
									new sap.m.Text({
										text: "{DeliveryModel>col2/desc}"
									})
								]
							})
						]
					}),
					new sap.m.Text({
						text: "{DeliveryModel>col3}"
					}),
					new sap.m.HBox({
						justifyContent: sap.m.FlexJustifyContent.Center,
						items: [
							new sap.m.Text({
								text: "{DeliveryModel>col4}",
								visible: {
									parts: ['DeliveryModel>/documentMode', 'DeliveryModel>/deliveryHeader/status'],
									formatter: this.formatter.fnDisOrEditComp
								}
							}),
							new sap.m.Input({
								value: "{DeliveryModel>col4}",
								type: sap.m.InputType.Number,
								width: "30%",
								visible: {
									parts: ['DeliveryModel>/documentMode', 'DeliveryModel>/deliveryHeader/status'],
									formatter: this.formatter.fnEditProg
								}
							}),
						]
					}),
					new sap.m.Text({
						text: "{DeliveryModel>col5}"
					}),
					new sap.m.HBox({
						justifyContent: sap.m.FlexJustifyContent.Center,
						items: [
							new sap.m.Text({
								text: "{DeliveryModel>col6}",
								visible: {
									path: 'DeliveryModel>/documentMode',
									formatter: this.formatter.fnDisplay
								},
							}),
							new sap.m.Input({
								value: "{DeliveryModel>col6}",
								visible: {
									path: 'DeliveryModel>/documentMode',
									formatter: this.formatter.fnChange
								},
								showValueHelp: true,
								showSuggestion: true,
								valueHelpRequest: [this.fnHandleValueHelpTdmCode, this],
								suggestionItems: {
									path: "DeliveryModel>/tdmCode",
									factory: function (sIdx, oContext) {
										return new sap.ui.core.Item({
											text: "{DeliveryModel>name}"
										});
									}
								}
							})
						]
					}),
					new sap.m.Text({
						text: "{DeliveryModel>col7}"
					}),
					new sap.m.Text({
						text: "{DeliveryModel>col8}"
					}),
					new sap.m.Text({
						text: "{DeliveryModel>col9}"
					}),
					new sap.m.Button({
						icon: "sap-icon://popup-window",
						press: [this.fnDamageNLocationDialogOpen, this]
					}).addStyleClass("redBorderBtn")
				]
			});
		},

		//----changing mode to change mode----//
		fnEditHandler: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			oModel.setProperty("/documentMode", "change");
		},

		//----changing mode to display mode----//
		fnDisplayHandler: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			oModel.setProperty("/documentMode", "display");
		},

		//----making iconTabBar of header texts and itemTexts to change to first filterBar----//
		fnMainITBarSelect: function (oEvent) {
			var sKey = oEvent.getParameters().key;
			if (sKey === "headerTexts") {
				this.getView().byId("headerTextsContent").setSelectedKey("salesComment");
			} else if (sKey === "itemTexts") {
				this.getView().byId("itemTextsContent").setSelectedKey("mtrlSalesText");
			}
		},

		//----binding header texts display text area to content of corresponding filter tab----//
		fnHdrTxtsSelect: function (oEvent) {
			var sKey = oEvent.getParameters().key;
			this.byId("hdrTxtsDis").bindProperty("value", "DeliveryModel>/headerTexts/" + sKey);
		},

		//----saving header texts which are edited or newly created----//
		fnHdrTxtsSave: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			var sPath = this.byId("hdrTxtsDis").getBinding("value").getPath();
			var sOriginalText = oModel.getProperty(sPath);
			var sAddText = this.byId("hdrTxtsEdit").getValue();
			oModel.setProperty(sPath, sOriginalText + " " + sAddText);
			this.byId("hdrTxtsEdit").setValue("");
		},

		//----clearing header texts edit text area----//
		fnHdrTxtsClear: function () {
			this.byId("hdrTxtsEdit").setValue("");
		},

		//----binding item texts display text area to content of corresponding filter tab----//
		fnItemTxtsSelect: function (oEvent) {
			var sKey = oEvent.getParameters().key;
			this.byId("itemTxtsDis").bindProperty("value", "DeliveryModel>/itemTexts/" + sKey);
		},

		//----saving header texts which are newly created----//
		fnItemTxtsSave: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			var sPath = this.byId("itemTxtsDis").getBinding("value").getPath();
			var sOriginalText = oModel.getProperty(sPath);
			var sAddText = this.byId("itemTxtsEdit").getValue();
			oModel.setProperty(sPath, sOriginalText + " " + sAddText);
			this.byId("itemTxtsEdit").setValue("");
		},

		//----saving item texts which are edited or newly created----//
		fnItemTxtsClear: function () {
			this.byId("itemTxtsEdit").setValue("");
		},

		//----opening damage and location dialog box and binding the text areas to corresponding record(delivery item)----//
		fnDamageNLocationDialogOpen: function (oEvent) {
			var oSource = oEvent.getSource();
			var sPath = oEvent.getSource().getParent().getBindingContext("DeliveryModel");
			var sItemPath = sPath + "/damageNLocation";
			this.getView().getModel("DeliveryModel").setProperty("/selectedItemPath", sItemPath);
			this.fnDamageNLocationDialogCreation();
			this.getView().oCreateDamageNLocationDialog.open();
		},

		//----saving damage and location data from text areas to corresponding record(delivery item)----//
		fnDamageNLocationDialogSave: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			var oDamageNLocation = oModel.getProperty("/damageNLocation");
			var sSelectedPath = oModel.getProperty("/selectedItemPath");
			oModel.setProperty(sSelectedPath, oDamageNLocation);
			oModel.setProperty("/damageNLocation", {
				"damage": "",
				"location": ""
			});
			this.getView().oCreateDamageNLocationDialog.close();
		},

		//----cancelling the damage and location dialog box----//
		fnDamageNLocationDialogCancel: function () {
			var oModel = this.getView().getModel("DeliveryModel");
			oModel.setProperty("/damageNLocation", {
				"damage": "",
				"location": ""
			});
			this.getView().oCreateDamageNLocationDialog.close();
		},

		//----opening value help for route field----//
		fnHandleValueHelpRoute: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			this.valueHelpDialog = ValueHelp.fnValueHelpDialogCreation("route", "name", "Route", oEvent.getSource());
			this.getView().addDependent(this.valueHelpDialog);
			this.valueHelpDialog.getBinding("items").filter([new Filter(
				"name",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			this.valueHelpDialog.open(sInputValue);
		},

		//----opening value help for tdm code field----//
		fnHandleValueHelpTdmCode: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			this.valueHelpDialog = ValueHelp.fnValueHelpDialogCreation("tdmCode", "name", "TDM CODE", oEvent.getSource());
			this.getView().addDependent(
				this.valueHelpDialog);
			this.valueHelpDialog.getBinding("items").filter([new Filter(
				"name",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			this.valueHelpDialog.open(sInputValue);
		},
		
		fnSearchBarSearch: function (event) {
			var item = event.getParameter("suggestionItem");
			if (item) {
				sap.m.MessageToast.show("You searched for: " + item.getText());
			}
		},
		
		//----to show suggestions for search bar----//
		fnSearchBarSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [
					new sap.ui.model.Filter([
						new sap.ui.model.Filter("name", function (sText) {
							return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						})
					], false)
				];
			}
			event.getSource().getBinding("suggestionItems").filter(filters);
			event.getSource().suggest();
		}
	});
});