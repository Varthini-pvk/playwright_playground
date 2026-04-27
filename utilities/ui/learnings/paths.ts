import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// #region agent log
fetch('http://127.0.0.1:7872/ingest/c224b366-5c96-4e03-86f0-6eb731f3e856', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '702e36' },
  body: JSON.stringify({
    sessionId: '702e36',
    runId: 'pre-fix',
    hypothesisId: 'H2',
    location: 'utilities/paths.ts:1',
    message: 'paths module evaluated',
    data: { url: import.meta.url },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

const __dirname = dirname(fileURLToPath(import.meta.url));
export const project_root = resolve(__dirname, '..');
export const upload_path = resolve(project_root, 'resources');
export const download_path = resolve(project_root, 'downloads');
