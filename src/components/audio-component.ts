export class AudioComponent {
  readonly element: HTMLAudioElement;

  constructor(audioFile: string) {
    this.element = new Audio(audioFile);
  }
}
