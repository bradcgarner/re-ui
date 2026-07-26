import { useState } from 'react';
import Instructions from './999-instructions';
import Graph from './8-income-graph';
import Controls from './99-controls';

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

		<Controls
			showInstructions={showInstructions}
			setShowInstructions={setShowInstructions}
			showDevNotes={showDevNotes}
			setShowDevNotes={setShowDevNotes}
		/>

		<Graph />


		<Instructions show={showInstructions}
			text={''}/>

	</div>
}