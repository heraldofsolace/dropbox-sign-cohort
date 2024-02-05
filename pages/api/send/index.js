
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(request, response) {
    if(request.method !== 'POST') {
        return response.status(400).json({ success: false, message: 'Invalid request method' });
    }
}