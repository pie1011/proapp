const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const busboy = require('busboy');

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Custom parser function for multipart form data
const parseMultipartForm = (event) => {
    return new Promise((resolve, reject) => {
        const fields = {};
        const files = [];
        
        // Parse content-type header to get boundary
        const contentType = event.headers['content-type'] || event.headers['Content-Type'];
        
        const bb = busboy({ 
            headers: { 'content-type': contentType },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB limit per file
                files: 5 // Max 5 files
            }
        });
        
        // Handle form fields
        bb.on('field', (fieldname, val) => {
            console.log(`Field [${fieldname}]: value: %j`, val);
            fields[fieldname] = val;
        });
        
        // Handle file uploads
        bb.on('file', (fieldname, file, info) => {
            const { filename, encoding, mimeType } = info;
            console.log(`File [${fieldname}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType);
            
            const chunks = [];
            file.on('data', (data) => {
                chunks.push(data);
            });
            
            file.on('end', () => {
                const buffer = Buffer.concat(chunks);
                files.push({
                    fieldname,
                    filename,
                    contentType: mimeType,
                    content: buffer
                });
            });
        });
        
        // Handle completion
        bb.on('close', () => {
            console.log('Busboy parsing completed');
            resolve({ fields, files });
        });
        
        // Handle errors
        bb.on('error', (err) => {
            console.error('Busboy parsing error:', err);
            reject(err);
        });
        
        // Convert base64 body to buffer and pipe to busboy
        const body = event.isBase64Encoded 
            ? Buffer.from(event.body, 'base64')
            : Buffer.from(event.body, 'binary');
            
        bb.write(body);
        bb.end();
    });
};

exports.handler = async (event, context) => {

    // Add these debug lines right at the start
    console.log('=== DEBUGGING FORM SUBMISSION ===');
    console.log('HTTP Method:', event.httpMethod);
    console.log('Content-Type:', event.headers['content-type']);
    console.log('Raw body length:', event.body ? event.body.length : 'No body');
    console.log('Raw body preview:', event.body ? event.body.substring(0, 200) : 'No body');


    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight' })
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Processing quote submission...');

        // Parse multipart form data using busboy
        const result = await parseMultipartForm(event);
        const formFields = result.fields || {};
        const files = result.files || [];

        // Debugging output for parsed data
        console.log('=== PARSED DATA DEBUG ===');
        console.log('All formFields keys:', Object.keys(formFields));
        console.log('Sample formField values:', JSON.stringify(formFields, null, 2));
        console.log('Files array length:', files.length);

        console.log('Form fields received:', Object.keys(formFields));
        console.log('Files received:', files.length);

        // Helper function to safely get form field values
        const getFieldValue = (fieldName) => {
            const field = formFields[fieldName];
            if (!field) return '';
            return typeof field === 'string' ? field.trim() : '';
        };

        // Helper function to filter empty values
        const filterEmpty = (value) => {
            return value && value !== '' && value !== 'undefined' && value !== null;
        };

        // Parse appliances and appliance details from form data
        const parseAppliancesFromForm = () => {
            const appliances = {};
            const applianceDetails = {};

            // Get selected appliances
            const applianceTypes = ['range', 'hood', 'cooktop', 'microwave', 'oven', 'dishwasher',
                'refrigerator', 'wine', 'ice', 'disposal', 'trash', 'washer'];

            applianceTypes.forEach(type => {
                if (getFieldValue(`appliances.${type}`) === 'true') {
                    appliances[type] = true;

                    // Get details for this appliance
                    const details = {};
                    const brand = getFieldValue(`applianceDetails.${type}.brand`);
                    const model = getFieldValue(`applianceDetails.${type}.model`);
                    const notes = getFieldValue(`applianceDetails.${type}.notes`);

                    if (brand) details.brand = brand;
                    if (model) details.model = model;
                    if (notes) details.notes = notes;

                    // Handle specifics (array of checkboxes)
                    const specifics = [];
                    let i = 0;
                    while (formFields[`applianceDetails.${type}.specifics.${i}`]) {
                        const specific = getFieldValue(`applianceDetails.${type}.specifics.${i}`);
                        if (specific) specifics.push(specific);
                        i++;
                    }
                    if (specifics.length > 0) details.specifics = specifics;

                    // Handle washer pedestal model
                    if (type === 'washer') {
                        const pedestalModel = getFieldValue(`applianceDetails.${type}.pedestalModel`);
                        if (pedestalModel) details.pedestalModel = pedestalModel;
                    }

                    if (Object.keys(details).length > 0) {
                        applianceDetails[type] = details;
                    }
                }
            });

            return { appliances, applianceDetails };
        };

        const { appliances, applianceDetails } = parseAppliancesFromForm();

        // Parse preferred times array
        const parsePreferredTimes = () => {
            const times = [];
            const timeOptions = ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 5:00 PM)', 'Evening (5:00 PM - 8:00 PM)'];

            timeOptions.forEach(time => {
                if (getFieldValue(`preferredTime.${time}`) === 'true') {
                    times.push(time);
                }
            });

            return times;
        };

        // Build the main quote record
        const quoteData = {
            // Client Information
            customer_name: getFieldValue('name') || null,
            email: getFieldValue('email') || null,
            phone_primary: getFieldValue('phone') || null,
            phone_secondary: getFieldValue('phone2') ?
                `${getFieldValue('phone2')} (${getFieldValue('phone2Type') || 'Mobile'})` : null,
            client_type: getFieldValue('clientType') || null,
            company_name: getFieldValue('companyName') || null,
            company_address: getFieldValue('companyAddress') || null,
            company_phone: getFieldValue('companyPhone') || null,

            // Pre-install Assessment
            purchased: getFieldValue('purchased') || null,
            field_measure: getFieldValue('fieldMeasure') || null,

            // Installation Address
            street: getFieldValue('street') || null,
            unit: getFieldValue('unit') || null,
            city: getFieldValue('city') || null,
            zip: getFieldValue('zip') || null,

            // Services
            delivery: getFieldValue('delivery') || null,
            pickup_location: getFieldValue('pickupLocation') || null,
            pickup_date: getFieldValue('pickupDate') || null,
            uninstall: getFieldValue('uninstall') || null,
            haul_away: getFieldValue('haulAway') || null,

            // Site Details
            home_type: getFieldValue('homeType') || null,
            floor: getFieldValue('floor') || null,
            stairs: getFieldValue('stairs') || null,
            stairs_number: getFieldValue('stairsNumber') || null,
            stairs_turns: getFieldValue('stairsTurns') || null,
            parking: getFieldValue('parking') || null,
            parking_notes: getFieldValue('parkingNotes') || null,
            gate_code: getFieldValue('gateCode') || null,

            // Project Details
            preferred_date: getFieldValue('preferredDate') || null,
            preferred_time: parsePreferredTimes(),
            additional_details: getFieldValue('additionalDetails') || null,

            // Selected appliances
            selected_appliances: Object.keys(appliances),

            // Store complete raw form data for backup
            raw_form_data: {
                formFields: formFields,
                appliances: appliances,
                applianceDetails: applianceDetails,
                fileCount: files.length
            }
        };

        // Insert the main quote record
        console.log('Inserting quote into database...');
        const { data: quote, error: quoteError } = await supabase
            .from('quotes')
            .insert([quoteData])
            .select()
            .single();

        if (quoteError) {
            console.error('Error inserting quote:', quoteError);
            throw new Error(`Database error: ${quoteError.message}`);
        }

        console.log('Quote inserted with ID:', quote.id);

        // Insert appliance details
        const applianceDetailsToInsert = [];
        Object.keys(applianceDetails).forEach(applianceType => {
            const details = applianceDetails[applianceType];
            applianceDetailsToInsert.push({
                quote_id: quote.id,
                appliance_type: applianceType,
                brand: details.brand || null,
                model: details.model || null,
                notes: details.notes || null,
                specifics: details.specifics || [],
                additional_data: {
                    pedestalModel: details.pedestalModel || null
                }
            });
        });

        if (applianceDetailsToInsert.length > 0) {
            console.log('Inserting appliance details...');
            const { error: detailsError } = await supabase
                .from('appliance_details')
                .insert(applianceDetailsToInsert);

            if (detailsError) {
                console.error('Error inserting appliance details:', detailsError);
                // Don't throw here - we can continue without details if needed
            }
        }

        // Handle file uploads
        const uploadedFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(`Processing file ${i + 1}:`, file.filename);

            try {
                // Generate unique filename
                const fileExtension = file.filename.split('.').pop();
                const uniqueFileName = `${quote.id}/${Date.now()}-${i + 1}.${fileExtension}`;

                // Upload to Supabase Storage
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('quote-files')
                    .upload(uniqueFileName, file.content, {
                        contentType: file.contentType,
                        upsert: false
                    });

                if (uploadError) {
                    console.error(`Error uploading file ${file.filename}:`, uploadError);
                    continue; // Skip this file but continue with others
                }

                // Record file in database
                const { error: fileRecordError } = await supabase
                    .from('quote_files')
                    .insert([{
                        quote_id: quote.id,
                        file_name: file.filename,
                        file_size: file.content.length,
                        file_type: file.contentType,
                        storage_path: uniqueFileName,
                        upload_order: i + 1
                    }]);

                if (fileRecordError) {
                    console.error(`Error recording file ${file.filename}:`, fileRecordError);
                }

                uploadedFiles.push({
                    name: file.filename,
                    size: file.content.length,
                    type: file.contentType
                });

            } catch (fileError) {
                console.error(`Error processing file ${file.filename}:`, fileError);
                // Continue with other files
            }
        }

        // Generate and send email
        console.log('Generating email...');
        const emailContent = generateEmailContent(quoteData, applianceDetails, uploadedFiles);

        try {
            const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'Pro Appliance Installation <onboarding@resend.dev>',
                to: ['pie10101011@gmail.com'],
                subject: `New Installation Quote Request - ${quoteData.customer_name || 'Customer'}`,
                html: emailContent
            });

            if (emailError) {
                console.error('Error sending email:', emailError);
                // Don't throw - we still want to return success for the form submission
            } else {
                console.log('Email sent successfully:', emailData.id);

                // Update quote to mark email as sent
                await supabase
                    .from('quotes')
                    .update({
                        email_sent: true,
                        email_sent_at: new Date().toISOString()
                    })
                    .eq('id', quote.id);
            }
        } catch (emailSendError) {
            console.error('Email sending failed:', emailSendError);
        }

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Quote submitted successfully',
                quoteId: quote.id,
                filesUploaded: uploadedFiles.length,
                emailSent: true
            })
        };

    } catch (error) {
        console.error('Function error:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Internal server error',
                message: error.message || 'An unexpected error occurred'
            })
        };
    }
};

// Generate professional HTML email content
function generateEmailContent(quoteData, applianceDetails, uploadedFiles) {
    const formatSection = (title, content) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return '';
        return `
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid #3498db;">${title}</h3>
                <div style="padding-left: 15px;">
                    ${content}
                </div>
            </div>
        `;
    };

    const formatField = (label, value) => {
        if (!value) return '';
        return `<p style="margin: 5px 0;"><strong>${label}:</strong> ${value}</p>`;
    };

    // Client Information Section
    let clientInfo = '';
    clientInfo += formatField('Name', quoteData.customer_name);
    clientInfo += formatField('Email', quoteData.email);
    clientInfo += formatField('Phone', quoteData.phone_primary);
    if (quoteData.phone_secondary) clientInfo += formatField('Secondary Phone', quoteData.phone_secondary);
    clientInfo += formatField('Customer Type', quoteData.client_type);
    if (quoteData.company_name) {
        clientInfo += formatField('Company Name', quoteData.company_name);
        clientInfo += formatField('Company Address', quoteData.company_address);
        clientInfo += formatField('Company Phone', quoteData.company_phone);
    }

    // Pre-install Assessment
    let assessment = '';
    assessment += formatField('Appliances Purchased', quoteData.purchased);
    assessment += formatField('Field Measure Requested', quoteData.field_measure);

    // Installation Address
    let address = '';
    const fullAddress = [quoteData.street, quoteData.unit, quoteData.city, quoteData.zip].filter(Boolean).join(', ');
    if (fullAddress) address += formatField('Installation Address', fullAddress);

    // Selected Appliances
    let appliancesSection = '';
    Object.keys(applianceDetails).forEach(applianceType => {
        const details = applianceDetails[applianceType];
        const applianceNames = {
            range: 'Range/Cooktop',
            hood: 'Range Hood',
            cooktop: 'Cooktop',
            microwave: 'Microwave',
            oven: 'Wall Oven',
            dishwasher: 'Dishwasher',
            refrigerator: 'Refrigerator',
            wine: 'Wine Cooler',
            ice: 'Ice Maker',
            disposal: 'Garbage Disposal',
            trash: 'Trash Compactor',
            washer: 'Washer/Dryer'
        };

        appliancesSection += `
            <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #3498db;">
                <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${applianceNames[applianceType] || applianceType}</h4>
                ${formatField('Brand', details.brand)}
                ${formatField('Model', details.model)}
                ${formatField('Notes', details.notes)}
                ${details.specifics && details.specifics.length > 0 ?
                formatField('Special Requirements', details.specifics.join(', ')) : ''}
                ${details.pedestalModel ? formatField('Pedestal Model', details.pedestalModel) : ''}
            </div>
        `;
    });

    // Services Section
    let services = '';
    services += formatField('Delivery Service', quoteData.delivery);
    if (quoteData.pickup_location) services += formatField('Pickup Location', quoteData.pickup_location);
    if (quoteData.pickup_date) services += formatField('Pickup Date', quoteData.pickup_date);
    services += formatField('Uninstall Service', quoteData.uninstall);
    services += formatField('Haul Away Service', quoteData.haul_away);

    // Site Details Section
    let siteDetails = '';
    siteDetails += formatField('Home Type', quoteData.home_type);
    siteDetails += formatField('Floor', quoteData.floor);
    siteDetails += formatField('Stairs', quoteData.stairs);
    if (quoteData.stairs_number) siteDetails += formatField('Number of Stairs', quoteData.stairs_number);
    if (quoteData.stairs_turns) siteDetails += formatField('Stairs Have Turns', quoteData.stairs_turns);
    siteDetails += formatField('Parking', quoteData.parking);
    if (quoteData.parking_notes) siteDetails += formatField('Parking Notes', quoteData.parking_notes);
    if (quoteData.gate_code) siteDetails += formatField('Gate Code', quoteData.gate_code);

    // Project Details Section
    let projectDetails = '';
    projectDetails += formatField('Preferred Date', quoteData.preferred_date);
    if (quoteData.preferred_time && quoteData.preferred_time.length > 0) {
        projectDetails += formatField('Preferred Times', quoteData.preferred_time.join(', '));
    }
    projectDetails += formatField('Additional Details', quoteData.additional_details);

    // Files Section
    let filesSection = '';
    if (uploadedFiles.length > 0) {
        filesSection = `<ul style="padding-left: 20px;">`;
        uploadedFiles.forEach(file => {
            const sizeKB = Math.round(file.size / 1024);
            filesSection += `<li style="margin: 5px 0;">${file.name} (${sizeKB}KB, ${file.type})</li>`;
        });
        filesSection += `</ul>`;
    }

    // Combine all sections
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Installation Quote Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; margin-bottom: 30px; border-radius: 10px;">
                <h1 style="margin: 0; font-size: 24px;">New Installation Quote Request</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Submitted on ${new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
            </div>
            
            ${formatSection('Client Information', clientInfo)}
            ${formatSection('Pre-Install Assessment', assessment)}
            ${address ? formatSection('Installation Address', address) : ''}
            ${appliancesSection ? formatSection('Selected Appliances', appliancesSection) : ''}
            ${services ? formatSection('Services Requested', services) : ''}
            ${siteDetails ? formatSection('Site Details', siteDetails) : ''}
            ${projectDetails ? formatSection('Project Details', projectDetails) : ''}
            ${filesSection ? formatSection(`Uploaded Files (${uploadedFiles.length})`, filesSection) : ''}
            
            <div style="background: #f1f2f6; padding: 20px; border-radius: 5px; margin-top: 30px; text-align: center;">
                <p style="margin: 0; color: #57606f; font-style: italic;">
                    This quote request was submitted through the Pro Appliance Installation website contact form.
                    <br>Please respond promptly to provide the best customer service.
                </p>
            </div>
        </body>
        </html>
    `;
}