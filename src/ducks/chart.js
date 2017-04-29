//hold reducer, action types, action creators, and reducer's innitial state


//this is an action type; a description of what happened; used by reducer below
//to determine how to changes state.
const CREATE_CHART = 'CREATE_CHART'

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
  			, data: [65, 59, 90, 81, 56, 55, 40]
  		}
  		, {
  			  label: "My Second dataset"
  			, data: [28, 48, 40, 19, 96, 27, 100]
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
    default: return state
  }
}

export function createChart(labels,name){
  return{
    chart:{
      labels,
      name,
      datasets:[]
    },
    type:CREATE_CHART
  }
}
