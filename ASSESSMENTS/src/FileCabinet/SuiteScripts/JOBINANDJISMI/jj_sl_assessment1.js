/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if(scriptContext.request.method === "GET"){
                var form =  serverWidget.createForm({
                    title : "Bitcoin pricelevel list"
                });
                
 
                form.addField({
                    id : 'disclaimer',
                    type: serverWidget.FieldType.TEXTAREA,
                    label : 'Disclaimer',
                    
                    
                });
                form.addField({
                    id : 'disclaimer',
                    type: serverWidget.FieldType.TIME,
                    label : 'Disclaimer',
                    
                    
                });
                var sublist = form.addSublist({
                    id : 'currencyid',
                    type : serverWidget.SublistType.INLINEEDITOR,
                    label : 'currency'
                });
                var sublist = form.addSublist({
                    id : 'rateId',
                    type : serverWidget.SublistType.INLINEEDITOR,
                    label : 'Rate'
                });
                var sublist = form.addSublist({
                    id : 'descriptionid',
                    type : serverWidget.SublistType.INLINEEDITOR,
                    label : 'Description'
                });
                var sublist = form.addSublist({
                    id : 'frateId',
                    type : serverWidget.SublistType.INLINEEDITOR,
                    label : 'Rate in Float'
                });




        }

        return {onRequest}
    }

    });
