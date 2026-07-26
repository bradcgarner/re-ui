import { useState } from 'react';
import Instructions from './999-instructions';
import Controls from './99-controls';

export default function CoreValues(props) {

	const {
		goToMainMenu,
		coreValues,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const cv = Array.isArray(coreValues) ? coreValues : [];
	const header = cv.header || 'COACHING';

	return <div className='g1'>

		<h1 className='h1'>{header}</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>

		<Controls
			showInstructions={showInstructions}
			setShowInstructions={setShowInstructions}
			showDevNotes={showDevNotes}
			setShowDevNotes={setShowDevNotes}
		/>

		<div className='g2'>

		</div>


		<Instructions show={showInstructions}
			text={''}/>

		{
			cv.map((v,i)=>{
				return <div key={i} className='g2'>
					<h2 className='h2'>{v.cv_label}</h2>
					<p>{v.cv_notes}</p>
				</div>
			})
		}
		
	</div>
}