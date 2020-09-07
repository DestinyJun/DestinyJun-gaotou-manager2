export class NavList {
  constructor(
    public title: string,
    public routers: string,
    public icon: string,
    public clsstate: boolean,
    public children: NavListChild[],
    public open: boolean
  ) {}
}
export class NavListChild {
  constructor(
    public title: string,
    public setState: boolean,
    public routers: string,
    public icon: string,
  ) {}
}
