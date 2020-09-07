export class Area {
  data?: Data;
  children?: Area[];
  parent?: Area;
  expanded?: boolean;
  id?: any;
}
export class AddArea {
  areaCode?: any;
  level?: any;
  companyId?: any;
  areaName?: any;
}
export class ModifyArea {
  areaCode?: any;
  areaLevel?: any;
  companyId?: any;
  areaName?: any;
  companyPrvcId?: any;
  provinceId?: any;

}
export class ExpandedData {
  id?: any;
  type?: any;
}

export class AddTree {
  id?: number;
  areaName?: string;
  areaCode?: string;
  level?: string;
  enabled?: boolean;
  parentId?: number;
  children?: AddTree[];
  pids?: string;
  cityType?: string;
  idt?: string;
  status?: boolean;
  parent?: AddTree;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
}

export class Data {
  areaLevel?: any;
  companyLevel: any;
  companyId: any;
  companyName: any;
  level: any;
  idt: any;
  areaCode: any;
  areaName: any;
  companyPrvcId: any;
  provinceId?: any;

}

