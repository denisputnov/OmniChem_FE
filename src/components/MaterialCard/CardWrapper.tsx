import React from 'react'
import styled, { css } from 'styled-components';
import { CardWrapperStyle } from '../../types/componentsTypes';

interface CardWrapperProps {
  children: React.ReactNode;
  loadingStyleType: CardWrapperStyle;
}

const CardWrapper: React.FC<CardWrapperProps> = ({loadingStyleType, children}) => {
  return (
    <StyledCardWrapper $loadingStyleType={loadingStyleType}>{children}</StyledCardWrapper>
  )
}

const StyledCardWrapper = styled.div<{
  $loadingStyleType: CardWrapperStyle;
}>`
  ${({ $loadingStyleType }) => {
    switch ($loadingStyleType) {
      case CardWrapperStyle.LOADING:
        return css`
          width: 348px;
          height: 446px;
          
          z-index: 100;
          color: transparent;
          background: linear-gradient(100deg, #eceff1 30%, #f6f7f8 50%, #eceff1 70%);
          background-size: 400%;
          animation: loading 1.2s ease-in-out infinite;
          border-radius: 5px;

          @media (min-width: 320px) and (max-width: 768px) {
    max-width: 310px;
   }

          @keyframes loading {
            0% {
               background-position: 100% 50%;
            }
            100% {
                background-position: 0 50%;
            }
          }
        `;
      case CardWrapperStyle.LOADED:
        return css`
          box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          overflow: hidden;

          &:hover > div {
            background-color: rgb(244, 244, 244);
            transition: 1s;
          }

          &:not(:hover) > div {
             background-color: rgb(255, 255, 255);
            transition: 1s;
          }
        `;
    }
  }}
`;

export default CardWrapper