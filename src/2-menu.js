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
		listVPApps,
		listDeals,
		openProformae,
		getIncomeGraph,
		getMetrics,
		openCoach,
		openCoreValues,
		openAppParams,
	} = props;

	const colors = [
		colorsHash.good8,
		colorsHash.grand2,
		colorsHash.grand3,
		colorsHash.grand4,
		colorsHash.grand5,
		colorsHash.grand6,
		colorsHash.grand5,
		colorsHash.grand4,
		colorsHash.grand3,
		colorsHash.grand2,
		colorsHash.good8,
];

	const menuItems = [
		{t: 'Log Daily Plan', f:createNewDailyPlan},
		{t: 'Log Activity', f:createNewActivity},
		'd',
		{t: 'Daily Plans', f:listDailyPlans},
		{t: 'Activities', f:listActivities},
		{t: 'Follow-Ups', f: listFus},
		{t: 'Contacts', f: listContacts},
		{t: 'Deals', f: listDeals},
		'd',
		{t: 'Vendor Partners', f: listVPs},
		{t: 'Vendor Partner Categories', f: listVPCategories},
		{t: 'Vendor Partner Applications', f: listVPApps},
		'd',
		{t: 'Proformae', f: openProformae},
		{t: 'Income Tracker', f: getIncomeGraph},
		{t: 'Metrics', f: getMetrics},
		'd',
		{t: 'Danielle Mapes', f: ()=>{openCoach('models')}},
		{t: 'Mie Yamashita', f: ()=>{openCoach('what-to-say')}},
		{t: 'Forbes Riley', f: ()=>{openCoach('pitch')}},
		{t: 'Dale Archdekin', f: ()=>{openCoach('smart-sales')}},
		{t: 'Brendan Mulrenin', f: ()=>{openCoach('reverse-sales')}},
		{t: 'Forbes Riley', f: ()=>{openCoach('pitch')}},
		'd',
		{t: 'Core Values', f: openCoreValues},
		{t: 'App Parameters', f: openAppParams},


	]

	let colorIndex = -1;
	const colorsMaxIndex = colors.length;
	const incrementColorIndex = () => {
		if(colorIndex + 1 >= colorsMaxIndex){
			colorIndex = 0;
		} else {
			colorIndex = colorIndex + 1;
		}
	}

	return <div className="g1">

		<h1 className='h1'>SIMPLY REAL</h1>
		{
			menuItems.map((m,i)=>{
				incrementColorIndex();
				if(m === 'd'){
					return <div key={i} className="divider" style={{marginBottom:35}}/>
				}
				return <div key={i} onClick={()=>m.f()} className="main-menu-button" style={{backgroundColor: colors[colorIndex]}}>
					<p className="button2-text">{m.t}</p>
				</div>
			})
		}
		
	</div>
}