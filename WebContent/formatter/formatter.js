sap.ui.define([], function () {
	"use strict";
	return {

		//----to return true when mode is display----//
		fnDisplay: function (sMode) {
			return sMode === "display";
		},

		//----to return true when mode is change----//
		fnChange: function (sMode) {
			return sMode === "change";
		},

		//----to return true  if mode is display or mode is edit and status is complete----//
		fnDisOrEditComp: function (sMode, sStatus) {
			if (sMode === "display") {
				return true;
			} else if (sMode === "change" && sStatus === "complete") {
				return true;
			} else {
				return false;
			}
		},

		//----to return true if mode is edit and status is progress----//
		fnEditProg: function (sMode, sStatus) {
			if (sMode === "change" && sStatus === "progress") {
				return true;
			} else {
				return false;
			}
		},

		//----to concatenate day, date, time and zone----//
		fnDateNTime: function (sDay, sDate, sTime, sZone) {
			return sDay + " " + sDate + " " + sTime + " " + sZone;
		}
	};
});