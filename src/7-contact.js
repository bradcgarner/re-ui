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
		formatPresetStyle,
		formatStyle,
		saveContact,
		handleContactChange,
		openDeal,
		openActivity,
		contact,
		// valueListsHash,
		referralHash,
		optionsHash,
		vpStatusHash,
		modePrior,
		// mode,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const c = contact;
	const activities = Array.isArray(c.activities) ? c.activities : [];
	const deals = Array.isArray(c.deals) ? c.deals : [];

	return <div className='display-group'>

		<h2 className='page-header'>CONTACT</h2>

		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'vps' ? 
			<div onClick={()=>listContacts(true)} className="major-button">
				<p className="major-button-text">Back to List VPs</p>
			</div> :
			<div onClick={()=>listContacts()} className="major-button">
				<p className="major-button-text">Back to List Contacts</p>
			</div>
		}
		<div onClick={()=>setShowInstructions(!showInstructions)} className='small-button'>
			<p className='small-button-text'>
				{showInstructions ? 'Hide Instructions' : 'Show Instructions'}	
			</p>
		</div>
		<p>&nbsp;</p>
		<div onClick={()=>setShowDevNotes(!showDevNotes)} className='small-button'>
			<p className='small-button-text'>
				{showDevNotes ? 'Hide Dev Notes' : 'Show Dev Notes'}	
			</p>
		</div>

		<Instructions show={showInstructions}
			text={''}/>

		<div className='display-group'>
			<label className='edit-label'>
				First Name
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_name_first || ''}
					style={formatStyle(c.contact_name_first)}
					onChange={e=>handleContactChange('contact_name_first', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Last Name
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_name_last || ''}
					style={formatStyle(c.contact_name_last)}
					onChange={e=>handleContactChange('contact_name_last', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Phone Number
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_phone || ''}
					style={formatStyle(c.contact_phone)}
					onChange={e=>handleContactChange('contact_phone', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Email
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_email || ''}
					style={formatStyle(c.contact_email)}
					onChange={e=>handleContactChange('contact_email', e.target.value)}/>
			</label>
			<label className='edit-label'>
				How I First Met {c.contact_name_first || 'Them'}
				<select className='edit-input edit-input-wide-nest'
					value={c.contact_how_met || ''}
					style={formatPresetStyle(c.contact_how_met)}
					onChange={e=>handleContactChange('contact_how_met', e.target.value)}>
						{optionsHash['contact how met']}
				</select>
			</label>
			<label className='edit-label'>
				Where I First Met {c.contact_name_first || 'Them'}
				<select className='edit-input edit-input-wide-nest'
					value={c.contact_where_met || ''}
					style={formatPresetStyle(c.contact_where_met)}
					onChange={e=>handleContactChange('contact_where_met', e.target.value)}>
						{optionsHash['contact where met']}
				</select>
				<textarea className='edit-input edit-input-wide-nest'
					value={c.contact_where_met_notes || ''}
					onChange={e=>handleContactChange('contact_where_met_notes', e.target.value)}/>
			</label>
			{
				referralHash[`${c.contact_how_met}`] ?
					<label className='edit-label'>
						Who First Introduced Me To {c.contact_name_first || 'Them'}?
						<select className='edit-input edit-input-wide-nest'
							value={c.id_who_introduced || ''}
							style={formatPresetStyle(c.id_who_introduced)}
							onChange={e=>handleContactChange( 'id_who_introduced', e.target.value)}>
								{optionsHash.contact}
						</select>
					</label> : null
			}
			<label className='edit-label'>
				Vendor Partner Status
				<select className='edit-input edit-input-wide-nest'
					value={c.contact_vp_status || ''}
					style={formatPresetStyle(c.contact_vp_status)}
					onChange={e=>handleContactChange('contact_vp_status', e.target.value)}>
						{optionsHash['contact vp status']}
				</select>
			</label>
			{
				vpStatusHash[`${c.contact_vp_status}`] ?
					<label className='edit-label'>
						Vendor Partner Categories (separate using commas)
						<textarea className='edit-input edit-input-wide-nest'
							value={c.contact_vp_categories || ''}
							onChange={e=>handleContactChange('contact_vp_categories', e.target.value)}/>
					</label> : null
			}

			<label className='edit-label'>
				Company
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_company || ''}
					style={formatStyle(c.contact_company)}
					onChange={e=>handleContactChange('contact_company', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Title
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_title || ''}
					style={formatStyle(c.contact_title)}
					onChange={e=>handleContactChange('contact_title', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Tags
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_tags || ''}
					style={formatStyle(c.contact_tags)}
					onChange={e=>handleContactChange('contact_tags', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Street Address
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_address_street || ''}
					style={formatStyle(c.contact_address_street)}
					onChange={e=>handleContactChange('contact_address_street', e.target.value)}/>
			</label>
			<label className='edit-label'>
				City
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_address_city || ''}
					style={formatStyle(c.contact_address_city)}
					onChange={e=>handleContactChange('contact_address_city', e.target.value)}/>
			</label>
			<label className='edit-label'>
				State
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_address_state || ''}
					style={formatStyle(c.contact_address_state)}
					onChange={e=>handleContactChange('contact_address_state', e.target.value)}/>
			</label>
			<label className='edit-label'>
				Zip
				<input className='edit-input edit-input-wide-nest'
					value={c.contact_address_zip || ''}
					style={formatStyle(c.contact_address_zip)}
					onChange={e=>handleContactChange('contact_address_zip', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Notes (sticks with contact)
				<textarea className='edit-input edit-input-wide-nest'
					value={c.contact_notes || ''}
					onChange={e=>handleContactChange('contact_notes', e.target.value)}/>
			</label>

		</div>

		<div className='display-group'>
			<p>Birthday</p>
			<div className='date-container'>	
				<label className='edit-label'>
					<select className='edit-input edit-input-date'
						value={isPrimitiveNumber(c.contact_birth_month) ? c.contact_birth_month : ''}
						style={formatStyle(c.contact_birth_month, true)}
						onChange={e=>handleContactChange('contact_birth_month', e.target.value)}>
							{optionsHash.months}
					</select>
					Month
				</label>
				<label className='edit-label'>
					<input className='edit-input edit-input-date'
						type='number'
						value={c.contact_birth_day || ''}
						style={formatStyle(c.contact_birth_day)}
						onChange={e=>handleContactChange('contact_birth_day', e.target.value)}/>
					Day
				</label>
				<label className='edit-label'>
					<input className='edit-input edit-input-date'
						type='number'
						value={c.contact_birth_year || ''}
						style={formatStyle(c.contact_birth_year)}
						onChange={e=>handleContactChange('contact_birth_year', e.target.value)}/>
					Year
				</label>
			</div>
		</div>

		<div className='divider'/>

		<h3 className='group-header'>DEALS</h3>

		<Reminder show={true}
			text={'Deals are read only here. Edit via Activity.'} />

		{
			deals.map((d,i)=>{
				const valueToPrint = isPrimitiveNumber(d.deal_value) ? `$${numberWithCommas(d.deal_value)}`: '';
				const gciToPrint = isPrimitiveNumber(d.deal_gci) ? `$${numberWithCommas(d.deal_gci)}`: '';
				const dateString = convertTimestampToString(d.date_deal_timestamp, 'dow d M y');
				
				return <div key={i} className='display-group display-multi-group deal-group'>

					<label className='edit-label'>
						Deal Name
						<input className='edit-input edit-input-wide-nest'
							value={d.deal_name || ''}
							style={formatStyle(d.deal_name)}
							readOnly />
					</label>
					<label className='edit-label'>
						Property Address
						<input className='edit-input edit-input-wide-nest'
							value={d.deal_address || ''}
							style={formatStyle(d.deal_address)}
							readOnly />
					</label>
				
					<label className='edit-label'>
						Trigger For A Move 
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_trigger || ''}
							style={formatPresetStyle(d.deal_trigger)}
							readOnly >
								{optionsHash['deal move trigger']}
						</select>
					</label>
					<label className='edit-label'>
						Deal Type 
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_type || ''}
							style={formatPresetStyle(d.deal_type)}
							readOnly >
								{optionsHash['deal type']}
						</select>
					</label>
					<label className='edit-label'>
						Deal Pipeline Stage 
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_stage || ''}
							style={formatPresetStyle(d.deal_stage)}
							readOnly >
								{optionsHash['deal pipeline stage']}
						</select>
					</label>
					<label className='edit-label'>
						Deal Timeline Status
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_timeline_status || ''}
							style={formatPresetStyle(d.deal_timeline_status)}
							readOnly >
								{optionsHash['deal timeline status']}
						</select>
					</label>
					<label className='edit-label'>
						Deal Projected For {d.dateString}
						<input className='edit-input edit-input-wide-nest'
							value={dateString || ''}
							style={formatStyle(dateString)}
							readOnly />
					</label>
					<label className='edit-label'>
						Deal Value {valueToPrint}
						<input className='edit-input edit-input-wide-nest'
							type='number'
							value={d.deal_value || ''}
							style={formatStyle(d.deal_value)}
							readOnly />
					</label>
					<label className='edit-label'>
						Deal Value Status 
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_value_status || ''}
							style={formatPresetStyle(d.deal_value_status)}
							readOnly >
								{optionsHash['deal value status']}
						</select>
					</label>
					<label className='edit-label'>
						Deal Commission Rate 
						<select className='edit-input edit-input-wide-nest'
							value={d.deal_commission_rate || ''}
							style={formatPresetStyle(d.deal_commission_rate)}
							readOnly >
								{optionsHash['deal commission']}
						</select>
					</label>
					<label className='edit-label'>
						Deal GCI {gciToPrint}
						<input className='edit-input edit-input-wide-nest'
							type='number'
							value={d.deal_gci || ''}
							readOnly />
					</label>
					<label className='edit-label'>
						Deal Notes
						<textarea className='edit-input edit-input-wide-nest edit-textarea'
							value={d.deal_notes || ''}
							readOnly />
					</label>

					<div onClick={()=>openDeal(d.id_deal)} className='small-button'>
						<p className='small-button-text'>
							Go To This Deal
						</p>
					</div>

				</div>
			})
		}

		<div className='divider'/>

		<h3 className='group-header'>ACTIVITIES</h3>

		<Reminder show={true}
			text={'Activities are read only here. Edit via Activity.'} />

		{
			activities.map((a,i)=>{
				const dateString = convertTimestampToString(a.date_convo_timestamp, 'dow d M y');

				return <div className='display-group display-multi-group fu-group'>
					<label className='edit-label'>
						<input className='edit-input edit-input-wide-nest'
							style={formatStyle(dateString)}
							value={dateString || ''}
							readOnly />
						<select className='edit-input edit-input-wide'
							value={a.convo_main_purpose || ''}
							style={formatPresetStyle(a.convo_main_purpose)}
							readOnly >
								{optionsHash['convo main purpose']}
						</select>
						<select className='edit-input edit-input-wide'
							value={a.convo_method || ''}
							style={formatPresetStyle(a.convo_method)}
							readOnly >
								{optionsHash['convo method']}
						</select>
					</label>
					<label className='edit-label'>
						Conversation Notes
						<textarea className='edit-input edit-input-wide edit-textarea'
							value={a.convo_notes || ''}
							readOnly />
					</label>

					<div onClick={()=>openActivity(a.id_activity)} className='small-button'>
						<p className='small-button-text'>
							Go To This Activity
						</p>
					</div>

				</div>

			})
		}

		<div className='divider'/>
				
		<div onClick={()=>saveContact()} className='major-button'>
			<p className='major-button-text'>SAVE</p>
		</div>
		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'vps' ? 
			<div onClick={()=>listContacts(true)} className="major-button">
				<p className="major-button-text">Back to List VPs</p>
			</div> :
			<div onClick={()=>listContacts()} className="major-button">
				<p className="major-button-text">Back to List Contacts</p>
			</div>
		}
	</div>
}