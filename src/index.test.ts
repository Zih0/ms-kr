import { ms } from '.';

describe('한글로 적힌 시간을 ms로 변환한다.', () => {
  describe('년 단위를 ms로 변환한다.', () => {
    test.each`
      given      | then
      ${'1주년'} | ${31557600000}
      ${'1년'}   | ${31557600000}
    `(`$given`, ({ given, then }) => {
      expect(ms(given)).toBe(then);
    });
  });

  test('개월 단위를 ms로 변환한다.', () => {
    expect(ms('3개월')).toBe(7776000000);
  });

  describe('주 단위를 ms로 변환한다.', () => {
    test.each`
      given      | then
      ${'2주'}   | ${1209600000}
      ${'2주일'} | ${1209600000}
    `(`$given`, ({ given, then }) => {
      expect(ms(given)).toBe(then);
    });
  });

  test('주 단위를 ms로 변환한다.', () => {
    expect(ms('2주일')).toBe(1209600000);
    expect(ms('2주')).toBe(1209600000);
  });

  test('일 단위를 ms로 변환한다.', () => {
    expect(ms('3일')).toBe(259200000);
  });

  test('시간 단위를 ms로 변환한다.', () => {
    expect(ms('5시간')).toBe(18000000);
  });

  test('분 단위를 ms로 변환한다.', () => {
    expect(ms('10분')).toBe(600000);
  });

  test('초 단위를 ms로 변환한다.', () => {
    expect(ms('30초')).toBe(30000);
  });

  test('ms는 그대로 ms를 변환한다.', () => {
    expect(ms('100ms')).toBe(100);
  });

  test('숫자만 있는 경우 ms로 변환한다.', () => {
    expect(ms('100')).toBe(100);
  });

  test('소수점이 있는 경우 ms로 변환한다.', () => {
    expect(ms('1.5시간')).toBe(5400000);
  });
});

describe('ms로 적힌 숫자를 한글 시간으로 변환한다.', () => {
  test('년 단위를 한글로 변환한다.', () => {
    expect(ms(31557600000)).toBe('365일');
  });

  test('개월 단위를 한글로 변환한다.', () => {
    expect(ms(7776000000)).toBe('90일');
  });

  test('주 단위를 한글로 변환한다.', () => {
    expect(ms(1209600000)).toBe('14일');
  });

  test('일 단위를 한글로 변환한다.', () => {
    expect(ms(259200000)).toBe('3일');
  });

  test('시간 단위를 한글로 변환한다.', () => {
    expect(ms(18000000)).toBe('5시간');
  });

  test('분 단위를 한글로 변환한다.', () => {
    expect(ms(600000)).toBe('10분');
  });

  test('초 단위를 한글로 변환한다.', () => {
    expect(ms(30000)).toBe('30초');
  });

  test('ms는 그대로 ms를 변환한다.', () => {
    expect(ms(100)).toBe('0.1초');
  });
});
