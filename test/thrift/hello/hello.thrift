namespace java hello.test

enum TGender {
  MALE = 1, //男
  FEMALE = 2, //女
  UNKNOWN = 3 //未知
}

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
  1:  TGender gender,
  2:  THelloType helloMsg,
}

struct TSayHelloResponse {
  1:  bool success,
  2:  Error error,
  3:  THelloMessage data
}

struct TSayHelloRequest {
  1:  string name,
}

service TSayHelloService {
  TSayHelloResponse sayHello(1: TSayHelloRequest arg0)
}
