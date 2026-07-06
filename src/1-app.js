import {useState, useEffect} from 'react';
import { calcScreenType } from 'browser-helpers';
import App2 from './2-app';
import Loading from './1-loading';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App() {

	const dealStatusHash = {
		'73': 'new',
		'74': 'new',
		'75': 'update',
	};
	const commissionHash = {
		'136': 0.035,
		'137': 0.03,
		'138': 0.025,
		'139': 0.02,
		'140': 0.015,
		'141': 0.01,
		'142': 1,
		'143': 1000,
	};
	const referralHash = {
		'9': true, // SOI referral
		'11': true, // Past Client Referral
		'13': true, // Vendor Partner Referral
		'14': true, // Vendor Partner Reference
		'19': true, // Trep Agent Referral
		'20': true, // Agent Referral
	};
	const vpReferenceHash = {
		'159': 14, // VP Reference
	};
	const vpReferenceConstant = 159;
	const vpStatusHash = {
		'170': false, // not a VP
		'171': true, // sent
		'172': true, // review
		'173': true, // ref check
		'174': true, // active
		'175': false, // denied
	};
	const dealFoundHash = {
		'82': 95,
		'83': 95,
		'84': 95,
		'85': 95,
		'86': 95,
		'87': 95,
		'88': 95,
		'89': 95,
		'90': 95,
		'91': 95,
		'92': 95,
		'93': 94,
		'164': 94,
	};
	const convoTypeHash = {
		// lead gen
		'28': 166, // reverse problem solve
		'33': 167, // solve their problem
		'29': 166, // get vp on list
		'32': 166, // planned RE Convo
		'38': 166, // unplanned
		'39': 166, // other
		
		// follow-up
		'31': 167, // vp app follow-up
		'34': 167, // vp reference check
		'36': 167, // vp check-in
		'202': 167, // customer requested to meet

		// service
		'37': 165, // service call
	};
	const convoIntentionalHash = {
		// intentional
		'52': 168, // yes, ran model
		'53': 168, // yes, did not run model
		// not intentional
		'57': 169, // no did not run model
		'54': 169, // n/a vague vm
		'56': 169, // left vm
		'55': 169, // not 2-way
		'58': 169, // did not connect
	};
	const problemSolveHash = {
		'59': true, // vp problem
		'211': true, // re problem
	};
	const dateIntegerHash = {
		'date_convo_year': true,
		'date_convo_month': true,
		'date_convo_day': true,
		'date_deal_year': true,
		'date_deal_month': true,
		'date_deal_day': true,
		'date_fu_year': true,
		'date_fu_month': true,
		'date_fu_day': true,
	};
	// const dowHash = {
	// 	'0': 'Sunday',
	// 	'1': 'Monday',
	// 	'2': 'Tuesday',
	// 	'3': 'Wednesday',
	// 	'4': 'Thursday',
	// 	'5': 'Friday',
	// 	'6': 'Saturday',
	// };

	// const nthHash = {
	// 	'1': 'st',
	// 	'2': 'nd',
	// 	'3': 'rd',
	// 	'11': 'th',
	// 	'12': 'th',
	// 	'13': 'th',
	// };

	const monthHash = {
		January:0,
		February:1,
		March:2,
		April:3,
		May:4,
		June:5,
		July:6,
		August:7,
		September:8,
		October:9,
		November:10,
		December:11,
	};

	const reverseMonthHash = {};

	for(let m in monthHash){
		const thisMonth = monthHash[m];
		reverseMonthHash[thisMonth] = m;
	}

	const monthOptions = [<option key={-1} value={-1}>SELECT MONTH</option>];
	for(let m in reverseMonthHash){
		monthOptions.push(<option key={m} value={m}>{reverseMonthHash[m]}</option>);			
	}

	const screenType = calcScreenType().type;

	// @@@@@@@@@@@ STATE @@@@@@@@@@@

	const [id_agent] = useState(parseInt(localStorage.id_agent, 10)); // update based on login

	const [hasLoaded, setHasLoaded] = useState(false);
	const [valueListsHash, setValueListsHash] = useState({});
	const [optionsHash, setOptionsHash] = useState({});
	const [contactsHash, setContactsHash] = useState({});
	const [dealsHash, setDealsHash] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [proformae, setProformae] = useState({});

	const formatAndSetLists = content => {
		const {
			// proformae,
			valueListHash,
			fullHash, 
			contactsHash, 
			dealsHash} = content;
		const newListsHash = {
			// contacts: contactsOptions,
			// deals: dealsOptions,
			months: monthOptions,
		};
		for(let k in valueListHash){
			newListsHash[k] = [<option key={-1} value={-1}>SELECT {k.toUpperCase()}</option>];
			for(let o in valueListHash[k]){
				const thisO = valueListHash[k][o];
				newListsHash[k].push(<option key={thisO.id} value={thisO.id}>{thisO.label}</option>)
			}
		}
		setProformae(content.proformae);
		setContactsHash(contactsHash);
		setDealsHash(dealsHash);
		setValueListsHash(fullHash);
		setOptionsHash(newListsHash);
	};

	useEffect(()=>{
		if(!hasLoaded){
			const init = {
				method: 'GET',
				headers: {Authorization: `Bearer ${localStorage.authToken}`},
			};
			fetch(`${REACT_APP_API_URL}api/general/get-lists`, init)
				.then(res=>{
					return res.json();
				})
				.then(content=>{
					formatAndSetLists(content);
					setHasLoaded(true);
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
		}
	});


	// @@@@@@@@@@@ LOGIC @@@@@@@@@@@

	const tempIdKeys = {
		id_activity_temp: true,
		id_deal_fu_temp: true,
		id_contact_fu_temp: true,
		id_deal_temp: true,
		id_contact_temp: true,
		id_who_introduced_temp: true,
	};
	const inputFormatOptions = {
		stringArraySignatures: [ // string is default. only need to populate if a string key contains a subset of another key type
			'contact_where_met_notes',
		],
		numberSignatures: [
			'deal_gci',
			'deal_value',
			'deal_commission_rate',
		],
		integerSignatures: [
			'id_contact',
			'id_who_introduced',
			'id_deal',
			'id_agent',

			'id_activity_fu',
			'id_contact_fu',
			'id_deal_fu',

			'fu_purpose',

			'convo_relationship',
			'convo_type',
			'convo_main_purpose',
			'convo_method',
			'convo_tone',
			'convo_model',
			'convo_intentional',
			'convo_intentional_binary',
			'convo_voice_note',
			'convo_problem_solve',
			'convo_deal_found',
			'convo_outcome',

			'contact_how_met',
			'contact_where_met',
			'contact_type',
			'contact_vp_status',

			'connection_type',

			'deal_how_found',
			'deal_how_found_categ',
			'deal_trigger',
			'deal_type',
			'deal_stage',
			'deal_timeline_stated',
			'deal_value_status',

			'date_convo_year',
			'date_convo_month',
			'date_convo_day',
			'date_deal_year',
			'date_deal_month',
			'date_deal_day',
			'date_fu_year',
			'date_fu_month',
			'date_fu_day',
			'date_dp_year',
			'date_dp_month',
			'date_dp_day',
			'dp_cv_1',
			'dp_cv_2',
			'dp_cv_3',
			'dp_cv_1_rank',
			'dp_cv_2_rank',
			'dp_cv_3_rank',
			'dp_convo_enter',
			'dp_convo_recap',
			'dp_contacts_entered',
			'dp_yesterday_status',
			'dp_fu_review',
			'dp_calendar',
			'dp_convo_goal',
		],
	}

	// @@@@@@@@@@@ RENDER @@@@@@@@@@@

  return hasLoaded ?
    <div className="App">
			<App2
				screenType={screenType}
				id_agent={id_agent}
			  inputFormatOptions={inputFormatOptions}
				tempIdKeys={tempIdKeys}
				optionsHash={optionsHash}
				valueListsHash={valueListsHash}
				dealStatusHash={dealStatusHash}
				commissionHash={commissionHash}
				referralHash={referralHash}
				vpReferenceHash={vpReferenceHash}
				vpReferenceConstant={vpReferenceConstant}
				vpStatusHash={vpStatusHash}
				dealFoundHash={dealFoundHash}
				convoTypeHash={convoTypeHash}
				convoIntentionalHash={convoIntentionalHash}
				problemSolveHash={problemSolveHash}
				dateIntegerHash={dateIntegerHash}
				contactsHash={contactsHash}
				dealsHash={dealsHash}
				proformae={proformae}
				setIsLoading={setIsLoading}
			/>
			{
				isLoading ? <Loading/> : null
			}
    </div> : <Loading/>
}

export default App;
