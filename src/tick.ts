import type { Buttons } from './button';
import { Button } from './button';
import type { Tool } from './tool';

export class Tick {
  private movement?: [number, number];
  private angle?: [number, number];
  private readonly buttons: Array<Button> = [];
  private readonly commands: Array<string> = [];
  private readonly tools: Array<Tool> = [];
  constructor(public readonly tick: number, public readonly relative: boolean = false) {}

  public setMovementAnalog(x: number, z: number) {
    this.movement = [x, z];
    return this;
  }

  public setAngleAnalog(yaw: number, pitch: number) {
    this.angle = [yaw, pitch];
    return this;
  }

  public addButton(action: Buttons | `${Buttons}`, ticks?: number) {
    this.buttons.push(new Button(action, ticks));
    return this;
  }

  public addCommand(command: string) { 
    this.commands.push(command); 
    return this;
  }

  public addTool(tool: Tool) {
    this.tools.push(tool);
  }

  public toString() {
    let s = '';

    if (this.relative) {
      s += '+';
    }

    s += this.tick;
    s += '>';
        
    if (this.movement) {
      s += `${this.movement[0]} ${this.movement[1]}`;
    }

    s += '|';

    if (this.angle) {
      s += `${this.angle[0]} ${this.angle[1]}`;
    }

    s += '|';
    s += this.buttons.map(x=>x.toString()).join('');
    s += '|';
    s += this.commands.join('; ');
    s += '|';
    s += this.tools.map(x=>x.toString()).join('; ');
    s += ';';

    return s;
  }
}