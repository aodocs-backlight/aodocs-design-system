export class CopyToClipboardEvent extends Event {
  public message: string;

  constructor(message: string) {
    super('textCopied');
    this.message = message;
  }
}