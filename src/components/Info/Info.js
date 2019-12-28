import React from 'react';
import orderIcon from '../Orders/orderIcon.png';

const Info = () => {

	return (
		<div>
			<img 
				className='pa2 grow'
				alt='workorder' 
				src={orderIcon} 
				style={{
		/*			height: 200,*/
					width: 100,
				}}
			/>
			<div className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
				<p className='br3 pa2 code'>
					Welcome to the Work Order App.  The front-end was created using React.  
					The back-end consists of a Node Express API, PostgreSQL relational database and a Redis in-memory database. <br/><br/>
					This web app includes the following features:<br/>
					-PostreSQL database queries/updates<br/>
					-Google Maps integration<br/>
					-Secured passwords through hashing<br/>
					-JSON Web Tokens (JWT) used for session control<br/>
					-Token management in Redis in-memory database<br/>
						
				</p>
			</div>
		</div>
	)

}

export default Info;