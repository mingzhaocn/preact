import {h, render, Component} from '../../src/preact.js';

//Note: The below @jsx h comment tells Babel to use "h" instead of React.CreateElement as VDOM function

/** @jsx h */

class List extends Component {
	render() {
		/**
		 * jsx
		 <ul>
		 {this.props.items.map(function (item) {
       return <li key={item}>
         {item}
       </li>
     })}
		 </ul>
		 */
		const hNode = h(
			'ul',
			null,
			this.props.items.map(item => (h('div', {key: item}, item)))
		)
		return hNode;
	};
}


class FilteredList extends Component {
	constructor() {
		super();
		this.state = {
			inputValue: '',
			initialItems: [
				"Apple",
				"Google",
			],
			items: []
		}
	}

	filterList() {
		var updatedList = this.state.initialItems;
		updatedList = updatedList.filter((item) => {
			return item.toLowerCase().search(this.state.inputValue.toLowerCase()) !== -1;
		});
		this.setState({
			items: updatedList
		});
	};

	addItem() {
		this.setState({
			initialItems: this.state.initialItems.concat([this.state.inputValue]),
			inputValue: ''
		});
		this.filterList();
	}

	componentWillMount() {
		this.setState({
			items: this.state.initialItems
		})
	};

	render() {
		/**
		 * jsx
		 <div>
		 <input
		 type="text"
		 placeholder="Search"
		 onChange={this.filterList}/>
		 <List items={this.state.items}/>
		 </div>
		 */
		const hNode = h(
			'div',
			null,
			h('input', {
				value: this.state.inputValue,
				type: 'text',
				placeholder: 'Type some words',
				onChange: e => {
					this.setState({inputValue: e.target.value})
				},
			}),
			h('button', {
				onClick: this.filterList.bind(this),
				style: {marginLeft: 5}
			}, 'Search'),
			h('button', {
				onClick: this.addItem.bind(this),
				style: {marginLeft: 5}
			}, 'Add'),
			h(List, {items: this.state.items})
		)
		return hNode;
	};
}

class Search extends Component {
	render() {
		return h(
			'div',
			null,
			h('input', {type: 'text', placeholder: 'Search', onChange: null}),
			// h(List, {items: this.state.items})
		)
	}
}

// Start 'er up:
render(
	h(FilteredList)
	, document.getElementById('app'));
