// Helpers.
const 초 = 1000;
const 분 = 초 * 60;
const 시간 = 분 * 60;
const 일 = 시간 * 24;
const 주 = 일 * 7;
const 개월 = 30 * 일;
const 년 = 일 * 365.25;

type Unit = '주년' | '년' | '개월' | '주일' | '주' | '일' | '시간' | '분' | '초' | 'ms';

export type StringValue = `${number}` | `${number}${Unit}` | `${number} ${Unit}`;

function msFn(value: StringValue): number;
function msFn(value: number): string;
function msFn(value: StringValue | number): number | string {
  try {
    if (typeof value === 'string' && value.length > 0) {
      return parse(value);
    } else if (typeof value === 'number' && isFinite(value)) {
      return format(value);
    }
    throw new Error('value 타입이 String 또는 Number가 아닙니다.');
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : '알 수 없는 에러가 발생했습니다.';
    throw new Error(message);
  }
}

function parse(value: string): number {
  const MAXIMUM_STRING_LENGTH = 100;
  if (value.length > MAXIMUM_STRING_LENGTH) {
    throw new Error(`${MAXIMUM_STRING_LENGTH} 글자 이상은 입력할 수 없습니다.`);
  }

  const groups = group(value);
  if (groups == null) {
    return Number.NaN;
  }
  const numValue = parseFloat(groups.value);
  const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>; // ms는 영어이므로 toLowerCase 사용

  return calculate(numValue, type);
}

// RegExp.groups는 ES2018부터 지원하므로 따로 구현
function group(value: string) {
  const regex = /^(-?(?:\d+)?\.?\d+) *(주년?|년|개월|주일?|주|일|시간|분|초|ms)?$/i;
  const match = regex.exec(value);

  return match != null ? { value: match[1] ?? '', type: match[2] } : undefined;
}

function calculate(numValue: number, type: Unit) {
  switch (type) {
    case '주년':
    case '년':
      return numValue * 년;
    case '개월':
      return numValue * 개월;
    case '주일':
    case '주':
      return numValue * 주;
    case '일':
      return numValue * 일;
    case '시간':
      return numValue * 시간;
    case '분':
      return numValue * 분;
    case '초':
      return numValue * 초;
    case 'ms':
      return numValue;
  }
}

export const ms = msFn;

function format(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= 일) {
    return `${Math.round(ms / 일)}일`;
  }
  if (msAbs >= 시간) {
    return `${Math.round(ms / 시간)}시간`;
  }
  if (msAbs >= 분) {
    return `${Math.round(ms / 분)}분`;
  }
  if (msAbs >= 초) {
    return `${Math.round(ms / 초)}초`;
  }
  return `${ms / 초}초`;
}

function isError(value: unknown): value is Error {
  return typeof value === 'object' && value !== null && 'message' in value;
}
