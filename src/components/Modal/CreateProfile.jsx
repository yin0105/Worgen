import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CreateProfile() {

    // const [state, setState] = React.useState({
    //     showHide: false,
    // });

    const handleModalShowHide = () => {
        // setState({ showHide: !state.showHide })
    }

    return(
        <div>
            <Button variant="primary" onClick={() => handleModalShowHide()}>
                Launch demo modal
            </Button>

            {/* <Modal show={state.showHide}>
                <Modal.Header closeButton onClick={() => handleModalShowHide()}>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModalShowHide()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleModalShowHide()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> */}

        </div>
    )
    
    
}

