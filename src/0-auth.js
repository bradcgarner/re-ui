import { useEffect, useState } from "react";
import App from "./1-app";
import './0-app.css';
import Loading from "./1-loading";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Auth(props) {

	const [agent, setAgent] = useState({});
	const [loginMode, setLoginMode] = useState('login');
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleAgentChange = (k,v) => {
		const newA = {...agent};
		newA[k] = v;
		setAgent(newA);
	};

	const resetPw = () => {
		setIsLoading(true);
		const init = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(agent),
		};
		fetch(`${REACT_APP_API_URL}api/auth/pw-reset`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				console.log(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const logIn = () => {
		setIsLoading(true);
		const init = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(agent),
		};
		fetch(`${REACT_APP_API_URL}api/auth/login`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				console.log(r);
				setIsLoading(false);
				const authToken = typeof r.authToken === 'string' ? r.authToken : null ;
				if(authToken){
					localStorage.setItem('authToken', authToken);
					setLoginMode('done')
				} else {
					console.error('no auth token returned');
				}
			})
			.catch(err=>{
				console.error(err);
			});
	};

useEffect(()=> {
	if(!hasLoaded){
	 setHasLoaded(true);
	 setIsLoading(true);
	 const authToken = localStorage.authToken;
		const init = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({authToken}),
		};
		fetch(`${REACT_APP_API_URL}api/auth/relogin`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				console.log(r);
				const newAuthToken = typeof r.authToken === 'string' ? r.authToken : null ;
				if(newAuthToken){
					localStorage.setItem('authToken', newAuthToken);
					const newA = {...agent, agent_password: null};
					setAgent(newA);
					setLoginMode('done');
				} else {
					console.error('no authToken returned');
				}
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
		}
	});

	return <div className="display-group">
		{
			loginMode === 'reset' ?

			<div className="display-group">

				<label className='edit-label'>
					Email
					<input className='edit-input edit-input-wide-nest'
						value={agent.agent_email || ''}
						onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
				</label>

				<div onClick={()=>resetPw()} className='major-button'>
					<p className='major-button-text'>RESET PASSWORD</p>
				</div> 

				<div onClick={()=>setLoginMode('login')} className='small-button'>
					<p className='small-button-text'>Log In</p>
				</div>
			</div> :

			loginMode === 'done' ?
			<App/> :

			<div className="display-group">
		
				<label className='edit-label'>
					Email
					<input className='edit-input edit-input-wide-nest'
						value={agent.agent_email || ''}
						onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
				</label>
				<label className='edit-label'>
					Password
					<input className='edit-input edit-input-wide-nest'
						value={agent.agent_password || ''}
						onChange={e=>handleAgentChange('agent_password', e.target.value)}/>
				</label>

				<div onClick={()=>logIn()} className='major-button'>
					<p className='major-button-text'>LOG IN</p>
				</div>

				<div onClick={()=>setLoginMode('reset')} className='small-button'>
					<p className='small-button-text'>Reset Password</p>
				</div>
			</div>
		}

		{
			isLoading ? <Loading/> : null
		}
	</div>

}