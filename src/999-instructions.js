export default function Instructions(props) {
	const {
		show, 
		text,
	} = props;

	return show && text ? 
		<div className='small-group'>
			<p className='instructions'>
				{text}
			</p> 
		</div> : null 
}