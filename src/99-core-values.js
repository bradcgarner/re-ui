import { useState } from 'react';
import Instructions from './999-instructions';

export default function CoreValues(props) {

	const {
		goToMainMenu,
		coreValues,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const cv = Array.isArray(coreValues) ? coreValues : [];
	const header = cv.header || 'COACHING';

	return <div className='display-group'>

		<h2 className='page-header'>{header}</h2>

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

		{
			cv.map((v,i)=>{
				return <div key={i} className='display-group'>
					<h2 className='group-header'>{v.cv_label}</h2>
					<p>{v.cv_notes}</p>
				</div>
			})
		}
		
	</div>
}