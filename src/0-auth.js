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
					localStorage.setItem('id_agent', r.id_agent);
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
					localStorage.setItem('id_agent', r.id_agent);
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
	}, [hasLoaded, agent]);

	const loading = isLoading ? <Loading/> : null

	const pageTop = <div className="page-top">
		<h1 className="main-h1">SIMPLY REAL</h1>
	</div>

	const r = <span style={{fontSize:10,verticalAlign:'super'}}>&reg;</span>

	return loginMode === 'reset' ?

		<div className="display-group">
			{pageTop}
			<label className='edit-label'>
				Email
				<input className='edit-input edit-input-wide'
					value={agent.agent_email || ''}
					onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
			</label>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<div onClick={()=>resetPw()} className='major-button'>
				<p className='major-button-text'>RESET PASSWORD</p>
			</div> 
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('login')} className='small-button'>
				<p className='small-button-text'>Log In</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('about')} className='small-button'>
				<p className='small-button-text'>About</p>
			</div>
			{loading}
		</div> :

		loginMode === 'done' ?
		<App/> :

		loginMode === 'about' ?

		<div className="display-group">
			{pageTop}
			<p className="about-p">Simply Real is a tool to help Realtors{r} manage relationships and their business.</p>
			<p className="about-p">This tool is built around the concept that human relationships are the most important aspect of real estate.</p>
			<p className="about-p">Simply Real is not for every Realtor{r}. It is only for Realtors{r} who choose to place community, relationships, and long-term connections first.</p>
			
			<div className="divider"/>
			<p className="about-p">Simply Real is a tool to accompany methods taught by Danielle Mapes in The Real Estate Prescription.</p>
			
			<div className="divider"/>
			<p className="about-p">Apps are tools for handling business processes. This app assists Realtors{r} who follow a business process like this:</p>
			<ul>
				<li className='about-li'>Setting clear goals is critical. Goals must be designed to point you to "somewhere very specific" in your life, and in your business.</li>
				<li className='about-li'>Daily planning is critical. Start each day with a clear and realistic mission. Knock out that to-do list, but never be at a loss for productive activities, because you have a ton of back-up plan ideas in this app.</li>
				<li className='about-li'>Conversations are the most important aspect of our business and our day. Real estate is all about navigating people through home ownership. Around 97% of the time, that means holding and maintaining and living in a home. Around 3% of the time that means buying or selling a home. Conversations are the way we connect with people to know who, how, and when to help.</li>
				<li className='about-li'>Conversations are not accidental. You know how to handle conversations because you have guides in this app.</li>
				<li className='about-li'>Track those conversations! Understand what worked. Understand what didn't. Recap those conversations and re-adjust to hone your skills.</li>
				<li className='about-li'>Be a super-organized home and lifestyle expert! Because around 97% of your customers are not actively buying or selling a home, your service to them 97% of the time will be connecting them with the best of the best of local businesses. When they need help, they might need it fast. When they move into that 3% of active home buyers or sellers, they need it REALLY FAST! So be prepared.</li>
			</ul>
			<div className="divider"/>
			<p className="about-p">Plan, Recap, Track, Talk</p>
			<p className="about-p">Real estate really can be that simple.</p>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('login')} className='small-button'>
				<p className='small-button-text'>Log In</p>
			</div>
			{loading}
		</div> :

		<div className="display-group">
			{pageTop}
			<label className='edit-label'>
				Email
				<input className='edit-input edit-input-wide'
					value={agent.agent_email || ''}
					onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Password
				<input className='edit-input edit-input-wide'
					value={agent.agent_password || ''}
					onChange={e=>handleAgentChange('agent_password', e.target.value)}/>
			</label>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<div onClick={()=>logIn()} className='major-button'>
				<p className='major-button-text'>LOG IN</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('reset')} className='small-button'>
				<p className='small-button-text'>Reset Password</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('about')} className='small-button'>
				<p className='small-button-text'>About</p>
			</div>
			{loading}
	</div>

}