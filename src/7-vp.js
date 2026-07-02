import { convertTimestampToString } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';

export default function VendorPartner(props) {

	const {
		goToMainMenu,
		listContacts,
		contact,
		valueListsHash,
		formatPresetStyle,
		formatStyle,
		saveContact,
		optionsHash,
	} = props;

	const [showInstructions, setShowInstructions] = useState(true);
	const [showDevNotes, setShowDevNotes] = useState(true);

	const printDate = d => {
		return convertTimestampToString(d, 'dow d M y')
	};
	const getValueListValue = v => {
		const vl = valueListsHash[`${v}`] || {};
		console.log({v,vl})
		return vl.label || v;
	};

	return <div className='display-group'>

		<h2 className='page-header'>VENDOR PARTNER</h2>

		<div className='display-group'>
			<div onClick={()=>goToMainMenu()} className='major-button'>
				<p className='major-button-text'>BACK TO MAIN MENU</p>
			</div>
			<div onClick={()=>listContacts()} className="major-button">
				<p className="major-button-text">Back to List Contacts</p>
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
		</div>

		<Instructions show={showInstructions}
			text={''}/>

		<p>{JSON.stringify(contact,null,2)}</p>
	</div>
}