export const theFields = {
	dailyPlans: [
		{
			fieldName: 'date_dp_timestamp', 
			label: 'date', 
			fd: 'date'
		},
		{
			fieldName: 'dp_cv_1', 
			label: 'core value 1', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_cv_1_rank', 
			label: 'core value 1', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_cv_2', 
			label: 'core value 2', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_cv_2_rank', 
			label: 'core value 2', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_cv_3', 
			label: 'core value 3', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_cv_3_rank', 
			label: 'core value 3', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_future_self', 
			label: 'future self', 
		},
		{
			fieldName: 'dp_convo_enter', 
			label: 'convos entered', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_convo_recap', 
			label: 'convos recapped', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_contacts_entered', 
			label: 'contacts entered', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_fu_review', 
			label: 'follow-ups reviewed', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_calendar', 
			label: 'calendar updated', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_yesterday_status', 
			label: 'yesterday status', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_yesterday_notes', 
			label: 'yesterday notes', 
		},
		{
			fieldName: 'dp_convo_goal', 
			label: 'convo goal', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_vp_seeking', 
			label: 'VP seeking', 
		},
		{
			fieldName: 'dp_talk_plan', 
			label: 'talk plan', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_svc_priority', 
			label: 'service priority', 
		},
		{
			fieldName: 'dp_stabilize_plan', 
			label: 'stabilization plan', 
			fd: 'vl'
		},
		{
			fieldName: 'dp_white_space', 
			label: 'white space', 
		},
		{
			fieldName: 'id_agent', 
		},
		{
			fieldName: 'id_dp', 
		},
		{
			fieldName: 'timestamp_created', 
			fd: 'date'
		},
	],
	activities: [
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
		},
		{
			fieldName: 'convo_main_purpose', 
			label: 'main purpose', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_relationship', 
			label: 'relationship', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_method', 
			label: 'method', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_tone', 
			label: 'tone', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_model', 
			label: 'model', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_intentional', 
			label: 'intentional', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_type', 
			label: 'type', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_voice_note', 
			label: 'voice note', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_problem_solve', 
			label: 'problem to solve', 
			fd: 'vl', 
		},
		{
			fieldName: 'convo_notes', 
			label: 'notes', 
		},
		{
			fieldName: 'convo_deal_found', 
			label: 'deal found', 
			fd: 'vl', 
		},
		{
			fieldName: 'id_activity', 
			label: 'id', 
		},
		{
			fieldName: 'timestamp_created', 
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
	],
	fus: [
		{
			fieldName: 'date_fu_timestamp', 
			label: 'date', 
			fd: 'date'
		},
		{
			fieldName: 'contactName', 
			label: 'contact', 
		},
		{
			fieldName: 'fu_purpose', 
			label: 'purpose', 
			fd: 'vl',
		},
		{
			fieldName: 'timestamp_created', 
			fd: 'date'
		},
		{
			fieldName: 'id_activity', 
			label: 'id_activity', 
		},
	],
	contacts: [
		{
			fieldName: 'contactName', 
			label: 'contact', 
		},
		{
			fieldName: 'contact_phone', 
			label: 'phone', 
		},
		{
			fieldName: 'contact_email', 
			label: 'email', 
		},
		{
			fieldName: 'contact_how_met', 
			label: 'how met', 
			fd: 'vl',
		},
		{
			fieldName: 'contact_where_met', 
			label: 'where met', 
			fd: 'vl'
		},
		{
			fieldName: 'contact_where_met_notes', 
			label: 'where met', 
		},
		{
			fieldName: 'contact_notes', 
			label: 'notes', 
		},
		{
			fieldName: 'contact_vp_status', 
			label: 'vp status',
			fd: 'vl', 
		},
		{
			fieldName: 'contact_vp_categories', 
			label: 'vp categories',
		},
				{
			fieldName: 'contact_company', 
			label: 'company',
		},
		{
			fieldName: 'contact_title', 
			label: 'title',
		},
		{
			fieldName: 'contact_tags', 
			label: 'tags',
		},
		{
			fieldName: 'contact_address_street', 
			label: 'street',
		},
		{
			fieldName: 'contact_address_city', 
			label: 'city',
		},
		{
			fieldName: 'contact_address_state', 
			label: 'state',
		},
		{
			fieldName: 'contact_address_zip', 
			label: 'zip',
		},
		{
			fieldName: 'contact_birth_month', 
			label: 'birth month',
		},
		{
			fieldName: 'contact_birth_day', 
			label: 'birth day',
		},
		{
			fieldName: 'contact_birth_year', 
			label: 'birth year',
		},
		{
			fieldName: 'id_contact', 
		},
		{
			fieldName: 'timestamp_created', 
			fd: 'date',
		},
		{
			fieldName: 'id_agent', 
		},
		{
			fieldName: 'id_contact_temp', 
		},
	],
	deals: [
		{
			fieldName: 'date_deal_timestamp', 
			label: 'date', 
			fd: 'date'
		},
		{
			fieldName: 'deal_name', 
			label: 'name', 
		},
		{
			fieldName: 'deal_address', 
			label: 'address', 
		},
		{
			fieldName: 'deal_how_found', 
			label: 'how found', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_how_found_categ', 
			label: 'how found', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_trigger', 
			label: 'trigger', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_type', 
			label: 'type', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_stage', 
			label: 'stage', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_timeline_stated', 
			label: 'timeline stated', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_timeline_status', 
			label: 'timeline status', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_notes', 
			label: 'notes', 
		},
		{
			fieldName: 'deal_value_status', 
			label: 'value status', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_value', 
			label: 'value', 
			fd: 'dollar'
		},
		{
			fieldName: 'deal_commission_rate', 
			label: 'pct', 
			fd: 'vl'
		},
		{
			fieldName: 'deal_gci', 
			label: 'gci', 
			fd: 'dollar'
		},
		{
			fieldName: 'timestamp_created', 
			fd: 'date',
		},
		{
			fieldName: 'id_agent', 
		},
		{
			fieldName: 'id_deal', 
		},
		{
			fieldName: 'id_deal_temp', 
		},
	],
};