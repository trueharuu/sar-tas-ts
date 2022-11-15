import type { Stringify } from './types';

export class Tool {
  constructor(private name: string, private args: Array<unknown>) {}
  public toString() {
    return `${this.name} ${this.args.join(' ')}`;
  }
}

export namespace Tool {
  export enum StrafingType {
    None = 'none',
    Off = 'off',
    Angular = 'ang',
    Vectorial = 'vec',
    VecCam = 'veccam',
  }

  export enum VelocityType {
    Max = 'max',
    Keep = 'keep',
  }

  export enum DirectionType {
    Forward = 'forward',
    ForwardVelocity = 'forwardvel',
    Left = 'left',
    Right = 'right',
  }

  export interface StrafeOptions {
    readonly type?: Stringify<StrafingType>;
    readonly velocity: Stringify<VelocityType> | `${number}ups`;
    readonly direction?: Stringify<DirectionType> | `${number}deg`;
    readonly nopitchlock?: boolean;
    readonly letspeedlock?: boolean;
  }

  export function strafe(
    options: StrafeOptions = {
      velocity: VelocityType.Max,
      type: StrafingType.Vectorial,
      direction: DirectionType.Forward,
      letspeedlock: false,
      nopitchlock: false,
    }
  ): Tool {
    const params = [];
    if (options.type) {
      params.push(options.type);
    }

    params.push(options.velocity);

    if (options.direction) {
      params.push(options.direction);
    }

    if (options.letspeedlock) {
      params.push('letspeedlock');
    }

    if (options.nopitchlock) {
      params.push('nopitchlock');
    }

    return new Tool('strafe', params);
  }

  export function autojump(on: boolean): Tool {
    return new Tool('autojump', [on ? 'on' : 'off']);
  }

  export function absmov(
    angle: 'off' | `${number}deg`,
    strength?: number
  ): Tool {
    if (strength) {
      return new Tool('absmov', [angle, strength]);
    }

    return new Tool('absmov', [angle]);
  }

  export function setang(pitch: number, yaw: number, ticks?: number): Tool {
    if (ticks) {
      return new Tool('setang', [pitch, yaw, ticks]);
    }

    return new Tool('setang', [pitch, yaw]);
  }

  export function autoaim(x: number, y: number, z: number, time?: number) {
    if (time) {
      return new Tool('autoaim', [x, y, z, time])
    }

    return new Tool('autoaim', [x, y, z]);
  }

  export function autoaimEnt(name: string, time?: number) {
    if (time) {
      return new Tool('autoaim ent', [name, time])
    }

    return new Tool('autoaim ent', [name])
  }

  export function decel(speed: 'off' | `${number}ups`): Tool {
    return new Tool('decel', [speed]);
  }

  export interface CheckOptions {
    pos?: [x: number, y: number, z: number],
    ang?: [pitch: number, yaw: number],
    posepsilon?: number,
    angepsilon?: number,
  }

  export function check(options: CheckOptions) {
    const params = [];

    if (options.pos) {
      params.push('pos', ...options.pos);
    }

    if (options.ang) {
      params.push('ang', ...options.ang);
    }

    if (options.posepsilon) {
      params.push('posepsilon', options.posepsilon);
    }

    if (options.angepsilon) {
      params.push('angepsilon', options.angepsilon);
    }

    return new Tool('check', params)
  }


}
