namespace java hello.test

enum THelloType {
  HI = 1,
  HELLO = 2,
  WELCOME = 3,
}

struct Error {
  1:  i64 code,
  2:  string message,
}

struct THelloMessage {
  1:  string msg,
  2:  THelloType helloMsg,
}

struct TSayHelloResponse {
  1:  bool success,
  2:  Error error,
  3:  THelloMessage data
}

struct TSayHelloRequest {
  1:  string name,
  2:  list<string> friends,
}

// Its a COMMENT LINE, do nothing.

/* 123123123
kdkdisiskksi
aaa
*/

service TSayHelloService {
  string testRequest(1:i32 celebrityId, 2:i32 cityId, 3:map<string, string> otherParams),
  TSayHelloResponse sayHello(1: TSayHelloRequest arg0),
  map<string, set<i32>> testMap(1:string startDate, 2:string endDate, 3:i32 offset, 4:i32 limit),
}
