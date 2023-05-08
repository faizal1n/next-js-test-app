import fs from 'fs';

export async function saveFileToLocal(file) {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/uploads/${file.newFilename}`, data);
  await fs.unlinkSync(file.filepath);
  const link = `/uploads/${file.newFilename}`;
  return link;
}
