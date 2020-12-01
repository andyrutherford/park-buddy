import React from 'react';
import styled from 'styled-components';

const ImageCardWrapper = styled.div`
  position: relative;
  transition: transform 150ms ease-in-out;
  height: 100%;
  width: 100%;
  font-size: 0.75em;

  :hover .info {
    opacity: 1;
    transform: translateY(-20%);
  }

  :hover .bookmark {
    opacity: 1;
  }

  .info {
    opacity: 0;
    position: absolute;
    top: -1.5em;
    left: 0;
    transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
    z-index: -1;
  }
  .bookmark {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 150ms ease-in-out;
  }
  img {
    object-fit: cover;
    height: 400px;
    width: 100%;
    max-width: ${(props) => props.theme.breakpoints.lg};
    -webkit-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
  }
`;

type Props = {
  img: string;
  desc: string;
};

const ImageCard: React.FC<Props> = ({ img, desc }) => {
  return (
    <ImageCardWrapper>
      <div className='info'>
        <p className='name'>{desc}</p>
      </div>
      <img src={img} alt={desc} />
    </ImageCardWrapper>
  );
};

export default ImageCard;
