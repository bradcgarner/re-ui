import { convertTimestampToString, 
	isPrimitiveNumber,
numberWithCommas } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';
import Reminder from './999-reminder';

export default function Contact(props) {

	const {
		goToMainMenu,
		listContacts,
		listVPs,
		formatPresetStyle,
		formatStyle,
		saveContact,
		handleContactChange,
		openDeal,
		openActivity,
		contact,
		// valueListsHash,
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
		// mode,
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
	const vpAppStatusHash = vpApp.vpAppStatusHash || {};
	const vpAppStatus = vpApp.vp_app_status || 0;
	const vpAppStatusData = vpAppStatusHash[`${vpAppStatus}`] || {};
	const vpAppStatusLabel = vpAppStatusData.label || '';
	const vpAppStatusText = vpAppStatusData.text || '';
	const vpAppLink = `${process.env.REACT_APP_VP_APP_URL}${vpApp.vp_temp_id}`;

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
		<p>&nbsp;</p>

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
				isAVP ? <p className='p2'>Vendor Partner Application Status: {vpAppStatusLabel}</p> : null 
			}
			{
				vpAppExists ? <div className='button4'>
						<p className='button2-text'>
							<a href={vpAppLink} target="_blank">
								Go To VP Application
							</a>
						</p>
					</div> : null
			}

			{
				!isAVP ? null :
				!vpAppExists ?
					<div onClick={()=>initiateVPApplication()} className='button4'>
						<p className='button2-text'>
							Initiate VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Not Sent' ?
					<div onClick={()=>sendVPApplication()} className='button4'>
						<p className='button2-text'>
							Send VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Sent To Vendor' ?
					<div onClick={()=>sendVPApplication()} className='button4'>
						<p className='button2-text'>
							Re-Send VP Application
						</p>
					</div> : 
				vpAppStatusLabel === 'Returned - Review Not Started Yet' ?
					<div onClick={()=>markVPAppInReview()} className='button4'>
						<p className='button2-text'>
							Mark Review As Started (Lock App For Editing)
						</p>
					</div> : 
				vpAppStatusLabel === 'In Review' ?
					<div onClick={()=>markVPAppComplete()} className='button4'>
						<p className='button2-text'>
							Mark Review As Complete (Start Referring)
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
				vpAppStatusLabel === 'In Review' || 
				vpAppStatusLabel === 'Accepted / Active' ||
				vpAppStatusLabel === 'Not Participating' ?
					<div onClick={()=>reOpenVPAppForEditing()} className='button4'>
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
					<div onClick={()=>declineVPApp()} className='button4'>
						<p className='button2-text'>
							Remove Vendor Partner from Program
						</p>
					</div> : 
					null 
			}
			{
				isAVP ?
					<label className='label2'>
						Vendor Partner Categories (separate using commas)
						<textarea className='input2 input-taller'
							value={c.contact_vp_categories || ''}
							onChange={e=>handleContactChange('contact_vp_categories', e.target.value)}/>
					</label> : null
			}
		</div>

		<div className='divider'/>

		<h3 className='h2'>CONTACT INFO</h3>

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

		<Reminder show={true}
			text={'Deals are read only here. Edit via Activity.'} />

		{
			deals.map((d,i)=>{
				const valueToPrint = isPrimitiveNumber(d.deal_value) ? `$${numberWithCommas(d.deal_value)}`: '';
				const gciToPrint = isPrimitiveNumber(d.deal_gci) ? `$${numberWithCommas(d.deal_gci)}`: '';
				const dateString = convertTimestampToString(d.date_deal_timestamp, 'dow d M y');
				
				return <div key={i} className='g2 g2-multi g2-deal'>

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

		<Reminder show={true}
			text={'Activities are read only here. Edit via Activity.'} />

		{
			activities.map((a,i)=>{
				const dateString = convertTimestampToString(a.date_convo_timestamp, 'dow d M y');

				return <div className='g2 g2-multi g2-fu'>
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
	</div>
}