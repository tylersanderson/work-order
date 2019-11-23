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
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
					<p onClick={() => onRouteChange('info')} className='f3 link dim black underline pa3 pointer'>Info</p>
				</nav>
			);
		}
}

export default Navigation