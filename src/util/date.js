// 날짜 초기값 생성
export const getStringDate = (date) => {
  // toISOString : ISO형식의 문자열을 반환하는 메소드
  return date.toISOString().slice(0, 10);
};
