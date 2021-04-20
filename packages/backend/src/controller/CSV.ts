import * as fs from 'fs';
import * as path from 'path';

export class CSVController {
  protected tempFolder = path.resolve(__dirname, '..', '..', 'export');

  protected async getFileWS(filename: string): Promise<fs.WriteStream> {
    if (!fs.existsSync(this.tempFolder)) {
      fs.mkdirSync(this.tempFolder);
    }
    return fs.createWriteStream(`${this.tempFolder}/${filename}`);
  }
}
