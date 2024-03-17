/* global fetch */

export const handler = async (event) => {
    for (const record of event.Records) {
        const data = record.body;

        const url = 'http://ec2-204-236-194-169.compute-1.amazonaws.com:3001/invoice/process';

        console.log('data', data)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Data sent to backend:', responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    }

    return { status: 'Complete' };
};
