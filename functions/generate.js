const axios = require('axios');

exports.handler = async function (event) {
    // Parse the input data from the frontend
    const { messages } = JSON.parse(event.body);

    try {
        // Make a request to the OpenAI API
        const response = await axios.post(
            'https://uxo-dev.openai.azure.com/openai/deployments/eva4o/chat/completions?api-version=2023-03-15-preview',
            {
                messages,
                response_format: { type: 'json_object' },
                temperature: 0,
                max_tokens: 1024,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.OPENAI_API_KEY, // Use the environment variable for the API key
                }
            }
        );

        // Return the response to the frontend
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch response from OpenAI' }),
        };
    }
};
