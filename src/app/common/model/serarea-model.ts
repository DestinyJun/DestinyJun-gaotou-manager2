export class AddSerarea{
  areaCode?: any;
  operatorName?: any;
  founder?: any;
  fieldVaulesMap?: any;
}

export class ModifySerarea {
  areaCode?: any;
  serviceAreaName?: any;
  serviceAreaId?: any;
  founder?: any;
  fieldVaulesMap?: any;
}

export class FiledData {
  data: FieldDatas[] = [];
}
export class FieldDatas {
  title: any;
  fielddatas: any[] = [];
}
// 服务区字段添加
export class AddSerareaFiled {
  fieldTypeId?: any;
  status?: any;
  fieldName?: any;
}
// 服务区字段修改
export class ModifySerareaFiled {
  fieldId?: any;
  fieldTypeId?: any;
  status?: any;
  fieldName?: any;
}


// 服务区字段类型修改
export class ModifySerareaFiledType {
  fileTypeId?: any;
  fieldTypeName?: any;
}
