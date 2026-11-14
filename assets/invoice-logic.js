/* Altus Invoice Generator — pure invoice logic (no DOM).
 * Loaded before aig.js; exported for Node tests.
 */
var AIGLogic = (function () {
	'use strict';

	function num(v) {
		var n = parseFloat(v);
		return (typeof n === 'number' && isFinite(n)) ? n : 0;
	}

	function round2(n) {
		return Math.round((num(n) + Number.EPSILON) * 100) / 100;
	}

	/* Money: £1,234.50 (en-GB grouping, always 2dp). */
	function money(n, cur) {
		n = num(n);
		cur = (cur == null) ? '' : String(cur);
		return cur + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	/* Totals. Discount is a flat amount; tax is a percentage applied AFTER discount.
	 * Tax base is clamped at zero so discount > subtotal can never go negative. */
	function calcTotals(items, discount, taxPct) {
		var sub = 0;
		(items || []).forEach(function (it) {
			sub += num(it.q) * num(it.r);
		});
		var disc = Math.max(0, num(discount));
		var base = Math.max(0, sub - disc);
		var tax = base * num(taxPct) / 100;
		return {
			subtotal: round2(sub),
			discount: round2(disc),
			taxable:  round2(base),
			tax:      round2(tax),
			total:    round2(base + tax)
		};
	}

	/* Plain-text invoice summary for the email gate. `data` is a plain object:
	 * { business, bizEmail, clientName, invNo, description, issue, due, currency,
	 *   vatNumber, notes, items: [{d, q, r}], taxPct, discount } */
	function buildTextSummary(data) {
		var d = data || {};
		var items = d.items || [];
		var cur = d.currency || '';
		var t = calcTotals(items, d.discount, d.taxPct);
		var lines = [];
		lines.push('INVOICE ' + (d.invNo || ''));
		lines.push('From: ' + (d.business || '') + (d.bizEmail ? ' <' + d.bizEmail + '>' : ''));
		if (d.vatNumber) lines.push('VAT number: ' + d.vatNumber);
		lines.push('Bill to: ' + (d.clientName || ''));
		if (d.description) lines.push('Description: ' + d.description);
		lines.push('Issued: ' + (d.issue || '') + '   Due: ' + (d.due || ''));
		lines.push('');
		items.forEach(function (it) {
			lines.push('- ' + (it.d || 'Item') + ' — ' + it.q + ' x ' + money(it.r, cur) + ' = ' + money(it.q * it.r, cur));
		});
		lines.push('');
		lines.push('Subtotal: ' + money(t.subtotal, cur));
		if (t.discount > 0) lines.push('Discount: -' + money(t.discount, cur));
		if (num(d.taxPct) > 0) lines.push('VAT (' + num(d.taxPct) + '%): ' + money(t.tax, cur));
		lines.push('TOTAL DUE: ' + money(t.total, cur));
		if (d.notes) lines.push('', 'Notes: ' + d.notes);
		return lines.join('\n');
	}

	return {
		num: num,
		round2: round2,
		money: money,
		calcTotals: calcTotals,
		buildTextSummary: buildTextSummary
	};
})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = AIGLogic;
}
