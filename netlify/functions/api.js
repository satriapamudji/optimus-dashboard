exports.handler = async function(event, context) {
  const REPO = 'satriapamudji/optimus-dashboard';
  const BRANCH = 'main';
  const TOKEN = process.env.GITHUB_TOKEN;
  
  async function fetchFile(filename) {
    const url = `https://api.github.com/repos/${REPO}/contents/${filename}?ref=${BRANCH}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return JSON.parse(Buffer.from(data.content, 'base64').toString());
  }
  
  const reports = await fetchFile('reports.json') || [];
  const status = await fetchFile('status.json');
  
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
