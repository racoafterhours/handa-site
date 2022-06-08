import React from "react";
import dayjs from "dayjs";

const risk = ["low risk", "medium risk", "high risk"];
const icons = {
    "flooding": "house-flood-water",
    "fire": "house-fire",
    "ground shaking": "house-crack"
};

/**
 * 
 * @param {string} regid The region ID for the region whose data is to be fetched
 * @returns A Promise containing the data for the region
 */
async function fetchData (regid) {
	return fetch("data.json").then(n => n.json()).then(n => n[regid]);
}

/**
 * Formats a date to a human-readable string from an ISO date string.
 * @param {string} date A date as an ISO date string
 * @returns The date formatted as `D MM YYYY` (if a day is specified) or `MM YYYY` (if there is no day specified)
 */
function formatDate (date) {
    return ([...date.matchAll(/-/g)].length === 2) ? dayjs(date).format("D MMMM YYYY") : dayjs(date).format("MMMM YYYY");
}

/** Generates the contents of the History panel.
 * @param {object} reg The region entry from `data.json`
 * @returns The corresponding HTML output for `reg.history`
*/
function generateHistory (reg) {
    return reg.history.map(e => {
        let [dateFrom, dateTo] = [e["date-from"], e["date-to"]];

        let details = "details" in e ? e.details.map(f => <li>{f}</li>) : null;

        return (
            <div className="entry">
                <h2>{e.name}</h2>
                <h3>{dateFrom === dateTo ? formatDate(dateFrom) : formatDate(dateFrom) + " \u2013 " + formatDate(dateTo)}</h3>
                {details ? <ul className="details">{details}</ul> : null}
            </div>
        );
    });
}

/** Generates the contents of the Hazards panel.
 * @param {object} reg The region entry from `data.json`
 * @returns The corresponding HTML output for `reg.hazards`
*/
function generateHazards (reg) {
    let out = [];

    for (let hazard in reg.hazards) {
        let val = reg.hazards[hazard];
        out.push(
            <div className="hazard">
                <span className={`icon-wrapper risk-${Array.isArray(val) ? val[0] : val}`}>
                    <i className={`fa-solid fa-4x fa-${icons[hazard]}`} />
                </span>
                <p>
                    <b className={`risk-${Array.isArray(val) ? val[0] : val}`}>{risk[(Array.isArray(val) ? val[0] : val) - 1]}</b> of {hazard}
                    {Array.isArray(val) ? <span className="hazard-sub"><br/>({val[1]})</span> : ""}
                </p>
            </div>
        );
    }

    return (
        <div id="hazard-wrapper">
            {out}
        </div>
    );
}

/** Generates the contents of the Recommendations panel.
 * @param {object} reg The region entry from `data.json`
 * @returns The corresponding HTML output for `reg.recommendations`
*/
function generateRecommendations (reg) {
    let recommendations = reg.recommendations;

    let lists = [];
    
    if (recommendations.description !== "") lists.push(<p className="description">{recommendations.description}</p>);

    for (let recommendation in recommendations) {
        if (recommendation !== "description" && recommendations[recommendation].length > 0) {
            lists.push(
                <div className="recommendation">
                    <h2><i className={`fa-solid fa-${icons[recommendation]}`} />{recommendation}</h2>
                    <ul>{recommendations[recommendation].map(n => <li>{n}</li>)}</ul>
                </div>
            );
        }
    }

    return lists.length === 0 ? <p className="rec-filler">Please check back later for recommendations in this area.</p> : lists;
}

/**
 * The main `Info` component.
 */
class Info extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            regName: null,
            historyEl: null,
            hazardEl: null,
            recommEl: null
        };
    }

    /** Renders the `Info` component. */
    render () {
        if (!Object.values(this.state).some(x => x === null)) return (
            <div id="reg-info-panel">
                <h1 id="reg-name">{this.state.regName}</h1>
                <div id="reg-info">
                    <div id="history">
                        <h1>History</h1>
                        {this.state.historyEl}
                    </div>
                    <div id="hazards">
                        <h1>Hazard Assessment</h1>
                        {this.state.hazardEl}
                    </div>
                    <div id="recommendations">
                        <h1>Recommendations</h1>
                        {this.state.recommEl}
                    </div>
                </div>
            </div>
        );
        else return <p id="wait">Please wait…</p>;
    }
    
    async componentDidMount () {
        fetchData(this.props.reg).then(data => {
            this.setState({
                regName: data.name,
                historyEl: generateHistory(data),
                hazardEl: generateHazards(data),
                recommEl: generateRecommendations(data)
            });
        });
    }
    
    async componentDidUpdate (old) {
        if (old.reg !== this.props.reg) {
            fetchData(this.props.reg).then(data => {
                this.setState({
                    regName: data.name,
                    historyEl: generateHistory(data),
                    hazardEl: generateHazards(data),
                    recommEl: generateRecommendations(data)
                });
            });
        }
    }
}

export default Info;