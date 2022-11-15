import { Tick } from './tick';

export class Script {
  public readonly headers: Array<string> = [];
  public readonly actions: Array<Tick> = [];
  constructor() {}

  public version(version: 1 | 2 | 3 | 4 | 5 | 6) {
    this.headers.push(`version ${version}`);
    return this;
  }

  public startNow() {
    this.headers.push('start now');
    return this;
  }

  public startSave(saveName: string) {
    this.headers.push(`start save ${saveName}`);
    return this;
  }

  public startMap(mapName: string) {
    this.headers.push(`start map ${mapName}`);
    return this;
  }

  public startChallengeMode(mapName: string) {
    this.headers.push(`start cm ${mapName}`);
    return this;
  }

  public startNext() {
    return this.headers.push('start next now');
    return this;
  }

  public startNextSave(saveName: string) {
    this.headers.push(`start next save ${saveName}`);
    return this;
  }

  public startNextMap(mapName: string) {
    this.headers.push(`start next map ${mapName}`);
    return this;
  }

  public startNextChallengeMode(mapName: string) {
    this.headers.push(`start next cm ${mapName}`);
    return this;
  }

  public rngmanip(filepath: string) {
    this.headers.push(`rngmanip ${filepath}`);
    return this;
  }

  public addTick(ticks: number, cb: (t: Tick) => Tick) {
    this.actions.push(cb(new Tick(ticks, false)));
    return this;
  }

  public addRelativeTick(amount: number, cb: (t: Tick) => Tick) {
    this.actions.push(cb(new Tick(amount, true)));
    return this;
  }
}