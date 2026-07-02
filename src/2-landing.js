export default function Landing(props) {

	const {
		createNewDailyPlan,
		createNewActivity,
		listDailyPlans,
		listActivities,
		listFus,
		listContacts,
		listVPs,
		listDeals,
		openProformae,
		openMetrics,
		openCoach,
		openCoreValues,
	} = props;

	const colors = [
		'#0083C0', //0
		'#1583C0',
		'#2B83C0',
		'#4083C0',
		'#5583C0',
		'#6B83C0',
		'#8083C0', //6
	];

	return <div className="display-group">
		<div onClick={()=>createNewDailyPlan()} className="major-button" style={{backgroundColor: colors[0]}}>
			<p className="major-button-text">Log Daily Plan</p>
		</div>
		<div onClick={()=>createNewActivity()} className="major-button" style={{backgroundColor: colors[1]}}>
			<p className="major-button-text">Log Activity</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>listDailyPlans()} className="major-button" style={{backgroundColor: colors[2]}}>
			<p className="major-button-text">Daily Plans</p>
		</div>
		<div onClick={()=>listActivities()} className="major-button" style={{backgroundColor: colors[3]}}>
			<p className="major-button-text">Activities</p>
		</div>
		<div onClick={()=>listFus()} className="major-button" style={{backgroundColor: colors[4]}}>
			<p className="major-button-text">Follow-Ups</p>
		</div>
		<div onClick={()=>listContacts()} className="major-button" style={{backgroundColor: colors[5]}}>
			<p className="major-button-text">Contacts</p>
		</div>
		<div onClick={()=>listContacts(true)} className="major-button" style={{backgroundColor: colors[6]}}>
			<p className="major-button-text">Vendor Partners</p>
		</div>
		<div onClick={()=>listDeals()} className="major-button" style={{backgroundColor: colors[5]}}>
			<p className="major-button-text">Deals</p>
		</div>
		
		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openProformae(true)} className="major-button" style={{backgroundColor: colors[4]}}>
			<p className="major-button-text">Proformae</p>
		</div>		
		<div onClick={()=>openMetrics()} className="major-button" style={{backgroundColor: colors[3]}}>
			<p className="major-button-text">Metrics</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openCoach('what-to-say')} className="major-button" style={{backgroundColor: colors[2]}}>
			<p className="major-button-text">Mie Yamashita</p>
		</div>
		<div onClick={()=>openCoach('pitch')} className="major-button" style={{backgroundColor: colors[1]}}>
			<p className="major-button-text">Forbes Riley</p>
		</div>
		<div onClick={()=>openCoach('smart-sales')} className="major-button" style={{backgroundColor: colors[0]}}>
			<p className="major-button-text">Dale Archdekin</p>
		</div>
		<div onClick={()=>openCoach('reverse-sales')} className="major-button" style={{backgroundColor: colors[1]}}>
			<p className="major-button-text">Brendan Mulrenin</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>

		<div onClick={()=>openCoreValues()} className="major-button" style={{backgroundColor: colors[2]}}>
			<p className="major-button-text">Core Values</p>
		</div>
	</div>
}