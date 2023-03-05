import styled, { css, keyframes } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  border: 2px solid red;
`
export const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 2px solid yellow;
  max-width: ${({ maxWidth }: any) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }: any) => maxHeight && `${maxHeight}px`};
`
export const Video = styled.video`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`
export const Overlay = styled.div`
  position: absolute;
  top: 100px;
  right: 20px;
  bottom: 100px;
  left: 20px;
  box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.6);
  border: 3px solid green;
  border-radius: 10px;
`

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background-color: #ffffff;

  ${({ flash }: any) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `
    }
  }}
`
