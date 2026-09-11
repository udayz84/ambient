import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const tokenMatch = env.match(/STRAPI_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1] : '';

const sampleContent = `
<h2>Introduction to Ambient Edge AI</h2>
<p>In the rapidly evolving landscape of Edge AI, maintaining high performance while operating within strict power budgets is critical. At Ambient Scientific, our programmable AI cores provide granular precision ranging from 4 to 32 bits, allowing developers to balance efficiency and accuracy seamlessly.</p>
<h3>Key Advantages</h3>
<ul>
  <li><strong>Unmatched Programmability:</strong> Real-time control of AI resolution to suit dynamic workloads.</li>
  <li><strong>Scalable Architecture:</strong> Scaling up to 512 GOPs to handle complex inference tasks.</li>
  <li><strong>Ultra-Low Power:</strong> Designed for microwatt budgets perfect for always-on battery devices.</li>
</ul>
<blockquote>
  "The future of Edge AI isn't just about shrinking models; it's about fundamentally rethinking hardware architecture from the ground up." — <em>Ambient Scientific Team</em>
</blockquote>
<p>By leveraging our unique approach to mixed-precision tensor operations, hardware footprint is drastically minimized without compromising on throughput. This breakthrough is paving the way for ubiquitous, intelligent edge devices across wearables, industrial IoT, and consumer electronics.</p>
<p><a href="#">Read our full developer documentation</a> to learn how you can start integrating Ambient AI cores into your next product design today.</p>
`;

async function run() {
  const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  
  // 1. Fetch all articles
  const listRes = await fetch('http://localhost:1338/api/articles?pagination[pageSize]=100', { headers });
  const listData = await listRes.json();
  
  if (!listData.data) {
    console.error("Failed to fetch articles:", listData);
    return;
  }
  
  const articles = listData.data;
  console.log(`Found ${articles.length} articles to update.`);
  
  // 2. Loop and update each article
  for (const article of articles) {
    const docId = article.documentId;
    console.log(`Updating article: ${article.title} (${docId})`);
    
    const updateRes = await fetch(`http://localhost:1338/api/articles/${docId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        data: {
          body: sampleContent
        }
      })
    });
    
    if (updateRes.ok) {
      console.log(`✅ Success for ${docId}`);
    } else {
      console.error(`❌ Failed for ${docId}`, await updateRes.text());
    }
  }
  
  console.log("All articles updated with sample content!");
}

run();
