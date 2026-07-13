import { useState } from 'react';
// import { precisionRound,
//   convertTimestampToString } from 'conjunction-junction';
import Instructions from './999-instructions';

export default function Proformae(props) {

	const {
		goToMainMenu,
		// vLItemsHash,
		proformae,
		// formatPresetStyle,
		formatStyle,
		handleProformaeChange,
		// optionsHash,
		saveProformae,
	} = props;


	// convertTimestampToString(d, 'dow d M y')
	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	return <div className='g1'>

		<h1 className='h1'>MY PROFORMAE</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
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


		<div className='g2'>

		<h3 className='h2'>REVENUE</h3>

			<label className='label3'>
				Average Sale Price
				<input className='input4'
					type='number'
					value={proformae.pf_sale_price || ''}
					style={formatStyle(proformae.pf_sale_price)}
					onChange={e=>handleProformaeChange('pf_sale_price', e.target.value)}/>
			</label>

			<label className='label3'>
				Average Commission Rate
				<input className='input4'
					type='number'
					value={proformae.pf_gci_pct || ''}
					style={formatStyle(proformae.pf_gci_pct)}
					onChange={e=>handleProformaeChange('pf_gci_pct', e.target.value)}/>
			</label>

			<label className='label3'>
				Average GCI Per Sale
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_gci_unit || ''}
					style={formatStyle(proformae.pf_gci_unit)}
					onChange={e=>handleProformaeChange('pf_gci_unit', e.target.value)}/>
			</label>

			<label className='label3'>
				Units Per Year
				<input className='input4'
					type='number'
					value={proformae.pf_units_year || ''}
					style={formatStyle(proformae.pf_units_year)}
					onChange={e=>handleProformaeChange('pf_units_year', e.target.value)}/>
			</label>

			<label className='label3'>
				GCI Per Year
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_gci_year || ''}
					style={formatStyle(proformae.pf_gci_year)}
					onChange={e=>handleProformaeChange('pf_gci_year', e.target.value)}/>
			</label>

		</div>
				
		<div className='divider'/>
				
		<div className='g2'>

		<h3 className='h2'>COSTS</h3>

			<label className='label3'>
				Annual Fees (Broker, Association, Etc.)
				<input className='input4'
					type='number'
					value={proformae.pf_fees_year || ''}
					style={formatStyle(proformae.pf_fees_year)}
					onChange={e=>handleProformaeChange('pf_fees_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Fees per Transaction (paid by agent)
				<input className='input4'
					type='number'
					value={proformae.pf_fees_unit || ''}
					style={formatStyle(proformae.pf_fees_unit)}
					onChange={e=>handleProformaeChange('pf_fees_unit', e.target.value)}/>
			</label>

			<label className='label3'>
				Broker Split (cap)
				<input className='input4'
					type='number'
					value={proformae.pf_broker_cap || ''}
					style={formatStyle(proformae.pf_broker_cap)}
					onChange={e=>handleProformaeChange('pf_broker_cap', e.target.value)}/>
			</label>

			<label className='label3'>
				Annual Business Expenses
				<input className='input4'
					type='number'
					value={proformae.pf_expenses_year || ''}
					style={formatStyle(proformae.pf_expenses_year)}
					onChange={e=>handleProformaeChange('pf_expenses_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Total Cost of Business
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_cost_year || ''}
					style={formatStyle(proformae.pf_cost_year)}
					onChange={e=>handleProformaeChange('pf_cost_year', e.target.value)}/>
			</label>
		</div>

		<div className='divider'/>
				
		<div className='g2'>

		<h3 className='h2'>PROFIT</h3>

			<label className='label3'>
				Annual Profit
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_profit_year || ''}
					style={formatStyle(proformae.pf_profit_year)}
					onChange={e=>handleProformaeChange('pf_profit_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Tax Rate
				<input className='input4'
					type='number'
					value={proformae.pf_tax_rate || ''}
					style={formatStyle(proformae.pf_tax_rate)}
					onChange={e=>handleProformaeChange('pf_tax_rate', e.target.value)}/>
			</label>

			<label className='label3'>
				Annual Take-Home Income
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_income_year || ''}
					style={formatStyle(proformae.pf_income_year)}
					onChange={e=>handleProformaeChange('pf_income_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Monthly Take-Home Income
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_income_month || ''}
					style={formatStyle(proformae.pf_income_month)}
					onChange={e=>handleProformaeChange('pf_income_month', e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>
				
		<h3 className='h2'>VOLUME</h3>

		<div className='g2'>
			<label className='label3'>
				Units Per Year (repeat)
				<input className='input4'
					type='number'
					value={proformae.pf_units_year || ''}
					style={formatStyle(proformae.pf_units_year)}
					onChange={e=>handleProformaeChange('pf_units_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Percent of Deals That Close
				<input className='input4'
					type='number'
					value={proformae.pf_close_pct || ''}
					style={formatStyle(proformae.pf_close_pct)}
					onChange={e=>handleProformaeChange('pf_close_pct', e.target.value)}/>
			</label>

			<label className='label3'>
				Deals Needed In Pipeline To Close {proformae.pf_units_year} Per Year
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_units_year_rev || ''}
					style={formatStyle(proformae.pf_units_year_rev)}
					onChange={e=>handleProformaeChange('pf_units_year_rev', e.target.value)}/>
			</label>

			<label className='label3'>
				Percent of Deals That Close This Year
				<input className='input4'
					type='number'
					value={proformae.pf_this_year_pct || ''}
					style={formatStyle(proformae.pf_this_year_pct)}
					onChange={e=>handleProformaeChange('pf_this_year_pct', e.target.value)}/>
			</label>

			<label className='label3'>
				Deals Needed In Pipeline To Close {proformae.pf_units_year} This Year
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_units_year_rev2 || ''}
					style={formatStyle(proformae.pf_units_year_rev2)}
					onChange={e=>handleProformaeChange('pf_units_year_rev2', e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>
				
		<div className='g2'>

			<h3 className='h2'>ACTIVITIES</h3>

			<label className='label3'>
				Conversations Per Deal (enter)
				<input className='input4'
					type='number'
					value={proformae.pf_convo_deal || ''}
					style={formatStyle(proformae.pf_convo_deal)}
					onChange={e=>handleProformaeChange('pf_convo_deal', e.target.value)}/>
			</label>

			<label className='label3'>
				Conversations Per Deal (calculated)
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_convo_deal_calc || ''}
					style={formatStyle(proformae.pf_convo_deal_calc)}
					onChange={e=>handleProformaeChange('pf_convo_deal_calc', e.target.value)}/>
			</label>

			<label className='label3'>
				Conversations Per Year
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_convo_year || ''}
					style={formatStyle(proformae.pf_convo_year)}
					onChange={e=>handleProformaeChange('pf_convo_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Weeks to Work Per Year
				<input className='input4'
					type='number'
					value={proformae.pf_work_weeks || ''}
					style={formatStyle(proformae.pf_work_weeks)}
					onChange={e=>handleProformaeChange('pf_work_weeks', e.target.value)}/>
			</label>

			<label className='label3'>
				Days to Work Per Week
				<input className='input4'
					type='number'
					value={proformae.pf_work_days_week || ''}
					style={formatStyle(proformae.pf_work_days_week)}
					onChange={e=>handleProformaeChange('pf_work_days_week', e.target.value)}/>
			</label>

			<label className='label3'>
				Days to Work Per Year
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_work_days_year || ''}
					style={formatStyle(proformae.pf_work_days_year)}
					onChange={e=>handleProformaeChange('pf_work_days_year', e.target.value)}/>
			</label>

			<label className='label3'>
				Conversations Per Day to Meet Goal (Min 2)
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_convo_day || ''}
					style={formatStyle(proformae.pf_convo_day)}
					onChange={e=>handleProformaeChange('pf_convo_day', e.target.value)}/>
			</label>

			<label className='label3'>
				Conversations Per Week to Meet Goal (Min 8)
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_convo_week || ''}
					style={formatStyle(proformae.pf_convo_week)}
					onChange={e=>handleProformaeChange('pf_convo_week', e.target.value)}/>
			</label>

			<label className='label3'>
				Conversations Per Month to Meet Goal
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_convo_month || ''}
					style={formatStyle(proformae.pf_convo_month)}
					onChange={e=>handleProformaeChange('pf_convo_month', e.target.value)}/>
			</label>

			<label className='label3'>
				Deals Per Week to Meet Goal
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_deals_week || ''}
					style={formatStyle(proformae.pf_deals_week)}
					onChange={e=>handleProformaeChange('pf_deals_week', e.target.value)}/>
			</label>

			<label className='label3'>
				Deals Per Month to Meet Goal
				<input className='input4'
					type='number'
					readOnly
					value={proformae.pf_deals_month || ''}
					style={formatStyle(proformae.pf_deals_month)}
					onChange={e=>handleProformaeChange('pf_deals_month', e.target.value)}/>
			</label>

		</div>

		<div onClick={()=>saveProformae()} className='button2'>
			<p className='button2-text'>SAVE</p>
		</div>
		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>

	</div>
}