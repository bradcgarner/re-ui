import { useState } from 'react';
import Instructions from './999-instructions';
import Controls from './99-controls';

export default function Coach(props) {

	const {
		goToMainMenu,
		content,
		handleCoachChange,
	} = props;

	const [showInstructions, setShowInstructions] = useState(false);
	const [showDevNotes, setShowDevNotes] = useState(false);

	const c = content || {};
	const coach = c.coach || 'COACH';
	const header = c.coach_header || 'COACHING';
	const items = Array.isArray(c.items) ? c.items : [];

	return <div className='g1'>

		<h1 className='h1'>{coach}</h1>
		<h2 className='h2'>{header}</h2>

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
			{
				items.map((x,i)=>{
					return <div key={i} className='coach-div'>
						<textarea className='input3'
							value={x.coach_one || ''}
							onChange={e=>handleCoachChange('coach_one',i, e.target.value)}/>
						<textarea className='input3'
							value={x.coach_two || ''}
							onChange={e=>handleCoachChange('coach_two',i, e.target.value)}/>
						<textarea className='input3'
							value={x.coach_three || ''}
							onChange={e=>handleCoachChange('coach_three',i, e.target.value)}/>
						<input className='input3'
							value={x.sort_order || ''}
							onChange={e=>handleCoachChange('sort_order',i, e.target.value)}/>
					</div>
				})
			}
		</div>


		<Instructions show={showInstructions}
			text={''}/>
		
	</div>
}