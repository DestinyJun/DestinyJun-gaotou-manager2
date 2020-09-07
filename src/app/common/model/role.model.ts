export class Role {
  data?: RoleData;
  children?: Role[];
  parent?: Role;
  expanded?: boolean;
  id?: any;
}
export class RoleData {
  deptName: any;
  systemName: any;
  name?: any;
  roleName: any;
  permissionName: any;
  permissionId: any;
  level: any;
  idt: any;
  parentId?: any;
  operateCode?: any;
  companyDeptRoleId?: any;
  parentName?: any;
  companyName?: any;
  enabled?: any;
}

export class AddRole {
  roleName?: any;
  companyDeptId?: any;
  description?: any;
  permissionIds?: any;
  enabled?: any;
  name?: any;
}
