export default function DevNotes(props) {
	const {
		show, 
		text,
	} = props;

	return show ? 
		<div className='g2' style={{alignItems:'flex-start'}}>
			{
				Array.isArray(text) ?
				text.map((t,i)=>{
					return <p key={i} className="dev-notes">{t}</p>
				}) :
				<p className='dev-notes'>
					{text}
				</p> 
				}

		</div> : null 
}