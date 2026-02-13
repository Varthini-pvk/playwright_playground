    import {fileURLToPath} from 'node:url';
    import {dirname, join, resolve} from 'node:path'


    const __dirname = dirname(fileURLToPath(import.meta.url));
    export const project_root = resolve(__dirname, "..");
    export const upload_path = resolve(project_root,'resources');
    export const download_path = resolve(project_root, 'downloads');

