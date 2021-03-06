//hold reducer, action types, action creators, and reducer's innitial state


//place for all action types; a description of what happened; used by reducer below
//to determine how to changes state.
const CREATE_CHART = 'CREATE_CHART'
const SET_ACTIVE_CHART_INDEX = 'SET_ACTIVE_CHART_INDEX'
const ADD_DATASET = 'ADD_DATASET'

const initialState = {
  activeChartIndex:0,
  charts:[{
    // Labels corresponding to the corners of the chart.
    labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
    // The name of the chart
  , name: "Example Chart"
    // The data required for rendering values to the chart
  , datasets: [
  		{
  			  // The name of the dataset
  			  label: "My First dataset"
  			  // Each of these numbers corresponds to one of the labels above,
  			  // based on index
  			, data: [59, 90, 81, 56, 55, 40]
  		}
  		, {
  			  label: "My Second dataset"
  			, data: [48, 40, 19, 96, 27, 100]
  		}
  	]
  }]
}

export default function chart(state = initialState,action){
  switch(action.type){
    case CREATE_CHART:
      return {
        charts:[action.chart,...state.charts],
        activeChartIndex:0
      }
    case SET_ACTIVE_CHART_INDEX:
      return{
        charts:state.charts,
        activeChartIndex:action.index
      }
    case ADD_DATASET:{
      const {activeChartIndex, charts} = state
      const activeChart = charts[activeChartIndex]
      return {
        activeChartIndex,
        charts: [
          ...charts.slice(0,activeChartIndex),
          Object.assign(
            {},
            activeChart,
            {datasets: [...activeChart.datasets, action.dataset]}
          ),
          ...charts.slice(activeChartIndex + 1, charts.length)
        ]
      }
    }
    default: return state
  }
}

export function createChart(labels,name){
  return{
    type:CREATE_CHART,
    chart:{
      labels,
      name,
      datasets:[]
    }
  }
}

export function setActiveChartIndex(index){
  return {
    type:SET_ACTIVE_CHART_INDEX,
    index
  }
}

export function addDataset(dataset){
  return {
    type:ADD_DATASET,
    dataset
  }
}
