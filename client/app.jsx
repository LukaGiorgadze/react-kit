import React from 'react';
// It is recommended to call injectTapEventPlugin() just before you call ReactDOM.render()
//import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {white} from 'material-ui/styles/colors';

require('./css/main.css');
require('./css/cssreset.css');

// Needed for onTouchTap
//injectTapEventPlugin();

const Logged = (props) => (
	<IconMenu
		{...props}
		iconButtonElement={
			<IconButton><MoreVertIcon color={white} /></IconButton>
		}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<MenuItem primaryText="ნავიგაცია" />
		<MenuItem primaryText="დახმარება" />
		<MenuItem primaryText="გასვლა" />
	</IconMenu>
);

Logged.muiName = 'IconMenu';

class RealTimeClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleTimeString()
		}
	}
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			500);
	}
	componentWillUnmount()
	{
		clearInterval(this.timerID);
	}
	tick()
	{
		this.setState({
			time: new Date().toLocaleTimeString()
		});

		this.setState({
			time: new Date().toLocaleTimeString()
		});
	}
	render()
	{
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<AppBar
						title='სათაური'
						iconElementRight={<IconButton><NavigationClose /></IconButton>}
						iconElementLeft={<Logged />}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}


ReactDOM.render(
	<RealTimeClock />,
	document.querySelector("#app")
);


if(module.hot) {
	module.hot.accept();
}