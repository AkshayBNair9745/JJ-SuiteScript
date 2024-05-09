
/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/ui/dialog'],
function(currentRecord, dialog) {
 
    function pageInit(scriptContext) {
        // Initialize the page
        applyCouponCheckbox();
    }
    function applyCouponCheckbox() {
        var currentRecordObj = currentRecord.get();
        var applyCouponValue = currentRecordObj.getValue({ fieldId: 'custentity_jj_applycoupon' });
        var couponCodeField = currentRecordObj.getField({ fieldId: 'custentityjj_coupon' });
        couponCodeField.isDisabled = !applyCouponValue;
        if (!applyCouponValue) {
            currentRecordObj.setValue({ fieldId: 'custentityjj_coupon', value: '' });
        }
    }
    function fieldChanged(scriptContext) {
        // Check if the field changed is 'Apply Coupon'
        if (scriptContext.fieldId === 'custentity_jj_applycoupon') {
            applyCouponCheckbox();
        }
    }
 
    function saveRecord(scriptContext) {
        var currentRecordObj = currentRecord.get();
        var couponCode = currentRecordObj.getValue({ fieldId: 'custentityjj_coupon' });
        var isChecked = currentRecordObj.getValue({ fieldId: 'custentity_jj_applycoupon' });
        if (isChecked && couponCode.length !== 5) {
            dialog.alert({
                title: 'Alert',
                message: 'Coupon Code must be 5 characters long.'
            });
            return false;
        }
        return true;
    }
 
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
 
});