import { convertTimestampToString } from 'conjunction-junction';
import { useState } from 'react';

export default function Activities(props) {

	const {
		goToMainMenu,
		openActivity,
		activities,
		valueListsHash,
		formatPresetStyle,
		formatStyle,
	} = props;

	const printDate = d => {
		return convertTimestampToString(d, 'dow d M y')
	};
	const getValueListValue = v => {
		const vl = valueListsHash[`${v}`] || {};
		console.log({v,vl})
		return vl.label || v;
	};

	const theFields = [
		{
			fieldName: 'date_convo_timestamp', 
			label: 'id', 
			fd: 'date'
		},
		{
			fieldName: 'contactsNames', 
			label: 'contact', 
			fn: null
		},
		{
			fieldName: 'convo_intentional_binary', 
			label: 'intentional', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_main_purpose', 
			label: 'main purpose', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_relationship', 
			label: 'relationship', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_method', 
			label: 'method', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_tone', 
			label: 'tone', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_model', 
			label: 'model', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_intentional', 
			label: 'intentional', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_type', 
			label: 'type', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_voice_note', 
			label: 'voice note', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_problem_solve', 
			label: 'problem to solve', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'convo_notes', 
			label: 'notes', 
		},
		{
			fieldName: 'convo_deal_found', 
			label: 'deal found', 
			fd: 'vl', 
			fs: 'pre',
		},
		{
			fieldName: 'id_activity', 
			label: 'id', 
		},
		{
			fieldName: 'timestamp_created', 
			label: 'created', 
			fd: 'date',
		},
		{
			fieldName: 'id_activity_temp', 
			label: 'id_activity_temp', 
		},
		{
			fieldName: 'id_agent', 
			label: 'id_agent', 
		},

	];

	return <div className='display-group'>

		<h2 className='page-header'>ACTIVITIES</h2>

		<div className='display-group'>
			<div onClick={()=>goToMainMenu()} className='major-button'>
				<p className='major-button-text'>BACK TO MAIN MENU</p>
			</div>
		</div>

		<table>
			<thead>
				<tr>
					{
						theFields.map((f,i)=>{
							return <th key={i}>{f.label || f.fieldName}</th>
						})
					}
				</tr>
				
			</thead>
			<tbody>
				{
					activities.map((a,i)=>{
						return <tr key={i} onClick={()=>openActivity(a.id_activity)}>
							{
								theFields.map((f,i)=>{
									const value = a[f.fieldName];
									const fd = f.fd === 'vl' ? getValueListValue(value) : f.fd === 'date' ? printDate(value) : value ;
									const fs = f.fs === 'pre' ? formatPresetStyle : formatStyle;
									return <td key={i} style={fs(value)}>{fd}</td>
								})
							}
						</tr>
					})
				}
			</tbody>
		</table>
	</div>
}