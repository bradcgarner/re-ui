import { useState } from 'react';
import { precisionRound,
  convertTimestampToString } from 'conjunction-junction';
import Instructions from './999-instructions';

export default function Proformae(props) {

	const {
		goToMainMenu,
		valueListsHash,
		proformae,
		formatPresetStyle,
		formatStyle,
		handleProformaeChange,
		optionsHash,
		saveProformae,
	} = props;


	// convertTimestampToString(d, 'dow d M y')
	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	return <div className='display-group'>

		<h2 className='page-header'>MY PROFORMAE</h2>

		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>
		<div onClick={()=>setShowInstructions(!showInstructions)} className='small-button'>
			<p className='major-button-text'>
				{showInstructions ? 'Hide Instructions' : 'Show Instructions'}	
			</p>
		</div>
		<p>&nbsp;</p>
		<div onClick={()=>setShowDevNotes(!showDevNotes)} className='small-button'>
			<p className='major-button-text'>
				{showDevNotes ? 'Hide Dev Notes' : 'Show Dev Notes'}	
			</p>
		</div>

		<Instructions show={showInstructions}
		  text={''}/>


		<div className='display-group'>

		<h3 className='group-header'>REVENUE</h3>

			<label className='edit-label'>
				Average Sale Price
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_sale_price || ''}
					style={formatStyle(proformae.pf_sale_price)}
					onChange={e=>handleProformaeChange('pf_sale_price', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Average Commission Rate
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_gci_pct || ''}
					style={formatStyle(proformae.pf_gci_pct)}
					onChange={e=>handleProformaeChange('pf_gci_pct', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Average GCI Per Sale
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_gci_unit || ''}
					style={formatStyle(proformae.pf_gci_unit)}
					onChange={e=>handleProformaeChange('pf_gci_unit', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Units Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_units_year || ''}
					style={formatStyle(proformae.pf_units_year)}
					onChange={e=>handleProformaeChange('pf_units_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				GCI Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_gci_year || ''}
					style={formatStyle(proformae.pf_gci_year)}
					onChange={e=>handleProformaeChange('pf_gci_year', e.target.value)}/>
			</label>

		</div>
				
		<div className='divider'/>
				
		<div className='display-group'>

		<h3 className='group-header'>COSTS</h3>

			<label className='edit-label'>
				Annual Fees (Broker, Association, Etc.)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_fees_year || ''}
					style={formatStyle(proformae.pf_fees_year)}
					onChange={e=>handleProformaeChange('pf_fees_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Fees per Transaction (paid by agent)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_fees_unit || ''}
					style={formatStyle(proformae.pf_fees_unit)}
					onChange={e=>handleProformaeChange('pf_fees_unit', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Broker Split (cap)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_broker_cap || ''}
					style={formatStyle(proformae.pf_broker_cap)}
					onChange={e=>handleProformaeChange('pf_broker_cap', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Annual Business Expenses
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_expenses_year || ''}
					style={formatStyle(proformae.pf_expenses_year)}
					onChange={e=>handleProformaeChange('pf_expenses_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Total Cost of Business
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_cost_year || ''}
					style={formatStyle(proformae.pf_cost_year)}
					onChange={e=>handleProformaeChange('pf_cost_year', e.target.value)}/>
			</label>
		</div>

		<div className='divider'/>
				
		<div className='display-group'>

		<h3 className='group-header'>PROFIT</h3>

			<label className='edit-label'>
				Annual Profit
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_profit_year || ''}
					style={formatStyle(proformae.pf_profit_year)}
					onChange={e=>handleProformaeChange('pf_profit_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Tax Rate
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_tax_rate || ''}
					style={formatStyle(proformae.pf_tax_rate)}
					onChange={e=>handleProformaeChange('pf_tax_rate', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Annual Take-Home Income
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_income_year || ''}
					style={formatStyle(proformae.pf_income_year)}
					onChange={e=>handleProformaeChange('pf_income_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Monthly Take-Home Income
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_income_month || ''}
					style={formatStyle(proformae.pf_income_month)}
					onChange={e=>handleProformaeChange('pf_income_month', e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>
				
		<h3 className='group-header'>VOLUME</h3>

		<div className='display-group'>
			<label className='edit-label'>
				Units Per Year (repeat)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_units_year || ''}
					style={formatStyle(proformae.pf_units_year)}
					onChange={e=>handleProformaeChange('pf_units_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Percent of Deals That Close
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_close_pct || ''}
					style={formatStyle(proformae.pf_close_pct)}
					onChange={e=>handleProformaeChange('pf_close_pct', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Deals Needed In Pipeline To Close {proformae.pf_units_year} Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_units_year_rev || ''}
					style={formatStyle(proformae.pf_units_year_rev)}
					onChange={e=>handleProformaeChange('pf_units_year_rev', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Percent of Deals That Close This Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_this_year_pct || ''}
					style={formatStyle(proformae.pf_this_year_pct)}
					onChange={e=>handleProformaeChange('pf_this_year_pct', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Deals Needed In Pipeline To Close {proformae.pf_units_year} This Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_units_year_rev2 || ''}
					style={formatStyle(proformae.pf_units_year_rev2)}
					onChange={e=>handleProformaeChange('pf_units_year_rev2', e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>
				
		<div className='display-group'>

			<h3 className='group-header'>ACTIVITIES</h3>

			<label className='edit-label'>
				Conversations Per Deal (enter)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_convo_deal || ''}
					style={formatStyle(proformae.pf_convo_deal)}
					onChange={e=>handleProformaeChange('pf_convo_deal', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Conversations Per Deal (calculated)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_convo_deal_calc || ''}
					style={formatStyle(proformae.pf_convo_deal_calc)}
					onChange={e=>handleProformaeChange('pf_convo_deal_calc', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Conversations Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_convo_year || ''}
					style={formatStyle(proformae.pf_convo_year)}
					onChange={e=>handleProformaeChange('pf_convo_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Weeks to Work Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_work_weeks || ''}
					style={formatStyle(proformae.pf_work_weeks)}
					onChange={e=>handleProformaeChange('pf_work_weeks', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Days to Work Per Week
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={proformae.pf_work_days_week || ''}
					style={formatStyle(proformae.pf_work_days_week)}
					onChange={e=>handleProformaeChange('pf_work_days_week', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Days to Work Per Year
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_work_days_year || ''}
					style={formatStyle(proformae.pf_work_days_year)}
					onChange={e=>handleProformaeChange('pf_work_days_year', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Conversations Per Day to Meet Goal (Min 2)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_convo_day || ''}
					style={formatStyle(proformae.pf_convo_day)}
					onChange={e=>handleProformaeChange('pf_convo_day', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Conversations Per Week to Meet Goal (Min 8)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_convo_week || ''}
					style={formatStyle(proformae.pf_convo_week)}
					onChange={e=>handleProformaeChange('pf_convo_week', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Conversations Per Month to Meet Goal
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_convo_month || ''}
					style={formatStyle(proformae.pf_convo_month)}
					onChange={e=>handleProformaeChange('pf_convo_month', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Deals Per Week to Meet Goal
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_deals_week || ''}
					style={formatStyle(proformae.pf_deals_week)}
					onChange={e=>handleProformaeChange('pf_deals_week', e.target.value)}/>
			</label>

			<label className='edit-label'>
				Deals Per Month to Meet Goal
				<input className='edit-input edit-input-wide-nest'
					type='number'
					readOnly
					value={proformae.pf_deals_month || ''}
					style={formatStyle(proformae.pf_deals_month)}
					onChange={e=>handleProformaeChange('pf_deals_month', e.target.value)}/>
			</label>

		</div>

		<div onClick={()=>saveProformae()} className='major-button'>
			<p className='major-button-text'>SAVE</p>
		</div>
		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>

	</div>
}