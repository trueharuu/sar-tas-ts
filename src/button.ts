export enum Buttons {
    Jump = 'J',
    Duck = 'D',
    Use = 'U',
    Zoom = 'Z',
    BluePortal = 'B',
    OrangePortal = 'O',

    ReleaseJump = 'j',
    ReleaseDuck = 'd',
    ReleaseUse = 'u',
    ReleaseZoom = 'z',
    ReleaseBluePortal = 'b',
    ReleaseOrangePortal = 'o',
}

export class Button {
  constructor(public readonly action: Buttons | `${Buttons}`, public readonly ticks?: number) {}
  public toString() {
    if (this.ticks) {
      return `${this.action}${this.ticks}`;
    }

    return this.action;
  }
}