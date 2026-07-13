import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const STRAPI_URL = "http://localhost:1338";
const STRAPI_TOKEN = "1d5c010a3e4363bf0f5a361b24ce8c7583b1188acc7794a92b619b4e317715aea732c5226b56134d00a59785bf751855cd0dca441524883913313c5e1468722fe175ebff615d39f3a6211ec7a8490690345c6aa6c68fed2c3a5369da70c347ce340df75bcf915ab237793c2cfa0fead11a1bd78b2767f2561b686ef7cd9a99f8";

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, body };
}

const CAREERS_JOBS = [
  { title: "Analog Circuit Design Engineer", category: "Hardware", location: "San Francisco" },
  { title: "Machine Learning Engineer", category: "Software", location: "San Francisco" },
  { title: "Mixed-Signal Verification Engineer", category: "Hardware", location: "Remote" },
  { title: "Physics-Aware ML Researcher", category: "Research", location: "San Francisco" },
  { title: "Silicon Characterization Engineer", category: "Hardware", location: "San Francisco" },
  { title: "Embedded Systems Engineer", category: "Software", location: "San Francisco" },
  { title: "Quantization Algorithm Researcher", category: "Research", location: "San Francisco" },
  { title: "ASIC Physical Design Engineer", category: "Hardware", location: "San Francisco" },
];

async function main() {
  console.log("Starting seed jobs script...");

  // Get or Create Categories
  const categoryIds = {};
  for (const job of CAREERS_JOBS) {
    if (!categoryIds[job.category]) {
      const existing = await strapiFetch(`/api/job-categories?filters[name][$eq]=${encodeURIComponent(job.category)}`);
      if (existing.body.data && existing.body.data.length > 0) {
        categoryIds[job.category] = existing.body.data[0].id;
      } else {
        const created = await strapiFetch(`/api/job-categories`, {
          method: "POST",
          body: JSON.stringify({ data: { name: job.category } })
        });
        categoryIds[job.category] = created.body.data.id;
      }
    }
  }

  // Get or Create Locations
  const locationIds = {};
  for (const job of CAREERS_JOBS) {
    if (!locationIds[job.location]) {
      const existing = await strapiFetch(`/api/job-locations?filters[name][$eq]=${encodeURIComponent(job.location)}`);
      if (existing.body.data && existing.body.data.length > 0) {
        locationIds[job.location] = existing.body.data[0].id;
      } else {
        const created = await strapiFetch(`/api/job-locations`, {
          method: "POST",
          body: JSON.stringify({ data: { name: job.location } })
        });
        locationIds[job.location] = created.body.data.id;
      }
    }
  }

  console.log("Categories:", categoryIds);
  console.log("Locations:", locationIds);

  // Clear existing jobs (optional, but good for seeding cleanly)
  // const allJobs = await strapiFetch(`/api/jobs`);
  // if (allJobs.body.data) {
  //   for (const j of allJobs.body.data) {
  //     await strapiFetch(`/api/jobs/${j.documentId || j.id}`, { method: "DELETE" });
  //   }
  // }

  // Create Jobs
  for (const job of CAREERS_JOBS) {
    const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const res = await strapiFetch(`/api/jobs`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          title: job.title,
          slug: slug,
          category: categoryIds[job.category],
          location: locationIds[job.location],
          employment_type: "full_time",
          description: `Description for ${job.title}...`,
          apply_url: "#",
          is_active: true,
          posted_date: new Date().toISOString().split('T')[0]
        }
      })
    });
    if (res.ok) {
      console.log(`Created job: ${job.title}`);
    } else {
      console.error(`Failed to create job ${job.title}`, res.body);
    }
  }

  console.log("Done seeding jobs!");
}

main().catch(console.error);
