import { faCrown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

type MemberItemProps = {
  isLeader?: boolean;
  isMe?: boolean;
};

export default function MemberItem({
  isLeader = false,
  isMe = false,
}: MemberItemProps) {
  const moveToAssessment = () => {
    if (isMe) return;
    console.log("moveToAssessment");
  };
  return (
    <Container>
      <RoleIcon>
        {isLeader ? (
          <FontAwesomeIcon icon={faCrown} color="#FFF59F" size="lg" />
        ) : (
          <FontAwesomeIcon icon={faUser} color="#CEA1E7" size="lg" />
        )}
      </RoleIcon>
      <Nickname onClick={() => moveToAssessment()}>
        닉네임이름닉네임이름닉네임이름닉네임이름닉네임이름닉네임이름
      </Nickname>
      {!isMe && <DeleteButton>강퇴</DeleteButton>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const RoleIcon = styled.div`
  width: 25px;
  margin-right: 0.75rem;
`;
const Nickname = styled.span`
  cursor: pointer;
  margin: 3px 0;
  max-width: 80%;
  font-size: 1.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DeleteButton = styled.button`
  margin-left: auto;
  color: var(--red);
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-position: under;
`;
