import React from 'react';
import './Top.css';
import getReviewsData from '../Services/DataManipulation'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class Top extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appData: getReviewsData(),
            appId: '',
            sortOption: 'new'
        }
        this.handleChange = this.handleChange.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }
    componentDidMount() {
        let defaultValue = getReviewsData();
        defaultValue = defaultValue.products[0]
        this.setState({ appId: defaultValue }, () => this.props.productSelection(this.state.appId))
    }
    handleChange(event) {
        this.setState({ appId: event.target.value }, () => this.props.productSelection(this.state.appId))
    }
    sortChange(sort) {
        this.setState({ sortOption: sort.target.value }, () => this.props.sortSelection(this.state.sortOption))
    }

    render() {

        return (
            <div className='topBar'>
                <p id='heading'>App Reviews</p>
                <div classname='align'>
                <div className='productSelection'>
                    Select product:
            <Select className='dropdown' onChange={this.handleChange} value={this.state.appId}>
                        {
                            this.state.appData.products.map((e, i) => <MenuItem value={e}key={i}>{e}</MenuItem>)
                        }
                    </Select>
                </div>
                <div className='sortMenu'>
                    Sort:
            <Select className='dropSort' onChange={this.sortChange} value={this.state.sortOption}>
                        <MenuItem value='new'>Most recent</MenuItem>
                        <MenuItem value='old'>Oldest first</MenuItem>
                    </Select>
                </div>
            </div>

            </div>
        )
    }
}
export default Top;