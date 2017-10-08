
import React from 'react';
import {render} from 'react-dom';
class Home extends React.Component {
	render () {
	    return (
	    	<div>
	    		
	    		<h1>Full Stack Coding Challenge</h1>
				<div className="main">
					
					<div className="login-form">
						<h3>Login</h3>
						
						<div>
							<form action="/" method="post">
								<input type="text" name="logemail" placeholder="E-mail" required="" />
								<input type="password" name="logpassword" placeholder="Password" required="" />
								<div>
									<input type="submit" value="LOGIN NOW" />
								</div>
							</form>
						</div>
					</div>
					<div className="signin-form">
						<h3>Register</h3>
						
						<div>
							<form action="/" method="post">
								<input type="text" name="email" placeholder="E-mail" required="" />
								<input type="text" name="username" placeholder="Username" />
								<input type="password" name="password" placeholder="Password" required="" />
								<input type="password" name="passwordConf" placeholder="Confirm Password" required="" />
								<input type="submit" value="REGISTER" />
							</form>
						</div>
					</div>
				</div>
				<div className="clear"></div>
				<div className="copyright">
					<p> &copy; 2016 Full Stack Coding Challenge. All rights reserved | Design by 
						<a href="#" target="_blank" >Amine TABOU</a>
					</p>
				</div>
			    
			</div>
	    );
	}
}

export default Home;