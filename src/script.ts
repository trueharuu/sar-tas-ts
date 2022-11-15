import { Tick } from './tick';

export class Script {
  public readonly headers: Array<string> = [];
  public readonly actions: Array<Tick> = [];
  private readonly lines: Array<string> = [];
  constructor() {}

  public addHeader(name: string, ...values: Array<unknown>) {
    this.headers.push(`${name} ${values.join(' ')}`);
    this.lines.push(`${name} ${values.join(' ')}`);
    return this;
  }

  public version(version: 1 | 2 | 3 | 4 | 5 | 6) {
    return this.addHeader('version', version)
  }

  public startNow() {
    return this.addHeader('start', 'now')
  }

  public startSave(saveName: string) {
    return this.addHeader('start', 'save', saveName)
  }

  public startMap(mapName: string) {
    return this.addHeader('start', 'map', mapName);
  }

  public startChallengeMode(mapName: string) {
    return this.addHeader('start', 'cm', mapName)
  }

  public startNext() {
    return this.addHeader('start', 'next')
  }

  public startNextSave(saveName: string) {
    return this.addHeader('start', 'next', 'save', saveName)
  }

  public startNextMap(mapName: string) {
    return this.addHeader('start', 'next', 'map', mapName);
  }

  public startNextChallengeMode(mapName: string) {
    return this.addHeader('start', 'next', 'cm', mapName);
  }

  public rngmanip(filepath: string) {
    return this.addHeader('rngmanip', filepath)
  }

  public addAction(tick: Tick) {
    this.actions.push(tick);
    this.lines.push(tick.toString());
    return this;
  }

  public addTick(ticks: number, cb: (t: Tick) => Tick) {
    return this.addAction(cb(new Tick(ticks, false)));
  }

  public addRelativeTick(amount: number, cb: (t: Tick) => Tick) {
    return this.addAction(cb(new Tick(amount, true)));
  }

  public loop(times: number, cb: (s: Script) => Script) {
    this.lines.push(`repeat ${times}`);
    this.lines.push(...cb(new Script()).lines);
    this.lines.push('end');
    return this;
  }

  public compile() {
    return this.lines.join('\n');
  }

  public static parse(file: string) {
    const lines: Array<string> = file.split('\n');
    const script = new this();

    for (const line of lines) {
      if (line.startsWith('version')) {
        script.version(Number.parseInt(line.slice(7)));
      }

      if (line.startsWith('start')) {
        const [, ] = line.split(' ');

        if () {} // error !!! please !!!!
      }
    }
  }
}