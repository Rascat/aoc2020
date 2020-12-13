export class InputHandler {

  private fs = require('fs');

  constructor() { }

  createFile(filename: string, data: string) {

    try {
      this.fs.writeFileSync(filename, data);
    } catch (e) {
      console.log('Error:', e.stack)
    }
  }

  readFile(filename: string): string {

    try {
      var data = this.fs.readFileSync(filename, 'utf8');
      return data;

    } catch (e) {
      console.log('Error:', e.stack);
    }
  }

  getInputAsListOfInt(filename: string): Array<number> {
    return this.readFile(filename).split('\n').map(x => +x);
  }

  getInputAsListOfStr(filename: string, separator: string = '\n'): Array<string> {
    return this.readFile(filename).split(separator)
  }
}