// import { convertTimestampToString } from 'conjunction-junction';
import { useState } from 'react';
import Instructions from './999-instructions';
import Graph from './8-income-graph';

export default function Metrics(props) {

	const {
		goToMainMenu,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	return <div className='g1'>

		<h1 className='h1'>METRICS</h1>

			<div onClick={()=>goToMainMenu()} className='button2'>
				<p className='button2-text'>BACK TO MAIN MENU</p>
			</div>

			<div onClick={()=>setShowInstructions(!showInstructions)} className='button4'>
				<p className='button2-text'>
					{showInstructions ? 'Hide Instructions' : 'Show Instructions'}	
				</p>
			</div>
			<p>&nbsp;</p>
			<div onClick={()=>setShowDevNotes(!showDevNotes)} className='button4'>
				<p className='button2-text'>
					{showDevNotes ? 'Hide Dev Notes' : 'Show Dev Notes'}	
				</p>
			</div>

		<Graph />


		<Instructions show={showInstructions}
			text={''}/>

	</div>
}