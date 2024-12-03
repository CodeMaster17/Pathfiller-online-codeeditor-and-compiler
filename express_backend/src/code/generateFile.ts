import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const dirCodes: string = path.join(__dirname, 'generated_codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (format: string, content: string): string => {
    // generating random id
    const jobId = uuid();

    // generating name of the file
    const filename = `${jobId}.${format}`;

    // fetching file name
    const filepath = path.join(dirCodes, filename);

    // write incoming on the file
    fs.writeFileSync(filepath, content);

    return filepath;
};

export { generateFile };

