export default function DevNotes(props) {
	const {
		show, 
		text,
	} = props;

	return show ? 
		<div className='display-group'>
			<p className='dev-notes'>
				{text}
			</p> 
		</div> : null 
}