import React from 'react';
import {render} from 'react-dom';
import Home from './Home.jsx';
import Albums from './Albums.jsx';




if (document.getElementById('fb-root')) {

	render(<Albums/>, document.getElementById('fb-root'));
}
if (document.getElementById('app-home')) {

	render(<Home/>, document.getElementById('app-home'));
}
