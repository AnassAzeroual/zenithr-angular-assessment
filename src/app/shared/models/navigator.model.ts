export class NavigatorData {
  constructor(
    public page: string,
    public path: string,
    public required: boolean,
    public current: boolean,
    public valid: boolean,
  ) {}
}