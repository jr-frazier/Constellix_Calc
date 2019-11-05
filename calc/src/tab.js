import React from 'react';

class Tab extends React.Component {
    render() {
        let textValue = null;

        if (this.props.id === 1) {
            textValue = "Monthly";
        } else if (this.props.id === 2) {
            textValue = "DNS";
        } else {
            textValue = "Sonar";
        }
        return (
            <button 
                id={this.props.id}
                className={this.props.className}
                onClick={() => this.props.onClick()}
            >
            {textValue}
            </button>)
                
        
    }
}

export default Tab; 