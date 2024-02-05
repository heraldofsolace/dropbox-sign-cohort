import { SignatureRequestApi } from "@dropbox/sign";
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
}

function convertSignerToList(signer) {
    const signerItem = {
        role: "Employee",
        name: signer.employee_name,
        emailAddress: signer.emailAddress,
    }

    const customFields = [
        'employee_name', 
        'location', 
        'start_date', 
        'salary', 
        'working_hours', 
        'working_hour_start', 
        'working_hour_end', 
        'work_days'
    ].map(field => {
        return {
            name: field,
            value: signer[field]
        }
    })

    customFields.push({
        name: 'deadline',
        value: "2024-03-20"
    })
    
    return {
        signers: [ signerItem ],
        customFields
    }
}

export default async function handler(request, response) {
    if(request.method !== 'POST') {
        return response.status(400).json({ success: false, message: 'Invalid request method' });
    }
    const form = formidable();
    
    let fields;

    try {
        [ fields ] = await form.parse(request);
    } catch(error) {
        console.error(error);
        return response.status(400).json({ success: false, message: error })
    }

    const { title, subject, message } = fields;
    const signers = JSON.parse(fields.signers[0]);
    


    // Return if fields are missing
    if(!title || !subject || !message || !signers) {
        return response.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const signatureRequestApi = new SignatureRequestApi();

    signatureRequestApi.username = process.env.DS_API_KEY;

    const signersList = signers.map(convertSignerToList);
    console.log(signersList[0])
    const requestData = {
        title: title[0],
        subject: subject[0],
        message: message[0],
        templateIds: ["486c5de51e4b08d2a97eb12ae16192ae546f0613"],
        signerList: signersList,
        testMode: true,
    }

    try {
        const result = await signatureRequestApi.signatureRequestBulkSendWithTemplate(requestData);
        return response.json({ success: true, message: result.body })
    } catch (error) {
        console.error(error);
        return response.status(400).json({ success: false, message: error })
    }
}