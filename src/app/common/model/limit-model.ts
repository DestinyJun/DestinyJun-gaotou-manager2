export class Limit {
  data?: LimitData;
  children?: Limit[];
  parent?: Limit;
  expanded?: boolean;
  id?: any;
}
export class LimitData {
  permissionId: any;
  permissionName: any;
  level: any;
  idt: any;
  parentId?: any;
  systemId?: any;
  operateCode?: any;
  parentName?: any;
  enabled?: any;

}
export class AddLimit {
  permissionId: any;
  systemId: any;
  operateCode: any;
  enabled: any;
  permissionName: any;
}
