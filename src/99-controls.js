export default function Controls(props) {

	const {showInstructions, showDevNotes, id_contact} = props;

	const contactsHash = props.contactsHash || {};

	const setShowInstructions = typeof props.setShowInstructions === 'function' ? props.setShowInstructions : ()=>{};
	const setShowDevNotes = typeof props.setShowDevNotes === 'function' ? props.setShowDevNotes : ()=>{};
	const toggleReferralTo = typeof props.toggleReferralTo === 'function' ? props.toggleReferralTo : ()=>{} ;
	const toggleReferralInclude = typeof props.toggleReferralInclude === 'function' ? props.toggleReferralInclude : ()=>{} ;
	const initiateReferral = typeof props.initiateReferral === 'function' ? props.initiateReferral : ()=>{} ;

	const referralMode =  typeof props.toggleReferralTo === 'function' && typeof props.toggleReferralInclude === 'function' && typeof props.initiateReferral === 'function';

	const referralBasket = props.referralBasket || {} ;
	const refTo = referralBasket.to || {};
	const refIncl = referralBasket.include || {} ;

	const refsTo = [];
	const refsIncl = [];

	for(let k in refTo){
		const theContact = contactsHash[`${k}`];
		if(theContact){
			refsTo.push(theContact);
		}
	}

	for(let k in refIncl){
		const theContact = contactsHash[`${k}`];
		if(theContact){
			refsIncl.push(theContact);
		}
	}

	const isTo = !!refTo[`${id_contact}`];
	const isIncl = !!refIncl[`${id_contact}`];

	const classInfo = !!showInstructions ? 'svg-on' : 'svg-off' ;
	const classDev = !!showDevNotes ? 'svg-on' : 'svg-off' ;
	const classHand = isTo ? 'svg-on' : refsTo.length <= 0 ? 'svg-red' : 'svg-off';
	const classGift = isIncl ? 'svg-on' : refsIncl.length <= 0 ? 'svg-red' : 'svg-off';
	const classSend = 'svg-on';

	return <div className='g1'>
		<div className='g1 svg-row'>

			<div className='svg-container'
				onClick={()=>setShowInstructions(!showInstructions)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1455 1446">
					<circle className={classInfo} cx="728.35" cy="725" r="693.5"/>
					<g>
						<circle className='svg-white' cx="728.35" cy="438.14" r="77.82"/>
						<polygon className='svg-white' points="805.03 1017.96 805.03 567.84 703.56 567.84 661.6 567.84 604.38 567.84 604.38 628.87 661.6 628.87 661.6 1017.96 614.3 1017.96 614.3 1089.68 852.33 1089.68 852.33 1017.96 805.03 1017.96"/>
					</g>
				</svg>
			</div>

			<div className='svg-container'
				onClick={()=>setShowDevNotes(!showDevNotes)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1403 1409">
					<path className={classDev} d="M1356.7,201.78l-.05-.05s.02.05.02.07l.02-.02Z"/>
					<path className={classDev} d="M1211.56,55.93h0s.01.01.02.01h-.01Z"/>
					<path className={classDev} d="M1363.91,226.94c-2.59-11.33-16.69-15.3-24.75-6.92l-139.21,144.8-100.02-31.41c-4.34-1.36-7.82-4.64-9.44-8.9l-38.84-102.25,143.31-149.06c7.76-8.07,3.93-21.62-6.95-24.24-19.47-4.7-39.87-7.01-60.89-6.59-127.96,2.58-231.64,107.42-232.91,235.4-.25,24.93,3.35,48.99,10.23,71.63L349.54,899.27c-22.51-7.07-46.47-10.88-71.32-10.88-131.36,0-237.84,106.49-237.84,237.84s106.49,237.84,237.84,237.84,237.84-106.49,237.84-237.84c0-24.1-3.6-47.36-10.26-69.29l554.89-549.85c22.14,6.95,45.68,10.77,70.09,10.9,130.79.7,238.41-105.77,239.11-236.55.1-18.74-1.98-36.99-5.98-54.5ZM379.94,1227.94l-138.94,37.23-101.71-101.71,37.23-138.94,138.94-37.23,101.71,101.71-37.23,138.94Z"/>
				</svg>
			</div>

			{ referralMode ? <div className='svg-container'
				onClick={()=>toggleReferralTo()}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3981 3976">
					<path className={`${classHand} svg-hand`} d="M3850.91,1780.15c-41.27-63.17-108.43-67.69-165.29-49.08-48.33,15.81-203.72,126.32-337.99,214.38,35.12,22.49,63,51.86,73.47,88.1,11.06,38.31,1.69,71.88-26.08,101.58,60.91-47.28,474.91-322.64,455.89-354.98h0ZM3239.9,1900.77c-38.62-9.5-62.85-9.63-99.89-11.12-47.9-1.94-94.95-6.58-141.42-13.35,132.14-110.55,324.97-275.5,346.34-289.56,50.01-32.89,147.47-79.51,214.59,4.75-22.46,53.36-248.92,236.46-319.62,309.28h0ZM2936.71,1865.97c74.47-108.63,186.57-243.54,210-311.29-30.77-41.55-77.24-35.23-123.92-14.22-84.81,56.63-176.67,162.98-265.58,283.13,59.45,16.57,119.07,31.11,179.5,42.38Z"/>
					<path className={`${classHand} svg-hand`} d="M728.06,2391.62c750.24-150.23,1224.94-142.04,1823.31,148.23,130.91,48.71,299.31-20.11,438.79-31.73,138.26-11.52,278.27-13.96,414.53-70.4,91.27-41.23,551.27-220.07,538.25-273.57-22.55-67.37-103.5-92.66-168.88-84.09-107.5,14.09-368.88,113.58-505.01,144.43-74.53,16.89-172.13,10.83-287.5,1.5-102.46-8.28-218.43-15.19-352.67-70.58-100.49-41.45-42.52-26,10.78-14.56,222.24,47.72,716.98,89.04,750.3-68.87,6.57-85.01-126.07-142.02-219.1-146.12-444.98-6.88-799.87-244.25-1123.54-243.33-187.93.53-420.91,135.61-688.5,147.5-416.55,18.5-869.48-76.95-1287.21-125.55,165.87,88.03,300.65,758.39,656.45,687.14Z"/>
				</svg>
			</div> : null }

			{referralMode ? <div className='svg-container'
				onClick={()=>toggleReferralInclude()}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 958 1041">
					<path className={classGift} d="M690.07,69.72c-10.43-12.48-37.46-41.5-76.17-41.38-43.87.13-79.27,38.15-111.01,92.75-13.86,23.84-38.97,74.12-54.16,136.9-3.1-52.09-21.68-120.06-60.99-171.19-22.7-29.51-55.61-55.49-105.05-52.25-37.48,2.46-69.41,27.3-85.02,43.22-11.39,11.61-37.6,41.38-33.66,79.88,4.46,43.64,45.79,75.11,103.26,101.3,29.92,13.63,98.84,39.5,179.68,44.16,39.94,2.64,145.67-1.77,215.36-45.14,31.61-19.67,60.71-49.85,62.37-99.38,1.25-37.54-20.31-71.77-34.61-88.87ZM300.69,204.7c-37.56-24.67-72.93-55.88-69.57-73.38,3.21-16.7,25.73-24.94,43.86-27.17,37.59-4.62,68.06,25.12,89.58,47.69,17.63,18.49,51.61,56.77,67.85,116.51-58.43-20.95-103.55-45.15-131.71-63.66ZM599.87,228.47c-20.14,15.72-60.16,42.75-121.21,53.01,26.62-56.08,53.73-95.59,74.92-121.78,28.26-34.94,62.81-67.05,79.89-61.98,16.3,4.84,22.27,28.07,22.7,46.33.89,37.86-31.72,65.24-56.3,84.43Z"/>
					<g>
						<path className={classGift} d="M447.93,534.67H85.1v399.5c0,25.39,20.58,45.97,45.97,45.97h316.86v-445.47Z"/>
						<path className={classGift} d="M489.41,534.67v445.47h316.86c25.39,0,45.97-20.58,45.97-45.97v-399.5h-362.83Z"/>
					</g>
					<g>
						<rect className={classGift} x="363.19" y="296.45" width="210.95" height="201.15"/>
						<path className={classGift} d="M326.71,296.45H74.55c-15.2,0-27.51,12.32-27.51,27.51v173.64h279.67v-201.15Z"/>
						<path className={classGift} d="M610.63,296.45v201.15h279.67v-173.64c0-15.2-12.32-27.51-27.51-27.51h-252.16Z"/>
					</g>
				</svg>
			</div> : null }

			{referralMode ? <div className='svg-container'
				onClick={()=>initiateReferral()}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520">
					<path className={`${classSend} svg-send`} d="M144.48,264.41L15.77,212.53c-11.66-4-13.05-12.4,5.43-16.45l468.78-122.44c25.51-6.98,20.78,3.2,15.91,20.01l-119.59,351.08c-6.44,19.99-10.62,20.67-27.03,5.88l-87.53-77.35-64.02,48.37c-5.74,4.26-12.2,3.85-12.14-3.21l1.16-109.17c.02-.71.28-1.26,1.05-1.94l227.92-167.43c6.35-4.64,5.97-7.25-2.86-3.25l-269.72,127.11c-4.59,2.07-4.62,2.36-8.64.67"/>
				</svg>
			</div> : null }
		</div>

		{showInstructions ?
			<div className='g2'>
				<p className='instructions'>The wrench icon toggles developer notes. Currently {showDevNotes ? 'ON' : 'OFF'}.</p>
				{referralMode ? <p className='instructions'>The hand icon toggles contact to RECEIVE referrals. This contact is currently {isTo ? 'A RECIPIENT' : 'NOT a receipient'}.</p> : null }
				{
					!referralMode ? null :
					refsTo.length > 0 ?
					refsTo.map((r,i)=>{
						return <p className='instructions' key={i}>Recipient: {r.contact_name_first} {r.contact_name_last} {r.contact_company}</p>
					}) :
					<p className='instructions'>NO ONE is currently set to receive referrals.</p>
				}
				<p></p>
				{referralMode ? <p className='instructions'>The gift icon toggles contact (VP) to SEND AS A REFERRAL. This contact is currently {isIncl ? 'INCLUDED' : 'NOT included'}.</p> : null }
				{
					!referralMode ? null :
					refsIncl.length > 0 ?
					refsIncl.map((r,i)=>{
						return <p className='instructions' key={i}>VP To Send: {r.contact_name_first} {r.contact_name_last} {r.contact_company}</p>
					}) :
					<p className='instructions'>NO ONE is currently set be referred.</p>
				}
				{referralMode ? <p className='instructions'>The paper airplane icon initiates sending the referral.</p> : null }
			</div> : null 
		}

	</div>
}