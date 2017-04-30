import React, { Component } from "react";

import {connect} from 'react-redux'

import {
	      createChart,
	      setActiveChartIndex,
				addDataset
			 } from '../ducks/chart'

import AddDataset from './AddDataset/AddDataset'
import ActiveChart from './ActiveChart/ActiveChart'
import NewChart from "./NewChart/NewChart"
import Sidebar from "./Sidebar/Sidebar"

import "./App.css";

class App extends Component {
	render() {
		const {
					 createChart,
					 activeChart,
					 setActiveChartIndex,
					 addDataset,
					 charts
				  } = this.props
		return (
			<div className="app">

				<Sidebar charts={charts} setActiveChartIndex={setActiveChartIndex}/>

				<main className="app__main">
					<header className="app__header">
						<h1 className="app__title">Categorizer</h1>

						<div className="app__new-chart">

							<NewChart createChart={createChart}/>

						</div>
					</header>
					<div className='app__active-chart'>

					  <ActiveChart chart={activeChart}/>

						<AddDataset addDataset={addDataset} labels={activeChart.labels}/>

					</div>
				</main>
			</div>
		);
	}
}

function mapStateToProps({activeChartIndex, charts}){
	return{
		activeChart:charts[activeChartIndex],
		charts
	}
}

export default connect(mapStateToProps,{createChart,setActiveChartIndex,addDataset})(App);
