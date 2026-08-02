import {useState, useEffect} from 'react';
import { calcScreenType } from 'browser-helpers';
import App2 from './2-app';
import Loading from './1-loading';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App() {

	const screenType = calcScreenType().type;

	// @@@@@@@@@@@ STATE @@@@@@@@@@@

	const [id_agent] = useState(parseInt(localStorage.id_agent, 10)); // update based on login

	const [hasLoaded, setHasLoaded] = useState(false);
	const [vLGroupsHash, setVLGroupsHash] = useState([]);
	const [vLItemsHash, setVLItemsHash] = useState({});
	const [optionsHash, setOptionsHash] = useState({});
	const [contactsHash, setContactsHash] = useState({});
	const [dealsHash, setDealsHash] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [proformae, setProformae] = useState({});
	const [vpAppStatusHash, setVpAppStatusHash] = useState({});

	const[vlStatic, setVlStatic] = useState({});
	const[convoDealFoundHash, setConvoDealFoundHash] = useState({});
	const[commissionHash, setDommissionHash] = useState({});
	const[referralHash, setReferralHash] = useState({});
	const[vpReferenceHash, setVpReferenceHash] = useState({});
	const[vpShowApplicationHash, setVpShowApplicationHash] = useState({});
	const[vpReferenceConstant, setVpReferenceConstant] = useState({});
	const[vpBinaryHash, setVpBinaryHash] = useState({});
	const[dealFoundHash, setDealFoundHash] = useState({});
	const[convoTypeHash, setConvoTypeHash] = useState({});
	const[convoIntentionalHash, setConvoIntentionalHash] = useState({});
	const[problemSolveHash, setProblemSolveHash] = useState({});
	const[dateIntegerHash, setDateIntegerHash] = useState({});
	const[inputFormatOptions,setInputFormatOptions] = useState({});
	const[tempIdKeys,setTempIdKeys] = useState({});

	const formatAndSetLists = content => {
		const {
			vpCategories,
			vpAreas,
			proformae,
			vLGroupsHash,
			vLItemsHash, 
			contactsHash, 
			vpAppStatusHash,
			dealsHash,
			reverseMonthHash} = content;

		const vpCategoryOptions = [<option key={-1} value={-1}>ADD OR REMOVE VP CATEGORY</option>]
		if(Array.isArray(vpCategories)){
			vpCategories.forEach((c,i)=>{
				vpCategoryOptions.push(<option key={i} value={c.vp_category}>{c.vp_category}</option>)
			});
		}

		const vpAreaOptions = [<option key={-1} value={-1}>ADD OR REMOVE VP AREA</option>]
		if(Array.isArray(vpAreas)){
			vpAreas.forEach((c,i)=>{
				vpAreaOptions.push(<option key={i} value={c.vp_area}>{c.vp_area}</option>)
			});
		}

		const monthOptions = [<option key={-1} value={-1}>SELECT MONTH</option>];
		for(let m in reverseMonthHash){
			monthOptions.push(<option key={m} value={m}>{reverseMonthHash[m]}</option>);			
		}

		const newListsHash = {
			// contacts: contactsOptions,
			vpCategories: vpCategoryOptions,
			vpAreas: vpAreaOptions,
			months: monthOptions,
		};
		for(let k in vLGroupsHash){
			newListsHash[k] = [<option key={-1} value={-1}>SELECT {k.toUpperCase()}</option>];
			for(let o in vLGroupsHash[k]){
				const thisO = vLGroupsHash[k][o];
				newListsHash[k].push(<option key={thisO.id} value={thisO.id}>{thisO.label}</option>)
			}
		}
		setProformae(proformae);
		setContactsHash(contactsHash);
		setDealsHash(dealsHash);
		setVLItemsHash(vLItemsHash);
		setVLGroupsHash(vLGroupsHash);
		setOptionsHash(newListsHash);
		setVpAppStatusHash(vpAppStatusHash);
		setVlStatic(content.vlStatic);
		setConvoDealFoundHash(content.convoDealFoundHash);
		setDommissionHash(content.commissionHash);
		setReferralHash(content.referralHash);
		setVpReferenceHash(content.vpReferenceHash);
		setVpShowApplicationHash(content.vpShowApplicationHash);
		setVpReferenceConstant(content.vpReferenceConstant);
		setVpBinaryHash(content.vpBinaryHash);
		setDealFoundHash(content.dealFoundHash);
		setConvoTypeHash(content.convoTypeHash);
		setConvoIntentionalHash(content.convoIntentionalHash);
		setProblemSolveHash(content.problemSolveHash);
		setDateIntegerHash(content.dateIntegerHash);
		setInputFormatOptions(content.inputFormatOptions);
		setTempIdKeys(content.tempIdKeys);
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
	// eslint-disable-next-line
	}, [hasLoaded]);

	// @@@@@@@@@@@ RENDER @@@@@@@@@@@

  return hasLoaded ?
    <div className='g0'>
			<App2
				vlStatic={vlStatic}
				screenType={screenType}
				id_agent={id_agent}
			  inputFormatOptions={inputFormatOptions}
				tempIdKeys={tempIdKeys}
				optionsHash={optionsHash}
				vLItemsHash={vLItemsHash}
				vLGroupsHash={vLGroupsHash}
				convoDealFoundHash={convoDealFoundHash}
				commissionHash={commissionHash}
				referralHash={referralHash}
				vpReferenceHash={vpReferenceHash}
				vpReferenceConstant={vpReferenceConstant}
				vpShowApplicationHash={vpShowApplicationHash}
				vpAppStatusHash={vpAppStatusHash}
				vpBinaryHash={vpBinaryHash}
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
