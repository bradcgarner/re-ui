export default function Landing(props) {

	const {
		createNewDailyPlan,
		createNewActivity,
		listDailyPlans,
		listActivities,
		listFus,
		listContacts,
		listVPs,
		listVPCategories,
		listDeals,
		openProformae,
		getIncomeGraph,
		getMetrics,
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

	return <div className="g1">

		<h1 className='h1'>SIMPLY REAL</h1>

		<div onClick={()=>createNewDailyPlan()} className="main-menu-button" style={{backgroundColor: colors[0]}}>
			<p className="button2-text">Log Daily Plan</p>
		</div>
		<div onClick={()=>createNewActivity()} className="main-menu-button" style={{backgroundColor: colors[1]}}>
			<p className="button2-text">Log Activity</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>listDailyPlans()} className="main-menu-button" style={{backgroundColor: colors[2]}}>
			<p className="button2-text">Daily Plans</p>
		</div>
		<div onClick={()=>listActivities()} className="main-menu-button" style={{backgroundColor: colors[3]}}>
			<p className="button2-text">Activities</p>
		</div>
		<div onClick={()=>listFus()} className="main-menu-button" style={{backgroundColor: colors[4]}}>
			<p className="button2-text">Follow-Ups</p>
		</div>
		<div onClick={()=>listContacts()} className="main-menu-button" style={{backgroundColor: colors[5]}}>
			<p className="button2-text">Contacts</p>
		</div>
		<div onClick={()=>listVPs()} className="main-menu-button" style={{backgroundColor: colors[6]}}>
			<p className="button2-text">Vendor Partners</p>
		</div>
		<div onClick={()=>listVPCategories()} className="main-menu-button" style={{backgroundColor: colors[5]}}>
			<p className="button2-text">Vendor Partner Categories</p>
		</div>
		<div onClick={()=>listDeals()} className="main-menu-button" style={{backgroundColor: colors[4]}}>
			<p className="button2-text">Deals</p>
		</div>
		
		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openProformae(true)} className="main-menu-button" style={{backgroundColor: colors[3]}}>
			<p className="button2-text">Proformae</p>
		</div>	
		<div onClick={()=>getIncomeGraph()} className="main-menu-button" style={{backgroundColor: colors[2]}}>
			<p className="button2-text">Income Tracker</p>
		</div>	
		<div onClick={()=>getMetrics()} className="main-menu-button" style={{backgroundColor: colors[1]}}>
			<p className="button2-text">Metrics</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openCoach('models')} className="main-menu-button" style={{backgroundColor: colors[0]}}>
			<p className="button2-text">Danielle Mapes</p>
		</div>
		<div onClick={()=>openCoach('what-to-say')} className="main-menu-button" style={{backgroundColor: colors[1]}}>
			<p className="button2-text">Mie Yamashita</p>
		</div>
		<div onClick={()=>openCoach('pitch')} className="main-menu-button" style={{backgroundColor: colors[2]}}>
			<p className="button2-text">Forbes Riley</p>
		</div>
		<div onClick={()=>openCoach('smart-sales')} className="main-menu-button" style={{backgroundColor: colors[3]}}>
			<p className="button2-text">Dale Archdekin</p>
		</div>
		<div onClick={()=>openCoach('reverse-sales')} className="main-menu-button" style={{backgroundColor: colors[4]}}>
			<p className="button2-text">Brendan Mulrenin</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>

		<div onClick={()=>openCoreValues()} className="main-menu-button" style={{backgroundColor: colors[5]}}>
			<p className="button2-text">Core Values</p>
		</div>
	</div>
}