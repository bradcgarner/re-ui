import { colorsHash } from "./0-colors";

export default function Menu(props) {

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
		openAppParams,
	} = props;

	return <div className="g1">

		<h1 className='h1'>SIMPLY REAL</h1>

		<div onClick={()=>createNewDailyPlan()} className="main-menu-button" style={{backgroundColor: colorsHash.good8}}>
			<p className="button2-text">Log Daily Plan</p>
		</div>
		<div onClick={()=>createNewActivity()} className="main-menu-button" style={{backgroundColor: colorsHash.grand1}}>
			<p className="button2-text">Log Activity</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>listDailyPlans()} className="main-menu-button" style={{backgroundColor: colorsHash.grand2}}>
			<p className="button2-text">Daily Plans</p>
		</div>
		<div onClick={()=>listActivities()} className="main-menu-button" style={{backgroundColor: colorsHash.grand3}}>
			<p className="button2-text">Activities</p>
		</div>
		<div onClick={()=>listFus()} className="main-menu-button" style={{backgroundColor: colorsHash.grand4}}>
			<p className="button2-text">Follow-Ups</p>
		</div>
		<div onClick={()=>listContacts()} className="main-menu-button" style={{backgroundColor: colorsHash.grand5}}>
			<p className="button2-text">Contacts</p>
		</div>
		<div onClick={()=>listVPs()} className="main-menu-button" style={{backgroundColor: colorsHash.grand6}}>
			<p className="button2-text">Vendor Partners</p>
		</div>
		<div onClick={()=>listVPCategories()} className="main-menu-button" style={{backgroundColor: colorsHash.grand5}}>
			<p className="button2-text">Vendor Partner Categories</p>
		</div>
		<div onClick={()=>listDeals()} className="main-menu-button" style={{backgroundColor: colorsHash.grand4}}>
			<p className="button2-text">Deals</p>
		</div>
		
		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openProformae(true)} className="main-menu-button" style={{backgroundColor: colorsHash.grand3}}>
			<p className="button2-text">Proformae</p>
		</div>	
		<div onClick={()=>getIncomeGraph()} className="main-menu-button" style={{backgroundColor: colorsHash.grand2}}>
			<p className="button2-text">Income Tracker</p>
		</div>	
		<div onClick={()=>getMetrics()} className="main-menu-button" style={{backgroundColor: colorsHash.grand1}}>
			<p className="button2-text">Metrics</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>
		
		<div onClick={()=>openCoach('models')} className="main-menu-button" style={{backgroundColor: colorsHash.good8}}>
			<p className="button2-text">Danielle Mapes</p>
		</div>
		<div onClick={()=>openCoach('what-to-say')} className="main-menu-button" style={{backgroundColor: colorsHash.grand1}}>
			<p className="button2-text">Mie Yamashita</p>
		</div>
		<div onClick={()=>openCoach('pitch')} className="main-menu-button" style={{backgroundColor: colorsHash.grand2}}>
			<p className="button2-text">Forbes Riley</p>
		</div>
		<div onClick={()=>openCoach('smart-sales')} className="main-menu-button" style={{backgroundColor: colorsHash.grand3}}>
			<p className="button2-text">Dale Archdekin</p>
		</div>
		<div onClick={()=>openCoach('reverse-sales')} className="main-menu-button" style={{backgroundColor: colorsHash.grand4}}>
			<p className="button2-text">Brendan Mulrenin</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>

		<div onClick={()=>openCoreValues()} className="main-menu-button" style={{backgroundColor: colorsHash.grand5}}>
			<p className="button2-text">Core Values</p>
		</div>

		<div className="divider" style={{marginBottom:35}}/>

		<div onClick={()=>openAppParams()} className="main-menu-button" style={{backgroundColor: colorsHash.grand6}}>
			<p className="button2-text">App Parameters</p>
		</div>
	</div>
}