exports.handler = async function(event, context) {
  const BASE_URL = 'https://raw.githubusercontent.com/satriapamudji/optimus-dashboard/main';
  
  async function fetchJSON(filename) {
    try {
      const res = await fetch(`${BASE_URL}/${filename}?t=${Date.now()}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  
  const reports = await fetchJSON('reports.json') || [];
  const status = await fetchJSON('status.json');
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reports,
      status,
      updatedAt: new Date().toISOString()
    })
  };
}
