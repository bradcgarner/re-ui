// import { useState } from 'react';
import { 
	convertTimestampToString,
	numberWithCommas,
	precisionRound,
	isPrimitiveNumber
 } from 'conjunction-junction';
import { calcMinimumWindowDimensions } from 'browser-helpers';
import { colorsHash } from './0-colors';

export default function TableList(props) {

	const {
		goToMainMenu,
		openItem,
		openKey,
		items,
		vLItemsHash,
		vpAppStatusHash,
		coreValues,
		formatPresetStyle,
		listVPCategories,
		formatStyle,
		theFields,
		header,
		modePrior,
		mode,
	} = props;

	const _listVPCategories = typeof listVPCategories === 'function' ? listVPCategories : ()=>{};

	const formatVpAppStatusStyle = id => {
		if(vpAppStatusHash[`${id}`]){
			const thisItem = vpAppStatusHash[`${id}`];
			const backgroundColor = thisItem.color || colorsHash.gray;
			const color = thisItem.luma <= 170 ? 'white' : colorsHash.dark;
			return {backgroundColor, color};
		}
		return {backgroundColor:colorsHash.dark, color:colorsHash.good2};
	};

	const dims = calcMinimumWindowDimensions(window);
	const widthOuter = isPrimitiveNumber(dims.cssWidthOuter) ? dims.cssWidthOuter : 430;
	const hundreds = precisionRound(widthOuter/100, 0);
	const max = openKey === 'id_contact' && hundreds <= 5 ? 1 : hundreds <= 5 ? hundreds - 1 : hundreds <= 10 ? hundreds : 20;

	const fields = Array.isArray(theFields) ? theFields.filter((f,i)=>{
		return i<= max;
	}) : theFields;

	const coreValuesHash = {};
	if(Array.isArray(coreValues)){
		coreValues.forEach(v=>{
			coreValuesHash[`${v.id_cv}`] = v;
		})
	}
	const printDate = d => {
		return convertTimestampToString(d, 'dow d M y')
	};
	const getValueListValue = v => {
		const vl = vLItemsHash[`${v}`] || {};
		return vl.label || v;
	};
	const getCoreValueListValue = v => {
		const vl = coreValuesHash[`${v}`] || {};
		return vl.cv_label || v;
	};
	const getVendorPartnerAppStatus = v => {
		const vl = vpAppStatusHash[`${v}`] || {};
		return vl.label || v;
	};
	const printDollar = d => {
		return `$${numberWithCommas(d)}`;
	};
	const printPct = d => {
		return `${precisionRound(d * 100, 0)}%`;
	};

	return <div className='g1'>

		<h1 className='h1'>{header}</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'vp-categories' || mode === 'vps' ?
				<div onClick={()=>_listVPCategories()} className='button2'>
					<p className='button2-text'>Back To List VP Categories</p>
				</div> : null
		}

		<table>
			<thead>
				<tr className='table-list-thr'>
					{
						fields.map((f,i)=>{
							return <th key={i} className={`table-list-th table-column-${f.fieldName}`}>{f.label || f.fieldName}</th>
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
									const value = f.limit && typeof a[f.fieldName] === 'string' ? a[f.fieldName].slice(0,f.limit) : a[f.fieldName];
									const fd = 
										f.fd === 'vl' ? getValueListValue(value) : 
										f.fd === 'date' ? printDate(value) : 
										f.fd === 'cv' ? getCoreValueListValue(value) : 
										f.fd === 'vp' ? getVendorPartnerAppStatus(value) :
										f.fd === 'dollar' ? printDollar(value) : 
										f.fd === 'pct' ? printPct(value) : 
										value ;
									const fs = 
										f.fd === 'vl' ? formatPresetStyle : 
										f.fd === 'vp' ? formatVpAppStatusStyle :
										formatStyle;
									return <td key={i} className={`table-list-td table-column-${f.fieldName}`} style={fs(value)}>{fd}</td>
								})
							}
						</tr>
					})
				}
			</tbody>
		</table>
	</div>
}