import React from 'react';
import './App.scss';
import Map from './Map.js';
import Info from './Info.js';
import Modal from './Modal.js';

import logo from "./logo.png";

let names;
fetch("data.json").then(d => d.json()).then(j => {
    names = Object.fromEntries(Array.from(Object.entries(j), a => [a[0], a[1].name]));
});

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			hovered: null,
			selected: null,
			modal: false
		};
	}

	onHover (n) {
		this.setState({ hovered: n });
	}

	onClick (n) {
		this.setState({ selected: n, hovered: null });
		let sel = document.querySelector(".map-reg.selected");

		if (sel) sel.classList.remove("selected");
		document.querySelector(`#${n}`).classList.add("selected");
	}
	
	resetData () {
		this.setState({ selected: null, hovered: null });
		let sel = document.querySelector(".map-reg.selected");
		if (sel) sel.classList.remove("selected");
	}

	render () {
		let hovered = this.state.hovered;
		let selected = this.state.selected;

		return (
			<div id="container">
				{this.state.modal ? <Modal onClick={() => this.setState({ modal: false })} /> : null}
				<div id="content">
					<div id="topbar">
						<button id="topbar-logo" onClick={() => this.resetData()}>
							<img id="logo" src={logo} alt="HANDA Logo" />
							<span>HANDA</span>
						</button>
						<button id="about" onClick={() => this.setState({ modal: true })}>About</button>
					</div>
					
					<main>
						<div>
							{selected ? <Info reg={selected} /> :
								<div id="reg-hover-name">
										<h1 className={hovered || selected ? "" : "placeholder"}>
												{selected ? `${names[selected]}` : hovered ? `${names[hovered]}` : "Hover and click on one of the points in the map to learn about its disaster history, hazards, and contact information."}
										</h1>
								</div>
							}
						</div>

						<div>
							<Map onHover={n => {if (!selected) return this.onHover(n)}} onClick={n => {this.onClick(n)}} />
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default App;
