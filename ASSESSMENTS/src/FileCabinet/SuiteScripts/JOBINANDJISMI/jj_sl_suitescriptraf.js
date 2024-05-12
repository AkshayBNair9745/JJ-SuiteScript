/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/https', 'N/record', 'N/ui/serverWidget'],
    /**
 * @param{http} http
 * @param{https} https
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (http, https, record, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === "GET") {
                var form = serverWidget.createForm({
                    title: "Bitcoin Price List"
                });
                form.addButton({
                    id : 'buttonid',
                    label : 'refresh'
                });

                // Add a disclaimer text field
                form.addField({
                    id: 'disclaimer',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Disclaimer',
                });

                // Add a dynamic field for displaying the updated time
                 form.addField({
                    id: 'timeid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Updated Time',
                });

                // Add sublists for displaying currency rates
                form.addSublist({
                    id: 'currencyid',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Currency',
                });
                form.addSublist({
                    id: 'rateid',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Rate',
                });
                form.addSublist({
                    id: 'descriptionid',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Description',
                });
                form.addSublist({
                    id: 'frateid',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Rate in Float',
                });
                // var headerObj
                // var response = http.get({
                //     url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
                //     headers: headerObj
                // });
                // var header=[];
                var response = https.get({
                    url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
                    headers: headerObj
                });
                var data = JSON.parse(scriptContext.request.body);
                 


               

                    // newSFID=newSFID.replace('\n','');


                // Display the form
                scriptContext.response.writePage(form);
            }
            else if(scriptContext.request.method === 'POST'){
                var data = JSON.parse(scriptContext.request.body);
            //     log.debug('data',data)
            //     let name = data.custpage_name;
            //     let age = data.custpage_age;
            //     let addr = data.custpage_address;
            //     let sex = data.custpage_sex;
            }
        };

        return { onRequest };
    });
