/* Altus Invoice Generator — live premium preview (uses AIGLogic for all math). */
(function () {
	'use strict';

	function $(id) { return document.getElementById(id); }
	var L = (typeof window !== 'undefined' && window.AIGLogic) ? window.AIGLogic : null;
	function esc(s) {
		var d = document.createElement('div');
		d.textContent = s == null ? '' : String(s);
		return d.innerHTML;
	}
	var logoDataUrl = '';

	function readItems() {
		var items = [];
		document.querySelectorAll('#aig-items .aig-item-row').forEach(function (r) {
			items.push({
				d: r.querySelector('.aig-it-desc').value.trim() || 'Item',
				q: r.querySelector('.aig-it-qty').value,
				r: r.querySelector('.aig-it-rate').value
			});
		});
		return items;
	}

	function itemRow() {
		var r = document.createElement('div');
		r.className = 'aig-item-row';
		r.innerHTML =
			'<input class="aig-it-desc" placeholder="Description" />' +
			'<input class="aig-it-qty" type="number" value="1" min="0" />' +
			'<input class="aig-it-rate" type="number" value="0" min="0" />' +
			'<button type="button" class="aig-item-del" title="Remove">&times;</button>';
		r.querySelector('.aig-item-del').onclick = function () { r.remove(); render(); };
		r.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', render); });
		return r;
	}

	function render() {
		if (!$('aig-preview') || !L) { return; }
		var cur = $('aig-currency').value;
		var items = readItems();
		var disc = $('aig-discount').value;
		var taxP = parseFloat($('aig-tax').value) || 0;
		var t = L.calcTotals(items, disc, taxP);

		var rows = items.map(function (i) {
			var qty = L.num(i.q), rate = L.num(i.r);
			return '<tr><td>' + esc(i.d) + '<br><small style="color:#8a97ad">' + qty + ' &times; ' + L.money(rate, cur) + '</small></td>' +
				'<td>' + L.money(qty * rate, cur) + '</td></tr>';
		}).join('');

		var vatNo = $('aig-biz-vat').value.trim();
		$('aig-preview').innerHTML =
			'<div class="aig-inv-head">' +
				'<div class="aig-inv-biz">' +
					(logoDataUrl ? '<img class="aig-inv-logo" src="' + logoDataUrl + '" alt="Business logo" />' : '') +
					esc($('aig-biz-name').value || 'Your Business') +
					'<small>' + esc($('aig-biz-addr').value).replace(/\n/g, '<br>') + ($('aig-biz-email').value ? '<br>' + esc($('aig-biz-email').value) : '') +
					(vatNo ? '<br>VAT: ' + esc(vatNo) : '') + '</small></div>' +
				'<div class="aig-inv-title"><h2>INVOICE</h2>' +
					'<p><strong>' + esc($('aig-number').value) + '</strong></p>' +
					($('aig-desc').value.trim() ? '<p class="aig-inv-desc">' + esc($('aig-desc').value) + '</p>' : '') +
					'<p>Issued: ' + esc($('aig-issue').value || '—') + '<br>Due: ' + esc($('aig-due').value || '—') + '</p></div>' +
			'</div>' +
			'<div class="aig-inv-parties">' +
				'<div class="aig-inv-party"><strong>Bill to</strong><b>' + esc($('aig-client-name').value || 'Client name') + '</b><br>' +
					esc($('aig-client-addr').value).replace(/\n/g, '<br>') + ($('aig-client-email').value ? '<br>' + esc($('aig-client-email').value) : '') + '</div>' +
				'<div class="aig-inv-party"><strong>From</strong><b>' + esc($('aig-biz-name').value || 'Your Business') + '</b><br>' +
					esc($('aig-biz-email').value || '') + '</div>' +
			'</div>' +
			'<table class="aig-inv-table"><thead><tr><th>Description</th><th>Amount</th></tr></thead>' +
			'<tbody>' + (rows || '<tr><td colspan="2" style="color:#8a97ad">Add items to build your invoice.</td></tr>') + '</tbody></table>' +
			'<div class="aig-inv-totals"><table>' +
				'<tr><td>Subtotal</td><td>' + L.money(t.subtotal, cur) + '</td></tr>' +
				(t.discount > 0 ? '<tr><td>Discount</td><td>&minus;' + L.money(t.discount, cur) + '</td></tr>' : '') +
				(taxP > 0 ? '<tr><td>VAT (' + taxP + '%)</td><td>' + L.money(t.tax, cur) + '</td></tr>' : '') +
				'<tr class="aig-inv-grand"><td>Total due</td><td>' + L.money(t.total, cur) + '</td></tr>' +
			'</table></div>' +
			($('aig-notes').value.trim() ? '<div class="aig-inv-notes">' + esc($('aig-notes').value).replace(/\n/g, '<br>') + '</div>' : '') +
			'<div class="aig-inv-foot"><span>Thank you for your business.</span>' +
			'<span>Created free with <a href="https://altuswebsolutions.com/tools/invoice-generator/">Altus Invoice Generator</a></span></div>';

		/* Defensive: pin the credit link href in case any theme/plugin rewrites footer links. */
		var credit = document.querySelector('#aig-preview .aig-inv-foot a');
		if (credit) { credit.setAttribute('href', 'https://altuswebsolutions.com/tools/invoice-generator/'); }
	}

	function gatherData() {
		return {
			business: $('aig-biz-name').value.trim(),
			bizEmail: $('aig-biz-email').value.trim(),
			vatNumber: $('aig-biz-vat').value.trim(),
			clientName: $('aig-client-name').value.trim(),
			invNo: $('aig-number').value.trim(),
			description: $('aig-desc').value.trim(),
			issue: $('aig-issue').value,
			due: $('aig-due').value,
			currency: $('aig-currency').value,
			notes: $('aig-notes').value.trim(),
			items: readItems(),
			taxPct: parseFloat($('aig-tax').value) || 0,
			discount: $('aig-discount').value
		};
	}

	function init() {
		if (!$('aig-root') || !L) { return; }
		var today = new Date().toISOString().slice(0, 10);
		$('aig-issue').value = today;
		var due = new Date(); due.setDate(due.getDate() + 14);
		$('aig-due').value = due.toISOString().slice(0, 10);
		$('aig-items').appendChild(itemRow());
		['aig-biz-name','aig-biz-email','aig-biz-addr','aig-biz-vat','aig-client-name','aig-client-email','aig-client-addr',
		 'aig-number','aig-desc','aig-currency','aig-issue','aig-due','aig-tax','aig-discount','aig-notes'].forEach(function (id) {
			$(id).addEventListener('input', render);
		});
		$('aig-biz-logo').addEventListener('change', function () {
			var f = this.files && this.files[0];
			if (!f) { logoDataUrl = ''; render(); return; }
			var rd = new FileReader();
			rd.onload = function () { logoDataUrl = rd.result; render(); };
			rd.readAsDataURL(f);
		});
		$('aig-add-item').onclick = function () { $('aig-items').appendChild(itemRow()); };
		$('aig-print').onclick = function () { window.print(); };
		render();
	}

	if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
	else { init(); }
})();
