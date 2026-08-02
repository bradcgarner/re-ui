import {useState, useEffect} from 'react';
import {convertIntegersToTimestamp,
	correctInputType,
	convertTimestampToString,
	isObjectLiteral,
	isPrimitiveNumber, 
	precisionRound,
	addTime, 
	immutableArraySplice,
	isValidDate,
} from 'conjunction-junction';
import { scrollToTop } from 'browser-helpers';

import { theFields } from './1-fields';

import Menu from "./2-menu";
import Activity from "./6-activity";
import Contact from './7-contact';
import Deal from './7-deal';
import DailyPlan from './4-daily-plan';
import Proformae from './3-proformae';
import Metrics from './8-metrics';
import Coach from './99-coach';
import TableList from './9-table-list';
import CoreValues from './99-core-values';
import Income from './8-income';
import AppParams from './99-app-params';
import { colorsHash } from './0-colors';
import VPCategories from './7-vp-categories';
import { convertStringToTimestamp } from 'conjunction-junction/build/date-time';
import Referral from './7-referral';
import VPApp from './7-vp-app';
import VPAppInternalWidget from './7-vp-app-widget';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App2(props) {

	const {
		vlStatic,
		screenType,
		id_agent,
		inputFormatOptions,
		tempIdKeys,
		optionsHash,
		convoDealFoundHash,
		commissionHash,
		vLItemsHash,
		vLGroupsHash,
		referralHash,
		vpReferenceHash,
		vpReferenceConstant,
		vpShowApplicationHash,
		vpAppStatusHash,
		vpBinaryHash,
		dealFoundHash,
		dealsHash,
		convoTypeHash,
		convoIntentionalHash,
		problemSolveHash,
		dateIntegerHash,
		contactsHash,
		setIsLoading,
	} = props;

	// @@@@@@@@@@@ STATE @@@@@@@@@@@

	const [hasLoaded, setHasLoaded] = useState(false);

	const [mode, _setMode] = useState('menu');
	const [modePrior, setModePrior] = useState();

	const setMode = m => {
		setModePrior(mode);
		_setMode(m);
	};

	const [dailyPlans, setDailyPlans] = useState([]);
	const [dailyPlan, setDailyPlan] = useState({});
	const [dpPrior, setDpPrior] = useState({});
	const [quickStats, setQuickStats] = useState({});

	const [activity, setActivity] = useState({});
	const [activities, setActivities] = useState([]);
	const [fus, setFus] = useState([]);

	const [contact, setContact] = useState({});
	const [contacts, setContacts] = useState([]);
	const [contactNameSearch, setContactNameSearch] = useState('');
	const [contactNoteSearch, setContactNoteSearch] = useState('');

	const [vps, setVPs] = useState([]);
	const [vpApps, setVPApps] = useState([]);
	const [vpApp, setVPApp] = useState({vp_app_status: 0});
	
	const [submitVPAppAttempted, setSubmitVPAppAttempted] = useState(false);
	const [vpAppValidationKeys, setVPAppValidationKeys] = useState({});

	const [vpGroupHash, setVPGroupHash] = useState({});
	const [contactVPApp, setContactVPApp] = useState({});
	const [missingVPData, setMissingVPData] = useState([]);
	const [vpAppEmailPreview, setVpAppEmailPreview] = useState({});

	const [referralBasket, setReferralBasket] = useState({});
	const [vpReferrals, setVPReferrals] = useState({});
	const [vpReferralSent, setVPReferralSent] = useState(false);

	const [deals, setDeals] = useState([]);
	const [deal, setDeal] = useState({});

	const [newDealOptions, setNewDealOptions] = useState([]);
	const [newContactOptions, setNewContactOptions] = useState([]);

	const [proformae, setProformae] = useState(props.proformae);

	const [coreValues, setCoreValues] = useState([]);

	const [incomeData, setIncomeData] = useState({});
	
	const [coachContent, setCoachContent] = useState({});

	// @@@@@@@@@@@@@@@@@ GENERAL @@@@@@@@@@@@@@@@@@@@

	const goToMainMenu = () => {
		scrollToTop();
		setMode('menu');
	};

	// @@@@@@@@@@@@@@@ PROFORMAE @@@@@@@@@@@@@@@@@@

	const openProformae = openWidget => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/proformae/${id_agent}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setProformae(r);
				if(openWidget){
					setMode('proformae');
				}
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleProformaeChange = (k, v) => {

		const pfFields = {
			pf_sale_price: true,
			pf_gci_pct: true,
			pf_gci_unit: true,
			pf_units_year: true,
			pf_gci_year: true,
			pf_fees_year: true,
			pf_fees_unit: true,
			pf_broker_cap: true,
			pf_expenses_year: true,
			pf_cost_year: true,
			pf_profit_year: true,
			pf_tax_rate: true,
			pf_income_year: true,
			pf_income_month: true,

			// pf_units_year: true,
			pf_close_pct: true,
			pf_units_year_rev: true,
			pf_this_year_pct: true,
			pf_units_year_rev2: true,
			
			pf_convo_deal: true,
			pf_convo_deal_calc: true,
			pf_convo_year: true,
			pf_work_weeks: true,
			pf_work_days_week: true,
			pf_work_days_year: true,
			pf_convo_day: true,
			pf_convo_week: true,
			pf_convo_month: true,
			pf_deals_week: true,
			pf_deals_month: true,
		};

		const p = JSON.parse(JSON.stringify(proformae));

		for(let f in pfFields){
			if(!isPrimitiveNumber(p[f])){
				p[f] = 0;
			}
		}

		p[k] = parseFloat(v);

		const r = precisionRound;
		
		p.pf_gci_unit = r(p.pf_sale_price * p.pf_gci_pct, 0);
		p.pf_gci_year = r(p.pf_gci_unit * p.pf_units_year, 0);


		p.pf_cost_year = r(
			p.pf_fees_year + 
			(p.pf_fees_unit * p.pf_units_year) +
			p.pf_broker_cap +
			p.pf_expenses_year, 0
		);

		p.pf_profit_year = r(p.pf_gci_year - p.pf_cost_year, 0);
		p.pf_income_year = r(p.pf_profit_year - (p.pf_tax_rate * p.pf_profit_year), 0);
		p.pf_income_month = r(p.pf_income_year / 12, 0);
		p.pf_units_year_rev = r(p.pf_units_year / p.pf_close_pct, 0);
		p.pf_units_year_rev2 = r(p.pf_units_year_rev / p.pf_this_year_pct, 0);

		p.pf_convo_year = r(p.pf_units_year_rev2 * Math.max(p.pf_convo_deal, p.pf_convo_deal_calc), 0);
		
		p.pf_work_days_year = r(p.pf_work_weeks * p.pf_work_days_week, 0);
		p.pf_convo_day = Math.min(r(p.pf_convo_year / p.pf_work_days_year, 0),2);
		p.pf_convo_week = Math.min(r(p.pf_convo_day * p.pf_work_days_week, 0),8);
		p.pf_convo_month = r(p.pf_convo_week * 4, 0);

		p.pf_deals_week = r(p.pf_units_year_rev2 / p.pf_work_weeks, 0);
		p.pf_deals_month = r(p.pf_deals_week * 4, 0);

		setProformae(p);
	};

	const saveProformae = () => {
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(proformae),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/proformae`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					setProformae(r);
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	// @@@@@@@@@@@@@@@ DAILY PLANNING @@@@@@@@@@@@@@@@@@

	const createNewDailyPlan = () => {
		setMode('daily-plan');
		setFus([]); // to avoid them loading by default as the full list in the daily plan
		const dateToday = new Date();
		const newDP = {
			id_agent,
			date_dp: {
				date_dp_year: dateToday.getFullYear(),
				date_dp_month: dateToday.getMonth(),
				date_dp_day: dateToday.getDate(),
				date_dp_timestamp: dateToday,
			},
		}
		setDailyPlan(newDP);

		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/daily-plans/quick-stats`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					setQuickStats(r);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const listDailyPlans = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/daily-plans`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newDailyPlans = Array.isArray(r.dailyPlans) ? r.dailyPlans : [];
					const newCoreValues = Array.isArray(r.coreValues) ? r.coreValues : [];
					setDailyPlans(newDailyPlans);
					setCoreValues(newCoreValues);
					setMode('daily-plans');
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const openDailyPlan = id_daily_plan => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/daily-plans/${id_daily_plan}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setDailyPlan(r);
				setMode('daily-plan');
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleDailyPlanChange= (k, v) => {
		const valueFormatted = correctInputType(v, k, inputFormatOptions);

		const dateFields = {
			date_dp_year: true,
			date_dp_month: true,
			date_dp_day: true,
		};

		const isADate = dateFields[k];

		const newDP = JSON.parse(JSON.stringify(dailyPlan));
		if(isADate){
			if(!newDP.date_dp){
				newDP.date_dp = {};
			}
			newDP.date_dp[k] = valueFormatted;
			newDP.date_dp.date_dp_timestamp = convertIntegersToTimestamp(
				newDP.date_dp.date_dp_year,
				newDP.date_dp.date_dp_month,
				newDP.date_dp.date_dp_day				
			);
			newDP.date_dp.dateString = convertTimestampToString(newDP.date_dp.date_dp_timestamp, 'dow d M y')
		} else {
			newDP[k] = valueFormatted;
		}
		setDailyPlan(newDP);
	};

	const saveDailyPlan = () => {
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(dailyPlan),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/daily-plans`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					setDailyPlan(r);
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});	
	};

	const loadDpPrior = dateDailyPlan => {
		const init = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.authToken}`,
			},
		};
		const dateString = `${dateDailyPlan.date_dp_year}-${dateDailyPlan.date_dp_month}-${dateDailyPlan.date_dp_day}`
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/daily-plans/prior?dateDailyPlan=${dateString}`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					setDpPrior(r);
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});	
	};

	// @@@@@@@@@@@@@@@@@ ACTIVITIES @@@@@@@@@@@@@@@@@@@@

	const createNewActivity = () => {
		const dateToday = new Date();
		const newActivity = {
			id_agent,
			id_activity_temp: convertTimestampToString(new Date(), 'd t z'),
			date_convo: {
				date_convo_year: dateToday.getFullYear(),
				date_convo_month: dateToday.getMonth(),
				date_convo_day: dateToday.getDate(),
				date_convo_timestamp: dateToday,
				dateString: convertTimestampToString(dateToday,'dow d M y'),
			},
			fu_notes: '',
			convo_relationship: null,
			convo_main_purpose: null,
			convo_method: null,
			convo_tone: null,
			convo_model: null,
			convo_intentional: null,
			convo_type: null,
			convo_voice_note: null,
			convo_problem_solve: null,
			convo_notes: '',
			convo_deal_found: null,
			contacts: [],
			connections: [],
			deals: [],
			fus: [],
		};
		setActivity(newActivity);
		setMode('activity');
	};

	const logReferralActivity = () => {
		const dateToday = new Date();
		const r = Array.isArray(vpReferrals) ? vpReferrals[0] || {} : {} ;
		let convo_notes = `${r.sal} ${r.names}
${r.message}
-------
${r.name}
${r.email || ''}
${r.phone || ''}
-------
`;
						
		if(Array.isArray(r.vps)){
			r.vps.forEach(f=>{
				convo_notes += `${f.co}
${f.cat}
${f.area}
${f.poc}
${f.ph}
${f.em}
${f.url || 'no website'}

REFERENCES FOR ${f.co.toUpperCase()}:
`;
					
					if(Array.isArray(f.vp_refs)){
						f.vp_refs.forEach(x=>{
							convo_notes += `${x.rev}
- ${x.by}
`;
						});
					}
				convo_notes += `
${f.rev} ${f.revUrl}.
`;
	
			});
			convo_notes += `
${r.note}`;
		}

		const newActivity = {
			id_agent,
			id_activity_temp: convertTimestampToString(dateToday, 'd t z'),
			date_convo: {
				date_convo_year: dateToday.getFullYear(),
				date_convo_month: dateToday.getMonth(),
				date_convo_day: dateToday.getDate(),
				date_convo_timestamp: dateToday,
				dateString: convertTimestampToString(dateToday,'dow d M y'),
			},
			fu_notes: '',
			convo_relationship: vlStatic.convoRelationVP,
			convo_main_purpose: vlStatic.convoPurposeVPReferral,
			convo_method: vlStatic.convoMethodEmail,
			convo_tone: vlStatic.convoToneProfessional,
			convo_model: vlStatic.vpReferralModel,
			convo_intentional: vlStatic.convoIntentional,
			convo_type: vlStatic.convoTypeLeadFU,
			convo_voice_note: vlStatic.convoVoiceNoteNone,
			convo_outcome: vlStatic.rankingOK,
			convo_problem_solve: vlStatic.convoProblemSolveVP,
			convo_notes,
			convo_deal_found: vlStatic.convoDealFoundNoAsk,
			contacts: [],
			connections: [],
			deals: [],
			fus: [],
		};

		const rbTo = referralBasket.to || {};
		const rbIncl = referralBasket.include || {};

		const rbToIds = Object.keys(rbTo);
		const rbInclIds = Object.keys(rbIncl);
		const allIds = [...rbToIds, ...rbInclIds];

		allIds.forEach((id,i)=>{
			const id_contact = parseInt(id, 10);
			const contactFound = contactsHash[`${id_contact}`];
			if(contactFound){
				const id_contact_temp = `${newActivity.id_activity_temp}-main-${i}`;
				const newContact = {
					id_agent,
					id_contact,
					id_who_introduced: null,
					id_who_introduced_temp: null,
					id_activity: activity.id_activity || null,
					id_activity_temp: `${activity.id_activity_temp}-X`,
					contact_how_met: null,
					contact_where_met: null,
					contact_where_met_notes: null,
					contact_notes: '',
					contact_name_first: null,
					contact_name_last: null,
					contact_phone: null,
					contact_email: null,
					contact_vp_categories: null,
					contact_vp_areas: null,
					contact_vp_status: vlStatic.contactVPStatusNo,
					connection_record_type: 'main',
				};
				for(let x in contactFound){
					newContact[x] = contactFound[x];
				}
				if(!newContact.id_contact_temp){
					newContact.id_contact_temp = id_contact_temp;
				}
				newActivity.contacts.push(newContact);

				const dateFU = addTime(dateToday, 14, 'days');
				const date_fu = {
					date_fu_year: dateFU.getFullYear(),
					date_fu_month: dateFU.getMonth(),
					date_fu_day: dateFU.getDate(),
					dateString: convertTimestampToString(dateFU,'dow d M y'),
					date_fu_timestamp: dateFU,
				};
				const newFu = {
					id_agent,
					id_activity_fu: null,
					id_activity_temp: `${newActivity.id_activity_temp}-X`,
					id_deal_fu: null,
					id_deal_fu_temp: null,
					id_contact_fu: id_contact,
					id_contact_fu_temp: newContact.id_contact_temp,
					date_fu,
					fu_purpose: vlStatic.convoPurposeVPCheckIn,
					fu_notes: `Check on outcome of connection between ${r.names}`,
				};
				newActivity.fus.push(newFu);

			}
		});

		setActivity(newActivity);
		setMode('activity');
		scrollToTop();
	};

	const doFollowUp = () => {
		const newActivity = JSON.parse(JSON.stringify(activity));
		const dateToday = new Date();

		newActivity.date_convo = {
			date_convo_year: dateToday.getFullYear(),
			date_convo_month: dateToday.getMonth(),
			date_convo_day: dateToday.getDate(),
			date_convo_timestamp: dateToday,
			dateString: convertTimestampToString(dateToday,'dow d M y'),
		};
		newActivity.convo_main_purpose = newActivity.fu_purpose;
		newActivity.convo_notes = newActivity.fu_notes;

		if(newActivity.convo_main_purpose === vlStatic.convoPurposeVPRefCheck){
			newActivity.convo_relationship = vlStatic.convoRelVPRefCheck;
			newActivity.convo_deal_found = vlStatic.convoDealFoundNoAsk;
			newActivity.convo_model = vlStatic.convoModelVPRefCheck;
			newActivity.convo_tone = vlStatic.convoToneCasual;
			newActivity.convo_type = vlStatic.convoTypeLeadGen;
			newActivity.convo_intentional = vlStatic.convoIntentional;
		} else {
			newActivity.convo_deal_found = vlStatic.convoDealFoundUpdate;
		}

		// addContactToActivity
		const connection_record_type = 'main';

		if(!Array.isArray(newActivity.connections)){
			newActivity.connections = [];
		}
		if(!Array.isArray(newActivity.contacts)){
			newActivity.contacts = [];
		}
		const contactIndex = newActivity.connections.length + newActivity.contacts.length;
		const id_contact_temp = `${activity.id_activity_temp}-${connection_record_type}-${contactIndex}`;
		
		const newContact = {
			id_agent,
			id_contact: newActivity.id_contact_fu,
			id_who_introduced: null,
			id_who_introduced_temp: null,
			id_activity: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_contact_temp,
			contact_how_met: null,
			contact_where_met: null,
			contact_where_met_notes: null,
			contact_notes: '',
			contact_name_first: null,
			contact_name_last: null,
			contact_phone: null,
			contact_email: null,
			contact_vp_categories: null,
			contact_vp_areas: null,
			contact_vp_status: vlStatic.contactVPStatusNo,
			connection_record_type,
		};

		// handleActivityChange contacts

		const contactFound = contactsHash[`${newContact.id_contact}`];
		if(contactFound){
			for(let x in contactFound){
				newContact[x] = contactFound[x];
			}
		}

		newActivity.contacts.push(newContact);

		// addDealToActivity
		if(!Array.isArray(newActivity.deals)){
			newActivity.deals = [];
		}
		if(newActivity.convo_deal_found === vlStatic.convoDealFoundUpdate){
			const dealIndex = newActivity.deals.length;

			const newDeal = {
				id_agent,
				id_deal: newActivity.id_deal_fu,
				id_activity: activity.id_activity || null,
				id_activity_temp: `${activity.id_activity_temp}-X`,
				id_deal_temp: `${activity.id_activity_temp}-deal-${dealIndex}`,
				deal_name: '',
				deal_address: '',
				deal_how_found: null,
				deal_how_found_categ: null,
				deal_trigger: null,
				deal_type: null,
				deal_stage: null,
				deal_timeline_stated: null,
				deal_timeline_status: null,
				date_deal: {
					date_deal_year: null,
					date_deal_month: null,
					date_deal_day: null,
				},
				deal_value: null,
				deal_value_status: null,
				deal_commission_rate: null,
				deal_gci: null,
				deal_notes: '',
			};

			const dealFound = dealsHash[`${newDeal.id_deal}`];
			const dealDateFields = {
				date_deal_year: true,
				date_deal_month: true,
				date_deal_day: true,
				date_deal_timestamp: true,
			};
			if(dealFound){
				for(let x in dealFound){
					if(dealDateFields[x]){
						newDeal.date_deal[x] = dealFound[x];
					} else {
						newDeal[x] = dealFound[x];
					}
				}
			}
			newActivity.deals.push(newDeal);
		}

		setActivity(newActivity);
	};

	const listActivities = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/activities`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newActivities = Array.isArray(r) ?
						r.map(a=>{
							const contact1 = contactsHash[`${a.id_contact}`];
							const contact2 = contactsHash[`${a.id_contact_2}`];
							const contactName1 = contact1 ? `${contact1.contact_name_first || ''} ${contact1.contact_name_last || ''}` : '';
							const contactName2 = contact2 ? `${contact2.contact_name_first || ''} ${contact2.contact_name_last || ''}` : '';
							const contactsNames = contact1 && contact2 ? `${contactName1} & ${contactName2}` : contactName1;
							return {...a, contactsNames}
						}) : [];
					setActivities(newActivities);
					setMode('activities');
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const listFus = limitToCurrent => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		const queryString = limitToCurrent ? '?limit=current' : '';
		fetch(`${REACT_APP_API_URL}api/activities/follow-ups${queryString}`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newFus = Array.isArray(r) ?
						r.map(a=>{
							const contact = contactsHash[`${a.id_contact_fu}`];
							const hydratedFields = hydrateContact(contact);
							const date_fu_timestamp = convertStringToTimestamp(a.date_fu_timestamp);
							return {...a, ...hydratedFields, date_fu_timestamp}
						}) : [];
					setFus(newFus);
					if(!limitToCurrent){
						setMode('follow-ups');
						scrollToTop();
					}
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const openActivity = id_activity => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/activities/${id_activity}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setActivity(r);
				setMode('activity');
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleActivityChange = (one, index, two, three, value) => {
		const dealDateFields = {
			date_deal_year: true,
			date_deal_month: true,
			date_deal_day: true,
			date_deal_timestamp: true,
		};

		const contactFieldsToClear = {
			id_who_introduced: null,
			id_who_introduced_temp: null,
			contact_how_met: null,
			contact_where_met: null,
			contact_where_met_notes: null,
			contact_notes: null,
			contact_name_first: null,
			contact_name_last: null,
			contact_phone: null,
			contact_email: null,
			contact_vp_categories: null,
			contact_vp_areas: null,
			contact_vp_status: null,
			connection_record_type: null,
			connection_type: null,
			connection_notes: null,
			connection_vp_reference: null,
		};

		const dealFieldsToClear = {
			deal_name: true,
			deal_address: true,
			deal_how_found: true,
			deal_how_found_categ: true,
			deal_trigger: true,
			deal_type: true,
			deal_stage: true,
			deal_timeline_stated: true,
			deal_timeline_status: true,
			deal_notes: true,
			deal_value: true,
			deal_value_status: true,
			deal_commission_rate: true,
			deal_gci: true,
			date_deal_year: true,
			date_deal_month: true,
			date_deal_day: true,
			date_deal_timestamp: true,
		};

		const finalField = three || two || one;
		const isATempId = tempIdKeys[`${finalField}`];
		const valueFormatted = 
			isATempId ? value :
			finalField === 'contact_where_met_notes' ? value : 
			correctInputType(value, finalField, inputFormatOptions);
		const isADate = dateIntegerHash[finalField];
		const isGci = finalField === 'deal_value' || finalField === 'deal_commission_rate';
		const isDealFound = finalField === 'deal_how_found';
		const isConvoType = finalField === 'convo_main_purpose';
		const isConvoIntention = finalField === 'convo_model';
		const mightBeAVPReference = finalField === 'connection_type';
		const isAContactChange = finalField === 'id_contact';
		const isADealChange = finalField === 'id_deal';
		const isADealTimeline = finalField === 'deal_timeline_stated';
		const newActivity = JSON.parse(JSON.stringify(activity));

		if(Array.isArray(newActivity[one])){
			if(isObjectLiteral(newActivity[one][index])){
				if(isObjectLiteral(newActivity[one][index][two])){
					if(!!three){
						newActivity[one][index][two][three] = valueFormatted;
						if(isADate){
							newActivity[one][index][two][`${two}_timestamp`] = 
								convertIntegersToTimestamp(
									newActivity[one][index][two][`${two}_year`], 
									newActivity[one][index][two][`${two}_month`], 
									newActivity[one][index][two][`${two}_day`]);
							newActivity[one][index][two].dateString = 
								convertTimestampToString(
									newActivity[one][index][two][`${two}_timestamp`], 'dow d M y');
						}
					}
				} else {
					newActivity[one][index][two] = valueFormatted;
					if(isGci){
						const commId = newActivity[one][index].deal_commission_rate;
						const commRate = commissionHash[`${commId}`];
						newActivity[one][index].deal_gci = 
						  commRate === 1000 ? 1000 :
							precisionRound(commRate * newActivity[one][index].deal_value, 0);
					} else if(isDealFound){
						newActivity[one][index].deal_how_found_categ = dealFoundHash[`${newActivity[one][index][two]}`] || null;
					} else if(mightBeAVPReference){
						if(newActivity[one][index].connection_type === vpReferenceConstant){
							newActivity[one][index].contact_how_met = vpReferenceHash[`${newActivity[one][index].connection_type}`];
						}
					} else if(isAContactChange){
						const contactFound = contactsHash[`${newActivity[one][index][two]}`];
						if(!contactFound){
							for(let z in contactFieldsToClear){
								newActivity[one][index][z] = null;
							}
						} else {
							for(let x in contactFound){
								newActivity[one][index][x] = contactFound[x];
							}
						}
					} else if(isADealChange){
						const dealFound = dealsHash[`${newActivity[one][index][two]}`];
						if(!dealFound){
							newActivity[one][index].date_deal = {};
							for(let z in dealFieldsToClear){
								newActivity[one][index][z] = null;
							}
						} else {
							newActivity[one][index].date_deal = {};
							for(let x in dealFound){
								if(dealDateFields[x]){
									newActivity[one][index].date_deal[x] = dealFound[x];
								} else {
									newActivity[one][index][x] = dealFound[x];
								}
							}
						}
					} else if(isADealTimeline){
						const dealTimelineValueFound = vLItemsHash[`${newActivity[one][index][two]}`];
						if(dealTimelineValueFound && isPrimitiveNumber(dealTimelineValueFound.value)){
							const dateToday = new Date();
							const later = addTime(dateToday, dealTimelineValueFound.value * 30, 'days');
							const y = later.getFullYear();
							const m = later.getMonth();
							if(!newActivity[one][index].date_deal){
								newActivity[one][index].date_deal = {};
							}
							newActivity[one][index].date_deal.date_deal_year = y;
							newActivity[one][index].date_deal.date_deal_month = m;
							newActivity[one][index].date_deal.date_deal_day = 1;
							newActivity[one][index].date_deal.date_deal_timestamp = later;

						}
					}
				}
			}
		} else if(isObjectLiteral(newActivity[one])){
			if(!!two){
				if(isObjectLiteral(newActivity[one][two])){
					if(!!three){
						newActivity[one][two][three] = valueFormatted
						if(isADate){
							newActivity[one][two][`${two}_timestamp`] = 
								convertIntegersToTimestamp(
									newActivity[one][two][`${two}_year`], 
									newActivity[one][two][`${two}_month`], 
									newActivity[one][two][`${two}_day`]);
							newActivity[one][two].dateString = 
								convertTimestampToString(
									newActivity[one][two][`${two}_timestamp`], 'dow d M y');
						}
					} else {
						newActivity[one][two] = valueFormatted;
						if(isADate){
							newActivity[one][`${one}_timestamp`] = 
								convertIntegersToTimestamp(
									newActivity[one][`${one}_year`], 
									newActivity[one][`${one}_month`], 
									newActivity[one][`${one}_day`]);
							newActivity[one].dateString = 
								convertTimestampToString(
									newActivity[one][`${one}_timestamp`], 'dow d M y');
						}
					}
				} else {
					newActivity[one][two] = valueFormatted;
					if(isADate){
						newActivity[one][`${one}_timestamp`] = 
							convertIntegersToTimestamp(
								newActivity[one][`${one}_year`], 
								newActivity[one][`${one}_month`], 
								newActivity[one][`${one}_day`]);
						newActivity[one].dateString = 
							convertTimestampToString(
								newActivity[one][`${one}_timestamp`], 'dow d M y');
					}
				}
			}
		} else {
			newActivity[one] = valueFormatted;
			if(isConvoType){
				newActivity.convo_type = convoTypeHash[`${newActivity[one]}`];
			}
			if(isConvoIntention){
				newActivity.convo_intentional = convoIntentionalHash[`${newActivity[one]}`];
			}
		}

		if(one === 'contacts' || one === 'connections'){
			const _contactOptions = [<option key={-1} value={-1}>SELECT CONTACT (JUST ENTERED)</option>];
			newActivity.contacts.forEach((c,i)=>{
				if(c.id_contact === 0 || !isPrimitiveNumber(c.id_contact)){
					_contactOptions.push(
						<option key={i} value={c.id_contact_temp}>
							{`${c.contact_name_first} ${c.contact_name_last}`}
						</option>
					);
				}
			});
			newActivity.connections.forEach((c,i)=>{
				if(c.id_contact === 0 || !isPrimitiveNumber(c.id_contact)){
					_contactOptions.push(
						<option key={i+999} value={c.id_contact_temp}>
							{`${c.contact_name_first} ${c.contact_name_last}`}
						</option>
					);
				}
			});
			setNewContactOptions(_contactOptions);
		}

		if(one === 'deals'){
			const _dealOptions = [<option key={-1} value={-1}>SELECT DEAL (JUST ENTERED)</option>];
			newActivity.deals.forEach((d,i)=>{
				if(d.id_deal === 0 || !isPrimitiveNumber(d.id_deal)){
					_dealOptions.push(
						<option key={i} value={d.id_deal_temp}>
							{d.deal_name}
						</option>
					);
				}
			})
			setNewDealOptions(_dealOptions);
		}

		setActivity(newActivity);
	};

	const handleActivityVPSelection = (v, i) => {
		const newA = JSON.parse(JSON.stringify(activity));
		const contacts = Array.isArray(newA.contacts) ? newA.contacts : [];
		const thisContact = contacts[i] || {};
		thisContact.vpTempCategorySelection = v;
		if(!Array.isArray(thisContact.contact_vp_categories)){
			thisContact.contact_vp_categories = [];
		}
		const index = thisContact.contact_vp_categories.indexOf(v);
		if(index === -1){
			thisContact.contact_vp_categories.push(v);
		} else {
			thisContact.contact_vp_categories = immutableArraySplice(index, thisContact.contact_vp_categories);
		}
		setActivity(newA);
	};

	const addContactToActivity = connection_record_type => {
		const newActivity = JSON.parse(JSON.stringify(activity));
		if(!Array.isArray(newActivity.connections)){
			newActivity.connections = [];
		}
		if(!Array.isArray(newActivity.contacts)){
			newActivity.contacts = [];
		}
		const index = newActivity.connections.length + newActivity.contacts.length;
		const id_contact_temp = `${activity.id_activity_temp}-${connection_record_type}-${index}`;
		const newContact = {
			id_agent,
			id_contact: 0,
			id_who_introduced: null,
			id_who_introduced_temp: null,
			id_activity: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_contact_temp,
			contact_how_met: null,
			contact_where_met: null,
			contact_where_met_notes: null,
			contact_notes: '',
			contact_name_first: null,
			contact_name_last: null,
			contact_phone: null,
			contact_email: null,
			contact_vp_categories: null,
			contact_vp_areas: null,
			contact_vp_status: vlStatic.contactVPStatusNo,
			connection_record_type,
		};
		if(connection_record_type === 'connection'){
			newContact.connection_type = null;
			newContact.connection_notes = '';
			newContact.connection_vp_reference = '';
		} 
		if(connection_record_type === 'main'){
			newActivity.contacts.push(newContact);
		} else if(connection_record_type === 'connection'){
			newActivity.connections.push(newContact);
		}
		setActivity(newActivity);
	};

	const addFuToActivity = () => {
		const newActivity = JSON.parse(JSON.stringify(activity));
		if(!Array.isArray(newActivity.fus)){
			newActivity.fus = [];
		}
		// const index = newActivity.fus.length;
		const date1 = isObjectLiteral(activity.date_convo) &&
		  isValidDate(activity.date_convo.date_convo_timestamp) ?
			activity.date_convo.date_convo_timestamp : new Date();
		const date2 = addTime(date1, 7, 'days');
		const date_fu = {
			date_fu_year: date2.getFullYear(),
			date_fu_month: date2.getMonth(),
			date_fu_day: date2.getDate(),
			dateString: convertTimestampToString(date2,'dow d M y'),
			date_fu_timestamp: date2,
		};
		if(!Array.isArray(newActivity.connections)){
			newActivity.connections = [];
		}
		if(!Array.isArray(newActivity.contacts)){
			newActivity.contacts = [];
		}
		if(!Array.isArray(newActivity.deals)){
			newActivity.deals = [];
		}
		const contact1 = newActivity.contacts[0] || {}
		const deal1 = newActivity.deals[0] || {}
		const newFu = {
			id_agent: activity.id_agent || id_agent,
			id_activity_fu: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_deal_fu: deal1.id_deal || null,
			id_deal_fu_temp: deal1.id_deal_temp || null,
			id_contact_fu: contact1.id_contact || null,
			id_contact_fu_temp: contact1.id_contact_temp || null,
			date_fu,
			fu_purpose: null,
			fu_notes: '',
		};

		newActivity.fus.push(newFu);
		setActivity(newActivity);
	};

	const processVPReferences = () => {

		const vpa = mode === 'contact' ? contact.vp_app :
			mode === 'activity' ? contactVPApp : {};
		const dateToday = new Date();

		const newActivity = mode === 'activity' ? JSON.parse(JSON.stringify(activity)) :
		{
			id_agent,
			id_activity_temp: convertTimestampToString(new Date(), 'd t z'),
			date_convo: {
				date_convo_year: dateToday.getFullYear(),
				date_convo_month: dateToday.getMonth(),
				date_convo_day: dateToday.getDate(),
				date_convo_timestamp: dateToday,
				dateString: convertTimestampToString(dateToday,'dow d M y'),
			},
			fu_notes: '',
			convo_relationship: vlStatic.convoRelationVP,
			convo_main_purpose: vlStatic.convoPurposeVPAppFU,
			convo_method: vlStatic.convoMethodEmail,
			convo_tone: vlStatic.convoToneProfessional,
			convo_model: vlStatic.convoModelNone,
			convo_intentional: vlStatic.convoNotIntentional,
			convo_type: vlStatic.convoTypeLeadFU,
			convo_voice_note: vlStatic.convoVoiceNoteNone,
			convo_problem_solve: vlStatic.convoProblemSolveNone,
			convo_notes: 'This is an auto-created activity to follow-up with VP references.',
			convo_deal_found: vlStatic.convoDealFoundNoAsk,
			convo_outcome: vlStatic.rankingOK,
			contacts: [],
			connections: [],
			deals: [],
			fus: [],
		};
		if(!Array.isArray(newActivity.connections)){
			newActivity.connections = [];
		}
		if(!Array.isArray(newActivity.contacts)){
			newActivity.contacts = [];
		}
		if(!Array.isArray(newActivity.fus)){
			newActivity.fus = [];
		}

		if(mode === 'contact'){
			newActivity.contacts.push({
				...contact, 
				connection_record_type: 'main',
			});
		}
		
		const id_vp_app = vpa.id_vp_app;
		if(!id_vp_app){
			console.error('could not find id_vp_app, aborting');
			return;
		}
		const vp = newActivity.contacts[0];
		if(!vp){
			console.error('could not find vp, aborting');
			return;
		}
		const id_who_introduced = vp.id_contact;
		if(!id_who_introduced){
			console.error('could not find id_who_introduced, aborting');
			return;
		}

		const connection_record_type = 'connection';

		// FIRST CONTACT
		const index1 = newActivity.connections.length + newActivity.contacts.length;
		const index2 = index1 + 1;
		const index3 = index2 + 1;
		const id_contact_temp1 = `${activity.id_activity_temp}-${connection_record_type}-${index1}`;
		const id_contact_temp2 = `${activity.id_activity_temp}-${connection_record_type}-${index2}`;
		const id_contact_temp3 = `${activity.id_activity_temp}-${connection_record_type}-${index3}`;

		const newContact = {
			id_vp_app,
			id_agent,
			id_contact: 0,
			id_who_introduced,
			id_who_introduced_temp: null,
			id_activity: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			contact_how_met: vlStatic.contactHowMetVPRef,
			contact_where_met: vlStatic.contactWhereMetVPRef,
			contact_where_met_notes: `Submitted as a reference by ${vp.contact_name_first} ${vp.contact_name_last} of ${vp.contact_company}`,
			contact_notes: '',
			contact_name_first: '',
			contact_name_last: '',
			contact_phone: '',
			contact_email: '',
			contact_vp_categories: null,
			contact_vp_areas: null,
			connection_vp_reference: '',
			contact_vp_status: vlStatic.contactVPStatusNo,
			connection_type: vlStatic.connTypeVPRef,
			connection_record_type,
		};
		const newContact1 = {
			...newContact,
			id_contact_temp: id_contact_temp1,
			connection_notes: vpa.vp_ref1,
		};
		const newContact2 = {
			...newContact,
			id_contact_temp: id_contact_temp2,
			connection_notes: vpa.vp_ref2,
		};
		const newContact3 = {
			...newContact,
			id_contact_temp: id_contact_temp3,
			connection_notes: vpa.vp_ref3,
		};

		const date2 = addTime(dateToday, 1, 'days');
		const newFu = {
			id_agent: activity.id_agent || id_agent,
			id_activity_fu: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_deal_fu: null,
			id_deal_fu_temp: '',
			id_contact_fu: null,
			id_vp_fu: vp.id_contact,
			date_fu: {
				date_fu_year: date2.getFullYear(),
				date_fu_month: date2.getMonth(),
				date_fu_day: date2.getDate(),
				dateString: convertTimestampToString(date2,'dow d M y'),
				date_fu_timestamp: date2,
			},
			fu_purpose: 34,
			fu_notes: `Call reference submitted by ${vp.contact_name_first} ${vp.contact_name_last} of ${vp.contact_company}.`,
		};
		const newFu1 = {
			...newFu,
			id_contact_fu_temp: id_contact_temp1,
			fu_notes: `${newFu.fu_notes} ${vpa.vp_ref1}`
		};
		const newFu2 = {
			...newFu,
			id_contact_fu_temp: id_contact_temp2,
			fu_notes: `${newFu.fu_notes} ${vpa.vp_ref2}`
		};
		const newFu3 = {
			...newFu,
			id_contact_fu_temp: id_contact_temp3,
			fu_notes: `${newFu.fu_notes} ${vpa.vp_ref3}`
		};

		newActivity.connections.push(newContact1);
		newActivity.connections.push(newContact2);
		newActivity.connections.push(newContact3);
		newActivity.fus.push(newFu1);
		newActivity.fus.push(newFu2);
		newActivity.fus.push(newFu3);

		setActivity(newActivity);

		if(mode === 'contact'){
			setMode('activity');
			scrollToTop();
		}
		
	};

	const addDealToActivity = () => {
		const newActivity = JSON.parse(JSON.stringify(activity));
		if(!Array.isArray(newActivity.deals)){
			newActivity.deals = [];
		}
		const index = newActivity.deals.length;

		const newDeal = {
			id_agent,
			id_deal: 0,
			id_activity: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_deal_temp: `${activity.id_activity_temp}-deal-${index}`,
			deal_name: '',
			deal_address: '',
			deal_how_found: null,
			deal_how_found_categ: null,
			deal_trigger: null,
			deal_type: null,
			deal_stage: null,
			deal_timeline_stated: null,
			deal_timeline_status: null,
			date_deal: {
				date_deal_year: null,
				date_deal_month: null,
				date_deal_day: null,
			},
			deal_value: null,
			deal_value_status: null,
			deal_commission_rate: null,
			deal_gci: null,
			deal_notes: '',
		};
		newActivity.deals.push(newDeal);
		setActivity(newActivity);
	};

	const saveActivity = () => {
		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(activity),
		};
		fetch(`${REACT_APP_API_URL}api/activities`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setActivity(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	// @@@@@@@@@@@@@@@@@ CONTACTS @@@@@@@@@@@@@@@@@@@@

	const hydrateContact = c => {
		if(!c){
			return {};
		}
		const company = c.contact_company ? ` | ${c.contact_company}` : '';
		const contactNameCompany = `${c.contact_name_first || ''} ${c.contact_name_last || ''}${company}`;
		const metNotes = c.contact_where_met_notes ? `MET: ${c.contact_where_met_notes}` : '';
		const contactNotes = `${c.contact_notes || ''}${metNotes}`;
		return {
			contactNameCompany,
			contactNotes,
		};
	};

	const listContacts = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/contacts`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newContacts = Array.isArray(r) ?
						r.map(a=>{
							const hydratedFields = hydrateContact(a);
							return {...a, ...hydratedFields};
						}) : [];
					setContacts(newContacts);
					setMode('contacts');
					scrollToTop();
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const listVPs = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/contacts/vps`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				const vendorPartners = r && Array.isArray(r.vps) ? r.vps.map(a=>{
					const hydratedFields = hydrateContact(a);
					return {...a, ...hydratedFields};
				}) : [];
				if(Array.isArray(vendorPartners)){
					setVPs(vendorPartners);
					setMode('vps');
					scrollToTop();
				}
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const listVPCategories = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/contacts/vp-groups`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setVPGroupHash(r);
				setMode('vp-categories');
				scrollToTop();
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const listVPApps = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/contacts/vp-apps`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setVPApps(r);
				setMode('vp-apps');
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	}

	const openContact = id_contact => {

		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/contacts/${id_contact}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setContactVPApp({}); // clear out since a new contact
				setMissingVPData([]); // clear out...
				setMode('contact');
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const saveContact = () => {
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(contact),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleContactChange = (k, v) => {
		const valueFormatted = k === 'contact_where_met_notes' ? v : correctInputType(v, k, inputFormatOptions);
		const newC = JSON.parse(JSON.stringify(contact));
		newC[k] = valueFormatted;
		
		setContact(newC);
	};

	const handleContactSearch = (k, v) => {
		const v2 = typeof v === 'string' ? v.toLowerCase() : '';
		if(k === 'name'){
			setContactNameSearch(v2);
			setContactNoteSearch('');
		} else {
			setContactNameSearch('');
			setContactNoteSearch(v2);
		}
	};

	const handleVPCategorySelection = v => {
		const newC = JSON.parse(JSON.stringify(contact));
		newC.vpTempCategorySelection = v;
		if(!Array.isArray(newC.contact_vp_categories)){
			newC.contact_vp_categories = [];
		}
		const index = newC.contact_vp_categories.indexOf(v);
		if(index === -1){
			newC.contact_vp_categories.push(v);
		} else {
			newC.contact_vp_categories = immutableArraySplice(index, newC.contact_vp_categories);
		}
		setContact(newC);
	};

	const handleVPAreaSelection = v => {
		const newC = JSON.parse(JSON.stringify(contact));
		newC.vpTempAreaSelection = v;
		if(!Array.isArray(newC.contact_vp_areas)){
			newC.contact_vp_areas = [];
		}
		const index = newC.contact_vp_areas.indexOf(v);
		if(index === -1){
			newC.contact_vp_areas.push(v);
		} else {
			newC.contact_vp_areas = immutableArraySplice(index, newC.contact_vp_areas);
		}
		setContact(newC);
	};

	const getContactVPApp = id_contact => {
		if(!id_contact){
			return;
		}
		const init = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.authToken}`,
			},
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-contact/${id_contact}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContactVPApp(r);
				setIsLoading(false);
			})
	};

	const initiateVPApplication = () => {
		const vpForAppDB = {
			id_contact: contact.id_contact,
			id_agent,
			vp_name_business: contact.contact_company || null,
			vp_phone: contact.contact_phone || null,
			vp_email: contact.contact_email || null,
			vp_url: contact.contact_url || null,
		};

		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(vpForAppDB),
		};
		fetch(`${REACT_APP_API_URL}api/open`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				const newContact = JSON.parse(JSON.stringify(contact));
				newContact.vp_app = r;
				setContact(newContact);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const sendVPApplication = () => {
		const vpApp = contact.vp_app || {};
		const mVPD = [];
		const vp = {
			id_contact: contact.id_contact,
			contact_name_first: contact.contact_name_first,
			contact_email: contact.contact_email,
			contact_company: contact.contact_company,
			id_vp_app: vpApp.id_vp_app,
			vp_temp_id: vpApp.vp_temp_id,
		};
		let ok = true;
		for(let k in vp){
			if(!vp[k]){
				ok = false;
				mVPD.push(k);
			}
		}
		setMissingVPData(mVPD);
		if(!ok){
			return;
		}

		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(vp),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-send`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const markVPAppInReview = () => {
		const vpApp = contact.vp_app || {};
		const vp = {
			id_contact: contact.id_contact,
			id_vp_app: vpApp.id_vp_app,
		};
		let ok = true;
		for(let k in vp){
			if(!vp[k]){
				ok = false;
			}
		}
		if(!ok){
			console.log('MISSING DATA',vp);
			return;
		}

		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(vp),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-review`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const initiateVpAppCompletion = () => {
		const title = contact.contact_title ? `, ${contact.contact_title}` : '';
		const vp_refs = Array.isArray(contact.vp_refs) ? contact.vp_refs.map(r=>{
			const byC = contactsHash[`${r.id_contact_fu}`] || {};
			return {
				rev: r.convo_vp_ref || '',
				by: `${byC.contact_name_first} ${byC.contact_address_city || ''} ${byC.contact_address_state || ''}`,
			};
		}): [];
		const cat = Array.isArray(contact.contact_vp_categories) ? `Services: ${contact.contact_vp_categories.join(', ')}` : '';
		const area = Array.isArray(contact.contact_vp_areas) ? `Areas Served: ${contact.contact_vp_areas.join(', ')}` : '';
						
		const newVpAppEmailPreview = {
			sal: 'Hi',
			name: contact.contact_name_first,
			message: `Thank you so much for your participation in our Vendor Referral Program! Your application is complete, and I'll do my best to refer business to you and soon. When I find a need, I'll check with you to confirm you can accept the referral, and then I will connect you with a customer via a 3-way email. The information I have to refer you is below. Please let me know if I got anything wrong.`,
			co: contact.contact_company,
			poc: `Contact: ${contact.contact_name_first} ${contact.contact_name_last}${title}`,
			ph: contact.contact_phone,
			em: contact.contact_email,
			url: contact.contact_url,
			addr: `${contact.contact_address_street}, ${contact.contact_address_city}, ${contact.contact_address_state}`,
			cat,
			area,
			rev: `If you're happy with ${contact.contact_company}'s services, please leave a great review at`,
			revUrl: contact.contact_review_url,
			note: 'Thanks again! I look forward to a prosperous relationship.',
			vp_refs,
		};
		setVpAppEmailPreview(newVpAppEmailPreview);
	};

	const markVPAppComplete = () => {
		const vpApp = contact.vp_app || {};
		const vp = {
			id_contact: contact.id_contact,
			id_vp_app: vpApp.id_vp_app,
		};
		let ok = true;
		for(let k in vp){
			if(!vp[k]){
				ok = false;
			}
		}
		if(!ok){
			console.log('MISSING DATA',vp);
			return;
		}

		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify({vp, email: vpAppEmailPreview}),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-activate`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const reOpenVPAppForEditing = () => {
		const vpApp = contact.vp_app || {};
		const vp = {
			id_contact: contact.id_contact,
			id_vp_app: vpApp.id_vp_app,
		};
		let ok = true;
		for(let k in vp){
			if(!vp[k]){
				ok = false;
			}
		}
		if(!ok){
			console.log('MISSING DATA',vp);
			return;
		}

		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(vp),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-returned`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const declineVPApp = () => {
		const vpApp = contact.vp_app || {};
		const vp = {
			id_contact: contact.id_contact,
			id_vp_app: vpApp.id_vp_app,
		};
		let ok = true;
		for(let k in vp){
			if(!vp[k]){
				ok = false;
			}
		}
		if(!ok){
			console.log('MISSING DATA',vp);
			return;
		}

		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(vp),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app-decline`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setContact(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const openVPApp = id_vp_app => {
		if(!id_vp_app){
			return;
		}
		const init = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.authToken}`,
			},
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app/${id_vp_app}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setVPApp(r);
				setMode('vp-app');
				setIsLoading(false);
			})
	};

	// @@@@@@@@@@@@ VP APP - COPY FROM SUB-PROGRAM @@@@@@@@@@@@@@@


	const handleVPAppChange = (k, v) => {

		const newA = JSON.parse(JSON.stringify(vpApp));
		newA[k] = v;
		setVPApp(newA);
	};

	const validateVPApp = () => {
		const keys = {
			vp_name_business: true,
			vp_type: true,
			vp_contact_person: true,
			vp_phone: true,
			vp_email: true,
			vp_area: true,
			vp_agree: 'Yes',
			vp_ref1: true,
			vp_ref2: true,
			vp_ref3: true,
		};
		let isComplete = true;
		for(let k in keys){
			if(keys[k]===true){
				if(!vpApp[k]){
					keys[k]=false;
					isComplete = false;
				}
			} else {
				if(vpApp[k] !== keys[k]){
					keys[k] = false;
					isComplete = false;
				}
			}
		}
		return {
			isComplete,
			keys,
		};
	};

	const saveVPApp = () => {
		const {
			isComplete,
			keys,
		} = validateVPApp();
		setVPAppValidationKeys(keys);
		setSubmitVPAppAttempted(true);
		if(!isComplete){
			// return;
		}

		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(vpApp),
		};
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setVPApp(r);
				scrollToTop();
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	// @@@@@@@@@@@@@@@@@ REFERRALS @@@@@@@@@@@@@@@@@@@@

	const handleReferralBasket = (f, id_contact) => {
		const newRB = JSON.parse(JSON.stringify(referralBasket));
		if(!newRB.to){
			newRB.to = {};
		}
		if(!newRB.include){
			newRB.include = {};
		}
		if(newRB[f]){ // to or include, or skip if none/error
			if(newRB[f][`${id_contact}`]){
				delete newRB[f][`${id_contact}`];
			} else {
				newRB[f][`${id_contact}`] = true;
			}
		}
		setReferralBasket(newRB);
	};

  const initiateReferral = () => {
		setMode('referral');
	};

	const getReferralInfo = () => {
		setIsLoading(true);
		const init = {
			method: 'PUT', // only so we can use the body
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`
			},
			body: JSON.stringify(referralBasket),
		};
		fetch(`${REACT_APP_API_URL}api/contacts/refs-get`, init)
			.then(res=>{
				return res.json();
			})
			.then(rb=>{
				console.log(rb);
				const rbTo = rb.to || {};
				const rbIncl = rb.include || {};
				const referrals = [];
				for(let k in rbTo){
					const c = rbTo[k].contact || {};
					const referral = {
						subject: 'Referral Introduction',
						emails: [c.contact_email],
						sal: 'Hi',
						names: [c.contact_name_first],

						name: `${c.contact_name_first} ${c.contact_name_last}`,
						email: c.contact_email,
						phone: c.contact_phone,

						message: 'I am so happy to connect you with each other, as promised. Please let me know if you need anything else, real estate or otherwise.',
						vps: [],
						note: `I hope this works out great! I'll check back to see how things are going.`,
					};
					for(let v in rbIncl){
						const v1 = rbIncl[v] || {};
						const vpC = v1.contact || {};
						const title = vpC.contact_title ? `, ${vpC.contact_title}` : '';
						const vp_refs = Array.isArray(v1.vp_refs) ? v1.vp_refs.map(r=>{
							const byC = contactsHash[`${r.id_contact_fu}`] || {};
							return {
								rev: r.convo_vp_ref || '',
								by: `${byC.contact_name_first} ${byC.contact_address_city || ''} ${byC.contact_address_state || ''}`,
							};
						}): [];
						const cat = Array.isArray(vpC.contact_vp_categories) ? `Services: ${vpC.contact_vp_categories.join(', ')}` : '';
						const area = Array.isArray(vpC.contact_vp_areas) ? `Areas Served: ${vpC.contact_vp_areas.join(', ')}` : '';
						referral.emails.push(vpC.contact_email);
						referral.names.push(vpC.contact_name_first);
						const vp = {
							co: vpC.contact_company,
							poc: `Contact: ${vpC.contact_name_first} ${vpC.contact_name_last}${title}`,
							ph: vpC.contact_phone,
							em: vpC.contact_email,
							url: vpC.contact_url,
							addr: `${vpC.contact_address_street}, ${vpC.contact_address_city}, ${vpC.contact_address_state}`,
							cat,
							area,
							rev: `If you're happy with ${vpC.contact_company}'s services, please leave a great review at`,
							revUrl: vpC.contact_review_url,
							vp_refs,
						};
						referral.vps.push(vp);
					}
					referral.names = referral.names.join(' and ');
					referrals.push(referral);
				}
				setVPReferralSent(false);
				setVPReferrals(referrals);
				scrollToTop();
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});

	};

	const editVPReferrals = (i, k1, j, k2, l, k3, v) => {
		const newRB = JSON.parse(JSON.stringify(vpReferrals));
		const referral = newRB[i] || {};
		const loc1 = referral[k1];
		console.log({i, k1, j, k2, l, k3, v});
		console.log({referral,loc1})
		if(typeof loc1 === 'string'){
			referral[k1] = v;
			setVPReferrals(newRB);
			setVPReferralSent(false);
		} else if(Array.isArray(loc1)){
			const loc2 = loc1[j] || {};
			const loc3 = loc2[k2];
			if(typeof loc3 === 'string'){
				loc2[k2] = v;
				setVPReferrals(newRB);
				setVPReferralSent(false);
			} else if(Array.isArray(loc3)){
				const loc4 = loc3[l] || {};
				loc4[k3] = v;
				setVPReferrals(newRB);
				setVPReferralSent(false);
			}
		}
	};

	const sendReferral = () => {
		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`
			},
			body: JSON.stringify(vpReferrals),
		};
		fetch(`${REACT_APP_API_URL}api/contacts/refs-send`, init)
			.then(res=>{
				setVPReferralSent(true);
				setIsLoading(false);
				return res.json();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	// @@@@@@@@@@@@@@@@@ DEALS @@@@@@@@@@@@@@@@@@@@

	const listDeals = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/deals`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newDeals = Array.isArray(r) ?
						r.map(a=>{
							const contact1 = contactsHash[`${a.id_contact}`];
							const contact2 = contactsHash[`${a.id_contact_2}`];
							const contactName1 = contact1 ? `${contact1.contact_name_first || ''} ${contact1.contact_name_last || ''}` : '';
							const contactName2 = contact2 ? `${contact2.contact_name_first || ''} ${contact2.contact_name_last || ''}` : '';
							const contactsNames = contact1 && contact2 ? `${contactName1} & ${contactName2}` : contactName1;
							return {...a, contactsNames}
						}) : [];
					setDeals(newDeals);
					setMode('deals');
					scrollToTop();
					setIsLoading(false);
				})
				.catch(err=>{
					console.error(err);
				});
	};

	const openDeal = id_deal => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/deals/${id_deal}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setDeal(r);
				setMode('deal');
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const saveDeal = () => {
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.authToken}`,
			},
			body: JSON.stringify(deal),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/deals`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setDeal(r);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleDealChange= (k, v) => {
		const valueFormatted = correctInputType(v, k, inputFormatOptions);
		const dateFields = {
			date_deal_year: true,
			date_deal_month: true,
			date_deal_day: true,
		};

		const isADate = dateFields[k];

		const newD = JSON.parse(JSON.stringify(deal));
		if(isADate){
			if(!newD.date_deal){
				newD.date_deal = {};
			}
			newD.date_deal[k] = valueFormatted;
			newD.date_deal.date_deal_timestamp = convertIntegersToTimestamp(
				newD.date_deal.date_deal_year,
				newD.date_deal.date_deal_month,
				newD.date_deal.date_deal_day				
			);
			newD.date_deal.dateString = convertTimestampToString(newD.date_deal.date_deal_timestamp, 'dow d M y')
		} else {
			newD[k] = valueFormatted;
		}
		setDeal(newD);
	};

	// @@@@@@@@@@@@@@@@@@ METRICS @@@@@@@@@@@@@@@@@@

	const getIncomeGraph = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/deals/income`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setMode('incomeGraph');
				setIncomeData(r);
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const getMetrics = () => {
		setMode('metrics');
	}

	// @@@@@@@@@@@@@@@@@ COACHING @@@@@@@@@@@@@@@@@@@@

	const openCoach = coachMode => {
		setIsLoading(true);

		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		const queryString = `?a=x&b=y`
		fetch(`${REACT_APP_API_URL}api/coaching${queryString}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setCoachContent(r);
				setMode(coachMode);
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const openCoreValues = () => {
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/general/core-values/${id_agent}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setCoreValues(r);
				setMode('core values');
				setIsLoading(false);
				scrollToTop();
			})
			.catch(err=>{
				console.error(err);
			});
	};

	const handleCoachChange = (fieldName, index, value) => {
		console.log({fieldName,index,value});
	};

	// @@@@@@@@@@@ MISC @@@@@@@@@@@

	const openAppParams = () => {
		setMode('app params');
		scrollToTop();
	}

	// @@@@@@@@@@@ RENDER HELPERS @@@@@@@@@@@


	const formatPresetStyle = id => {
		if(vLItemsHash[`${id}`]){
			const thisItem = vLItemsHash[`${id}`];
			const backgroundColor = thisItem.color || colorsHash.gray;
			const color = thisItem.luma <= 170 ? 'white' : colorsHash.dark;
			return {backgroundColor, color};
		}
		return {backgroundColor:colorsHash.dark,color:colorsHash.good2};
	};

	const formatStyle = (value, zeroOk) => {
		if(value === 0 && zeroOk){
			return {backgroundColor:colorsHash.good1,color:colorsHash.dark};
		}
		if(!value){
			return {backgroundColor:colorsHash.dark,color:colorsHash.good2};
		}
		return {backgroundColor:colorsHash.good1,color:colorsHash.dark};
	};

	const vpAppInternalWidget = <VPAppInternalWidget
		goToMainMenu={goToMainMenu}
		listVPApps={listVPApps}
		vpApp={vpApp}
		modePrior={modePrior}
		formatStyle={formatStyle}
		handleVPAppChange={handleVPAppChange}
		saveVPApp={saveVPApp}
		optionsHash={optionsHash}
	/>

	// @@@@@@@@@@@ PRE-LOAD @@@@@@@@@@@


	useEffect(()=>{
		if(!hasLoaded){
			setHasLoaded(true);
		}
	}, [hasLoaded]);

	// @@@@@@@@@@@ RENDER @@@@@@@@@@@

  return mode === 'menu' ?
		<Menu
			id_agent={id_agent}
			createNewDailyPlan={createNewDailyPlan}
			createNewActivity={createNewActivity}
			listDailyPlans={listDailyPlans}
			listActivities={listActivities}
			listFus={listFus}
			listContacts={listContacts}
			listVPs={listVPs}
			listVPCategories={listVPCategories}
			listVPApps={listVPApps}
			listDeals={listDeals}
			openProformae={openProformae}
			getIncomeGraph={getIncomeGraph}
			getMetrics={getMetrics}
			openCoach={openCoach}
			openCoreValues={openCoreValues}
			openAppParams={openAppParams}
		/> :
		mode === 'daily-plan' ?
		<DailyPlan
			goToMainMenu={goToMainMenu}
			listDailyPlans={listDailyPlans}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			handleDailyPlanChange={handleDailyPlanChange}
			saveDailyPlan={saveDailyPlan}
			loadDpPrior={loadDpPrior}
			listFus={listFus}
			fus={fus}
			quickStats={quickStats}
			dpPrior={dpPrior}
			dailyPlan={dailyPlan}
			vLItemsHash={vLItemsHash}
			optionsHash={optionsHash}
			modePrior={modePrior}
			proformae={proformae}
		/> :
		mode === 'daily-plans' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			initiateReferral={initiateReferral}
			vLItemsHash={vLItemsHash}
			coreValues={coreValues}
			proformae={proformae}
			mode={mode}
			modePrior={modePrior}
			openItem={openDailyPlan}
			idKey={'id_dp'}
			header='DAILY PLANS'
			items={dailyPlans}
			theFields={theFields.dailyPlans}
			createNewDailyPlan={createNewDailyPlan}
		/> :
		mode === 'activity' ?
		<Activity
			handleActivityChange={handleActivityChange}
			doFollowUp={doFollowUp}
			handleActivityVPSelection={handleActivityVPSelection}
			processVPReferences={processVPReferences}
			saveActivity={saveActivity}
			addContactToActivity={addContactToActivity}
			addFuToActivity={addFuToActivity}
			goToMainMenu={goToMainMenu}
			addDealToActivity={addDealToActivity}
			listActivities={listActivities}
			listFus={listFus}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			openDeal={openDeal}
			openContact={openContact}
			getContactVPApp={getContactVPApp}
			openActivity={openActivity}
			vpAppStatusHash={vpAppStatusHash}
			contactVPApp={contactVPApp}
			modePrior={modePrior}
			activity={activity}
			optionsHash={optionsHash}
			convoDealFoundHash={convoDealFoundHash}
			vLItemsHash={vLItemsHash}
			referralHash={referralHash}
			vpReferenceHash={vpReferenceHash}
			vpBinaryHash={vpBinaryHash}
			vpShowApplicationHash={vpShowApplicationHash}
			problemSolveHash={problemSolveHash}
			newContactOptions={newContactOptions}
			newDealOptions={newDealOptions}
		/> :
		mode === 'activities' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			initiateReferral={initiateReferral}
			vLItemsHash={vLItemsHash}
			mode={mode}
			modePrior={modePrior}
			openItem={openActivity}
			idKey={'id_activity'}
			header='ACTIVITIES'
			items={activities}
			theFields={theFields.activities}
			createNewActivity={createNewActivity}
		/> :
		mode === 'follow-ups' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			initiateReferral={initiateReferral}
			vLItemsHash={vLItemsHash}
			mode={mode}
			modePrior={modePrior}
			openItem={openActivity}
			idKey={'id_activity'}
			header='FOLLOW-UPS'
			items={fus}
			theFields={theFields.fus}
		/> :
		mode === 'contacts' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			handleContactSearch={handleContactSearch}
			contactNameSearch={contactNameSearch}
			contactNoteSearch={contactNoteSearch}
			initiateReferral={initiateReferral}
			vLItemsHash={vLItemsHash}
			mode={mode}
			modePrior={modePrior}
			openItem={openContact}
			idKey={'id_contact'}
			header='CONTACTS'
			items={contacts}
			theFields={theFields.contacts}
		/> :
		mode === 'vps' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			vLItemsHash={vLItemsHash}
			handleContactSearch={handleContactSearch}
			contactNameSearch={contactNameSearch}
			contactNoteSearch={contactNoteSearch}
			vpAppStatusHash={vpAppStatusHash}
			contactsHash={contactsHash}
			initiateReferral={initiateReferral}
			mode={mode}
			modePrior={modePrior}
			openItem={openContact}
			listVPCategories={listVPCategories}
			idKey={'id_contact'}
			header='VENDOR PARTNERS'
			items={vps}
			theFields={theFields.vps}
		/> :
		mode === 'vp-apps' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			vLItemsHash={vLItemsHash}
			handleContactSearch={handleContactSearch}
			contactNameSearch={contactNameSearch}
			contactNoteSearch={contactNoteSearch}
			vpAppStatusHash={vpAppStatusHash}
			contactsHash={contactsHash}
			initiateReferral={initiateReferral}
			mode={mode}
			modePrior={modePrior}
			openItem={openVPApp}
			listVPCategories={listVPCategories}
			idKey={'id_vp_app'}
			header='VENDOR PARTNER APPLICATIONS'
			items={vpApps}
			theFields={theFields.vpApps}
		/> :
		mode === 'vp-app' ?
		<VPApp
			vpApp={vpApp}
			handleVPAppChange={handleVPAppChange}
			saveVPApp={saveVPApp}
			vpAppStatusHash={vpAppStatusHash}
			vpAppValidationKeys={vpAppValidationKeys}
			submitVPAppAttempted={submitVPAppAttempted}
			internalWidget={vpAppInternalWidget}
		/> :
		mode === 'vp-categories' ?
		<VPCategories 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			vLItemsHash={vLItemsHash}
			vpAppStatusHash={vpAppStatusHash}
			mode={mode}
			modePrior={modePrior}
			openContact={openContact}
			listVPs={listVPs}
			idKey={'id_contact'}
			vpGroupHash={vpGroupHash}
		/> :
		mode === 'contact' ?
		<Contact
			goToMainMenu={goToMainMenu}
			listContacts={listContacts}
			listVPs={listVPs}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			saveContact={saveContact}
			handleContactChange={handleContactChange}
			handleVPCategorySelection={handleVPCategorySelection}
			handleVPAreaSelection={handleVPAreaSelection}
			openDeal={openDeal}
			openActivity={openActivity}
			processVPReferences={processVPReferences}
			initiateVPApplication={initiateVPApplication}
			initiateVpAppCompletion={initiateVpAppCompletion}
			sendVPApplication={sendVPApplication}
			markVPAppInReview={markVPAppInReview}
			markVPAppComplete={markVPAppComplete}
			reOpenVPAppForEditing={reOpenVPAppForEditing}
			declineVPApp={declineVPApp}
			vpAppStatusHash={vpAppStatusHash}
			missingVPData={missingVPData}
			handleReferralBasket={handleReferralBasket}
			referralBasket={referralBasket}
			initiateReferral={initiateReferral}
			contact={contact}
			vLItemsHash={vLItemsHash}
			vpBinaryHash={vpBinaryHash}
			referralHash={referralHash}
			optionsHash={optionsHash}
			modePrior={modePrior}
			mode={mode}
			contactsHash={contactsHash}
			vpAppEmailPreview={vpAppEmailPreview}
		/> :
		mode === 'referral' ?
		<Referral
			goToMainMenu={goToMainMenu}
			openContact={openContact}
			referralBasket={referralBasket}
			contactsHash={contactsHash}
			handleReferralBasket={handleReferralBasket}
			editVPReferrals={editVPReferrals}
			getReferralInfo={getReferralInfo}
			sendReferral={sendReferral}
			listContacts={listContacts}
			listVPs={listVPs}
			listVPCategories={listVPCategories}
			logReferralActivity={logReferralActivity}
			vpReferralSent={vpReferralSent}
			vpReferrals={vpReferrals}
			modePrior={modePrior}
		/> :
		mode === 'deals' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			vLItemsHash={vLItemsHash}
			initiateReferral={initiateReferral}
			mode={mode}
			modePrior={modePrior}
			openItem={openDeal}
			idKey='id_deal'
			header='DEALS'
			items={deals}
			theFields={theFields.deals}
		/> :
		mode === 'deal' ?
		<Deal
			goToMainMenu={goToMainMenu}
			handleDealChange={handleDealChange}
			listDeals={listDeals}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			saveDeal={saveDeal}
			openContact={openContact}
			openActivity={openActivity}
			deal={deal}
			vpBinaryHash={vpBinaryHash}
			vLItemsHash={vLItemsHash}
			optionsHash={optionsHash}
			modePrior={modePrior}
			referralHash={referralHash}
		/> :
		mode === 'proformae' ?
		<Proformae
			goToMainMenu={goToMainMenu}
			vLItemsHash={vLItemsHash}
			proformae={proformae}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			handleProformaeChange={handleProformaeChange}
			optionsHash={optionsHash}
			modePrior={modePrior}
			saveProformae={saveProformae}
		/> :
		mode === 'incomeGraph' ?
		<Income
			goToMainMenu={goToMainMenu}
			incomeData={incomeData}
		/> :
		mode === 'metrics' ?
		<Metrics
			goToMainMenu={goToMainMenu}
		/> :
		mode === 'models' ||
		mode === 'what-to-say' ||
		mode === 'smart-sales' ||
		mode === 'reverse-sales' ||
		mode === 'pitch' ?
		<Coach
			goToMainMenu={goToMainMenu}
			content={coachContent}
			handleCoachChange={handleCoachChange}
		/> :
		mode === 'core values' ?
		<CoreValues
			goToMainMenu={goToMainMenu}
			coreValues={coreValues}
		/> :
		mode === 'app params' ?
		<AppParams
			goToMainMenu={goToMainMenu}
			vLGroupsHash={vLGroupsHash}
			formatPresetStyle={formatPresetStyle}
		/> :
		<h1>Nothing To Load</h1>
}

export default App2;