const testObj = {
  "type": "struct",
  "value": "",
  "rule": "",
  "description": "",
  "realType": "TBdCrystalCardListResponse",
  "properties": {
    "success": {
      "type": "bool",
      "value": "",
      "rule": "",
      "description": "是否成功"
    },
    "code": {
      "type": "i32",
      "value": "",
      "rule": "",
      "description": "状态码"
    },
    "message": {
      "type": "string",
      "value": "",
      "rule": "",
      "description": "返回文案描述"
    },
    "crystalCardList": {
      "type": "list",
      "value": "",
      "rule": "",
      "description": "会员卡列表数据",
      "realType": "list<TBdCrystalCardList>",
      "items": {
        "memberCardId": {
          "type": "i64",
          "value": "",
          "rule": "",
          "description": "会员卡id"
        },
        "memberCardName": {
          "type": "string",
          "value": "",
          "rule": "",
          "description": "会员卡名称"
        },
        "memberCardCategoryName": {
          "type": "string",
          "value": "",
          "rule": "",
          "description": "卡种名称"
        }
      }
    }
  }
}

function transformStruct(obj) {
  switch (obj.type) {
    case 'string':
      return MockFuncs.string;
    case 'bool':
      return MockFuncs.bool;
    case 'i16':
      return MockFuncs.i16;
    case 'i32':
      return MockFuncs.i32;
    case 'i64':
      return MockFuncs.i64;
    case 'byte':
      return MockFuncs.byte;
    case 'double':
      return MockFuncs.double;
    case 'binary':
      return MockFuncs.binary;
    default:
      return '';
  }
}

const testResult = transformStruct(testObj);
console.log(testResult);