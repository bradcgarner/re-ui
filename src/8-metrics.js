import { convertTimestampToString } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';

export default function Metrics(props) {

	const {
		goToMainMenu,
		openActivity,
		fus,
		valueListsHash,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	return <div className='display-group'>

		<h2 className='page-header'>METRICS</h2>

			<div onClick={()=>goToMainMenu()} className='major-button'>
				<p className='major-button-text'>BACK TO MAIN MENU</p>
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

		<div className='display-group'>

		</div>

		<Instructions show={showInstructions}
			text={''}/>

	</div>
}