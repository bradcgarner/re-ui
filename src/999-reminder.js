export default function Reminder(props) {
	const {
		show, 
		text,
	} = props;

	return show ? 
		<div className='g2'>
			<p className='reminder'>
				{text}
			</p> 
		</div> : null 
}