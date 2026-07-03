import { useState } from 'react';
import { precisionRound,
  convertTimestampToString } from 'conjunction-junction';
import Instructions from './999-instructions';
import { isPrimitiveNumber } from 'conjunction-junction/build/basic';

export default function DailyPlan(props) {

	const {
		goToMainMenu,
		listDailyPlans,
		valueListsHash,
		dailyPlan,
		formatPresetStyle,
		formatStyle,
		handleDailyPlanChange,
		optionsHash,
		saveDailyPlan,
		proformae
	} = props;

	const dateDailyPlan = dailyPlan.date_dp || {};

	// convertTimestampToString(d, 'dow d M y')
	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);


	const quickStats = {
		dealsWeeklyNeeded: proformae.pf_deals_week,
		dealsWeeklyFound: 1,
		dealsMonthlyNeeded: proformae.pf_deals_month,
		dealsMonthlyFound: 2,
		convosWeeklyNeeded: proformae.pf_convo_week,
		convosWeeklyDone: 2,
		convosMonthlyNeeded: proformae.pf_convo_month,
		convosMonthlyDone: 6,	
	};

	const colorDone = '#2193c9';
	const colorNot = '#e6f2ff';

	const weeklyFoundPct = Math.min(precisionRound(
		quickStats.dealsWeeklyFound/quickStats.dealsWeeklyNeeded, 2) * 100, 100);
	const monthlyFoundPct = Math.min(precisionRound(
		quickStats.dealsMonthlyFound/quickStats.dealsMonthlyNeeded, 2) * 100, 100);
	const weeklyDonePct = Math.min(precisionRound(
		quickStats.convosWeeklyDone/quickStats.convosWeeklyNeeded, 2) * 100, 100);
	const monthlyDonePct = Math.min(precisionRound(
		quickStats.convosMonthlyDone/quickStats.convosMonthlyNeeded, 2) * 100, 100);


	return <div className='display-group'>

		<h2 className='page-header'>DAILY PLAN</h2>

		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>
		<div onClick={()=>listDailyPlans()} className="major-button">
			<p className="major-button-text">Back to List Daily Plans</p>
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

		<h3 className='group-header'>DATE</h3>
		
		<div className='display-group'>
			<p>{dateDailyPlan.dateString}</p>
			<div className='date-container'>	
				<label className='edit-label'>
					<select className='edit-input edit-input-date'
						value={isPrimitiveNumber(dateDailyPlan.date_dp_month) ? dateDailyPlan.date_dp_month : ''}
						style={formatStyle(dateDailyPlan.date_dp_month, true)}
						onChange={e=>handleDailyPlanChange('date_dp_month', e.target.value)}>
							{optionsHash.months}
					</select>
					Month
				</label>
				<label className='edit-label'>
					<input className='edit-input edit-input-date'
						type='number'
						value={dateDailyPlan.date_dp_day || ''}
						style={formatStyle(dateDailyPlan.date_dp_day)}
						onChange={e=>handleDailyPlanChange('date_dp_day', e.target.value)}/>
					Day
				</label>
				<label className='edit-label'>
					<input className='edit-input edit-input-date'
						type='number'
						value={dateDailyPlan.date_dp_year || ''}
						style={formatStyle(dateDailyPlan.date_dp_year)}
						onChange={e=>handleDailyPlanChange('date_dp_year', e.target.value)}/>
					Year
				</label>
			</div>
		</div>

		<div className='divider'/>

		<h3 className='group-header'>CENTERING</h3>
		
		<Instructions show={showInstructions}
		  text={'Select 3 of your core values, and rate how you feel about each today.'}/>

		<div className='display-group'>
			<label className='edit-label'>
				Core Value
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_1 || ''}
					style={formatStyle(dailyPlan.dp_cv_1)}
					onChange={e=>handleDailyPlanChange('dp_cv_1', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_1_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_1_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_1_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='edit-label'>
				Core Value
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_2 || ''}
					style={formatStyle(dailyPlan.dp_cv_2)}
					onChange={e=>handleDailyPlanChange('dp_cv_2', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_2_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_2_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_2_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='edit-label'>
				Core Value
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_3 || ''}
					style={formatStyle(dailyPlan.dp_cv_3)}
					onChange={e=>handleDailyPlanChange('dp_cv_3', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_cv_3_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_3_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_3_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='edit-label'>
				Mindset
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_mindset || ''}
					style={formatPresetStyle(dailyPlan.dp_mindset)}
					onChange={e=>handleDailyPlanChange('dp_mindset', e.target.value)}>
						{optionsHash['mindset']}
				</select>
			</label>

			<Instructions show={showInstructions}
				text={'Write specifically about what you plan to do today that affects your future self. How are you feeling about your path to somewhere very specific?</span> What are you doing to get there?'}/>

			<label className='edit-label'>
				Today My Future Self Says 
				<textarea className='edit-textarea-tall edit-input-wide-nest'
					value={dailyPlan.dp_future_self || ''}
					onChange={e=>handleDailyPlanChange('dp_future_self', e.target.value)}/>
			</label>	

		</div>



		<div className='divider'/>
				
		<h3 className='group-header'>CONSISTENCY</h3>

		{
			showInstructions? 
			<div className='display-group'>
				<p className='instructions' >
					Use the system consistently. Enter convos. Recap convos. Check follow-ups to put them into your plan. Do the follow-ups.
				</p>
			</div> : null 
		}

		<div className='display-group'>

			<label className='edit-label'>
				All Convos From Yesterday Are Entered
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_convo_enter || ''}
					style={formatPresetStyle(dailyPlan.dp_convo_enter)}
					onChange={e=>handleDailyPlanChange('dp_convo_enter', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='edit-label'>
				All Convos From Yesterday Are Recapped
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_convo_recap || ''}
					style={formatPresetStyle(dailyPlan.dp_convo_recap)}
					onChange={e=>handleDailyPlanChange('dp_convo_recap', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='edit-label'>
				All Contacts From Yesterday In Google Contacts
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_contacts_entered || ''}
					style={formatPresetStyle(dailyPlan.dp_contacts_entered)}
					onChange={e=>handleDailyPlanChange('dp_contacts_entered', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='edit-label'>
				All Follow-Ups for Today Are Reviewed
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_fu_review || ''}
					style={formatPresetStyle(dailyPlan.dp_fu_review)}
					onChange={e=>handleDailyPlanChange('dp_fu_review', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='edit-label'>
				Calendar Is Updated With All Appointments
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_calendar || ''}
					style={formatPresetStyle(dailyPlan.dp_calendar)}
					onChange={e=>handleDailyPlanChange('dp_calendar', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

		</div>

		<div className='divider'/>
				
		<h3 className='group-header'>RECAP YESTERDAY</h3>

		<div className='display-group'>
			<label className='edit-label'>
				How Did Yesterday Go?
				<select className='edit-input edit-input-wide-nest'
					value={dailyPlan.dp_yesterday_status || ''}
					style={formatPresetStyle(dailyPlan.dp_yesterday_status)}
					onChange={e=>handleDailyPlanChange('dp_yesterday_status', e.target.value)}>
						{optionsHash['ranking']}
				</select>
				<textarea className='edit-textarea edit-input-wide-nest'
					value={dailyPlan.dp_yesterday_notes || ''}
					onChange={e=>handleDailyPlanChange('dp_yesterday_notes', e.target.value)}/>
			</label>


		</div>
		<div className='divider'/>
				
		<h3 className='group-header'>PLAN FOR TODAY</h3>

		<div className='display-group'>

			<label className='edit-label'>
				Conversation Goal (number)
				<input className='edit-input edit-input-wide-nest'
					type='number'
					value={dailyPlan.dp_convo_goal || ''}
					style={formatStyle(dailyPlan.dp_convo_goal)}
					onChange={e=>handleDailyPlanChange('dp_convo_goal', e.target.value)}/>
			</label>

			<label className='edit-label'>
				VP I Am Looking For 
				<textarea className='edit-textarea edit-input-wide-nest'
					value={dailyPlan.dp_vp_seeking || ''}
					onChange={e=>handleDailyPlanChange('dp_vp_seeking', e.target.value)}/>
			</label>	

			<div className='display-group'>
				<p className='instructions'>
					Talk plan ideas: People I know, past clients, vendor partners, vendor partner references, opportunity pipeline calls, daily contact problem solving calls
				</p>
			</div>
			<p>&nbsp;</p>

			<label className='edit-label'>
				Talk Plan Today 
				<textarea className='edit-textarea-tall edit-input-wide-nest'
					value={dailyPlan.dp_talk_plan || ''}
					onChange={e=>handleDailyPlanChange('dp_talk_plan', e.target.value)}/>
			</label>	

			<label className='edit-label'>
				Service Priorities Today 
				<textarea className='edit-textarea edit-input-wide-nest'
					value={dailyPlan.dp_svc_priority || ''}
					onChange={e=>handleDailyPlanChange('dp_svc_priority', e.target.value)}/>
			</label>	

			<label className='edit-label'>
				Stabilization Plan (if applicable)
				<textarea className='edit-textarea edit-input-wide-nest'
					value={dailyPlan.dp_stabilize_plan || ''}
					onChange={e=>handleDailyPlanChange('dp_stabilize_plan', e.target.value)}/>
			</label>	

			<label className='edit-label'>
				White Space (if applicable)
				<textarea className='edit-textarea edit-input-wide-nest'
					value={dailyPlan.dp_white_space || ''}
					onChange={e=>handleDailyPlanChange('dp_white_space', e.target.value)}/>
			</label>	
		</div>

		<div className='divider'/>

		<h3 className='group-header'>TRACKING SNAPSHOT</h3>
		
		<div className='display-group'>

			<figure className='pie-chart pie-chart-weekly-deals'>
				<h2>Deals Per Week</h2>
				<figcaption>
					Found {quickStats.dealsWeeklyFound}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStats.dealsWeeklyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-monthly-deals'>
				<h2>Deals Per Month</h2>
				<figcaption>
					Found {quickStats.dealsMonthlyFound}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStats.dealsMonthlyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-weekly-convos'>
				<h2>Conversations Per Week</h2>
				<figcaption>
					Done {quickStats.convosWeeklyDone}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStats.convosWeeklyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-monthly-convos'>
				<h2>Conversations Per Month</h2>
				<figcaption>
					Done {quickStats.convosMonthlyDone}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStats.convosMonthlyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

		</div>

		<div className='divider'/>
				
		<div onClick={()=>saveDailyPlan()} className='major-button'>
			<p className='major-button-text'>SAVE</p>
		</div>
		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>

		<style>{`
			.pie-chart-weekly-deals {
				background:
				radial-gradient(
					circle closest-side,
					transparent 66%,
					white 0
				),
				conic-gradient(
					${colorDone} 0,
					${colorDone} ${weeklyFoundPct}%,
					${colorNot} 0,
					${colorNot} 100%
			);
		}
			.pie-chart-monthly-deals {
				background:
				radial-gradient(
					circle closest-side,
					transparent 66%,
					white 0
				),
				conic-gradient(
					${colorDone} 0,
					${colorDone} ${monthlyFoundPct}%,
					${colorNot} 0,
					${colorNot} 100%
			);
		}
		.pie-chart-weekly-convos {
				background:
				radial-gradient(
					circle closest-side,
					transparent 66%,
					white 0
				),
				conic-gradient(
					${colorDone} 0,
					${colorDone} ${weeklyDonePct}%,
					${colorNot} 0,
					${colorNot} 100%
			);
		}
			.pie-chart-monthly-convos {
				background:
				radial-gradient(
					circle closest-side,
					transparent 66%,
					white 0
				),
				conic-gradient(
					${colorDone} 0,
					${colorDone} ${monthlyDonePct}%,
					${colorNot} 0,
					${colorNot} 100%
			);
		}
	`}</style>
	</div>
}