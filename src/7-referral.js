export default function Referral(props) {
	const {
		goToMainMenu,
		referralBasket,
		contactsHash,
		handleReferralBasket,
		openContact,
		getReferralInfo,
		vpReferrals,
		sendReferral,
	} = props;

	const rb = referralBasket || {};
	const rbTo = rb.to || {};
	const rbIncl = rb.include || {};

	const toKeys = Object.keys(rbTo);
	const inclKeys = Object.keys(rbIncl);

	const toContacts = toKeys.map(k=>{
		return contactsHash[k];
	});

	const inclContacts = inclKeys.map(k=>{
		return contactsHash[k];
	});

	const referralsHaveLoaded = Array.isArray(vpReferrals) && vpReferrals.length > 0 ;

	return <div className='g1'>

		<h1 className='h1'>REFERRAL</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>

		<h2 className="h2">Send Referral To:</h2>
		{
			toContacts.map((c,i)=>{
				return <div key={i} className='g2 g2-box g2-contact'>
					<p>{c.contact_name_first} {c.contact_name_last}</p>
					<p>{c.contact_company}</p>
					<p>{c.contact_phone}</p>
					<p>{c.contact_email}</p>

					<div className="svg-row">

						<div className='svg-container'
							onClick={()=>handleReferralBasket('to', c.id_contact)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3981 3976">
								<path className='svg-on svg-hand' d="M3850.91,1780.15c-41.27-63.17-108.43-67.69-165.29-49.08-48.33,15.81-203.72,126.32-337.99,214.38,35.12,22.49,63,51.86,73.47,88.1,11.06,38.31,1.69,71.88-26.08,101.58,60.91-47.28,474.91-322.64,455.89-354.98h0ZM3239.9,1900.77c-38.62-9.5-62.85-9.63-99.89-11.12-47.9-1.94-94.95-6.58-141.42-13.35,132.14-110.55,324.97-275.5,346.34-289.56,50.01-32.89,147.47-79.51,214.59,4.75-22.46,53.36-248.92,236.46-319.62,309.28h0ZM2936.71,1865.97c74.47-108.63,186.57-243.54,210-311.29-30.77-41.55-77.24-35.23-123.92-14.22-84.81,56.63-176.67,162.98-265.58,283.13,59.45,16.57,119.07,31.11,179.5,42.38Z"/>
								<path className='svg-on svg-hand' d="M728.06,2391.62c750.24-150.23,1224.94-142.04,1823.31,148.23,130.91,48.71,299.31-20.11,438.79-31.73,138.26-11.52,278.27-13.96,414.53-70.4,91.27-41.23,551.27-220.07,538.25-273.57-22.55-67.37-103.5-92.66-168.88-84.09-107.5,14.09-368.88,113.58-505.01,144.43-74.53,16.89-172.13,10.83-287.5,1.5-102.46-8.28-218.43-15.19-352.67-70.58-100.49-41.45-42.52-26,10.78-14.56,222.24,47.72,716.98,89.04,750.3-68.87,6.57-85.01-126.07-142.02-219.1-146.12-444.98-6.88-799.87-244.25-1123.54-243.33-187.93.53-420.91,135.61-688.5,147.5-416.55,18.5-869.48-76.95-1287.21-125.55,165.87,88.03,300.65,758.39,656.45,687.14Z"/>
							</svg>
						</div>
						<div className='svg-container' />
							
						<div className='svg-container' 
							onClick={()=>openContact(c.id_contact)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475 475">
								<circle className='svg-on' cx="246.21" cy="145.27" r="108.03" transform="translate(-30.61 216.65) rotate(-45)"/>
								<path className='svg-on' d="M347.65,288.66c-7.52-4.81-16.88-5.55-25.02-1.99-24.14,10.56-49.86,15.92-76.43,15.92s-52.28-5.36-76.42-15.92c-8.14-3.56-17.49-2.82-25.02,1.98-54.62,34.89-87.23,94.37-87.23,159.11,0,4.14,3.36,7.5,7.5,7.5h362.34c4.14,0,7.5-3.36,7.5-7.5,0-64.73-32.61-124.21-87.23-159.1Z"/>
							</svg>
						</div>

					</div>

				</div>
			})
		}
		<h2 className="h2">Contacts To Include:</h2>
		{
			inclContacts.map((c,i)=>{
				return <div key={i} className='g2 g2-box g2-deal'>
					<p>{c.contact_name_first} {c.contact_name_last}</p>
					<p>{c.contact_company}</p>
					<p>{c.contact_phone}</p>
					<p>{c.contact_email}</p>

					<div className="svg-row">

						<div className='svg-container'
							onClick={()=>handleReferralBasket('include', c.id_contact)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 958 1041">
								<path className='svg-on' d="M690.07,69.72c-10.43-12.48-37.46-41.5-76.17-41.38-43.87.13-79.27,38.15-111.01,92.75-13.86,23.84-38.97,74.12-54.16,136.9-3.1-52.09-21.68-120.06-60.99-171.19-22.7-29.51-55.61-55.49-105.05-52.25-37.48,2.46-69.41,27.3-85.02,43.22-11.39,11.61-37.6,41.38-33.66,79.88,4.46,43.64,45.79,75.11,103.26,101.3,29.92,13.63,98.84,39.5,179.68,44.16,39.94,2.64,145.67-1.77,215.36-45.14,31.61-19.67,60.71-49.85,62.37-99.38,1.25-37.54-20.31-71.77-34.61-88.87ZM300.69,204.7c-37.56-24.67-72.93-55.88-69.57-73.38,3.21-16.7,25.73-24.94,43.86-27.17,37.59-4.62,68.06,25.12,89.58,47.69,17.63,18.49,51.61,56.77,67.85,116.51-58.43-20.95-103.55-45.15-131.71-63.66ZM599.87,228.47c-20.14,15.72-60.16,42.75-121.21,53.01,26.62-56.08,53.73-95.59,74.92-121.78,28.26-34.94,62.81-67.05,79.89-61.98,16.3,4.84,22.27,28.07,22.7,46.33.89,37.86-31.72,65.24-56.3,84.43Z"/>
								<g>
									<path className='svg-on' d="M447.93,534.67H85.1v399.5c0,25.39,20.58,45.97,45.97,45.97h316.86v-445.47Z"/>
									<path className='svg-on' d="M489.41,534.67v445.47h316.86c25.39,0,45.97-20.58,45.97-45.97v-399.5h-362.83Z"/>
								</g>
								<g>
									<rect className='svg-on' x="363.19" y="296.45" width="210.95" height="201.15"/>
									<path className='svg-on' d="M326.71,296.45H74.55c-15.2,0-27.51,12.32-27.51,27.51v173.64h279.67v-201.15Z"/>
									<path className='svg-on' d="M610.63,296.45v201.15h279.67v-173.64c0-15.2-12.32-27.51-27.51-27.51h-252.16Z"/>
								</g>
							</svg>
						</div>
						<div className='svg-container' />

						<div className='svg-container' 
							onClick={()=>openContact(c.id_contact)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475 475">
								<circle className='svg-on' cx="246.21" cy="145.27" r="108.03" transform="translate(-30.61 216.65) rotate(-45)"/>
								<path className='svg-on' d="M347.65,288.66c-7.52-4.81-16.88-5.55-25.02-1.99-24.14,10.56-49.86,15.92-76.43,15.92s-52.28-5.36-76.42-15.92c-8.14-3.56-17.49-2.82-25.02,1.98-54.62,34.89-87.23,94.37-87.23,159.11,0,4.14,3.36,7.5,7.5,7.5h362.34c4.14,0,7.5-3.36,7.5-7.5,0-64.73-32.61-124.21-87.23-159.1Z"/>
							</svg>
						</div>

					</div>

				</div>
			})
		}

		<div onClick={()=>getReferralInfo()} className='button2'>
			<p className='button2-text'>{
			referralsHaveLoaded ? 'UPDATE REFERRAL' : 'PREPARE REFERRAL'
			}</p>
		</div>

		{
			referralsHaveLoaded ?
			<div className='g1'>
				{
					vpReferrals.map((r,i)=>{
						return <div key={i} className='g2 g2-box g2-contact'>
							<p>{r.sal} {r.dear},</p>
							<p>{r.message}</p>
							{
								Array.isArray(r.refs) ? r.refs.map((f,j)=>{
									return <div key={j} className='ref g2'>
										<p className='p3'>{f.co}</p>
										<p className='p3'>{f.poc}</p>
										<p className='p3'>{f.ph}</p>
										<p className='p3'>{f.em}</p>
										<p className='p3'>{f.url}</p>
										<p className='p3'>Services: {f.cat}</p>
										<p className='p3'>Areas Served: {f.area}</p>
										<p className='p3'>{f.rev} <a href={f.revUrl} target="_blank">{f.revUrl}</a></p>
										<p className='p3'>REFERENCES: </p>{
											Array.isArray(f.refs) ? f.refs.map((x,l)=>{
												return <div key={l} className='ref g2'>
													<p className='p4'>{x.rev}</p>
													<p className='p4 p4-right'>- {x.by}</p>
												</div>
											}) : null
										}
									</div>
								}) : null 
							}
						</div>
					})
				}
			</div> : null
		}

		{
			referralsHaveLoaded ?
				<div onClick={()=>sendReferral()} className='button2'>
					<p className='button2-text'>SEND REFERRAL</p>
				</div> : null 
		}

	</div> 


	
}