import { useState } from "react";

export default function VPAppInternalWidget(props) {

	const {
		goToMainMenu,
		listVPApps,
		vpApp,
		modePrior,
		formatStyle,
		handleVPAppChange,
		optionsHash,
		saveVPApp,
	} = props;

	const a = vpApp || {};

	const [isEdited, setIsEdited] = useState(false);

	const _handleVPAppChange = (k, v) => {
		setIsEdited(true);
		return handleVPAppChange(k,v);
	};

	const contactOptions = !a.contactFilter ? optionsHash.contact :
		Array.isArray(optionsHash.contact) && typeof a.contactFilter === 'string' ? 
		optionsHash.contact.filter((o,i)=>{
			if(i===0){return true;}
			if(o.props && 
				typeof o.props.children === 'string' && 
				o.props.children[0] === a.contactFilter.toUpperCase()){
				return true;
			}
			return false;
		}) : optionsHash.contact;

	return <div className='g2'>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		{
			modePrior === 'vp-apps' ? 
			<div onClick={()=>listVPApps()} className="button2">
				<p className="button2-text">Back to List VP Apps</p>
			</div> :
			null
		}

		<div className="g2 g2-box g2-app">
			<label className='label6 label-white'>
				Assign VP App To Contact
				<p>&nbsp;</p>
				<div className='input6-row'>
					{
						a.id_contact ? null : 
						<input className='input5A'
							value={a.contactFilter || ''}
							onChange={e=>handleVPAppChange('contactFilter', e.target.value)}/>
					}
					<select className={!a.id_contact ? 'input5B' : 'input3'}
						value={a.id_contact || ''}
						style={formatStyle(a.id_contact)}
						onChange={e=>_handleVPAppChange('id_contact', e.target.value)}>
							{a.id_contact ? optionsHash.contact : contactOptions}
					</select>
				</div>
			</label> 
			<p>&nbsp;</p>
			<p className="label-white">Best Practices:</p>
			<p className="label-white">Though it is possible to move VP interactions from one record to another, there are no scripts to automate this (yet), and best to avoid it.</p>
			<p>&nbsp;</p>
			<p className="label-white">Therefore, treat the VP contact as a static entity. E.g. contact id 153 might be for ACME Painters. Let's say Paul Smith leaves the contact role and Jane Jones takes over the role. Do this:</p>
			<p>&nbsp;</p>
			<p className="label-white">Create a new [personal] contact for Paul Smith. Move his contact info there.</p>
			<p>&nbsp;</p>
			<p className="label-white">If any deals or conversations belong to Paul versus ACME, then they really should have been entered for Paul in the first place, but they can be moved (not via script as of now) to Paul's new record.</p>
			<p>&nbsp;</p>
			<p className="label-white">Enter Jane onto the SAME record that Paul was on, i.e. enter Jane Jones on the existing record for ACME Painting.</p>
			<p>&nbsp;</p>
			<p className="label-white">If a company has multiple distinct divisions, create a VP record for each division. </p>
			<p>&nbsp;</p>
			<p className="label-white">If a single division in a single company has multiple POCs, just pick one to be the primary POC.</p>
			<p>&nbsp;</p>
			
			{
				isEdited ?
					<div onClick={()=>saveVPApp()} className='button4 button4-3'>
						<p className='button4-text'>
							SAVE
						</p>
					</div> : null 
			}
		</div>
		
	</div>

}