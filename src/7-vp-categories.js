import { colorsHash } from './0-colors';

export default function VPCategories(props) {

	const {
		goToMainMenu,
		openContact,
		vpGroupHash,
		vpAppStatusHash,
		listVPs,
	} = props;

	const getVendorPartnerAppStatus = v => {
		const vl = vpAppStatusHash[`${v}`] || {};
		return vl.label || v;
	};

	const vpGroupKeys = Object.keys(vpGroupHash);
	vpGroupKeys.sort();

	return <div className='g0'>

		<h1 className='h1'>VENDOR PARTNER CATEGORIES</h1>

		<div onClick={()=>goToMainMenu()} className='button2'>
			<p className='button2-text'>BACK TO MAIN MENU</p>
		</div>
		<div onClick={()=>listVPs()} className='button2'>
			<p className='button2-text'>Go To List of Vendor Partners</p>
		</div>

		{
			vpGroupKeys.map((g,i)=>{
				const thisGroup = Array.isArray(vpGroupHash[g]) ? vpGroupHash[g] : [];
				return <div key={i} className='g0'>
					<h2 className='h2'>{g}</h2>
					<table style={{width: '80vw'}}>
						<thead>
							<tr className='table-list-thr'>
								<th className='table-list-th table-column-vp_category'>
									Category	
								</th>
								<th className='table-list-th table-column-vp_tags'>
									Tags	
								</th>
								<th className='table-list-th table-vp_members'>
									Members	
								</th>
							</tr>
						</thead>
						<tbody>
							{
								thisGroup.map((c,i)=>{
									const vp_tags = Array.isArray(c.vp_tags) ? c.vp_tags : [];
									const vp_members = Array.isArray(c.vp_members) ? c.vp_members : [];
									return <tr key={i} className='table-list-vp'>
										<td className='table-list-td table-column-vp_category'>
											{c.vp_category}
										</td>
										<td className='table-list-td table-column-vp_tags'>
											{
												vp_tags.map((t,x)=>{
													return <p className='p-vp_tags' key={x}>{t}</p>
												})
											}
										</td>	
										<td className='table-list-td table-column-vp_members'
											style={vp_members.length <= 0 ? {backgroundColor: 'white', color: colorsHash.good8} : {}}>
											{
												vp_members.map((m,x)=>{
													return <p key={x} className='p-vp_members' onClick={()=>openContact(m.id_contact)}>
														{m.contact_company}
													</p>
												})
											}
										</td>										
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			})
		}
	</div>
}