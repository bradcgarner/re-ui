export default function Reminder(props) {
	const {
		show, 
		text,
	} = props;

	return show ? 
		<div className='small-group'>
			<p className='reminder'>
				{text}
			</p> 
		</div> : null 
}