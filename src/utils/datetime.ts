export const changeDateExprssion = (str: string) => {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${year}년 ${month}월 ${day}일`;
};
