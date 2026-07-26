import { useState } from 'react';
import { precisionRound,
  convertTimestampToString,
isPrimitiveNumber } from 'conjunction-junction';
import Instructions from './999-instructions';
import { colorsHash } from './0-colors';
import Controls from './99-controls';

export default function DailyPlan(props) {

	const {
		goToMainMenu,
		listDailyPlans,
		dailyPlan,
		formatPresetStyle,
		formatStyle,
		handleDailyPlanChange,
		optionsHash,
		saveDailyPlan,
		listFus,
		proformae,
		fus,
		modePrior,
		loadDpPrior,
		dpPrior,
		quickStats,
	} = props;

	const dateDailyPlan = dailyPlan.date_dp || {};

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const quickStatsWithPf = {
		dealsWeeklyNeeded: proformae.pf_deals_week,
		dealsWeeklyFound: quickStats.dealsWeek || 0,
		dealsMonthlyNeeded: proformae.pf_deals_month,
		dealsMonthlyFound: quickStats.dealsMonth || 0,
		convosWeeklyNeeded: proformae.pf_convo_week,
		convosWeeklyDone: quickStats.convosWeek || 0,
		convosMonthlyNeeded: proformae.pf_convo_month,
		convosMonthlyDone: quickStats.convosMonth || 0,	
	};

	const colorDone = colorsHash.good7;
	const colorNot = colorsHash.good1;

	const weeklyFoundPct = Math.min(precisionRound(
		quickStatsWithPf.dealsWeeklyFound/quickStatsWithPf.dealsWeeklyNeeded, 2) * 100, 100);
	const monthlyFoundPct = Math.min(precisionRound(
		quickStatsWithPf.dealsMonthlyFound/quickStatsWithPf.dealsMonthlyNeeded, 2) * 100, 100);
	const weeklyDonePct = Math.min(precisionRound(
		quickStatsWithPf.convosWeeklyDone/quickStatsWithPf.convosWeeklyNeeded, 2) * 100, 100);
	const monthlyDonePct = Math.min(precisionRound(
		quickStatsWithPf.convosMonthlyDone/quickStatsWithPf.convosMonthlyNeeded, 2) * 100, 100);

	const hasFus = Array.isArray(fus) && fus.length > 0;

	return <div className='g1'>

		<h1 className='h1'>DAILY PLAN</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		<div onClick={()=>listDailyPlans()} className="button2">
			<p className="button2-text">Back to List Daily Plans</p>
		</div>
		<Controls
			showInstructions={showInstructions}
			setShowInstructions={setShowInstructions}
			showDevNotes={showDevNotes}
			setShowDevNotes={setShowDevNotes}
		/>

		<Instructions show={showInstructions}
		  text={''}/>

		<h3 className='h2'>DATE</h3>
		
		<p>{dateDailyPlan.dateString}</p>
		<div className='date-container2'>	
			<label className='label-d'>
				<select className='input-d'
					value={isPrimitiveNumber(dateDailyPlan.date_dp_month) ? dateDailyPlan.date_dp_month : ''}
					style={formatStyle(dateDailyPlan.date_dp_month, true)}
					onChange={e=>handleDailyPlanChange('date_dp_month', e.target.value)}>
						{optionsHash.months}
				</select>
				Month
			</label>
			<label className='label-d'>
				<input className='input-d'
					type='number'
					value={dateDailyPlan.date_dp_day || ''}
					style={formatStyle(dateDailyPlan.date_dp_day)}
					onChange={e=>handleDailyPlanChange('date_dp_day', e.target.value)}/>
				Day
			</label>
			<label className='label-d'>
				<input className='input-d'
					type='number'
					value={dateDailyPlan.date_dp_year || ''}
					style={formatStyle(dateDailyPlan.date_dp_year)}
					onChange={e=>handleDailyPlanChange('date_dp_year', e.target.value)}/>
				Year
			</label>
		</div>

		<div className='divider'/>

		<h3 className='h2'>CENTERING</h3>
		
		<Instructions show={showInstructions}
		  text={'Select 3 of your core values, and rate how you feel about each today.'}/>

		<div className='g2'>
			<label className='label3'>
				Core Value
				<select className='input3'
					value={dailyPlan.dp_cv_1 || ''}
					style={formatStyle(dailyPlan.dp_cv_1)}
					onChange={e=>handleDailyPlanChange('dp_cv_1', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='input3'
					value={dailyPlan.dp_cv_1_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_1_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_1_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='label3'>
				Core Value
				<select className='input3'
					value={dailyPlan.dp_cv_2 || ''}
					style={formatStyle(dailyPlan.dp_cv_2)}
					onChange={e=>handleDailyPlanChange('dp_cv_2', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='input3'
					value={dailyPlan.dp_cv_2_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_2_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_2_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='label3'>
				Core Value
				<select className='input3'
					value={dailyPlan.dp_cv_3 || ''}
					style={formatStyle(dailyPlan.dp_cv_3)}
					onChange={e=>handleDailyPlanChange('dp_cv_3', e.target.value)}>
						{optionsHash['core value']}
				</select>
				<select className='input3'
					value={dailyPlan.dp_cv_3_rank || ''}
					style={formatPresetStyle(dailyPlan.dp_cv_3_rank)}
					onChange={e=>handleDailyPlanChange('dp_cv_3_rank', e.target.value)}>
						{optionsHash.ranking}
				</select>
			</label>

			<label className='label3'>
				Mindset
				<select className='input3'
					value={dailyPlan.dp_mindset || ''}
					style={formatPresetStyle(dailyPlan.dp_mindset)}
					onChange={e=>handleDailyPlanChange('dp_mindset', e.target.value)}>
						{optionsHash['mindset']}
				</select>
			</label>

			<Instructions show={showInstructions}
				text={'Write specifically about what you plan to do today that affects your future self. How are you feeling about your path to somewhere very specific?</span> What are you doing to get there?'}/>

			<label className='label3'>
				Today My Future Self Says 
				<textarea className='input-tallest input3'
					value={dailyPlan.dp_future_self || ''}
					onChange={e=>handleDailyPlanChange('dp_future_self', e.target.value)}/>
			</label>	

		</div>



		<div className='divider'/>
				
		<h3 className='h2'>CONSISTENCY</h3>

		{
			showInstructions? 
			<div className='g2'>
				<p className='instructions' >
					Use the system consistently. Enter convos. Recap convos. Check follow-ups to put them into your plan. Do the follow-ups.
				</p>
			</div> : null 
		}

		<div className='g2'>

			<label className='label3'>
				All Convos From Yesterday Are Entered
				<select className='input3'
					value={dailyPlan.dp_convo_enter || ''}
					style={formatPresetStyle(dailyPlan.dp_convo_enter)}
					onChange={e=>handleDailyPlanChange('dp_convo_enter', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='label3'>
				All Convos From Yesterday Are Recapped
				<select className='input3'
					value={dailyPlan.dp_convo_recap || ''}
					style={formatPresetStyle(dailyPlan.dp_convo_recap)}
					onChange={e=>handleDailyPlanChange('dp_convo_recap', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='label3'>
				All Contacts From Yesterday In Google Contacts
				<select className='input3'
					value={dailyPlan.dp_contacts_entered || ''}
					style={formatPresetStyle(dailyPlan.dp_contacts_entered)}
					onChange={e=>handleDailyPlanChange('dp_contacts_entered', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='label3'>
				Calendar Is Updated With All Appointments
				<select className='input3'
					value={dailyPlan.dp_calendar || ''}
					style={formatPresetStyle(dailyPlan.dp_calendar)}
					onChange={e=>handleDailyPlanChange('dp_calendar', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>

			<label className='label3'>
				All Follow-Ups for Today Are Reviewed
				<select className='input3'
					value={dailyPlan.dp_fu_review || ''}
					style={formatPresetStyle(dailyPlan.dp_fu_review)}
					onChange={e=>handleDailyPlanChange('dp_fu_review', e.target.value)}>
						{optionsHash['YN']}
				</select>
			</label>
		</div>

		<div className='divider'/>

		{
			!hasFus ? 
			<div onClick={()=>listFus(true)} className='button4'>
				<p className='button2-text'>
					Load Current Follow-Ups
				</p>
			</div> :
			<div className='g1'>
			 	<div onClick={()=>listFus(true)} className='button4'>
					<p className='button2-text'>
					 Current Follow-Ups (click to reload)
					</p>
				</div>
				{
					fus.map((f,i)=>{
						const theDate = convertTimestampToString(f.date_fu_timestamp, 'dow m d');
						console.log(f.date_fu_timestamp, theDate)
						return <p key={i} className='p-dp-fus'>
							{theDate}{` `}
							{f.contactName}{`: `}
							{f.fu_notes}
						</p>
					})
				}
			</div>
		}
		
				
		

		<div className='divider'/>
				
		<h3 className='h2'>RECAP YESTERDAY</h3>

		{
			dpPrior && dpPrior.id_dp ?
			<div className='g2 g2-box g2-prior-dp'>
				<label className='label3 label-white'>
					Conversation Goal (number)
					<input className='input3'
						type='number'
						value={dpPrior.dp_convo_goal || ''}
						readOnly />
				</label>

				<label className='label3 label-white'>
					VP I Am Looking For 
					<textarea className='input-taller input3'
						value={dpPrior.dp_vp_seeking || ''}
						readOnly />
				</label>	

				<label className='label3 label-white'>
					Talk Plan Today 
					<textarea className='input-tallest input3'
						value={dpPrior.dp_talk_plan || ''}
						readOnly />
				</label>	

				<label className='label3 label-white'>
					Service Priorities Today 
					<textarea className='input-taller input3'
						value={dpPrior.dp_svc_priority || ''}
						readOnly />
				</label>	

				<label className='label3 label-white'>
					Stabilization Plan (if applicable)
					<textarea className='input-taller input3'
						value={dpPrior.dp_stabilize_plan || ''}
						readOnly />
				</label>	

				<label className='label3 label-white'>
					White Space (if applicable)
					<textarea className='input-taller input3'
						value={dpPrior.dp_white_space || ''}
						readOnly />
				</label>	
			</div> : 
			<div onClick={()=>loadDpPrior(dateDailyPlan)} className='button4'>
			<p className='button2-text'>
				Load Yesterday's Daily Plan	
			</p>
		</div> 
		}
		

		<div className='g2'>
			<label className='label3'>
				How Did Yesterday Go?
				<select className='input3'
					value={dailyPlan.dp_yesterday_status || ''}
					style={formatPresetStyle(dailyPlan.dp_yesterday_status)}
					onChange={e=>handleDailyPlanChange('dp_yesterday_status', e.target.value)}>
						{optionsHash['ranking']}
				</select>
				<textarea className='input-taller input3'
					value={dailyPlan.dp_yesterday_notes || ''}
					onChange={e=>handleDailyPlanChange('dp_yesterday_notes', e.target.value)}/>
			</label>

		</div>

		<div className='divider'/>
				
		<h3 className='h2'>PLAN FOR TODAY</h3>

		<div className='g2'>

			<label className='label3'>
				Conversation Goal (number)
				<input className='input3'
					type='number'
					value={dailyPlan.dp_convo_goal || ''}
					style={formatStyle(dailyPlan.dp_convo_goal)}
					onChange={e=>handleDailyPlanChange('dp_convo_goal', e.target.value)}/>
			</label>

			<label className='label3'>
				VP I Am Looking For 
				<textarea className='input-taller input3'
					value={dailyPlan.dp_vp_seeking || ''}
					onChange={e=>handleDailyPlanChange('dp_vp_seeking', e.target.value)}/>
			</label>	

			<div className='g2'>
				<p className='instructions'>
					Talk plan ideas: People I know, past clients, vendor partners, vendor partner references, opportunity pipeline calls, daily contact problem solving calls
				</p>
			</div>
			<p>&nbsp;</p>

			<label className='label3'>
				Talk Plan Today 
				<textarea className='input-tallest input3'
					value={dailyPlan.dp_talk_plan || ''}
					onChange={e=>handleDailyPlanChange('dp_talk_plan', e.target.value)}/>
			</label>	

			<label className='label3'>
				Service Priorities Today 
				<textarea className='input-taller input3'
					value={dailyPlan.dp_svc_priority || ''}
					onChange={e=>handleDailyPlanChange('dp_svc_priority', e.target.value)}/>
			</label>	

			<label className='label3'>
				Stabilization Plan (if applicable)
				<textarea className='input-taller input3'
					value={dailyPlan.dp_stabilize_plan || ''}
					onChange={e=>handleDailyPlanChange('dp_stabilize_plan', e.target.value)}/>
			</label>	

			<label className='label3'>
				White Space (if applicable)
				<textarea className='input-taller input3'
					value={dailyPlan.dp_white_space || ''}
					onChange={e=>handleDailyPlanChange('dp_white_space', e.target.value)}/>
			</label>	
		</div>

		<div className='divider'/>

		<h3 className='h2'>TRACKING SNAPSHOT</h3>
		<h3 className='h2'>known bug: does for *today* on new DP only</h3>
		
		<div className='g2'>

			<figure className='pie-chart pie-chart-weekly-deals'>
				<h2>Deals Per Week</h2>
				<figcaption>
					Found {quickStatsWithPf.dealsWeeklyFound}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStatsWithPf.dealsWeeklyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-monthly-deals'>
				<h2>Deals Per Month</h2>
				<figcaption>
					Found {quickStatsWithPf.dealsMonthlyFound}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStatsWithPf.dealsMonthlyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-weekly-convos'>
				<h2>Conversations Per Week</h2>
				<figcaption>
					Done {quickStatsWithPf.convosWeeklyDone}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStatsWithPf.convosWeeklyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

			<figure className='pie-chart pie-chart-monthly-convos'>
				<h2>Conversations Per Month</h2>
				<figcaption>
					Done {quickStatsWithPf.convosMonthlyDone}<span style={{color:colorDone}}/>
					<span style={{color:'white'}}/>
					Needed {quickStatsWithPf.convosMonthlyNeeded}<span style={{color:colorNot}}/>
				</figcaption>
			</figure>

		</div>

		<div className='divider'/>
				
		<div onClick={()=>saveDailyPlan()} className='button2'>
			<p className='button2-text'>SAVE</p>
		</div>
		{
			modePrior === 'daily-plans' ?
			<div onClick={()=>listDailyPlans()} className='button2'>
				<p className='button2-text'>Back to List Daily Plans</p>
			</div> : 
			null 
		}

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
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