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

	const pageTop = <div className="landing-page-top">
		<h1 className="landing-h1">SIMPLY REAL</h1>
	</div>

	const r = <span style={{fontSize:10,verticalAlign:'super'}}>&reg;</span>

	const w1 = 430; // width of phone
	const m1 = 10;
	const w2 = w1 - (m1*2);
	const w3 = w2 - (m1*2);
	const wd = 120;
	const w4 = w3 - (m1*2);
	const w5 = w4 - (m1*2);
	const wC1 = 40; // first letter to find contact
	const wC2 = 330;// contact if first letter showing
	const wCy = 250 // city
	const wSt = 60; // state
	const wZp = 70; // zip

	return <div className='the-app'>
	 { loginMode === 'reset' ?

		<div className="g2">
			{pageTop}
			<label className='label3'>
				Email
				<input className='input3'
					value={agent.agent_email || ''}
					onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
			</label>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<div onClick={()=>resetPw()} className='button2'>
				<p className='button2-text'>RESET PASSWORD</p>
			</div> 
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('login')} className='button4'>
				<p className='button4-text'>Log In</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('about')} className='button4'>
				<p className='button4-text'>About</p>
			</div>
			{loading}
		</div> :

		loginMode === 'done' ?
		<App/> :

		loginMode === 'about' ?

		<div className="g2">
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
			<div onClick={()=>setLoginMode('login')} className='button4'>
				<p className='button4-text'>Log In</p>
			</div>
			{loading}
		</div> :

		<div className="g2">
			{pageTop}
			<label className='label3'>
				Email
				<input className='input3'
					value={agent.agent_email || ''}
					onChange={e=>handleAgentChange('agent_email', e.target.value)}/>
			</label>
			<label className='label3'>
				Password
				<input className='input3'
					value={agent.agent_password || ''}
					onChange={e=>handleAgentChange('agent_password', e.target.value)}/>
			</label>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<div onClick={()=>logIn()} className='button2'>
				<p className='button2-text'>LOG IN</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('reset')} className='button4'>
				<p className='button4-text'>Reset Password</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setLoginMode('about')} className='button4'>
				<p className='button4-text'>About</p>
			</div>
			{loading}
		</div> 
		}
		<style>{`
					
			.g0 {
				flex-direction: column;
				width: 100vw;
				align-items: center;
			}

			.g1 {
				flex-direction: column;
				padding: 0px;
				width: ${w1}px;
				margin-bottom: 1vh;
				align-items: center;
			}
			.g2 {
				flex-direction: column;
				padding: 10px;
				width: ${w2}px;
				margin-bottom: 1vh;
			}
			.g2-multi {
				border: 1px solid #C5E2F6;
				border-radius: 10px;
				padding: 10px;
			}
			.g2-deal {
				background-color: #e4f2fb;
			}
			.g2-fu {
				background-color: #f9f7f6;
			}
			.g2-contact {
				background-color: #f4f4f4;
			}
			.g2-app {
				background-color: #0083C0;
			}
			.divider {
				width: 100%;
				height: 20px;
				margin-bottom: 20px;
				border-bottom: 5px solid #0083C0;
			}

			.h1, 
			.h2 {
				width: 100%;
				text-align: center;
			}
			.h1 {
				font-size: 30px;
				letter-spacing: 5px;
				background-image: linear-gradient(to left, #83C2E4, #8083C0);
				background-clip: text;
				-webkit-background-clip: text;
				color: transparent;
				display: inline-block;
				margin-top: 15px;
				margin-bottom: 15px;
			}
			.h2 {
				font-size: 18px;
				margin-bottom: 7px;
				color: #0083C0;
			}
			.p2 {
				width: ${w2}px;
				margin-bottom: 7px;
			}
			.about-p {
				margin-bottom: 10px;
				text-align: center;
			}
			.reminder {
				font-style: italic;
				color: #f2b3bf;
				font-size: 14px;
				margin-bottom: 7px;
			}
			.instructions {
				font-style: italic;
				color: #0083C0;
				font-size: 12px;
				margin-bottom: 5px;
			}
			.dev-notes {
				font-style: italic;
				color: #ccc;
				font-size: 12px;
				margin-bottom: 5px;
			}

			.loader-background {
				position: fixed;
				height: 100vh;
				width: 100vw;
				top: 0;
				left: 0;
				justify-content: center;
				align-items: center;
			}
			.loader-fill {
				position: absolute;
				height: 100vh;
				width: 100vw;
				top: 0;
				left: 0;
				background-color: #E6F2FF;
				opacity: 0.7;
			}

			.loader {
				--R: 150px;
				--g1: #0083C0 96%, #0000;
				--g2: #eeeeee 96%, #0000;
				width: calc(2*var(--R));
				aspect-ratio: 1;
				border-radius: 50%;
				display: grid;
				-webkit-mask: linear-gradient(#000 0 0);
				animation: l30 2s infinite linear;
			}
			.loader::before,
			.loader::after{
				content:"";
				grid-area: 1/1;
				width: 50%;
				background:
					radial-gradient(farthest-side,var(--g1)) calc(var(--R) + 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
					radial-gradient(farthest-side,var(--g1)) calc(var(--R) + 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
					radial-gradient(farthest-side,var(--g2)) calc(var(--R) + 0.5*var(--R)   - var(--R)) calc(var(--R) - 0.866*var(--R) - var(--R)),
					radial-gradient(farthest-side,var(--g1)) 0 calc(-1*var(--R)),
					radial-gradient(farthest-side,var(--g2)) calc(var(--R) - 0.5*var(--R)   - var(--R)) calc(var(--R) - 0.866*var(--R) - var(--R)),
					radial-gradient(farthest-side,var(--g1)) calc(var(--R) - 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
					radial-gradient(farthest-side,var(--g2)) calc(-1*var(--R))  0,
					radial-gradient(farthest-side,var(--g1)) calc(var(--R) - 0.866*var(--R) - var(--R)) calc(var(--R) + 0.5*var(--R)   - var(--R));
				background-size: calc(2*var(--R)) calc(2*var(--R));
				background-repeat :no-repeat;
			}
			.loader::after {
			transform: rotate(180deg);
			transform-origin: right;
			}

			@keyframes l30 {
				100% {transform: rotate(-1turn)}
			}


			.landing-page-top {
				height: 35vh;
				justify-content: center;
				align-items: center;
				flex-direction: column;
			}
			.landing-h1 {
				font-size: 80px;
				text-align: center;
				line-height: 150%;
				letter-spacing: 7px;
				background-image: linear-gradient(to right, #83C2E4, #8083C0);
				background-clip: text;
				-webkit-background-clip: text;
				color: transparent;
				display: inline-block;
			}
			.landing-screen {
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				width: 100vw;
				padding: 5vw;
			}



			.about-li {
				list-style:square;
				margin-left: 15px;
				font-size:smaller;
				margin-bottom: 10px;
			}

			.label3,
			.label2 {
				display: flex;
				flex-direction: column;
				margin-bottom: 7px;
				font-size: 13px;
				color: #63B3DB;
			}
			.label-white {
				color: white;
			}
			.label2 {
				width: ${w2}px;
			}
			.label3 {
				width: ${w3}px;
			}
			.label-d {
				width: ${wd}px;
			}
			.input2,
			.input3,
			.input4,
			.input5A,
			.input5B,
			.input-d {
				font-size: 16px;
				padding: 3px;
				margin-bottom: 3px;
				border: 0.5px solid #0083C0;
				color: #0083C0;
				font-family: 'Arial';
			}
			.input-d {
				width: ${wd}px;
			}
			.input2 {
				width: ${w2}px;
			}
			.input3 {
				width: ${w3}px;
			}
			.input4 {
				width: ${w4}px;
			}
			.input5A {
				width: ${wC1}px;
			}
			.input5B {
				width: ${wC2}px;
			}
			.input6A {
				width: ${wCy}px;
			}
			.input6B {
				width: ${wSt}px;
			}
			.input6C {
				width: ${wZp}px;
			}
			.input5-row,
			.input6-row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.input5-row {
				width: ${w2}px;
			}
			.input6-row {
				width: ${w3}px;
			}
			.input-taller {
				min-height: 100px;
			}
			.input-tallest {
				min-height: 250px;
			}

			.main-menu-button {
				width: ${w2}px;
				height: 50px;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;
				cursor: pointer;
			}
			.button2, 
			.button3, 
			.button4 {
				width: ${w2}px;
				align-items: center;
				justify-content: center;
				background-color: transparent;
				cursor: pointer;
			}
			.button2 {
				height: 50px;
				background-image: linear-gradient(to right, #83C2E4, #8083C0);
				margin-bottom: 15px;
			}
			.button3 {
				height: 30px;			
				margin-bottom: 10px;
			}
			.button4 {
				height: 22px;
				margin-bottom: 7px;
			}
			.button4-3 {
				width: ${w3}px;
			}
			.button2:hover,
			.button3:hover,
			.button4:hover {
				opacity: 0.75;
			}
			.button2-text,
			.button3-text,
			.button4-text {
				text-align: center;
				font-weight: bold;
				color: white;
			}
			.button3, .button4 {
				background-image: linear-gradient(to right, #2193C9, #83C2E4);
				cursor: pointer;
			}

			.date-container2,
			.date-container3 {
				flex-direction: row;
				justify-content: space-between;
			}
			.date-container2 {
				width: ${w2}px;
			}
			.date-container3 {
				width: ${w3}px;
			}

			.table-list-tr {
				cursor: pointer;
				max-height: 50px;
			}
			.table-list-tr:hover {
				opacity: 0.75;
			}
			.table-list-td {
				max-width: 100px;
			}

			.pie-chart {
				position: relative;
				width: 370px;
				min-height: 400px;
				margin: 0;
			}
			.pie-chart h2 {
				margin: 15px;
				text-align: center;
				width: 100%;
			}
			.pie-chart figcaption {
				position: absolute;
				bottom: 1em;
				right: 1em;
				font-size: smaller;
				text-align: right;
			}
			.pie-chart span:after {
				display: inline-block;
				content: "";
				width: 0.8em;
				height: 0.8em;
				margin-left: 0.4em;
				height: 0.8em;
				border-radius: 0.2em;
				background: currentColor;
			}

			.graph-container {
				display: block;
				width: 100vw;
				height: 100vh;
			}
		`}</style>
	</div>

}