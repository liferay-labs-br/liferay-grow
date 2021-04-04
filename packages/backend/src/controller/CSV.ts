import * as fs from 'fs';

export class CSVController {
  protected async getFileWS(filename: string): Promise<fs.WriteStream> {
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }
    return fs.createWriteStream(`temp/${filename}`);
  }
}
