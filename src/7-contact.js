import { convertTimestampToString, 
	isPrimitiveNumber,
numberWithCommas } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';
import Reminder from './999-reminder';
import Controls from './99-controls';

export default function Contact(props) {

	const {
		goToMainMenu,
		listContacts,
		listVPs,
		formatPresetStyle,
		formatStyle,
		saveContact,
		handleContactChange,
		handleVPCategorySelection,
		handleVPAreaSelection,
		openDeal,
		openActivity,
		contact,
		// vLItemsHash,
		vpBinaryHash,
		referralHash,
		optionsHash,
		modePrior,
		initiateVPApplication,
		sendVPApplication,
		markVPAppInReview,
		markVPAppComplete,
		reOpenVPAppForEditing,
		declineVPApp,
		missingVPData,
		initiateReferral,
		handleReferralBasket,
		referralBasket,
		// mode,
		contactsHash,
		vpAppEmailPreview,
		initiateVpAppCompletion,
		processVPReferences,
		vpAppStatusHash,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const c = contact;
	const activities = Array.isArray(c.activities) ? c.activities : [];
	const deals = Array.isArray(c.deals) ? c.deals : [];

	const contactOptions = !c.contactFilter ? optionsHash.contact :
		Array.isArray(optionsHash.contact) && typeof c.contactFilter === 'string' ? 
		optionsHash.contact.filter((o,i)=>{
			if(i===0){return true;}
			if(o.props && 
				typeof o.props.children === 'string' && 
				o.props.children[0] === c.contactFilter.toUpperCase()){
				return true;
			}
			return false;
		}) : optionsHash.contact;

	// 'not sent', 'sent', 'review', 'active', null (not a VP), false (denied or declined)
	const isAVP = vpBinaryHash[`${c.contact_vp_status}`];

	const vpApp = contact.vp_app || {};
	const vpAppExists = !!vpApp.id_vp_app;
	const vpAppStatus = vpApp.vp_app_status || 0;
	const vpAppStatusData = vpAppStatusHash[`${vpAppStatus}`] || {};
	const vpAppStatusLabel = vpAppStatusData.label || '';
	const vpAppLink = `${process.env.REACT_APP_VP_APP_URL}${vpApp.vp_temp_id}`;
	const v = vpAppEmailPreview;
	const vpAppEmailPreviewExists = Object.keys(vpAppEmailPreview).length > 0;

	const vpRefs = Array.isArray(contact.vp_refs) ? contact.vp_refs : [];
	const vpRefsExist = vpRefs.length > 0;

	const toggleReferralTo = () => {
		return handleReferralBasket('to',c.id_contact);
	};
	const toggleReferralInclude = () => {
		return handleReferralBasket('include',c.id_contact);
	};

	const remindMe = <p className='gentle-reminder'>{c.contact_name_first} {c.contact_name_last} {c.contact_company}</p>

	return <div className='g1'>

		<h1 className='h1'>CONTACT</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'vps' ? 
			<div onClick={()=>listVPs()} className="button2">
				<p className="button2-text">Back to List VPs</p>
			</div> :
			<div onClick={()=>listContacts()} className="button2">
				<p className="button2-text">Back to List Contacts</p>
			</div>
		}
		<Controls
			showInstructions={showInstructions}
			setShowInstructions={setShowInstructions}
			showDevNotes={showDevNotes}
			setShowDevNotes={setShowDevNotes}
			id_contact={contact.id_contact}
			toggleReferralTo={toggleReferralTo}
			toggleReferralInclude={toggleReferralInclude}
			initiateReferral={initiateReferral}
			referralBasket={referralBasket}
			contactsHash={contactsHash}
		/>
		

		<Instructions show={showInstructions}
			text={''}/>

		<h3 className='h2'>CONTACT</h3>

		<div className='g1'>
			<label className='label2'>
				First Name
				<input className='input2'
					value={c.contact_name_first || ''}
					style={formatStyle(c.contact_name_first)}
					onChange={e=>handleContactChange('contact_name_first', e.target.value)}/>
			</label>
			<label className='label2'>
				Last Name
				<input className='input2'
					value={c.contact_name_last || ''}
					style={formatStyle(c.contact_name_last)}
					onChange={e=>handleContactChange('contact_name_last', e.target.value)}/>
			</label>
			<label className='label2'>
				Company
				<input className='input2'
					value={c.contact_company || ''}
					style={formatStyle(c.contact_company)}
					onChange={e=>handleContactChange('contact_company', e.target.value)}/>
			</label>
			<label className='label2'>
				Title
				<input className='input2'
					value={c.contact_title || ''}
					style={formatStyle(c.contact_title)}
					onChange={e=>handleContactChange('contact_title', e.target.value)}/>
			</label>
		</div>
		
		<div className='divider'/>

		<h3 className='h2'>VENDOR PARTNER</h3>
		{remindMe}
		<div className='g1'>
			<label className='label2'>
				Is A Vendor Partner?
				<select className='input2'
					value={c.contact_vp_status || ''}
					style={formatPresetStyle(c.contact_vp_status)}
					onChange={e=>handleContactChange('contact_vp_status', e.target.value)}>
						{optionsHash['contact vp status']}
				</select>
			</label>
			{
				isAVP ?
					<label className='label2'>
						Vendor Partner Categories
						<div className='vp-categories-container'>
						{
							Array.isArray(c.contact_vp_categories) ?
							c.contact_vp_categories.map((c,i)=>{
								return <p key={i} className='vp-category'
									onClick={()=>handleVPCategorySelection(c)}>{c}</p>
							}): null
						}
						</div>
						<select className='input2'
							value={c.vpTempCategorySelection || ''}
							onChange={e=>handleVPCategorySelection(e.target.value)}>
								{optionsHash.vpCategories}
						</select>
					</label> : null
			}
			{
				isAVP ?
					<label className='label2'>
						Vendor Partner Service Area
						<div className='vp-categories-container'>
						{
							Array.isArray(c.contact_vp_areas) ?
							c.contact_vp_areas.map((c,i)=>{
								return <p key={i} className='vp-category'
									onClick={()=>handleVPAreaSelection(c)}>{c}</p>
							}): null
						}
						</div>
						<select className='input2'
							value={c.vpTempAreaSelection || ''}
							onChange={e=>handleVPAreaSelection(e.target.value)}>
								{optionsHash.vpAreas}
						</select>
					</label> : null
			}
			{
				isAVP ? <p className='p2'>Vendor Partner Application Status: {vpAppStatusLabel}</p> : null 
			}
			{
				vpAppExists ? <div className='button4'>
						<p className='button2-text'>
							<a href={vpAppLink} target="_blank" rel="noreferrer">
								Go To VP Application
							</a>
						</p>
					</div> : null
			}

			{
				!isAVP ? null :
				!vpAppExists ?
					<div onClick={()=>initiateVPApplication()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Initiate VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Not Sent' ?
					<div onClick={()=>sendVPApplication()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Send VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Sent To Vendor' ?
					<div onClick={()=>sendVPApplication()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Re-Send VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Returned - Review Not Started Yet' ?
					<div onClick={()=>markVPAppInReview()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Start Review / Lock App (Scroll Down)
						</p>
					</div> : 
				vpAppStatusLabel === 'In Review' ?
					<div onClick={()=>initiateVpAppCompletion()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Initiate Completion (Scroll Down)
						</p>
					</div> : 
				vpAppStatusLabel === 'Accepted / Active' ?
					<p className=' '>
						{vpAppStatusLabel}!! Send them business!
					</p> :
				vpAppStatusLabel === 'Not Participating' ?
					<p className=' '>
						{vpAppStatusLabel}
					</p> : 
				null 
			}
			{
				vpAppStatusLabel !== 'Not Sent' && vpAppStatusLabel !== 'Sent To Vendor' ?
				null :
					Array.isArray(missingVPData)?
						missingVPData.map((d,i)=>{
							return <p key={i} className='error'>{` `}Missing: {d}</p>
						}) : null
			}
			{
				vpAppStatusLabel === 'In Review' || 
				vpAppStatusLabel === 'Accepted / Active' ||
				vpAppStatusLabel === 'Not Participating' ?
					<div onClick={()=>reOpenVPAppForEditing()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Re-Open For Vendor Editing
						</p>
					</div> : 
					null 
			}
			{
				vpAppStatusLabel === 'Sent To Vendor' ||
				vpAppStatusLabel === 'Returned - Review Not Started Yet' ||
				vpAppStatusLabel === 'In Review' || 
				vpAppStatusLabel === 'Accepted / Active' ?
					<div onClick={()=>declineVPApp()} className='button4 button-with-margin'>
						<p className='button2-text'>
							Remove Vendor Partner from Program
						</p>
					</div> : 
					null 
			}

		</div>

		{
			vpAppExists && isAVP ?
			<div className='g1'>
				<h3 className='h2'>VP APPLICATION</h3>
				<div className='g2 g2-box g2-app'>
		
					<p className='p1 label-white'>Application Status: {vpAppStatusLabel}</p>
					{
						showDevNotes ? <div className='g2'>
							<p className='p1 label3 label-white'>ID: {vpApp.id_vp_app}</p>
							<p className='p1 label3 label-white'>Temp id: {vpApp.vp_temp_id || 'NONE'}</p>
							<p className='p1 label3 label-white'>Sent: {convertTimestampToString(vpApp.ts_sent, 'yyyy-mm-dd')}</p>
							<p className='p1 label3 label-white'>Re-Opened: {convertTimestampToString(vpApp.ts_open, 'yyyy-mm-dd')}</p>
							<p className='p1 label3 label-white'>Review: {convertTimestampToString(vpApp.ts_review, 'yyyy-mm-dd')}</p>
							<p className='p1 label3 label-white'>Active: {convertTimestampToString(vpApp.ts_active, 'yyyy-mm-dd')}</p>
							<p className='p1 label3 label-white'>Declined: {convertTimestampToString(vpApp.ts_decline, 'yyyy-mm-dd')}</p>
						</div>:
						null
					}
					<p>&nbsp;</p>

					<label className='label3 label-white'>
						Business Name
						<input className='input3'
							value={vpApp.vp_name_business || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						What type of business are you? (plumber, roofer, electrician, restaurant, etc)
						<textarea className='input3'
							value={vpApp.vp_type || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						Best Contact Person
						<input className='input3'
							value={vpApp.vp_contact_person || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						Business Phone Number
						<input className='input3'
							value={vpApp.vp_phone || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						Business Email
						<input className='input3'
							value={vpApp.vp_email || ''}
							readOnly/>
					</label>

					<label className='label3 label-white'>
						Website
						<input className='input3'
							value={vpApp.vp_url || ''}
							readOnly/>
					</label>

					<label className='label3 label-white'>
						What is your service area? We only want to refer you to customers in areas you service.	
						<textarea className='edit-input edit-textarea edit-input-wide-nest'
							value={vpApp.vp_area || ''}
							readOnly/>
					</label>

					<label className='label3 label-white'>
						Best URL/link we can send our clients to leave you an online review (Google, Yelp, Facebook, etc.)
						<input className='input3'
							value={vpApp.vp_review_url || ''}
							readOnly/>
					</label>

					<div className='divider'/>

					<label className='label3 label-white'>
						Do you agree to provide three past customers so we can place that 2 minute call and maintain integrity for our list?
						<select className='input3'
							value={vpApp.vp_agree || ''}
							readOnly >
								<option key={-1} value={' '}>{' '}</option>
								<option key={0} value={'Yes'}>{'Yes'}</option>
								<option key={1} value={'No'}>{'No'}</option>
						</select>
					</label>

					<label className='label3 label-white'>
						First Past Client We Can Contact For A Testimonial (Name & Phone Number)				
						<textarea className='edit-input edit-textarea edit-input-wide-nest'
							value={vpApp.vp_ref1 || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						Second Past Client We Can Contact For A Testimonial (Name & Phone Number)				
						<textarea className='edit-input edit-textarea edit-input-wide-nest'
							value={vpApp.vp_ref2 || ''}
							readOnly />
					</label>

					<label className='label3 label-white'>
						Third Past Client We Can Contact For A Testimonial (Name & Phone Number)				
						<textarea className='edit-input edit-textarea edit-input-wide-nest'
							value={vpApp.vp_ref3 || ''}
							readOnly />
					</label>
				</div>
						
			</div> : 
			null 
		}
		{
			isAVP && vpRefsExist ?
				<div className='g1'>
					<h3 className='h2'>VP REFERENCES</h3>
					{
						vpRefs.map((r,i)=>{
							return <div key={i} className='g2 g2-box g2-app'>
								<label className='label3 label-white'>
									Reference By
									<select className='edit-input edit-input-wide-nest'
										value={r.id_contact_fu || ''}
										style={formatStyle(r.id_contact_fu)}
										readOnly>
											{optionsHash.contact}
									</select>
								</label>
								<label className='label3 label-white'>
									The Reference (EXACTLY AS SENT OUT)		
									<textarea className='edit-input edit-textarea edit-input-wide-nest'
										value={r.convo_vp_ref || ''}
										readOnly />
								</label>
								<label className='label3 label-white'>
									Conversation Notes				
									<textarea className='edit-input edit-textarea edit-input-wide-nest'
										value={r.convo_notes || ''}
										readOnly />
								</label>
								<div className='button4 button4-3'>
									<p className='button4-text' onClick={()=>openActivity(r.id_activity)}>
										Go To This Activity
									</p>
								</div>
							</div>
						})
					}
				</div> : null 
		}

		{
			isAVP && vpRefsExist && vpAppStatusLabel === 'In Review' ?
			<div onClick={()=>processVPReferences(contact.id_contact)} className='button2'>
				<p className='button4-text'>
					Create Connections and Follow-Ups For All 3 VP References
				</p>
			</div> : null
		}

		{
			vpAppStatusLabel === 'In Review'  && vpAppEmailPreviewExists ?
				<div className='g2 g2-box g2-app'>
					<p className='label-white'>{v.sal} {v.name},</p>
					<br/>
					<p className='label-white'>{v.message}</p>
					<br/>
					<p className='label-white' style={{fontWeight: 'bold'}}>{v.co}</p>
					<p className='label-white'>{v.cat}</p>
					<p className='label-white'>{v.area}</p>
					<p className='label-white'>{v.poc}</p>
					<p className='label-white'>{v.ph}</p>
					<p className='label-white'>{v.em}</p>
					<p className='label-white'>{v.addr}</p>
					<p className='label-white'>{v.url}</p>

					<p>&nbsp;</p>
					<p className='label-white'>REFERENCES FOR {v.co.toUpperCase()}:</p>{
						Array.isArray(v.vp_refs) ? v.vp_refs.map((x,l)=>{
							return <div key={l} className='g2'>
								<p className='label-white p4'>{x.rev}</p>
								<p className='label-white p4 p4-right'>- {x.by}</p>
							</div>
						}) : null
					}
					<p className='label-white'>{v.rev} <a href={v.revUrl} target="_blank" rel="noreferrer">{v.revUrl}</a></p>
								
					<br/>

					<p className='label-white'>{v.note}</p>
						
				</div> : null
		}
		{
			vpAppStatusLabel === 'In Review'  && vpAppEmailPreviewExists ?
				<div onClick={()=>markVPAppComplete()} className='button4 button-with-margin'>
					<p className='button2-text'>
						Email VP and Mark App Complete
					</p>
				</div> : null
		}

		<div className='divider'/>

		<h3 className='h2'>CONTACT INFO</h3>
		{remindMe}
		<div className='g1'>
			<label className='label2'>
				Phone Number
				<input className='input2'
					value={c.contact_phone || ''}
					style={formatStyle(c.contact_phone)}
					onChange={e=>handleContactChange('contact_phone', e.target.value)}/>
			</label>
			<label className='label2'>
				Email
				<input className='input2'
					value={c.contact_email || ''}
					style={formatStyle(c.contact_email)}
					onChange={e=>handleContactChange('contact_email', e.target.value)}/>
			</label>
			<label className='label2'>
				URL
				<input className='input2'
					value={c.contact_url || ''}
					style={formatStyle(c.contact_url)}
					onChange={e=>handleContactChange('contact_url', e.target.value)}/>
			</label>
			{
				isAVP ? 
				<label className='label2'>
				Review URL
					<input className='input2'
						value={c.contact_review_url || ''}
						style={formatStyle(c.contact_review_url)}
						onChange={e=>handleContactChange('contact_review_url', e.target.value)}/>
				</label> : null 
			}
			<label className='label2'>
				Address
				<input className='input2'
					value={c.contact_address_street || ''}
					style={formatStyle(c.contact_address_street)}
					onChange={e=>handleContactChange('contact_address_street', e.target.value)}/>
			</label>
			<div className='input5-row'>
				<input className='input6A'
					value={c.contact_address_city || ''}
					style={formatStyle(c.contact_address_city)}
					onChange={e=>handleContactChange('contact_address_city', e.target.value)}/>
				<input className='input6B'
					value={c.contact_address_state || ''}
					style={formatStyle(c.contact_address_state)}
					onChange={e=>handleContactChange('contact_address_state', e.target.value)}/>
				<input className='input6C'
					value={c.contact_address_zip || ''}
					style={formatStyle(c.contact_address_zip)}
					onChange={e=>handleContactChange('contact_address_zip', e.target.value)}/>
			</div>
			
		</div>
		
		<div className='divider'/>

		<h3 className='h2'>HOW MET</h3>
		{remindMe}
		<div className='g1'>
			<label className='label2'>
				How I First Met {c.contact_name_first || 'Them'}
				<select className='input2'
					value={c.contact_how_met || ''}
					style={formatPresetStyle(c.contact_how_met)}
					onChange={e=>handleContactChange('contact_how_met', e.target.value)}>
						{optionsHash['contact how met']}
				</select>
			</label>
			{
				referralHash[`${c.contact_how_met}`] ?
					<label className='label2'>
						Who First Introduced Me To {c.contact_name_first || 'Them'}?
						<div className='input5-row'>
							{
								c.id_who_introduced ? null : 
								<input className='input5A'
									value={c.contactFilter || ''}
									onChange={e=>handleContactChange('contactFilter', e.target.value)}/>
							}
							<select className={!c.id_who_introduced ? 'input5B' : 'input2'}
								value={c.id_who_introduced || ''}
								style={formatStyle(c.id_who_introduced)}
								onChange={e=>handleContactChange( 'id_who_introduced', e.target.value)}>
									{c.id_who_introduced ? optionsHash.contact : contactOptions}
							</select>
						</div>
					</label> : null
			}
			<label className='label2'>
				Where I First Met {c.contact_name_first || 'Them'}
				<select className='input2'
					value={c.contact_where_met || ''}
					style={formatPresetStyle(c.contact_where_met)}
					onChange={e=>handleContactChange('contact_where_met', e.target.value)}>
						{optionsHash['contact where met']}
				</select>
				<textarea className='input2'
					value={c.contact_where_met_notes || ''}
					onChange={e=>handleContactChange('contact_where_met_notes', e.target.value)}/>
			</label>
		</div>

		<div className='divider'/>

		<h3 className='h2'>NOTES</h3>
		{remindMe}
		<div className='g1'>
			{ isAVP ? null : <p>Birthday</p>}
			{ isAVP ? null :
			<div className='date-container2'>	
				<label className='label-d'>
					<select className='input-d'
						value={isPrimitiveNumber(c.contact_birth_month) ? c.contact_birth_month : ''}
						style={formatStyle(c.contact_birth_month, true)}
						onChange={e=>handleContactChange('contact_birth_month', e.target.value)}>
							{optionsHash.months}
					</select>
					Month
				</label>
				<label className='label-d'>
					<input className='input-d'
						type='number'
						value={c.contact_birth_day || ''}
						style={formatStyle(c.contact_birth_day)}
						onChange={e=>handleContactChange('contact_birth_day', e.target.value)}/>
					Day
				</label>
				<label className='label-d'>
					<input className='input-d'
						type='number'
						value={c.contact_birth_year || ''}
						style={formatStyle(c.contact_birth_year)}
						onChange={e=>handleContactChange('contact_birth_year', e.target.value)}/>
					Year
				</label>
			</div> }
			<label className='label2'>
				Tags
				<textarea className='input2 input-taller'
					value={c.contact_tags || ''}
					style={formatStyle(c.contact_tags)}
					onChange={e=>handleContactChange('contact_tags', e.target.value)}/>
			</label>
			<label className='label2'>
				Notes (sticks with contact)
				<textarea className='input2 input-taller'
					value={c.contact_notes || ''}
					onChange={e=>handleContactChange('contact_notes', e.target.value)}/>
			</label>
		</div>
		
		<div className='divider'/>

		<h3 className='h2'>DEALS</h3>
		{remindMe}
		<Reminder show={true}
			text={'Deals are read only here. Edit via Activity.'} />

		{
			deals.map((d,i)=>{
				const valueToPrint = isPrimitiveNumber(d.deal_value) ? `$${numberWithCommas(d.deal_value)}`: '';
				const gciToPrint = isPrimitiveNumber(d.deal_gci) ? `$${numberWithCommas(d.deal_gci)}`: '';
				const dateString = convertTimestampToString(d.date_deal_timestamp, 'dow d M y');
				
				return <div key={i} className='g2 g2-box g2-deal'>

					<label className='label3'>
						Deal Name
						<input className='input3'
							value={d.deal_name || ''}
							style={formatStyle(d.deal_name)}
							readOnly />
					</label>
					<label className='label3'>
						Property Address
						<input className='input3'
							value={d.deal_address || ''}
							style={formatStyle(d.deal_address)}
							readOnly />
					</label>
				
					<label className='label3'>
						Trigger For A Move 
						<select className='input3'
							value={d.deal_trigger || ''}
							style={formatPresetStyle(d.deal_trigger)}
							readOnly >
								{optionsHash['deal move trigger']}
						</select>
					</label>
					<label className='label3'>
						Deal Type 
						<select className='input3'
							value={d.deal_type || ''}
							style={formatPresetStyle(d.deal_type)}
							readOnly >
								{optionsHash['deal type']}
						</select>
					</label>
					<label className='label3'>
						Deal Pipeline Stage 
						<select className='input3'
							value={d.deal_stage || ''}
							style={formatPresetStyle(d.deal_stage)}
							readOnly >
								{optionsHash['deal pipeline stage']}
						</select>
					</label>
					<label className='label3'>
						Deal Timeline Status
						<select className='input3'
							value={d.deal_timeline_status || ''}
							style={formatPresetStyle(d.deal_timeline_status)}
							readOnly >
								{optionsHash['deal timeline status']}
						</select>
					</label>
					<label className='label3'>
						Deal Projected For {d.dateString}
						<input className='input3'
							value={dateString || ''}
							style={formatStyle(dateString)}
							readOnly />
					</label>
					<label className='label3'>
						Deal Value {valueToPrint}
						<input className='input3'
							type='number'
							value={d.deal_value || ''}
							style={formatStyle(d.deal_value)}
							readOnly />
					</label>
					<label className='label3'>
						Deal Value Status 
						<select className='input3'
							value={d.deal_value_status || ''}
							style={formatPresetStyle(d.deal_value_status)}
							readOnly >
								{optionsHash['deal value status']}
						</select>
					</label>
					<label className='label3'>
						Deal Commission Rate 
						<select className='input3'
							value={d.deal_commission_rate || ''}
							style={formatPresetStyle(d.deal_commission_rate)}
							readOnly >
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
							readOnly />
					</label>

					<div onClick={()=>openDeal(d.id_deal)} className='button4 button4-3'>
						<p className='button4-text'>
							Go To This Deal
						</p>
					</div>

				</div>
			})
		}

		<div className='divider'/>

		<h3 className='h2'>ACTIVITIES</h3>
		{remindMe}
		<Reminder show={true}
			text={'Activities are read only here. Edit via Activity.'} />

		{
			activities.map((a,i)=>{
				const dateString = convertTimestampToString(a.date_convo_timestamp, 'dow d M y');

				return <div key={i} className='g2 g2-box g2-fu'>
					<label className='label3'>
						<input className='input3'
							style={formatStyle(dateString)}
							value={dateString || ''}
							readOnly />
						<select className='input3'
							value={a.convo_main_purpose || ''}
							style={formatPresetStyle(a.convo_main_purpose)}
							readOnly >
								{optionsHash['convo main purpose']}
						</select>
						<select className='input3'
							value={a.convo_method || ''}
							style={formatPresetStyle(a.convo_method)}
							readOnly >
								{optionsHash['convo method']}
						</select>
					</label>
					<label className='label3'>
						Conversation Notes
						<textarea className='input3 input-taller'
							value={a.convo_notes || ''}
							readOnly />
					</label>

					<div onClick={()=>openActivity(a.id_activity)} className='button4 button4-3'>
						<p className='button4-text'>
							Go To This Activity
						</p>
					</div>

				</div>

			})
		}

		<div className='divider'/>
				
		<div onClick={()=>saveContact()} className='button2'>
			<p className='button2-text'>SAVE</p>
		</div>
		{
			modePrior === 'vps' ? 
			<div onClick={()=>listVPs()} className="button2">
				<p className="button2-text">Back to List VPs</p>
			</div> :
			modePrior === 'contacts' ?
			<div onClick={()=>listContacts()} className="button2">
				<p className="button2-text">Back to List Contacts</p>
			</div> : null
		}
		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
	</div>
}