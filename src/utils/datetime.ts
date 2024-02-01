export const changeDateExprssion = (str: string) => {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${year}년 ${month}월 ${day}일`;
};

// 30시간 지났는지 여부
export const hasPassed = (dateTimeString: string): boolean => {
  const givenDate = new Date(dateTimeString);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - givenDate.getTime();

  const hoursPassed = timeDifference / (1000 * 60 * 60);
  return hoursPassed >= 30;
};
