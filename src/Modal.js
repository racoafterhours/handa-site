import React from "react";

class Modal extends React.Component {
    render () {
        return (
            <div id="modal-container">
                <div id="modal-background" onClick={this.props.onClick} />
                <div id="modal-main">
                    <button id="modal-close" onClick={this.props.onClick}>&times;</button>
                    <h1>
                        <img src="logo.png" alt="HANDA Logo" />
                        <span>HANDA</span>
                    </h1>
                    <p>
                        An NSTP-CWTS project by:
                        <ul>
                            <li>AÑIS, John Mclien</li>
                            <li>DE CASTRO, Lance Christian</li>
                            <li>DIAZ, Ralph Bryllemond</li>
                            <li>ENRIQUEZ, Justin Gabriel</li>
                            <li>PEREZ, Paul Jaren</li>
                            <li>RAMOS, Enrico Rafael</li>
                            <li>SANCEDA, Ieiaiel</li>
                            <li>VALENZUELA, AJ Karl</li>
                        </ul>
                    </p>
                    <p>
                        For inquiries, please contact us at <a href="mailto:teamhandaupcwts@gmail.com">teamhandaupcwts@gmail.com</a>.
                    </p>
                </div>
            </div>
        );
    }
}

export default Modal;