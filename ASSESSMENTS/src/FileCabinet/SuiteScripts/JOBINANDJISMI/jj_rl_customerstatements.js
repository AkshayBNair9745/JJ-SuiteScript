/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 *this is to When performing the API request from a third-party application, the Restlet code needs to fetch the request body first, then check for duplicate folder names. If the folder name already exists, return a response stating that the folder name already exists.
 */
define(['N/record','N/search','N/file','N/email'],
    /**
 * @param{record} record
 */
    (record,search,file,email) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            
        

        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {


        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
            try {
                const customerId = requestBody.customerId;
                const custemail = requestBody.customeremail;
                const custdate = requestBody.customerdate;

                const folderSearchObj = search.create({
                    type: 'folder',
                    filters: [['name', 'is', customerId]],
                    columns: [
                        search.createColumn({ name: 'name', label: 'Name' }),
                        search.createColumn({ name: 'internalid', label: 'Internal ID' })
                    ]
                });

                const folderResult = folderSearchObj.run().getRange({ start: 0, end: 1 });
                const folderExists = folderResult.length > 0;

                if (folderExists) {
                    return 'The folder exists.';
                } else {
                    // Create or retrieve CSV content
                    
                    var csvContent = 'Your CSV data here';
                            csvContent += customerId + ',' + custemail + ',' + custdate +  '\n';


                    var csvFile = file.create({
                        name: 'customers_statement.csv',
                        contents: csvContent,
                        folder: 971, // Ensure this is the correct internal ID of the folder
                        fileType: file.Type.CSV
                    });

                    var csvFileId = csvFile.save();
                    log.debug('csvfileId',csvFileId)

                    // Send email
                    email.send({
                        author: -5, // Replace with a valid sender internal ID
                        recipients: custemail, // Replace with a valid recipient email address
                        subject: 'CSV File: Customers Report',
                        body: 'Please find attached the CSV file with the customers report.',
                        attachments: [csvFileId]
                    });

                    return 'Email sent with CSV attachment.';
                }
            } catch (error) {
                log.error({
                    title: 'Error in Scheduled Script',
                    details: error
                });
                return 'An error occurred. Please check the logs.';
            }
        };

        

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
