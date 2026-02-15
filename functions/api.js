const fetch = require('node-fetch');

const API_BASE = 'https://fomolt.com/api/v1';
const API_KEY = process.env.FOMOLT_API_KEY || 'fmlt_7ebd009f1574668a71ebf4970795ddd4';

exports.handler = async (event) => {
  const path = event.path.replace('/api', '');
  const url = API_BASE + path;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'User-Agent': 'OptimusDashboard/1.0'
      }
    });
    
    const data = await response.json();
    
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
