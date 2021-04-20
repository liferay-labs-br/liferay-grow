import * as fs from 'fs';

export class CSVController {
  protected tempFolder = 'temp';

  protected async getFileWS(filename: string): Promise<fs.WriteStream> {
    if (!fs.existsSync(this.tempFolder)) {
      fs.mkdirSync(this.tempFolder);
    }
    return fs.createWriteStream(`${this.tempFolder}/${filename}`);
  }
}
