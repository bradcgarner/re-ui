import { useState } from 'react';
import Instructions from './999-instructions';

export default function Coach(props) {

	const {
		goToMainMenu,
		content,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const c = content || {};
	const coachName = c.coachName || 'COACH';
	const header = c.header || 'COACHING';

	return <div className='g1'>

		<h1 className='h1'>{coachName}</h1>
		<h2 className='h2'>{header}</h2>

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

		<div className='g2'>

		</div>


		<Instructions show={showInstructions}
			text={''}/>
		
	</div>
}