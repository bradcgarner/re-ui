import { colorsHash, colorsHashFull } from './0-colors';

export default function AppParams(props) {

	const {
		goToMainMenu,
		vLGroupsHash,
		formatPresetStyle,
	} = props;


	const lists = Object.keys(vLGroupsHash);
	lists.sort();

	const colorsList = Object.keys(colorsHashFull);

	const listsToExclude = {
		contact: true,
		deal: true,
		'core value': true,
	};

	const formatColorsStyle = thisItem => {
		const backgroundColor = thisItem.color;
		const color = thisItem.luma <= 170 ? 'white' : colorsHash.dark;
		return {backgroundColor, color};
	};

	return <div className='g1'>

		<h1 className='h1'>APP PARAMETERS</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>

		<div className='g2'>
			<label className='label3'>
				COLORS
				{
					colorsList.map((l,i)=>{
						const thisColor = colorsHashFull[l];
						return <input key={i} className='input3'
						value={thisColor.label || ''}
						style={formatColorsStyle(thisColor)}
						readOnly/>
					})
				}
			</label>
		</div>

		{
			lists.map((list,i)=>{
				if(listsToExclude[list]){
					return null;
				}
				const thisList = Array.isArray(vLGroupsHash[list]) ? vLGroupsHash[list] : [] ;
				return <div key={i} className='g2'>
					<label className='label3'>
						{list.toUpperCase()}
						{
							thisList.map((l,j)=>{
								return <input key={j} className='input3'
								value={`${l.label} (${l.id})` || ''}
								style={formatPresetStyle(l.id)}
								readOnly/>
							})
						}
					</label>
				</div>
			})
		}
		
	</div>
}