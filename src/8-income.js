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

	return <div className='g1'>

		<h1 className='h1'>INCOME FORECAST</h1>

			<div onClick={()=>goToMainMenu()} className='button2'>
				<p className='button2-text'>BACK TO MAIN MENU</p>
			</div>

		<Controls
			showInstructions={showInstructions}
			setShowInstructions={setShowInstructions}
			showDevNotes={showDevNotes}
			setShowDevNotes={setShowDevNotes}
		/>

		<IncomeGraph 
			incomeData={incomeData}
		/>


		<Instructions show={showInstructions}
			text={''}/>

	</div>
}