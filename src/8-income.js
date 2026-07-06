// import { convertTimestampToString } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';
import IncomeGraph from './8-income-graph';

export default function Income(props) {

	const {
		goToMainMenu,
		incomeData
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	return <div className='display-group'>

		<h2 className='page-header'>INCOME FORECAST</h2>

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

		<IncomeGraph 
			incomeData={incomeData}
		/>


		<Instructions show={showInstructions}
			text={''}/>

	</div>
}