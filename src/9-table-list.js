import { useState } from 'react';
import { convertTimestampToString,
	numberWithCommas,
	precisionRound
 } from 'conjunction-junction';
import { calcMinimumWindowDimensions, calcScreenType } from 'browser-helpers/build/dimensions';
import { isPrimitiveNumber } from 'conjunction-junction/build/basic';

export default function TableList(props) {

	const {
		goToMainMenu,
		openItem,
		openKey,
		items,
		valueListsHash,
		formatPresetStyle,
		formatStyle,
		theFields,
		header,
	} = props;

	const screenType = calcScreenType().type;
	const dims = calcMinimumWindowDimensions(window);
	const widthOuter = isPrimitiveNumber(dims.cssWidthOuter) ? dims.cssWidthOuter : 430;
	const hundreds = precisionRound(widthOuter/100, 0);
	const max = openKey === 'id_contact' && hundreds <= 5 ? 1 : hundreds <= 5 ? hundreds - 1 : hundreds <= 10 ? hundreds : 50;

	const fields = Array.isArray(theFields) ? theFields.filter((f,i)=>{
		return i<= max;
	}) : fields;

	const printDate = d => {
		return convertTimestampToString(d, 'dow d M y')
	};
	const getValueListValue = v => {
		const vl = valueListsHash[`${v}`] || {};
		return vl.label || v;
	};
	const printDollar = d => {
		return `$${numberWithCommas(d)}`;
	};
	const printPct = d => {
		return `${precisionRound(d * 100, 0)}%`;
	};

	return <div className='display-group'>

		<h2 className='page-header'>{header}</h2>

		<div onClick={()=>goToMainMenu()} className='major-button'>
			<p className='major-button-text'>BACK TO MAIN MENU</p>
		</div>

		<table>
			<thead>
				<tr className='table-list-thr'>
					{
						fields.map((f,i)=>{
							return <th key={i} className='table-list-th'>{f.label || f.fieldName}</th>
						})
					}
				</tr>
				
			</thead>
			<tbody>
				{
					items.map((a,i)=>{
						return <tr key={i} className='table-list-tr' onClick={()=>openItem(a[openKey])}>
							{
								fields.map((f,i)=>{
									const value = a[f.fieldName];
									const fd = f.fd === 'vl' ? getValueListValue(value) : f.fd === 'date' ? printDate(value) : f.fd === 'dollar' ? printDollar(value) : f.fd === 'pct' ? printPct(value) : value ;
									const fs = f.fd === 'vl' ? formatPresetStyle : formatStyle;
									return <td key={i} className='table-list-td' style={fs(value)}>{fd}</td>
								})
							}
						</tr>
					})
				}
			</tbody>
		</table>
	</div>
}