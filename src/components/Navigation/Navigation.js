import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation =  ({ onRouteChange, isSignedIn, toggleModal }) => {
		if(isSignedIn) {
			return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
			</nav>
			);
		} else {
			return (
				<div>
					<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
						<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer grow'>Sign In</p>
						<p onClick={() => onRouteChange('info')} className='f3 link dim black underline pa3 pointer grow'>Info</p>
					</nav>
				<h1 className='f2 grow code'>Work Order App</h1>
				</div>
			);
		}
}

export default Navigation