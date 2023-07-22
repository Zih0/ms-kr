# ms-kr

[`vercel/ms`](https://github.com/vercel/ms) 를 한글 친화적으로 변경한 라이브러리입니다.

## Install

```sh
npm install ms-kr
```

## Examples

<!-- prettier-ignore -->
```js
ms('2일')  // 172800000
ms('1일')      // 86400000
ms('10시간')     // 36000000
ms('2.5시간') // 9000000
ms('2시간')      // 7200000
ms('1분')      // 60000
ms('5초')      // 5000
ms('1년')      // 31557600000
ms('100')     // 100
ms('-3일') // -259200000
ms('-1시간')     // -3600000
ms('-200')    // -200
```

### ms를 한글로 변환

<!-- prettier-ignore -->
```js
ms(60000)             // "1분"
ms(2 * 60000)         // "2분"
ms(-3 * 60000)        // "-3분"
ms(ms('10시간'))    // "10시간"
```
