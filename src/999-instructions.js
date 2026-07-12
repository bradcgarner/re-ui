export default function Instructions(props) {
	const {
		show, 
		text,
	} = props;

	return show && text ? 
		<div className='g2'>
			<p className='instructions'>
				{text}
			</p> 
		</div> : null 
}