import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const dumyData = [
  "https://phinf.wevpstatic.net/MjAyNDAxMDVfMTA4/MDAxNzA0NDYzOTkzNTQw.05sPEM3384LXhHFPkFDTVv9wUU5PVXD8dGNZV5WGuw4g.PuaWVrZxBYxz8fHxC-RyedOi7sd8VdKPPSGAFdz57H0g.JPEG/04a067c5-af59-464d-bae9-fa3dd2b94027.jpeg?type=w670",
  "https://kpopsingers.com/wp-content/uploads/2023/10/Eunseok-gallery-4-jpg.webp",
  "https://kpopsingers.com/wp-content/uploads/2023/10/Eunseok-gallery-2-jpg.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdsAqNfKx-6LQSueLo5_uw9slXouWWr4Pp5w&usqp=CAU",
];

export default function Carousel() {
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
        {dumyData.map((img, idx) => (
          <ImgWrapper key={idx}>
            <ImgItem src={`${img}`} />
          </ImgWrapper>
        ))}
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
