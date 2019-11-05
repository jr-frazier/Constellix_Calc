import React from "react";
import ReactModal from "react-modal";

class LocationsModal extends React.Component {
    render() {
    <div>
        <div>
            <button id={x} onClick={this.handleOpenModal}>
                Monitoring Locations
            </button>
        </div>
        <ReactModal
            key={x}
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
        >
            <p>Modal text!</p>
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <SonarLocations
                checkState={
                this.props.theState.checks[this.state.modal_id - 1]
                }
                check={this.props.theState.checks[x - 1]}
                changeListener={event => this.changeListener(event, this.state.modal_id)}
                />
            </ReactModal>
    </div>
    }
}