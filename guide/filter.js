import {h, render, Component} from '../src/preact.js';

//Note: The below @jsx h comment tells Babel to use "h" instead of React.CreateElement as VDOM function

/** @jsx h */

class List extends Component {
	render = () => {
		return (
			<ul>
				{this.props.items.map(function (item) {
					return <li key={item}>
						{item}
					</li>
				})}
			</ul>
		)
	};
}


class FilteredList extends Component {
	constructor() {
		super();
		this.state = {
			initialItems: [
				"California",
				"New York"

			],
			items: []
		}
	}

	filterList = (event) => {
		var updatedList = this.state.initialItems;
		updatedList = updatedList.filter(function (item) {
			return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		});
		this.setState({
			items: updatedList
		});
	};

	componentWillMount = () => {
		this.setState({
			items: this.state.initialItems
		})
	};

	render = () => {
		return (
			<div>
				<input
					type="text"
					placeholder="Search"
					onChange={this.filterList}/>
				<List items={this.state.items}/>
			</div>
		);
	};
}


// Start 'er up:
render(<FilteredList/>, document.getElementById('app'));
