import styled, { css, keyframes } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
`
export const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
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
  border-radius: 10px;
`
export const OverlayTopLeftCorner = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  border-top-left-radius: 20px;
  border-top: 15px solid #34c759;
  border-left: 15px solid #34c759;
  width: 30px;
  height: 30px;
`
export const OverlayTopRightCorner = styled.div`
  position: absolute;
  border-top-right-radius: 20px;
  border-top: 15px solid #34c759;
  border-right: 15px solid #34c759;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
`
export const OverlayBottomLeftCorner = styled.div`
  border-bottom: 15px solid #34c759;
  border-left: 15px solid #34c759;
  border-bottom-left-radius: 20px;
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
`
export const OverlayBottomRightCorner = styled.div`
  position: absolute;
  border-bottom: 15px solid #34c759;
  border-right: 15px solid #34c759;
  border-bottom-right-radius: 20px;
  bottom: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
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
export const CancelBtn = styled.div`
  border-radius: 50%;
  height: 54px;
  width: 54px;
  background-color: white;
  color: red;
  text-align: center;
  padding: 16px;
  font-weight: 900;
`
export const Footer = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
`
export const LoaderOverlay = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`
