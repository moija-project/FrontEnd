import React, { useCallback, useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import { postSignup } from "../../api/service-api/userApi";
import { useNavigate } from "react-router-dom";

// 유효성
const idRegEx = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,15}$/;
const phoneNumRegEx = /^[0-9\b -]{0,13}$/;

export default function SignupScreen() {
  const navigate = useNavigate();

  // 아이디, 비밀번호, 전화번호, 인증번호 , 이메일, 닉네임, 생년월일, 성별
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [phoneNum, setPhoneNum] = useState(""); // 000-0000-0000 형식으로 바꾸기
  const [veriCode, setVeriCode] = useState<Number>();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState<string>(); // 이거 자체로 검사
  const [gender, setGender] = useState<number>(); // 이거 자체로 검사

  // 오류 메시지
  const [idMsg, setIdMsg] = useState<string>("");
  const [pwMsg, setPwMsg] = useState<string>("");
  const [pwConfirmMsg, setPwConfirmMsg] = useState<string>("");
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [emailMsg, setEmailMsg] = useState<string>("");
  const [codeConfirmMsg, setCodeConfirmMsg] = useState<string>("");

  // 유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isPw, setIsPw] = useState<boolean>(false);
  const [isPwConfirm, setIsPwConfirm] = useState<boolean>(false);
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isCodeConfirm, setIsCodeConfirm] = useState<boolean>(false);
  // const [isGender, setIsGender] = useState<boolean>(false);

  // 아이디
  const handleId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idCurreent = e.target.value;
    setId(idCurreent);
    if (!idRegEx.test(idCurreent)) {
      setIdMsg(
        "6글자 15글자 이하로 입력해주세요! (특수 문자, 띄어쓰기 불가능)"
      );
      setIsId(false);
    } else {
      setIdMsg("올바른 아이디 형식이에요");
      setIsId(true);
    }
  }, []);

  // 비밀번호
  const handlePw = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    setPw(passwordCurrent);

    if (!passwordRegEx.test(passwordCurrent)) {
      setPwMsg(
        "숫자+영문자+특수문자 조합으로 10자리 이상 15자리 이하로 입력해주세요!"
      );
      setIsPw(false);
    } else {
      setPwMsg("안전한 비밀번호에요");
      setIsPw(true);
    }
  }, []);

  // 비밀번호 확인
  const handlePwConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPwConfirm(passwordConfirmCurrent);
    },
    [pw]
  );

  // 휴대폰 번호
  const handlePhoneNum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (phoneNumRegEx.test(e.target.value)) {
        setPhoneNum(e.target.value);
      }
    },
    []
  );

  // 이메일
  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegEx.test(emailCurrent)) {
      setEmailMsg("이메일 형식이 틀렸어요. 다시 확인해주세요!");
      setIsEmail(false);
    } else {
      setEmailMsg("올바른 이메일 형식이에요");
      setIsEmail(true);
    }
  }, []);

  // 닉네임
  const handleNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nickCurrent = e.target.value;
      setNickname(nickCurrent);

      if (nickCurrent.length > 0 && nickCurrent.length <= 13) {
        setNicknameMsg("올바른 닉네임 형식이에요");
        setIsNickname(true);
      } else {
        setNicknameMsg("1글자 이상 13글자 이하로 입력해주세요!");
        setIsNickname(false);
      }
    },
    []
  );

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      isId &&
      isPw &&
      isPwConfirm &&
      isEmail &&
      isNickname &&
      birth !== undefined &&
      gender !== undefined &&
      name !== undefined &&
      name.length > 0
    ) {
      if (!window.confirm("회원가입 하시겠습니까?")) return;
      const res = await postSignup({
        user_id: id,
        password: pw,
        name,
        nickname,
        gender: gender,
        birth,
        phone_number: phoneNum,
        email,
      });
      if (res?.data.isSuccess) {
        navigate("/completeSignup");
      } else {
        window.alert("회원가입에 실패했습니다. 다시 시도해주세요!");
      }
    }
  };

  // 비밀번호 확인
  useEffect(() => {
    if (!pw && !pwConfirm) setPwConfirmMsg("");
    else if (pwConfirm && pw === pwConfirm) {
      setPwConfirmMsg("비밀번호와 일치해요!");
      setIsPwConfirm(true);
    } else {
      setPwConfirmMsg("비밀번호가 틀려요. 다시 확인해주세요!");
      setIsPwConfirm(false);
    }
  }, [pwConfirm, pw]);

  // 핸드폰 번호
  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneNum]);

  return (
    <CommonContainer>
      <Title>회원가입</Title>
      <Container>
        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox
              placeholder="이름"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          {/* <InputMsgText isWarning={!isId}>{idMsg}</InputMsgText> */}
        </InputContainer>

        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox placeholder="아이디" type="text" onChange={handleId} />
            {/* <InputButton>중복 확인</InputButton> */}
          </InputWrapper>
          <InputMsgText isWarning={!isId}>{idMsg}</InputMsgText>
        </InputContainer>

        <InputContainer>
          <InputBox
            placeholder="비밀번호"
            type="password"
            onChange={handlePw}
          />
          <InputMsgText isWarning={!isPw}>{pwMsg}</InputMsgText>
        </InputContainer>
        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox
              placeholder="비밀번호 확인"
              type="password"
              onChange={handlePwConfirm}
            />
          </InputWrapper>
          <InputMsgText isWarning={!isPwConfirm}>{pwConfirmMsg}</InputMsgText>
        </InputContainer>

        <InputContainer>
          <InputWrapper>
            <InputBox
              placeholder="휴대폰 번호"
              type="text"
              onChange={handlePhoneNum}
              value={phoneNum}
            />
            {/* <InputButton>인증번호 전송</InputButton> */}
          </InputWrapper>
        </InputContainer>
        {/* <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox placeholder="인증번호" type="text" />
            <InputButton>인증번호 확인</InputButton>
          </InputWrapper>
          <InputMsgText isWarning>인증번호가 다릅니다</InputMsgText>
        </InputContainer> */}

        <InputContainer>
          <InputWrapper>
            <InputBox
              placeholder="이메일"
              type="email"
              onChange={handleEmail}
            />
          </InputWrapper>
          <InputMsgText isWarning={!isEmail}>{emailMsg}</InputMsgText>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <InputBox
              placeholder="닉네임"
              type="text"
              onChange={handleNickname}
            />
            {/* <InputButton>중복 확인</InputButton> */}
          </InputWrapper>
          <InputMsgText isWarning={!isNickname}>{nicknameMsg}</InputMsgText>
        </InputContainer>
        <InputContainer style={{ marginTop: "1.2rem" }}>
          <InputWrapper>
            <InstructionTitle>생년월일</InstructionTitle>
            <InputBox type="date" onChange={(e) => setBirth(e.target.value)} />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <InstructionTitle>성별</InstructionTitle>
            <GenderWrapper>
              <GenderCheckboxWrapper>
                <InputBox
                  onClick={() => setGender(1)}
                  // onClick={(e) => handleGender(e.currentTarget.id)}
                  type="checkbox"
                  id="female"
                  style={{ display: "none" }}
                />
                <Label isChecked={gender === 1} htmlFor="female">
                  여성
                </Label>
              </GenderCheckboxWrapper>
              <GenderCheckboxWrapper>
                <InputBox
                  onClick={() => setGender(0)}
                  // onClick={(e) => handleGender(e.currentTarget.id)}
                  type="checkbox"
                  id="male"
                  style={{ display: "none" }}
                />
                <Label isChecked={gender === 0} htmlFor="male">
                  남성
                </Label>
              </GenderCheckboxWrapper>
            </GenderWrapper>
          </InputWrapper>
        </InputContainer>
        <SubmitButton
          type="submit"
          isActive={
            isId &&
            isPw &&
            isPwConfirm &&
            isEmail &&
            isNickname &&
            birth !== undefined &&
            gender !== undefined &&
            name !== undefined &&
            name.length > 0
          }
          onClick={handleSubmit}
        >
          회원가입
        </SubmitButton>
      </Container>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
const InputButton = styled.button`
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  background-color: var(--light-gray03);
  white-space: nowrap;
`;
const InputBox = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--purple);
  padding: 0.5rem;
`;
const InputMsgText = styled.span<{ isWarning: boolean }>`
  color: ${({ isWarning }) => (isWarning ? "var(--red)" : "var(--purple)")};
  font-size: 0.7rem;
`;
const InstructionTitle = styled.span`
  font-size: 1rem;
  white-space: nowrap;
`;
const Label = styled.label<{ isChecked: boolean }>`
  color: white;
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "var(--gray01)"};
  border-radius: 4px;
  padding: 0.5rem 1rem;
`;
const GenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;
const GenderCheckboxWrapper = styled.div``;

const SubmitButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  border-radius: 4px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--purple)" : "var(--light-gray03)"};
  color: white;
  ${({ isActive }) => !isActive && "pointer-events: none;"}
  ${({ isActive }) => !isActive && "cursor: not-allowed;"}
  display: flex;
  justify-content: center;
  padding: 0.8rem;
  margin: 4rem 0;
`;
