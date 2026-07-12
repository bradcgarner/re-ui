import {useState, useEffect} from 'react';
import {convertIntegersToTimestamp,
	correctInputType,
	convertTimestampToString,
	isObjectLiteral,
	isPrimitiveNumber, 
	precisionRound,
	addTime, 
	isValidDate,
} from 'conjunction-junction';
import { scrollToTop } from 'browser-helpers';

import { theFields } from './1-fields';
import { coachContent } from './1-coach-content';

import Landing from "./2-menu";
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

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App2(props) {

	const {
		screenType,
		id_agent,
		inputFormatOptions,
		tempIdKeys,
		optionsHash,
		dealStatusHash,
		commissionHash,
		valueListsHash,
		referralHash,
		vpReferenceHash,
		vpReferenceConstant,
		vpShowReferencesHash,
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

	const [activities, setActivities] = useState([]);
	const [activity, setActivity] = useState({});
	const [fus, setFus] = useState([]);

	const [contacts, setContacts] = useState([]);
	const [vps, setVPs] = useState([]);
	const [contact, setContact] = useState({});
	const [vpAppStatusHash, setVpAppStatusHash] = useState({});
	const [contactVPApp, setContactVPApp] = useState({});

	const [deals, setDeals] = useState([]);
	const [deal, setDeal] = useState({});

	const [newDealOptions, setNewDealOptions] = useState([]);
	const [newContactOptions, setNewContactOptions] = useState([]);

	const [proformae, setProformae] = useState(props.proformae);

	const [coreValues, setCoreValues] = useState([]);

	const [incomeData, setIncomeData] = useState({});
	

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
		const today = new Date();
		const newDP = {
			id_agent,
			date_dp: {
				date_dp_year: today.getFullYear(),
				date_dp_month: today.getMonth(),
				date_dp_day: today.getDate(),
				date_dp_timestamp: today,
			},
		}
		setDailyPlan(newDP);
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

	const listFus = () => {
		setIsLoading(true);
		const init = {
			method: 'GET',
			headers: {Authorization: `Bearer ${localStorage.authToken}`},
		};
		fetch(`${REACT_APP_API_URL}api/activities/follow-ups`, init)
				.then(res=>{
					return res.json();
				})
				.then(r=>{
					const newFus = Array.isArray(r) ?
						r.map(a=>{
							const contact = contactsHash[`${a.id_contact_fu}`];
							const contactName = contact ? `${contact.contact_name_first || ''} ${contact.contact_name_last || ''}` : '';
							return {...a, contactName}
						}) : [];
					setFus(newFus);
					setMode('follow-ups');
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
						const dealTimelineValueFound = valueListsHash[`${newActivity[one][index][two]}`];
						if(dealTimelineValueFound && isPrimitiveNumber(dealTimelineValueFound.value)){
							const today = new Date();
							const later = addTime(today, dealTimelineValueFound.value * 30, 'days');
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
			contact_vp_status: null,
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
		const newFu = {
			id_agent: activity.id_agent || id_agent,
			id_activity_fu: activity.id_activity || null,
			id_activity_temp: `${activity.id_activity_temp}-X`,
			id_deal_fu: null,
			id_deal_fu_temp: '',
			id_contact_fu: null,
			id_contact_fu_temp: '',
			date_fu,
			fu_purpose: null,
			fu_notes: '',
		};

		newActivity.fus.push(newFu);
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
							const contactName = `${a.contact_name_first || ''} ${a.contact_name_last || ''}`;
							return {...a, contactName}
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
				const vendorPartners = r && Array.isArray(r.vps) ? r.vps : [];

				if(Array.isArray(vendorPartners)){
					setVPs(vendorPartners);
					setVpAppStatusHash(r.vpAppStatusHash);
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
		fetch(`${REACT_APP_API_URL}api/contacts/vp-categories`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				const vendorPartners = r && Array.isArray(r.vps) ? r.vps : [];

				if(Array.isArray(vendorPartners)){
					setVPs(vendorPartners);
					setVpAppStatusHash(r.vpAppStatusHash);
					setMode('vp-categories');
					scrollToTop();
				}
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

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
		fetch(`${REACT_APP_API_URL}api/contacts/vp-app/${id_contact}`, init)
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
		fetch(`${REACT_APP_API_URL}api/contacts/send-vp-app`, init)
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
		fetch(`${REACT_APP_API_URL}api/contacts/review-vp-app`, init)
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
			body: JSON.stringify(vp),
		};
		setIsLoading(true);
		fetch(`${REACT_APP_API_URL}api/contacts/activate-vp`, init)
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
		fetch(`${REACT_APP_API_URL}api/contacts/open-vp-app`, init)
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
		fetch(`${REACT_APP_API_URL}api/contacts/decline-vp`, init)
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
		setMode(coachMode);
		scrollToTop();
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
	}

	// @@@@@@@@@@@ RENDER HELPERS @@@@@@@@@@@


	const formatPresetStyle = id => {
		if(valueListsHash[`${id}`]){
			const thisItem = valueListsHash[`${id}`];
			const backgroundColor = thisItem.color || '#cccccc';
			const color = thisItem.luma <= 170 ? 'white' : '#004B6E';
			return {backgroundColor, color};
		}
		return {backgroundColor:'#004B6E',color:'#C5E2F6'};
	};

	const formatStyle = (value, zeroOk) => {
		if(value === 0 && zeroOk){
			return {backgroundColor:'#E6F2FF',color:'#004B6E'};
		}
		if(!value){
			return {backgroundColor:'#004B6E',color:'#C5E2F6'};
		}
		return {backgroundColor:'#E6F2FF',color:'#004B6E'};
	};

	// @@@@@@@@@@@ PRE-LOAD @@@@@@@@@@@


	useEffect(()=>{
		if(!hasLoaded){
			setHasLoaded(true);
		}
	}, [hasLoaded]);

	// @@@@@@@@@@@ RENDER @@@@@@@@@@@

  return mode === 'menu' ?
		<Landing
			id_agent={id_agent}
			createNewDailyPlan={createNewDailyPlan}
			createNewActivity={createNewActivity}
			listDailyPlans={listDailyPlans}
			listActivities={listActivities}
			listFus={listFus}
			listContacts={listContacts}
			listVPs={listVPs}
			listVPCategories={listVPCategories}
			listDeals={listDeals}
			openProformae={openProformae}
			getIncomeGraph={getIncomeGraph}
			getMetrics={getMetrics}
			openCoach={openCoach}
			openCoreValues={openCoreValues}
		/> :
		mode === 'daily-plan' ?
		<DailyPlan
			goToMainMenu={goToMainMenu}
			listDailyPlans={listDailyPlans}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			handleDailyPlanChange={handleDailyPlanChange}
			saveDailyPlan={saveDailyPlan}
			dailyPlan={dailyPlan}
			valueListsHash={valueListsHash}
			optionsHash={optionsHash}
			proformae={proformae}
		/> :
		mode === 'daily-plans' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			valueListsHash={valueListsHash}
			coreValues={coreValues}
			proformae={proformae}
			mode={mode}
			openItem={openDailyPlan}
			openKey={'id_dp'}
			header='DAILY PLANS'
			items={dailyPlans}
			theFields={theFields.dailyPlans}
		/> :
		mode === 'activity' ?
		<Activity
			handleActivityChange={handleActivityChange}
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
			contactVPApp={contactVPApp}
			modePrior={modePrior}
			activity={activity}
			optionsHash={optionsHash}
			dealStatusHash={dealStatusHash}
			valueListsHash={valueListsHash}
			referralHash={referralHash}
			vpReferenceHash={vpReferenceHash}
			vpBinaryHash={vpBinaryHash}
			vpShowReferencesHash={vpShowReferencesHash}
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
			valueListsHash={valueListsHash}
			mode={mode}
			openItem={openActivity}
			openKey={'id_activity'}
			header='ACTIVITIES'
			items={activities}
			theFields={theFields.activities}
		/> :
		mode === 'follow-ups' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			valueListsHash={valueListsHash}
			mode={mode}
			openItem={openActivity}
			openKey={'id_activity'}
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
			valueListsHash={valueListsHash}
			mode={mode}
			openItem={openContact}
			openKey={'id_contact'}
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
			valueListsHash={valueListsHash}
			vpAppStatusHash={vpAppStatusHash}
			mode={mode}
			openItem={openContact}
			openKey={'id_contact'}
			header='VENDOR PARTNERS'
			items={vps}
			theFields={theFields.vps}
		/> :
		mode === 'vp-categories' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			valueListsHash={valueListsHash}
			mode={mode}
			openItem={openContact}
			openKey={'id_contact'}
			header='VENDOR PARTNER CATEGORIES'
			items={contacts}
			theFields={theFields.contacts}
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
			openDeal={openDeal}
			openActivity={openActivity}
			initiateVPApplication={initiateVPApplication}
			sendVPApplication={sendVPApplication}
			markVPAppInReview={markVPAppInReview}
			markVPAppComplete={markVPAppComplete}
			reOpenVPAppForEditing={reOpenVPAppForEditing}
			declineVPApp={declineVPApp}
			contact={contact}
			valueListsHash={valueListsHash}
			vpBinaryHash={vpBinaryHash}
			referralHash={referralHash}
			optionsHash={optionsHash}
			modePrior={modePrior}
			mode={mode}
		/> :
		mode === 'deals' ?
		<TableList 
			screenType={screenType}
			goToMainMenu={goToMainMenu}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			valueListsHash={valueListsHash}
			mode={mode}
			openItem={openDeal}
			openKey='id_deal'
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
			valueListsHash={valueListsHash}
			optionsHash={optionsHash}
			modePrior={modePrior}
			referralHash={referralHash}
		/> :
		mode === 'proformae' ?
		<Proformae
			goToMainMenu={goToMainMenu}
			valueListsHash={valueListsHash}
			proformae={proformae}
			formatPresetStyle={formatPresetStyle}
			formatStyle={formatStyle}
			handleProformaeChange={handleProformaeChange}
			optionsHash={optionsHash}
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
			content={coachContent[mode]}
		/> :
		mode === 'core values' ?
		<CoreValues
			goToMainMenu={goToMainMenu}
			coreValues={coreValues}
		/> :
		<h1>Nothing To Load</h1>
}

export default App2;