import { hexToRgb } from "conjunction-junction";

export const colorsHash = {
	bad4:    '#ff0000',
	bad3:    '#fb3c62',
	bad2:    '#f77791',
	bad1:    '#f2b3bf',
	good1:   '#e6f2ff',
	good2:   '#c5e2f6',
	good3:   '#a4d2ed',
	good4:   '#83c2e4',
	good5:   '#63b3db',
	good6:   '#42a3d2',
	good7:   '#2193c9',
	good8:   '#0083c0',
	grand1:  '#1583c0',
	grand2:  '#2b83c0',
	grand3:  '#4083c0',
	grand4:  '#5583c0',
	grand5:  '#6b83c0',
	grand6:  '#8083c0',
	dark:    '#004b6e',
	lt_blue: '#e4f2fb',
	lt_gray: '#f0f4f4',
	lt_tan:  '#fff7f6',
	lt_pink: '#fff3f6',
	gray:    '#cccccc',
};

const _colorsHashFull = {};

for(let k in colorsHash){
	const rgb = hexToRgb(colorsHash[k]);
	_colorsHashFull[k] = {
		label: k,
		color: colorsHash[k],
		luma: rgb.luma || 50,
	}
}

export const colorsHashFull = _colorsHashFull;