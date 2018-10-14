import React, { Component } from "react";
import axios from 'axios'

export class Home extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    feed: [],
	};
	
	axios.get('http://known-react/?_t=json')
	.then(response => this.setState({feed: response.data.items}))
    }
    render() {
	return (
	    <div className="feed">
		{this.state.feed.map(function(item) {
		    if (item.objectType === 'note') {
			return (
			  <div key={item.id} className="item {item.objectType}">
			    <p><a href={item.url}>{item.displayName}</a></p>
			  </div>
			);
		    } else {
			return (
			  <div key={item.id} className="item {item.objectType}">
			    <h2><a href={item.url}>{item.displayName}</a></h2>
				    <p>{item.content}</p>
			  </div>
			);
		    }
		  })}
	    </div>
	);
    }
}


