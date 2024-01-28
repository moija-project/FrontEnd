import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { postDetailState } from "../../../store/postStore";

const dumyData = [
  "https://t1.daumcdn.net/cfile/tistory/24163538586FE4AF34",
  "https://kpopsingers.com/wp-content/uploads/2023/10/Eunseok-gallery-4-jpg.webp",
  "https://kpopsingers.com/wp-content/uploads/2023/10/Eunseok-gallery-2-jpg.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdsAqNfKx-6LQSueLo5_uw9slXouWWr4Pp5w&usqp=CAU",
];

export default function Carousel() {
  const postDetail = useRecoilValue(postDetailState);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {postDetail.pictures === null ? (
          <ImgWrapper>
            <ImgItem
              src={require("../../../assets/images/default-img-01.png")}
            />
          </ImgWrapper>
        ) : (
          postDetail.pictures.map((img, idx) => (
            <ImgWrapper key={idx}>
              <ImgItem src={`${img}`} />
            </ImgWrapper>
          ))
        )}
      </StyledSlider>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100%;
  height: 450px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
const StyledSlider = styled(Slider)``;

const ImgWrapper = styled.div`
  max-width: 100%;
  max-height: 450px;
`;
const ImgItem = styled.img`
  width: 100%;
  max-height: 450px;
  margin: auto;
  object-fit: cover;
`;
