import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

type ModalProps = {
  setClose: (close: boolean) => void;
  open: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
};
// type ModalProps = {
//   setOpen: (open: boolean) => void;
//   modalOpen: boolean
//   child?: ReactNode;
// };

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '800px',
    maxWidth: '70%',
    minHeight: '380px',
    height: '450px',
    maxHeight: '600px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

export default function Modal({ setClose, children, open, style }: ModalProps) {
  const handleCloseModal = () => {
    setClose(true);
  };
  return (
    <ReactModal
      onRequestClose={handleCloseModal}
      style={Object.assign({ style }, customModalStyles)}
      //   style={customModalStyles}
      isOpen={open}
      shouldCloseOnOverlayClick
    >
      <Container>
        <FontAwesomeIcon onClick={handleCloseModal} icon={faX} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        {children}
      </Container>
    </ReactModal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.8rem 1rem;
`;
