import { convertTimestampToString,
	isPrimitiveNumber,
	numberWithCommas
 } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';
import DevNotes from './999-dev-notes';
import Reminder from './999-reminder';

export default function Deal(props) {

	const {
		goToMainMenu,
		handleDealChange,
		listDeals,
		deal,
		// vLItemsHash,
		formatPresetStyle,
		formatStyle,
		saveDeal,
		optionsHash,
		referralHash,
		openActivity,
		vpBinaryHash,
		openContact,
		modePrior,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const d = deal;
	const activities = Array.isArray(d.activities) ? d.activities : [];
	const contacts = Array.isArray(d.contacts) ? d.contacts : [];

	const date_deal = d.date_deal || {};
	const valueToPrint = isPrimitiveNumber(d.deal_value) ? `$${numberWithCommas(d.deal_value)}`: '';
	const gciToPrint = isPrimitiveNumber(d.deal_gci) ? `$${numberWithCommas(d.deal_gci)}`: '';

	return <div className='g1'>

		<h1 className='h1'>DEAL</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		<div onClick={()=>listDeals()} className="button2">
			<p className="button2-text">Back to List Deals</p>
		</div>
		<div onClick={()=>setShowInstructions(!showInstructions)} className='button4'>
			<p className='button2-text'>
				{showInstructions ? 'Hide Instructions' : 'Show Instructions'}	
			</p>
		</div>
		<p>&nbsp;</p>
		<div onClick={()=>setShowDevNotes(!showDevNotes)} className='button4'>
			<p className='button2-text'>
				{showDevNotes ? 'Hide Dev Notes' : 'Show Dev Notes'}	
			</p>
		</div>

		<Instructions show={showInstructions}
			text={''}/>

		<div className='g1'>

			<label className='label2'>
				Deal Name
				<input className='input2'
					value={d.deal_name || ''}
					style={formatStyle(d.deal_name)}
					onChange={e=>handleDealChange('deal_name', e.target.value)}/>
			</label>
			<label className='label2'>
				Property Address
				<input className='input2'
					value={d.deal_address || ''}
					style={formatStyle(d.deal_address)}
					onChange={e=>handleDealChange('deal_address', e.target.value)}/>
			</label>
			<label className='label2'>
				How I Found This Deal 
				<select className='input2'
					value={d.deal_how_found || ''}
					style={formatPresetStyle(d.deal_how_found)}
					onChange={e=>handleDealChange('deal_how_found', e.target.value)}>
						{optionsHash['deal activity']}
				</select>
				<select className='input2'
					value={d.deal_how_found_categ || ''}
					style={formatPresetStyle(d.deal_how_found_categ)}
					onChange={e=>handleDealChange('deal_how_found_categ', e.target.value)}>
						{optionsHash['deal discovered']}
				</select>
			</label>
			<label className='label2'>
				Trigger For A Move 
				<select className='input2'
					value={d.deal_trigger || ''}
					style={formatPresetStyle(d.deal_trigger)}
					onChange={e=>handleDealChange('deal_trigger', e.target.value)}>
						{optionsHash['deal move trigger']}
				</select>
			</label>
			<label className='label2'>
				Deal Type 
				<select className='input2'
					value={d.deal_type || ''}
					style={formatPresetStyle(d.deal_type)}
					onChange={e=>handleDealChange('deal_type', e.target.value)}>
						{optionsHash['deal type']}
				</select>
			</label>
			<label className='label2'>
				Deal Pipeline Stage 
				<select className='input2'
					value={d.deal_stage || ''}
					style={formatPresetStyle(d.deal_stage)}
					onChange={e=>handleDealChange('deal_stage', e.target.value)}>
						{optionsHash['deal pipeline stage']}
				</select>
			</label>
			<label className='label2'>
				Deal Timeline Stated
				<select className='input2'
					value={d.deal_timeline_stated || ''}
					style={formatPresetStyle(d.deal_timeline_stated)}
					onChange={e=>handleDealChange('deal_timeline_stated', e.target.value)}>
						{optionsHash['deal timeline stated']}
				</select>
			</label>
			<label className='label2'>
				Deal Timeline Status
				<select className='input2'
					value={d.deal_timeline_status || ''}
					style={formatPresetStyle(d.deal_timeline_status)}
					onChange={e=>handleDealChange('deal_timeline_status', e.target.value)}>
						{optionsHash['deal timeline status']}
				</select>
			</label>

			<p>Deal Projected For {date_deal.dateString}</p>
			<div className='date-container2'>
				<label className='label-d'>
					<select className='input-d'
						value={isPrimitiveNumber(date_deal.date_deal_month) ? date_deal.date_deal_month : ''}
						style={formatStyle(date_deal.date_deal_month, true)}
						onChange={e=>handleDealChange('date_deal_month', e.target.value)}>
							{optionsHash.months}
					</select>
					Month
				</label>
				<label className='label-d'>
					<input className='input-d'
						type='number'
						value={date_deal.date_deal_day || ''}
						style={formatStyle(date_deal.date_deal_day)}
						onChange={e=>handleDealChange('date_deal_day', e.target.value)}/>
					Day
				</label>
				<label className='label-d'>
					<input className='input-d'
						type='number'
						value={date_deal.date_deal_year || ''}
						style={formatStyle(date_deal.date_deal_year)}
						onChange={e=>handleDealChange('date_deal_year', e.target.value)}/>
					Year
				</label>
			</div>
			
			<label className='label2'>
				Deal Value {valueToPrint}
				<input className='input2'
					type='number'
					value={d.deal_value || ''}
					style={formatStyle(d.deal_value)}
					onChange={e=>handleDealChange('deal_value', e.target.value)}/>
			</label>
			<label className='label2'>
				Deal Value Status 
				<select className='input2'
					value={d.deal_value_status || ''}
					style={formatPresetStyle(d.deal_value_status)}
					onChange={e=>handleDealChange('deal_value_status', e.target.value)}>
						{optionsHash['deal value status']}
				</select>
			</label>
			<label className='label2'>
				Deal Commission Rate 
				<select className='input2'
					value={d.deal_commission_rate || ''}
					style={formatPresetStyle(d.deal_commission_rate)}
					onChange={e=>handleDealChange('deal_commission_rate', e.target.value)}>
						{optionsHash['deal commission']}
				</select>
			</label>
			<label className='label2'>
				Deal GCI {gciToPrint}
				<input className='input2'
					type='number'
					value={d.deal_gci || ''}
					readOnly />
			</label>
			<label className='label2'>
				Deal Notes
				<textarea className='input2 input-taller'
					value={d.deal_notes || ''}
					onChange={e=>handleDealChange('deal_notes', e.target.value)}/>
			</label>

			<Instructions show={showInstructions}
				text={`Enter all relevant notes, motivations, conditions, obstacles, fears, wants, needs, and desires.`}/>

			<DevNotes show={showDevNotes}
				text={`id_agent {d.id_agent}; id_deal {d.id_deal}; id_deal_temp {d.id_deal_temp}; id_ad {d.id_ad};`} />
				
		</div>

		<div className='divider'/>

		<h3 className='h2'>CONTACTS</h3>

		<Reminder show={true}
			text={'Contacts are read only here. Edit via Activity.'} />

		{
			contacts.map((c,i)=>{

				const isAVP = vpBinaryHash[`${c.contact_vp_status}`];

				return <div key={i} className='g2 g2-multi contact-group'>
					<label className='label3'>
						<input className='input4'
							value={c.contact_name_first || ''}
							style={formatStyle(c.contact_name_first)}
							readOnly/>
						<input className='input4'
							value={c.contact_name_last || ''}
							style={formatStyle(c.contact_name_last)}
							readOnly/>
					</label>
					{
						referralHash[`${c.contact_how_met}`] ?
							<label className='label3'>
								Who First Introduced Me To {c.contact_name_first || 'Them'}?
								<select className='input4'
									value={c.id_who_introduced || ''}
									style={formatPresetStyle(c.id_who_introduced)}
									readOnly>
										{optionsHash.contact}
								</select>
							</label> : null
					}
					<label className='label3'>
						Is A Vendor Partner?
						<select className='input4'
							value={c.contact_vp_status || ''}
							style={formatPresetStyle(c.contact_vp_status)}
							readOnly>
								{optionsHash['contact vp status']}
						</select>
					</label>
					{
						isAVP ?
							<label className='label3'>
								Vendor Partner Categories (separate using commas)
								<textarea className='input4'
									value={c.contact_vp_categories || ''}
									readOnly/>
							</label> : null
					}
					<label className='label3'>
						Notes (sticks with contact)
						<textarea className='input4'
							value={c.contact_notes || ''}
							readOnly/>
					</label>

					<Instructions show={showInstructions}
						text={`Enter any notes that you'll want to put into your contacts, such as Google Contacts or Outlook, if you use those.`}/>

					<DevNotes show={showDevNotes}
						text={`id_contact: ${c.id_contact}; id_contact_temp: ${c.id_contact_temp}; id_connection: ${c.id_connection}`} />
				
					<div onClick={()=>openContact(c.id_contact)} className='button4 button4-3'>
						<p className='button4-text'>
							Go To This Contact
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
							value={a.convo_method || ''}
							style={formatPresetStyle(a.convo_method)}
							readOnly >
								{optionsHash['convo method']}
						</select>
						<select className='input3'
							value={a.convo_main_purpose || ''}
							style={formatPresetStyle(a.convo_main_purpose)}
							readOnly >
								{optionsHash['convo main purpose']}
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
				
		<div onClick={()=>saveDeal()} className='button2'>
			<p className='button2-text'>SAVE</p>
		</div>
		{
			modePrior === 'deals' ? 
			<div onClick={()=>listDeals()} className="button2">
				<p className="button2-text">Back to List Deals</p>
			</div> :
			null
		}

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
	</div>
}