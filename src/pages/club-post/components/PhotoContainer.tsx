import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postPhotoState, writePostState } from "../../../store/postStore";

export default function PhotoContainer() {
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [postImg, setPostImg] = useRecoilState(postPhotoState);
  const [previewImg, setPreviewImg] = useState<any[]>([]);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setPostImg([...postImg, e.target.files[0]]);
    }
    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      if (previewImgUrl) {
        setPreviewImg([...previewImg, previewImgUrl]);
      }
    };
  };
  const onRemoveImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number
  ) => {
    e.preventDefault();
    const postImgArr = postImg.filter((v, i) => i !== idx);
    const previewImgArr = previewImg.filter((v, i) => i !== idx);
    setPostImg([...postImgArr]);
    setPreviewImg([...previewImgArr]);
  };

  return (
    <PhotoWrapper>
      <PhotoTitleWrapper>
        <PhotoTitle>사진</PhotoTitle>
        <PhotoInstruction>(최대 5장)</PhotoInstruction>
      </PhotoTitleWrapper>
      <PhotosContainer>
        <AddPhotoButton
          id="addImg"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => onUploadImage(e)}
        />
        <AddPhotoLabel htmlFor="addImg">
          <AddPhotoIcon
            src={require("../../../assets/images/icon-add-photo.png")}
          />
        </AddPhotoLabel>
        {previewImg &&
          previewImg.map((src, i) => (
            <ImgItemWrapper key={`photo-${i}`}>
              <ImgItemImage src={src} />
              <ImgRemoveButton onClick={(e) => onRemoveImage(e, i)}>
                <FontAwesomeIcon icon={faXmark} />
              </ImgRemoveButton>
            </ImgItemWrapper>
          ))}
      </PhotosContainer>
    </PhotoWrapper>
  );
}

const PhotoWrapper = styled.div`
  margin-top: 65px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PhotoTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const PhotoTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 6px;
`;
const PhotoInstruction = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
`;
const PhotosContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const AddPhotoButton = styled.input`
  display: none;
`;
const AddPhotoLabel = styled.label`
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin-right: 50px;
`;
const AddPhotoIcon = styled.img`
  width: 100%;
  height: 100%;
`;
const ImgItemWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  margin-right: 30px;
`;
const ImgItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
const ImgRemoveButton = styled.button`
  background-color: white;
  border: 1px solid var(--purple);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
  top: -8px;
  right: -8px;
`;
