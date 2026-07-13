import { isPrimitiveNumber,
	precisionRound } from "conjunction-junction";
import { colorsHash } from "./0-colors";

export default function IncomeGraph(props) {

	const incomeData = props.incomeData || {};
	const dealStageHash = incomeData.dealStageHash || {};
	// const divisors = incomeData.divisors || {};
	// const pf_income_gci_pct = divisors.pf_income_gci_pct || 0;

	const dealGroups = Array.isArray(incomeData.dealGroups) ? incomeData.dealGroups : [] ;

	// get from DB
	const uconId = 120;
	const signId = 119;
	const opplId = 216;
	const oppnId = 118;
	const contId = 117;
	const prosId = 116;
	
	const oppsId = 215;
	const deadId = 217;
	const lostId = 122;
					

	const y0 = 1000;
	const w = 85;

	return <div className="graph-container">
		<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2235 1100">
			<line className="shape" x1="0" y1="1002" x2="2235" y2="1002"/>
			{
				dealGroups.map((s,i)=>{
					const {period1, period2} = s;
					const x = (i * 90) + 30;
					const xt = x + 42;

					const ucon = isPrimitiveNumber(s[`${uconId}`]) ? s[`${uconId}`] : 0 ;
					const sign = isPrimitiveNumber(s[`${signId}`]) ? s[`${signId}`] : 0 ;
					const oppl = isPrimitiveNumber(s[`${opplId}`]) ? s[`${opplId}`] : 0 ;
					const oppn = isPrimitiveNumber(s[`${oppnId}`]) ? s[`${oppnId}`] : 0 ;
					const cont = isPrimitiveNumber(s[`${contId}`]) ? s[`${contId}`] : 0 ;
					const pros = isPrimitiveNumber(s[`${prosId}`]) ? s[`${prosId}`] : 0 ;
					
					// const opps = isPrimitiveNumber(s[`${oppsId}`]) ? s[`${oppsId}`] : 0 ;
					// const dead = isPrimitiveNumber(s[`${deadId}`]) ? s[`${deadId}`] : 0 ;
					// const lost = isPrimitiveNumber(s[`${lostId}`]) ? s[`${lostId}`] : 0 ;
					
					const max  = precisionRound((ucon + sign + oppl + oppn + cont + pros),0);
					const maxH = precisionRound(max/200,0);

					const uconH = precisionRound(ucon/200, 0);
					const signH = precisionRound(sign/200, 0);
					const opplH = precisionRound(oppl/200, 0);
					const oppnH = precisionRound(oppn/200, 0);
					const contH = precisionRound(cont/200, 0);
					const prosH = precisionRound(pros/200, 0);
					
					// const oppsH = precisionRound(opps/200, 0);
					// const deadH = precisionRound(dead/200, 0);
					// const lostH = precisionRound(lost/200, 0);
					
					const prosY = y0 - maxH; // pros
					const contY = prosY + prosH; // cont
					const oppnY = contY + contH; // oppn
					const opplY = oppnY + oppnH; // pros
					const signY = opplY + opplH; // sign
					const uconY = signY + uconH; // sign

					const period1Print = isPrimitiveNumber(period1) && period1 < 12 ? period1 + 1 : period1;


				return <g key={i}>
					<rect className="shape ucon" height={uconH} y={uconY} x={x} width={w}/>
					<rect className="shape sign" height={signH} y={signY} x={x} width={w}/>
					<rect className="shape oppl" height={opplH} y={opplY} x={x} width={w}/>
					<rect className="shape oppn" height={oppnH} y={oppnY} x={x} width={w}/>
					<rect className="shape cont" height={contH} y={contY} x={x} width={w}/>
					<rect className="shape pros" height={prosH} y={prosY} x={x} width={w}/>
					<text className="text text-dark" transform={`translate(${xt} 1040)`}>{period1Print}</text>
					<text className="text text-dark" transform={`translate(${xt} 1090)`}>{period2}</text>
					<text className="text text-lite" transform={`translate(${xt} ${prosY-55})`}>{precisionRound(max/1000,0)}</text>
					<text className="text text-dark" transform={`translate(${xt} ${prosY-15})`}>{precisionRound(sign/1000,0)}</text>
				</g>
				})
			}
			<style>{`
				.text {
					font-family: MyriadPro-Regular, 'Myriad Pro';
					font-size: 36px;
					text-anchor: middle;
				}
				.text-dark {
					fill: ${colorsHash.good8};		
				}
				.text-lite {
					fill: ${colorsHash.good3};				
				}
				.shape {
					stroke: ${colorsHash.good8};
					stroke-opacity: 30%;
					}
				.ucon {
					fill: ${dealStageHash[`${uconId}`].color};				
				}
				.sign {
					fill: ${dealStageHash[`${signId}`].color};				
				}
				.oppl {
					fill: ${dealStageHash[`${opplId}`].color};				
				}
				.oppn {
					fill: ${dealStageHash[`${oppnId}`].color};				
				}
				.cont {
					fill: ${dealStageHash[`${contId}`].color};				
				}
				.pros {
					fill: ${dealStageHash[`${prosId}`].color};				
				}
				.opps {
					fill: ${dealStageHash[`${oppsId}`].color};				
				}
				.dead {
					fill: ${dealStageHash[`${deadId}`].color};				
				}
				.lost {
					fill: ${dealStageHash[`${lostId}`].color};				
				}
			`}
				</style>
		</svg>
	</div>
}