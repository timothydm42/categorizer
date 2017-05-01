import React, { Component, PropTypes } from "react";

import "./AddDataset.css";

export default class AddDataset extends Component {
	static propTypes = {
		  addDataset: PropTypes.func.isRequired
		, labels: PropTypes.arrayOf( PropTypes.string ).isRequired
	};
	constructor(props){
		super(props)
		this.state = {
			label:"",
			data: new Array(props.labels.length).fill(0)
		}
		this.handleLabelChange = this.handleLabelChange.bind(this)
		// this.handleDataChange = handleDataChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
  handleDataChange(changedIndex,event){
		const { data } = this.state;
		this.setState( {
			data: [
				  ...data.slice( 0, changedIndex )
				, parseInt( event.target.value, 10 )
				, ...data.slice( changedIndex + 1, data.length )
			]
		} );
	}
	handleLabelChange(event){
		this.setState({label: event.target.value})
	}
	handleSubmit(event){
		event.preventDefault()
		const {data,label} = this.state
		const {addDataset,labels} = this.props
		addDataset({data:data.map(datum => parseInt(datum,10)),label})
		this.setState({
			label:"",
			data: new Array(labels.length).fill(0)
		})
	}
	componentWillReceiveProps( nextProps ) {
		if ( nextProps !== this.props ) {
			this.setState( { data: new Array( nextProps.labels.length ).fill( 0 ) } );
		}
	}
	render() {
		const {labels} = this.props
		const {data,label} = this.state

		const labelInputs = labels.map((label,index)=>(
			<div
				className="add-dataset__form-group"
				key={ label }
			>
				<label className="add-dataset__label">{ label }:</label>
				<input
					className="add-dataset__input"
					max="100"
					min="0"
					required
					type="number"
					value={ data[ index ] }
					onChange={this.handleDataChange.bind(this,index)}
				/>
			</div>
		))
		return (
			<form
			  className="add-dataset"
			  onSubmit={this.handleSubmit}
			>
				<h3 className="add-dataset__header">Add Dataset</h3>
				<div className="add-dataset__form-group">
					<label className="add-dataset__label">Dataset Label:</label>
					<input
						className="add-dataset__input"
						required
						type="text"
						value={label}
						onChange={this.handleLabelChange}
					/>
				</div>
				{labelInputs}
				<button
					className="add-dataset__submit"
					value={label}
					type="submit"
				>
					Submit
				</button>
			</form>
		);
	}
}
