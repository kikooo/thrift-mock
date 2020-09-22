const { MockFuncs } = require('egg-thrift-mock');

const testObj = {
  type: 'struct',
  value: '',
  rule: '',
  description: '',
  realType: 'TBdCrystalCardListResponse',
  properties: {
    success: {
      type: 'bool',
      value: '',
      rule: '',
      description: '是否成功'
    },
    code: {
      type: 'i32',
      value: '',
      rule: '',
      description: '状态码'
    },
    enumi: {
      type: 'enum',
      value: '',
      rule: {
        HI: 1,
        HELLO: 2,
        WELCOME: 3
      },
      description: '枚举示例'
    },
    message: {
      type: 'string',
      value: '',
      rule: '',
      description: '返回文案描述'
    },
    crystalCardList: {
      type: 'list',
      value: '',
      rule: '',
      description: '卡列表数据',
      realType: 'list<TBdCrystalCardList>',
      items: {
        cardId: {
          type: 'i64',
          value: '',
          rule: '',
          description: '会员卡id'
        },
        cardName: {
          type: 'string',
          value: '',
          rule: '',
          description: '会员卡名称'
        },
        cardCategoryName: {
          type: 'string',
          value: '',
          rule: '',
          description: '卡种名称'
        }
      }
    }
  }
};

function mockByResponse(nodes) {
  // 最终生成mock数据的response函数
  const res = {};
  const list = [];
  const listLen = MockFuncs.ramdomNum(3, 10);
  const enums = nodes.rule ? Object.values(nodes.rule) : [];
  switch (nodes.type) {
    // 基本类型
    case 'string':
      return MockFuncs.string();
    case 'boolean':
      return MockFuncs.bool();
    case 'byte':
      return MockFuncs.byte();
    case 'short':
      return MockFuncs.i16();
    case 'i16':
      return MockFuncs.i16();
    case 'integer':
      return MockFuncs.i32();
    case 'i32':
      return MockFuncs.i32();
    case 'long':
      return MockFuncs.i64();
    case 'i64':
      return MockFuncs.i64();
    case 'double':
      return MockFuncs.double();
    case 'void':
      return MockFuncs.mvoid();
    case 'binary':
      return MockFuncs.mvoid();
    // struct和enum
    case 'struct':
      Object.keys(nodes.properties).forEach(key => {
        const item = nodes.properties[key];
        res[key] = mockByResponse(item);
      });
      return res;
    case 'enum':
      return enums[Math.floor(Math.random() * enums.length)];
    // 容器类型
    case 'list':
      for (let i = 0; i < listLen; i++) {
        list.push(mockByResponse({
          type: 'struct',
          rule: '',
          value: '',
          description: '',
          properties: nodes.items,
        }));
      }
      return list;
    case 'set':
      for (let i = 0; i < listLen; i++) {
        list.push(mockByResponse({
          type: 'struct',
          rule: '',
          value: '',
          description: '',
          properties: nodes.items,
        }));
      }
      return new Set(list);
    case 'map':
      return { [mockByResponse(nodes.properties[0])]: mockByResponse(nodes.properties[1]) };
    default:
      return '';
  }
}

console.log(mockByResponse(testObj));
