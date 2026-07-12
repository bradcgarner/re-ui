import { useState } from 'react';
import { isObjectLiteral, 
	isPrimitiveNumber,
numberWithCommas } from 'conjunction-junction';
import Instructions from './999-instructions';
import DevNotes from './999-dev-notes';
import Reminder from './999-reminder';

export default function Activity(props) {

	const {
		listActivities,
		listFus,
		handleActivityChange,
		saveActivity,
		addContactToActivity,
		addFuToActivity,
		goToMainMenu,
		addDealToActivity,
		activity,
		optionsHash,
		dealStatusHash,
		// valueListsHash, 
		referralHash,
		vpReferenceHash,
		vpBinaryHash,
		vpShowReferencesHash,
		problemSolveHash,
		newContactOptions,
		getContactVPApp,
		contactVPApp,
		newDealOptions,
		modePrior,
		formatStyle,
		formatPresetStyle,
		openDeal,
		openContact,
		openActivity,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const date_convo = isObjectLiteral(activity.date_convo) ? activity.date_convo : {};
	const contacts = Array.isArray(activity.contacts) ? activity.contacts : [];
	const deals = Array.isArray(activity.deals) ? activity.deals : [];
	const connections = Array.isArray(activity.connections) ? activity.connections : [];
	const fus = Array.isArray(activity.fus) ? activity.fus : [];

	const isAFollowUp = false;

	const dealLinkButtonStatus = dealStatusHash[activity.convo_deal_found];

	const vpShowReferences = vpShowReferencesHash[`${activity.convo_main_purpose}`];
	const contactVPAppIsLoaded = !!contactVPApp.id_contact;
	const firstContact = contacts[0] || {};
	const firstContactId = firstContact.id_contact;
	const firstContactName = firstContact.contact_company || `${firstContact.contact_name_first} ${firstContact.contact_name_last}`;
	const vpAppStatusHash = contactVPApp.vpAppStatusHash || {};
	const vp_app_status = contactVPApp.vp_app_status;
	const vpAppStatus = vpAppStatusHash[`${vp_app_status}`] || {};
	const vpAppStatusLabel = vpAppStatus.label || '';

	let idContactMain = null;
	if(Array.isArray(activity.contacts)){
		activity.contacts.forEach(c=>{
			if(c.id_contact && !idContactMain){
				idContactMain = c.id_contact;
			}
		});
	}

	const formatContactsToPrint = () => {
		const theNames = Array.isArray(activity.contacts) && activity.contacts.length > 0 ?
			activity.contacts.map(c=>{
				return c.contact_name_first || '?';
			}).join(' & ') : '??';
		return theNames;
	};

	const contactOptions = !activity.contactFilter ? optionsHash.contact :
		Array.isArray(optionsHash.contact) && typeof activity.contactFilter === 'string' ? 
		optionsHash.contact.filter((o,i)=>{
			if(i===0){return true;}
			if(o.props && 
				typeof o.props.children === 'string' && 
				o.props.children[0] === activity.contactFilter.toUpperCase()){
				return true;
			}
			return false;
		}) : optionsHash.contact;



	return <div className='g1'>

		<h1 className='h1'>ACTIVITY</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'activities' ?
			<div onClick={()=>listActivities()} className="button2">
				<p className="button2-text">Back to Activities List</p>
			</div> :
			<div onClick={()=>listFus()} className="button2">
				<p className="button2-text">Back to Follow-Up List</p>
			</div>
		}

		<div onClick={()=>setShowInstructions(!showInstructions)} className='button4'>
			<p className='button4-text'>
				{showInstructions ? 'Hide Instructions' : 'Show Instructions'}	
			</p>
		</div>
		<p>&nbsp;</p>
		<div onClick={()=>setShowDevNotes(!showDevNotes)} className='button4'>
			<p className='button4-text'>
				{showDevNotes ? 'Hide Dev Notes' : 'Show Dev Notes'}	
			</p>
		</div>


		<Instructions show={showInstructions}
			text={`Activities include conversations, attempts to converse, receiving a vendor partner referral, contacting a vendor partner reference, any updates to a deal (because that was also via a conversation), and any real-estate specific activity such as open houses or a booth at an event.`}/>

		<div className='divider'/>

		<h3 className='h2'>DATE</h3>
		
		<p>{date_convo.dateString}</p>
		<div className='date-container2'>	
			<label className='label-d'>
				<select className='input-d'
					value={isPrimitiveNumber(date_convo.date_convo_month) ? date_convo.date_convo_month : ''}
					style={formatStyle(date_convo.date_convo_month, true)}
					onChange={e=>handleActivityChange('date_convo',null,'date_convo_month',null, e.target.value)}>
						{optionsHash.months}
				</select>
				Month
			</label>
			<label className='label-d'>
				<input className='input-d'
					type='number'
					value={date_convo.date_convo_day || ''}
					style={formatStyle(date_convo.date_convo_day)}
					onChange={e=>handleActivityChange('date_convo',null,'date_convo_day',null, e.target.value)}/>
				Day
			</label>
			<label className='label-d'>
				<input className='input-d'
					type='number'
					value={date_convo.date_convo_year || ''}
					style={formatStyle(date_convo.date_convo_year)}
					onChange={e=>handleActivityChange('date_convo',null,'date_convo_year',null, e.target.value)}/>
				Year
			</label>
		</div>

		<Instructions show={showInstructions}
			text={`This is the date of the actual conversation or activity. Today's date is auto-populated; edit as needed.`}/>
		
		{
			isAFollowUp ?
			<div className='g2'>
				<p>&nbsp;</p>
				<p>This Is A Follow-Up Scheduled For {activity.dateStringFollowUp}</p>
				<p>Follow-Up Notes: {activity.fu_notes}</p>

				<Instructions show={showInstructions}
					text={`The information above is what you entered as your follow-up.`}/>
			
			</div> : null 
		}

		<DevNotes show={showDevNotes}
			text={`id_agent ${activity.id_agent}; id_activity ${activity.id_activity}; id_activity_temp ${activity.id_activity_temp}`} />

		<div className='divider'/>

		<h3 className='h2'>CONTACT(S)</h3>

		<Instructions show={showInstructions}
			text={`This is the person (or few people) you engaged with during this activity. If there were multiple people involved in the conversation, limit this to only the few that actually matter, such as the couple or family members. If you were at an event and talked with multiple people, but those can be categorized as separate conversations, do that. Fewer is better here.`}/>
		<Instructions show={showInstructions}
			text={`If this convo is to get the VP on the list or VP app follow-up, only theh FIRST contact is used.`}/>
		
		<DevNotes show={showDevNotes}
			text={`table contacts; join table connections (type: connection_record_type = 'main')`} />

		{
			contacts.length > 0 ? contacts.map((c,i)=>{
				const isAVP = !!vpBinaryHash[`${c.contact_vp_status}`];
				return <div key={i} className='g2 g2-multi g2-contact'>
					<label className='label3'>
						Select A Contact
						<div className='input6-row'>
							{ c.id_contact ? null : 
							<input className='input5A'
								value={activity.contactFilter || ''}
								onChange={e=>handleActivityChange('contactFilter',null,null,null, e.target.value)}/>
							}
							<select className={!c.id_contact ? 'input5B' : 'input3'}
								value={c.id_contact || ''}
								style={formatStyle(c.id_contact)}
								onChange={e=>handleActivityChange('contacts',i,'id_contact',null, e.target.value)}>
									{c.id_contact ? optionsHash.contact : contactOptions}
							</select>
						</div>
					</label> 
					<label className='label3'>
						First Name
						<input className='input3'
							value={c.contact_name_first || ''}
							style={formatStyle(c.contact_name_first)}
							onChange={e=>handleActivityChange('contacts',i,'contact_name_first',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Last Name
						<input className='input3'
							value={c.contact_name_last || ''}
							style={formatStyle(c.contact_name_last)}
							onChange={e=>handleActivityChange('contacts',i,'contact_name_last',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Company
						<input className='input3'
							value={c.contact_company || ''}
							style={formatStyle(c.contact_company)}
							onChange={e=>handleActivityChange('contacts',i,'contact_company',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Phone Number
						<input className='input3'
							value={c.contact_phone || ''}
							style={formatStyle(c.contact_phone)}
							onChange={e=>handleActivityChange('contacts',i,'contact_phone',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Email
						<input className='input3'
							value={c.contact_email || ''}
							style={formatStyle(c.contact_email)}
							onChange={e=>handleActivityChange('contacts',i,'contact_email',null, e.target.value)}/>
					</label>
					<label className='label3'>
						How I First Met {c.contact_name_first || 'Them'}
						<select className='input3'
							value={c.contact_how_met || ''}
							style={formatPresetStyle(c.contact_how_met)}
							onChange={e=>handleActivityChange('contacts',i,'contact_how_met',null, e.target.value)}>
								{optionsHash['contact how met']}
						</select>
					</label>
					{
						referralHash[`${c.contact_how_met}`] ?
							<label className='label3'>
								Who First Introduced Me To {c.contact_name_first || 'Them'}?
								<div className='input6-row'>
									{ c.id_who_introduced ? null : 
										<input className='input5A'
										value={activity.contactFilter || ''}
										onChange={e=>handleActivityChange('contactFilter',null,null,null, e.target.value)}/>
									}
									<select className={!c.id_who_introduced ? 'input5B' : 'input3'}
										value={c.id_who_introduced || ''}
										style={formatStyle(c.id_who_introduced)}
										onChange={e=>handleActivityChange('contacts',i, 'id_who_introduced',null, e.target.value)}>
											{c.id_who_introduced ? optionsHash.contact : contactOptions}
									</select>
								</div>
								{
									!c.id_who_introduced && Array.isArray(newContactOptions) && newContactOptions.length > 0 ?
									<select className='input3'
										value={c.id_who_introduced_temp || ''}
										style={formatStyle(c.id_who_introduced_temp)}
										onChange={e=>handleActivityChange('contacts',i, 'id_who_introduced_temp',null, e.target.value)}>
											{newContactOptions}
									</select> : null 
								}

							</label> : null
					}
					<label className='label3'>
						Where I First Met {c.contact_name_first || 'Them'}
						<select className='input3'
							value={c.contact_where_met || ''}
							style={formatPresetStyle(c.contact_where_met)}
							onChange={e=>handleActivityChange('contacts',i,'contact_where_met',null, e.target.value)}>
								{optionsHash['contact where met']}
						</select>
						<textarea className='input3'
							value={c.contact_where_met_notes || ''}
							style={formatStyle(c.contact_where_met_notes)}
							onChange={e=>handleActivityChange('contacts',i,'contact_where_met_notes',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Is A Vendor Partner
						<select className='input3'
							value={c.contact_vp_status || ''}
							style={formatPresetStyle(c.contact_vp_status)}
							onChange={e=>handleActivityChange('contacts',i,'contact_vp_status',null, e.target.value)}>
								{optionsHash['contact vp status']}
						</select>
					</label>
					{
						isAVP ?
							<label className='label3'>
								Vendor Partner Categories (separate using commas)
								<textarea className='input3'
									value={c.contact_vp_categories || ''}
									style={formatStyle(c.contact_vp_categories)}
									onChange={e=>handleActivityChange('contacts',i,'contact_vp_categories',null, e.target.value)}/>
							</label> : null
					}
					<label className='label3'>
						Notes (sticks with contact)
						<textarea className='input3'
							value={c.contact_notes || ''}
							style={formatStyle(c.contact_notes)}
							onChange={e=>handleActivityChange('contacts',i,'contact_notes',null, e.target.value)}/>
					</label>

					<Instructions show={showInstructions}
						text={`Enter any notes that you'll want to put into your contacts, such as Google Contacts or Outlook, if you use those.`}/>

					<DevNotes show={showDevNotes}
						text={`id_contact: ${c.id_contact}; id_contact_temp: ${c.id_contact_temp}; id_connection: ${c.id_connection}`} />
				
					{
						c.id_contact ?
						<div onClick={()=>openContact(c.id_contact)} className='button4 button4-3'>
							<p className='button4-text'>
								Go To This Contact
							</p>
						</div> : null
					}

				</div>
				
			}) : null
		}

		<div onClick={()=>addContactToActivity('main')} className='button3'>
			<p className='button3-text'>ADD A CONTACT</p>
		</div>

		<div className='divider'/>

		<h3 className='h2'>THE CONVERSATION</h3>

		<Instructions show={showInstructions}
			text={`Enter how you handled the conversation and as many notes as needed.`}/>

		<div className='g1'>
			<label className='label2'>
				Relationship with {formatContactsToPrint()} as of Today
				<select className='input2'
					value={activity.convo_relationship || ''}
					style={formatPresetStyle(activity.convo_relationship)}
					onChange={e=>handleActivityChange('convo_relationship',null,null,null, e.target.value)}>
						{optionsHash['contact relationship']}
				</select>
			</label>
			<label className='label2'>
				Main Purpose of the Contact
				<select className='input2'
					value={activity.convo_main_purpose || ''}
					style={formatPresetStyle(activity.convo_main_purpose)}
					onChange={e=>handleActivityChange('convo_main_purpose',null,null,null, e.target.value)}>
						{optionsHash['convo main purpose']}
				</select>
			</label>
			<label className='label2'>
				Lead Generation or Service
				<select className='input2'
					value={activity.convo_type || ''}
					style={formatPresetStyle(activity.convo_type)}
					onChange={e=>handleActivityChange('convo_type',null,null,null, e.target.value)}>
						{optionsHash['convo type']}
				</select>
			</label>
			<label className='label2'>
				Method of Contact
				<select className='input2'
					value={activity.convo_method || ''}
					style={formatPresetStyle(activity.convo_method)}
					onChange={e=>handleActivityChange('convo_method',null,null,null, e.target.value)}>
						{optionsHash['convo method']}
				</select>
			</label>
			<label className='label2'>
				Conversational Tone
				<select className='input2'
					value={activity.convo_tone || ''}
					style={formatPresetStyle(activity.convo_tone)}
					onChange={e=>handleActivityChange('convo_tone',null,null,null, e.target.value)}>
						{optionsHash['convo tone']}
				</select>
			</label>
			<label className='label2'>
				Conversational Model
				<select className='input2'
					value={activity.convo_model || ''}
					style={formatPresetStyle(activity.convo_model)}
					onChange={e=>handleActivityChange('convo_model',null,null,null, e.target.value)}>
						{optionsHash['convo model']}
				</select>
			</label>

			<label className='label2'>
				Intentional Conversation
				<select className='input2'
					value={activity.convo_intentional || ''}
					style={formatPresetStyle(activity.convo_intentional)}
					onChange={e=>handleActivityChange('convo_intentional',null,null,null, e.target.value)}>
						{optionsHash['convo intentional']}
				</select>
			</label>
			<label className='label2'>
				Did You Find a Problem to Solve?
				<select className='input2'
					value={activity.convo_problem_solve || ''}
					style={formatPresetStyle(activity.convo_problem_solve)}
					onChange={e=>handleActivityChange('convo_problem_solve',null,null,null, e.target.value)}>
						{optionsHash['problem to solve']}
				</select>
			</label>
			
			{/* <Reminder show={problemSolveHash[activity.convo_problem_solve]}
				text={'Enter the problem to solve in notes, and create a follow-up to solve this problem.'} /> */}
			
			<label className='label2'>
				How Did The Conversation Go?
				<select className='input2'
					value={activity.convo_outcome || ''}
					style={formatPresetStyle(activity.convo_outcome)}
					onChange={e=>handleActivityChange('convo_outcome',null,null,null, e.target.value)}>
						{optionsHash['ranking']}
				</select>
			</label>
			<label className='label2'>
				Did You Fully Recap This Convo?
				<select className='input2'
					value={activity.convo_voice_note || ''}
					style={formatPresetStyle(activity.convo_voice_note)}
					onChange={e=>handleActivityChange('convo_voice_note',null,null,null, e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>
			<label className='label2'>
				Conversation Notes
				<textarea className='input2 input-taller'
					value={activity.convo_notes || ''}
					style={formatStyle(activity.convo_notes)}
					onChange={e=>handleActivityChange('convo_notes',null,null,null, e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>

		{
			vpShowReferences ?
			<div className='g1'>
				<h3 className='h2'>VP APPLICATION</h3>

					{
						!contactVPAppIsLoaded ?
						<div onClick={()=>getContactVPApp(firstContactId)} className='button4 button4'>
							<p className='button4-text'>
								Load VP App for {firstContactName}
							</p>
						</div> : 
						<div className='g2 g2-multi g2-app'>
							<Instructions show={showInstructions}
								text={`Create a connection for each reference listed. Then create a follow-up for each reference.`}/>

							<p className='p1 label-white'>Application Status: {vpAppStatusLabel}</p>
							<p>&nbsp;</p>

							<label className='label3 label-white'>
								Business Name
								<input className='input3'
									value={contactVPApp.vp_name_business || ''}/>
							</label>

							<label className='label3 label-white'>
								What type of business are you? (plumber, roofer, electrician, restaurant, etc)
								<textarea className='input3'
									value={contactVPApp.vp_type || ''}/>
							</label>

							<label className='label3 label-white'>
								Best Contact Person
								<input className='input3'
									value={contactVPApp.vp_contact_person || ''}/>
							</label>

							<label className='label3 label-white'>
								Business Phone Number
								<input className='input3'
									value={contactVPApp.vp_phone || ''}/>
							</label>

							<label className='label3 label-white'>
								Business Email
								<input className='input3'
									value={contactVPApp.vp_email || ''}/>
							</label>

							<label className='label3 label-white'>
								Website
								<input className='input3'
									value={contactVPApp.vp_url || ''}/>
							</label>

							<label className='label3 label-white'>
								What is your service area? We only want to refer you to customers in areas you service.	
								<textarea className='edit-input edit-textarea edit-input-wide-nest'
									value={contactVPApp.vp_area || ''}/>
							</label>

							<label className='label3 label-white'>
								Best URL/link we can send our clients to leave you an online review (Google, Yelp, Facebook, etc.)
								<input className='input3'
									value={contactVPApp.vp_review_url || ''}/>
							</label>

							<div className='divider'/>

							<label className='label3 label-white'>
								Do you agree to provide three past customers so we can place that 2 minute call and maintain integrity for our list?
								<select className='input3'
									value={contactVPApp.vp_agree || ''}>
										<option key={-1} value={' '}>{' '}</option>
										<option key={0} value={'Yes'}>{'Yes'}</option>
										<option key={1} value={'No'}>{'No'}</option>
								</select>
							</label>

							<label className='label3 label-white'>
								First Past Client We Can Contact For A Testimonial (Name & Phone Number)				
								<textarea className='edit-input edit-textarea edit-input-wide-nest'
									value={contactVPApp.vp_ref1 || ''}/>
							</label>

							<label className='label3 label-white'>
								Second Past Client We Can Contact For A Testimonial (Name & Phone Number)				
								<textarea className='edit-input edit-textarea edit-input-wide-nest'
									value={contactVPApp.vp_ref2 || ''}/>
							</label>

							<label className='label3 label-white'>
								Third Past Client We Can Contact For A Testimonial (Name & Phone Number)				
								<textarea className='edit-input edit-textarea edit-input-wide-nest'
									value={contactVPApp.vp_ref3 || ''}/>
							</label>
						</div>
					}
				<div className='divider'/>
			</div> : null 
		}

		<h3 className='h2'>DEALS</h3>

		<Instructions show={showInstructions}
			text={`Add new deals here. Update deals here. This is the pipeline.`}/>

		<div className='g1'>
			<label className='label2'>
				Deal Found?
				<select className='input2'
					value={activity.convo_deal_found || ''}
					style={formatPresetStyle(activity.convo_deal_found)}
					onChange={e=>handleActivityChange('convo_deal_found',null,null,null, e.target.value)}>
						{optionsHash['deal found']}
				</select>
			</label>
		</div>

		<DevNotes show={showDevNotes}
			text={`table: deals; join table activities_deals; `} />
		{
			deals.length > 0 ? deals.map((d,i)=>{
				const date_deal = d.date_deal || {};
				const valueToPrint = isPrimitiveNumber(d.deal_value) ? `$${numberWithCommas(d.deal_value)}`: '';
				const gciToPrint = isPrimitiveNumber(d.deal_gci) ? `$${numberWithCommas(d.deal_gci)}`: '';

				return <div key={i} className='g2 g2-multi g2-deal'>
					{
						isPrimitiveNumber(d.id_deal) ?
							<label className='label3'>
								Select A Deal
								<select className='input3'
									value={d.id_deal || ''}
									style={formatStyle(d.id_deal)}
									onChange={e=>handleActivityChange('deals',i, 'id_deal',null, e.target.value)}>
										{optionsHash.deal}
								</select>
							</label> : null 
					}
					<label className='label3'>
						Deal Name
						<input className='input3'
							value={d.deal_name || ''}
							style={formatStyle(d.deal_name)}
							onChange={e=>handleActivityChange('deals', i, 'deal_name',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Property Address
						<input className='input3'
							value={d.deal_address || ''}
							style={formatStyle(d.deal_address)}
							onChange={e=>handleActivityChange('deals', i, 'deal_address',null, e.target.value)}/>
					</label>
					<label className='label3'>
						How I Found This Deal 
						<select className='input3'
							value={d.deal_how_found || ''}
							style={formatPresetStyle(d.deal_how_found)}
							onChange={e=>handleActivityChange('deals', i, 'deal_how_found',null, e.target.value)}>
								{optionsHash['deal activity']}
						</select>
						<select className='input3'
							value={d.deal_how_found_categ || ''}
							style={formatPresetStyle(d.deal_how_found_categ)}
							onChange={e=>handleActivityChange('deals', i, 'deal_how_found_categ',null, e.target.value)}>
								{optionsHash['deal discovered']}
						</select>
					</label>
					<label className='label3'>
						Trigger For A Move 
						<select className='input3'
							value={d.deal_trigger || ''}
							style={formatPresetStyle(d.deal_trigger)}
							onChange={e=>handleActivityChange('deals', i, 'deal_trigger',null, e.target.value)}>
								{optionsHash['deal move trigger']}
						</select>
					</label>
					<label className='label3'>
						Deal Type 
						<select className='input3'
							value={d.deal_type || ''}
							style={formatPresetStyle(d.deal_type)}
							onChange={e=>handleActivityChange('deals', i, 'deal_type',null, e.target.value)}>
								{optionsHash['deal type']}
						</select>
					</label>
					<label className='label3'>
						Deal Pipeline Stage 
						<select className='input3'
							value={d.deal_stage || ''}
							style={formatPresetStyle(d.deal_stage)}
							onChange={e=>handleActivityChange('deals', i, 'deal_stage',null, e.target.value)}>
								{optionsHash['deal pipeline stage']}
						</select>
					</label>
					<label className='label3'>
						Deal Timeline Stated
						<select className='input3'
							value={d.deal_timeline_stated || ''}
							style={formatPresetStyle(d.deal_timeline_stated)}
							onChange={e=>handleActivityChange('deals', i, 'deal_timeline_stated',null, e.target.value)}>
								{optionsHash['deal timeline stated']}
						</select>
					</label>
					<label className='label3'>
						Deal Timeline Status
						<select className='input3'
							value={d.deal_timeline_status || ''}
							style={formatPresetStyle(d.deal_timeline_status)}
							onChange={e=>handleActivityChange('deals', i, 'deal_timeline_status',null, e.target.value)}>
								{optionsHash['deal timeline status']}
						</select>
					</label>
						
					<p>Deal Projected For {date_deal.dateString}</p>
						
					<div className='date-container3'>
						<label className='label-d'>
							<select className='input-d'
								value={isPrimitiveNumber(date_deal.date_deal_month) ? date_deal.date_deal_month : ''}
								style={formatStyle(date_deal.date_deal_month, true)}
								onChange={e=>handleActivityChange('deals',i, 'date_deal','date_deal_month', e.target.value)}>
									{optionsHash.months}
							</select>
							Month
						</label>
						<label className='label-d'>
							<input className='input-d'
								type='number'
								value={date_deal.date_deal_day || ''}
								style={formatStyle(date_deal.date_deal_day)}
								onChange={e=>handleActivityChange('deals',i, 'date_deal','date_deal_day', e.target.value)}/>
							Day
						</label>
						<label className='label-d'>
							<input className='input-d'
								type='number'
								value={date_deal.date_deal_year || ''}
								style={formatStyle(date_deal.date_deal_year)}
								onChange={e=>handleActivityChange('deals',i, 'date_deal','date_deal_year', e.target.value)}/>
							Year
						</label>
					</div>

					<label className='label3'>
						Deal Value {valueToPrint}
						<input className='input3'
							type='number'
							value={d.deal_value || ''}
							style={formatStyle(d.deal_value)}
							onChange={e=>handleActivityChange('deals', i, 'deal_value',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Deal Value Status 
						<select className='input3'
							value={d.deal_value_status || ''}
							style={formatPresetStyle(d.deal_value_status)}
							onChange={e=>handleActivityChange('deals', i, 'deal_value_status',null, e.target.value)}>
								{optionsHash['deal value status']}
						</select>
					</label>
					<label className='label3'>
						Deal Commission Rate 
						<select className='input3'
							value={d.deal_commission_rate || ''}
							style={formatPresetStyle(d.deal_commission_rate)}
							onChange={e=>handleActivityChange('deals', i, 'deal_commission_rate',null, e.target.value)}>
								{optionsHash['deal commission']}
						</select>
					</label>
					<label className='label3'>
						Deal GCI {gciToPrint}
						<input className='input3'
							type='number'
							value={d.deal_gci || ''}
							readOnly />
					</label>
					<label className='label3'>
						Deal Notes
						<textarea className='input3 input-taller'
							value={d.deal_notes || ''}
							style={formatStyle(d.deal_notes)}
							onChange={e=>handleActivityChange('deals', i, 'deal_notes',null, e.target.value)}/>
					</label>

					<Instructions show={showInstructions}
						text={`Enter all relevant notes, motivations, conditions, obstacles, fears, wants, needs, and desires.`}/>

					<DevNotes show={showDevNotes}
						text={`id_agent ${d.id_agent}; id_deal ${d.id_deal}; id_deal_temp ${d.id_deal_temp}; id_ad ${d.id_ad};`} />
						
					{
						d.id_deal ?
						<div onClick={()=>openDeal(d.id_deal)} className='button4 button4-3'>
							<p className='button4-text'>
								Go To This Deal
							</p>
						</div> : null
					}

				</div>
			}) : null
		}
		
		{
			!!dealLinkButtonStatus ?
			<div onClick={()=>addDealToActivity()} className='button3'>
				<p className='button3-text'>ADD A DEAL</p>
			</div> : null 
		}

		<div className='divider'/>

		<h3 className='h2'>CONNECTIONS</h3>

		<Instructions show={showInstructions}
			text={`Connections were not party to your conversation. Example 1: In your conversation, your friend recommended that you call Pat, because Pat is considering buying a home. Pat would be a connection. Make a follow-up to call Pat. Example 2: Your contact refers a painter. Enter the painter as a connection. Then add a follow-up to contact the painter. Example 3: The painter replies with references. Then the painter is the contact, and the references are the connections. Make one follow-up to contact each reference.`}/>

		<DevNotes show={showDevNotes}
			text={`table contacts; join table connections (type: connection_record_type = "connection")`} />
		
		{
			connections.length > 0 ? connections.map((c,i)=>{
				const isAVP = !!vpBinaryHash[`${c.contact_vp_status}`];
				return <div key={i} className='g2 g2-multi contact-group'>
					<label className='label3'>
						Select A Contact
						<div className='input6-row'>
							{
								c.id_contact ? null : 
								<input className='input5A'
									value={activity.contactFilter || ''}
									onChange={e=>handleActivityChange('contactFilter',null,null,null, e.target.value)}/>
							}
							<select className={!c.id_contact ? 'input5B' : 'input3'}
								value={c.id_contact || ''}
								style={formatStyle(c.id_contact)}
								onChange={e=>handleActivityChange('connections',i,'id_contact',null, e.target.value)}>
									{c.id_contact ? optionsHash.contact : contactOptions}
							</select>
						</div>
					</label>
					{
						Array.isArray(newContactOptions) && newContactOptions.length > 0 ?
							<select className='input3'
								value={c.id_contact_temp || ''}
								style={formatStyle(c.id_contact_temp)}
								onChange={e=>handleActivityChange('connections',i,'id_contact_temp',null, e.target.value)}>
									{newContactOptions}
							</select> : null 
					}
					<label className='label3'>
						First Name
						<input className='input3'
							value={c.contact_name_first || ''}
							style={formatStyle(c.contact_name_first)}
							onChange={e=>handleActivityChange('connections',i,'contact_name_first',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Last Name
						<input className='input3'
							value={c.contact_name_last || ''}
							style={formatStyle(c.contact_name_last)}
							onChange={e=>handleActivityChange('connections',i,'contact_name_last',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Phone Number
						<input className='input3'
							value={c.contact_phone || ''}
							style={formatStyle(c.contact_phone)}
							onChange={e=>handleActivityChange('connections',i,'contact_phone',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Email
						<input className='input3'
							value={c.contact_email || ''}
							style={formatStyle(c.contact_email)}
							onChange={e=>handleActivityChange('connections',i,'contact_email',null, e.target.value)}/>
					</label>

					<label className='label3'> 
						Connection / Referral Type {/* SOI intro, VP referral, etc. */}
						<select className='input3'
							value={c.connection_type || ''}
							style={formatPresetStyle(c.connection_type)}
							onChange={e=>handleActivityChange('connections',i,'connection_type',null, e.target.value)}>
								{optionsHash['reference type']}
						</select>
					</label>
					<label className='label3'>
						How I FIRST Met {c.contact_name_first || 'Them'}
						<select className='input3'
							value={c.contact_how_met || ''}
							style={formatPresetStyle(c.contact_how_met)}
							onChange={e=>handleActivityChange('connections',i,'contact_how_met',null, e.target.value)}>
								{optionsHash['contact how met']}
						</select>
					</label>
					{
						referralHash[`${c.contact_how_met}`] ?
							<label className='label3'>
								{vpReferenceHash[`${c.connection_type}`] ? 'Which VP Sent Me' : 'Who First Introduced Me To'} {c.contact_name_first || 'Them'}?
									<div className='input5-row'>
										{ c.id_who_introduced ? null : 
											<input className='input5A'
												value={activity.contactFilter || ''}
												onChange={e=>handleActivityChange('contactFilter',null,null,null, e.target.value)}/>
										}
										<select className={!c.id_who_introduced ? 'input5B' : 'input3'}
											value={c.id_who_introduced || ''}
											style={formatPresetStyle(c.id_who_introduced)}
											onChange={e=>handleActivityChange('connections',i, 'id_who_introduced',null, e.target.value)}>
												{c.id_who_introduced ? optionsHash.contact : contactOptions}
										</select>
									</div>
								{
									!c.id_who_introduced && Array.isArray(newContactOptions) && newContactOptions.length > 0 ?
										<select className='input3'
											value={c.id_who_introduced_temp || ''}
											style={formatPresetStyle(c.id_who_introduced_temp)}
											onChange={e=>handleActivityChange('connections',i, 'id_who_introduced_temp',null, e.target.value)}>
												{newContactOptions}
										</select> : null 
								}
							</label> : null
					}
					<label className='label3'>
						Where I FIRST Met {c.contact_name_first || 'Them'}
						<select className='input3'
							value={c.contact_where_met || ''}
							style={formatPresetStyle(c.contact_where_met)}
							onChange={e=>handleActivityChange('connections',i,'contact_where_met',null, e.target.value)}>
								{optionsHash['contact where met']}
						</select>
						<textarea className='input3'
							value={c.contact_where_met_notes || ''}
							style={formatStyle(c.contact_where_met_notes)}
							onChange={e=>handleActivityChange('connections',i,'contact_where_met_notes',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Notes (sticks with contact)
						<textarea className='input3'
							value={c.contact_notes || ''}
							style={formatStyle(c.contact_notes)}
							onChange={e=>handleActivityChange('connections',i,'contact_notes',null, e.target.value)}/>
					</label>

					<label className='label3'>
						Referral Notes (only this instance)
						<textarea className='input3 input-taller'
							value={c.connection_notes || ''}
							style={formatStyle(c.connection_notes)}
							onChange={e=>handleActivityChange('connections',i,'connection_notes',null, e.target.value)}/>
					</label>
					<label className='label3'>
						Is A Vendor Partner?
						<select className='input3'
							value={c.contact_vp_status || ''}
							style={formatPresetStyle(c.contact_vp_status)}
							onChange={e=>handleActivityChange('connections',i,'contact_vp_status',null, e.target.value)}>
								{optionsHash['contact vp status']}
						</select>
					</label>
					{
						isAVP ?
							<label className='label3'>
								Vendor Partner Categories (separate using commas)
								<textarea className='input3'
									value={c.contact_vp_categories || ''}
									style={formatStyle(c.contact_vp_categories)}
									onChange={e=>handleActivityChange('connections',i,'contact_vp_categories',null, e.target.value)}/>
							</label> : null
					}
					{
						vpReferenceHash[`${c.connection_type}`] ?
							<label className='label3'>
								Vendor Partner Reference (sticks with vendor)
								<textarea className='input3 input-taller'
									value={c.connection_vp_reference || ''}
									style={formatStyle(c.connection_vp_reference)}
									onChange={e=>handleActivityChange('connections',i,'connection_vp_reference',null, e.target.value)}/>
							</label> : null 
					}

					<DevNotes show={showDevNotes}
						text={`id_agent ${c.id_agent}; id_activity_temp ${c.id_activity_temp}; id_contact ${c.id_contact}; id_contact_temp ${c.id_contact_temp}; id_connection ${c.id_connection}`} />
				
					{
						c.id_contact ?
						<div onClick={()=>openContact(c.id_contact)} className='button4 button4-3'>
							<p className='button4-text'>
								Go To This Contact
							</p>
						</div> : null
					}
				</div>
			}) : null
		}

		<div onClick={()=>addContactToActivity('connection')} className='button3'>
			<p className='button3-text'>ADD A CONNECTION</p>
		</div>

		<div className='divider'/>

		<h3 className='h2'>FOLLOW-UP</h3>

		<Instructions show={showInstructions}
			text={`Follow-up is the same as an activity. When you create a follow-up, you create an activity for a FUTURE date. The default date entered is 1 week from today; edit as needed. You can see you incomplete follow-ups, and then to complete them, do NOT create a new activity, just open the follow-up and edit like you edit any other activity.`}/>

		<DevNotes show={showDevNotes}
			text={`self-join table (activities) id_activity, id_activity_fu. FU is completed when main activity date is populated.`} />
		{
			fus.length > 0 ? fus.map((fu,i)=>{
				const date_fu = fu.date_fu || {};
				return <div key={i} className='g2 g2-multi g2-fu'>
					<p>Schedule Follow-Up For {date_fu.dateString}</p>
					<div className='date-container3'>
						<label className='label-d'>
							<select className='input-d'
								value={isPrimitiveNumber(date_fu.date_fu_month) ? date_fu.date_fu_month : ''}
								style={formatStyle(date_fu.date_fu_month, true)}
								onChange={e=>handleActivityChange('fus',i, 'date_fu', 'date_fu_month', e.target.value)}>
									{optionsHash.months}
							</select>
							Month
						</label>
						<label className='label-d'>
							<input className='input-d'
								type='number'
								value={date_fu.date_fu_day || ''}
								style={formatStyle(date_fu.date_fu_day)}
								onChange={e=>handleActivityChange('fus',i, 'date_fu', 'date_fu_day', e.target.value)}/>
							Day
						</label>
						<label className='label-d'>
							<input className='input-d'
								type='number'
								value={date_fu.date_fu_year || ''}
								style={formatStyle(date_fu.date_fu_year)}
								onChange={e=>handleActivityChange('fus',i, 'date_fu', 'date_fu_year', e.target.value)}/>
							Year
						</label>
					</div>
					<label className='label3'>
						Contact To Follow-Up With
						<div className='input6-row'>
							{ fu.id_contact_fu ? null : 
								<input className='input5A'
								value={activity.contactFilter || ''}
								onChange={e=>handleActivityChange('contactFilter',null,null,null, e.target.value)}/>
							}
							<select className={!fu.id_contact_fu ? 'input5B' : 'input3'}
								value={fu.id_contact_fu || ''}
								style={formatStyle(fu.id_contact_fu)}
								onChange={e=>handleActivityChange('fus',i, 'id_contact_fu',null, e.target.value)}>
									{fu.id_contact_fu ? optionsHash.contact : contactOptions}
							</select>
						</div>
						{
							!fu.id_contact_fu && Array.isArray(newContactOptions) && newContactOptions.length > 0 ?
								<select className='input3'
									value={fu.id_contact_fu_temp || ''}
									style={formatStyle(fu.id_contact_fu_temp)}
									onChange={e=>handleActivityChange('fus',i, 'id_contact_fu_temp',null, e.target.value)}>
										{newContactOptions}
								</select> : null 
						}
					</label>
					<label className='label3'>
						Type Of Follow-Up
						<select className='input3'
							value={fu.fu_purpose || ''}
							style={formatPresetStyle(fu.fu_purpose)}
							onChange={e=>handleActivityChange('fus',i, 'fu_purpose',null, e.target.value)}>
								{optionsHash['convo main purpose']}
						</select>
					</label>
					<label className='label3'>
						Related To A Deal?
						<select className='input3'
							value={fu.id_deal_fu || ''}
							style={formatStyle(fu.id_deal_fu)}
							onChange={e=>handleActivityChange('fus',i, 'id_deal_fu',null, e.target.value)}>
								{optionsHash.deal}
						</select>
						{
							!fu.id_deal_fu && Array.isArray(newDealOptions) && newDealOptions.length > 0 ?
								<select className='input3'
									value={fu.id_deal_fu_temp || ''}
									style={formatStyle(fu.id_deal_fu_temp)}
									onChange={e=>handleActivityChange('fus',i, 'id_deal_fu_temp',null, e.target.value)}>
										{newDealOptions}
								</select> : null 
						}
					</label>
					<label className='label3'>
						Notes For Follow-Up
						<textarea className='input3 input-taller'
							value={fu.fu_notes || ''}
							style={formatStyle(fu.fu_notes)}
							onChange={e=>handleActivityChange('fus',i, 'fu_notes',null, e.target.value)}/>
					</label>

					<DevNotes show={showDevNotes}
						text={[`THIS ACTIVITY: id_agent ${activity.id_agent}`,
							`id_activity ${activity.id_activity}`,
							`id_activity_temp ${activity.id_activity_temp}`]} />

					<DevNotes show={showDevNotes}
						text={[`FOLLOW-UP id_agent ${fu.id_agent}`,
							`id_activity ${fu.id_activity}`,
							`id_activity_temp ${fu.id_activity_temp}`,
							`id_activity_fu ${fu.id_activity_fu}`,
							`id_deal_fu ${fu.id_deal_fu}`,
							`id_deal_fu_temp ${fu.id_deal_fu_temp}`,
							`id_contact_fu ${fu.id_contact_fu}`,
							`id_contact_fu_temp ${fu.id_contact_fu_temp}`]} />
				
					{
						fu.id_activity ?
						<div onClick={()=>openActivity(fu.id_activity)} className='button4 button4-3'>
							<p className='button4-text'>
								Go To This Follow-Up
							</p>
						</div> : null
					}
				</div>
			}) : null
		}

		<div onClick={()=>addFuToActivity()} className='button3'>
			<p className='button3-text'>ADD A FOLLOW-UP	</p>
		</div>

		<div className='divider'/>
				
		<div onClick={()=>saveActivity()} className='button2'>
			<p className='button2-text'>SAVE</p>
		</div>
		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'activities' ?
			<div onClick={()=>listActivities()} className="button2">
				<p className="button2-text">Back to Activities List</p>
			</div> :
			<div onClick={()=>listFus()} className="button2">
				<p className="button2-text">Back to Follow-Up List</p>
			</div>
		}

		<Instructions show={showInstructions}
			text={`You may save at any point AFTER you enter at least one contact and a date. After saving, you remain on this screen until you click "BACK TO MAIN MENU". If you leave this page, you may return to the page and continue editing after you save. This page does not save real-time.`}/>
	</div>
}