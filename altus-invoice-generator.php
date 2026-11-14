<?php
/**
 * Plugin Name: Altus Invoice Generator
 * Description: Free UK invoice generator tool — shortcode [altus_invoice_generator]. This open-source version contains NO lead capture, NO email sending, and NO data storage. Invoices are drafts you print or save yourself — check tax and legal details before sending one to a client.
 * Version: 1.0.1
 * Author: Altus Web Solutions
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'AIG_VERSION', '1.0.1' );
define( 'AIG_URL', plugin_dir_url( __FILE__ ) );
define( 'AIG_TOOL_URL', apply_filters('aig_tool_url', home_url('/')) );


function aig_enqueue() {
	if ( is_admin() ) { return; }
	wp_enqueue_style( 'aig-style', AIG_URL . 'assets/aig.css', array(), AIG_VERSION );
	wp_enqueue_script( 'aig-logic', AIG_URL . 'assets/invoice-logic.js', array(), AIG_VERSION, true );
	wp_enqueue_script( 'aig-script', AIG_URL . 'assets/aig.js', array( 'aig-logic' ), AIG_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'aig_enqueue' );

function aig_shortcode() {
	ob_start();
	?>
	<div id="aig-root">
		<div id="aig-builder">
			<div class="aig-col aig-form">
				<h3>Your business</h3>
				<label class="aig-field"><span>Business name</span><input id="aig-biz-name" placeholder="e.g. Your Business Ltd" /></label>
				<label class="aig-field"><span>Business logo</span><input id="aig-biz-logo" type="file" accept="image/*" /></label>
				<label class="aig-field"><span>Business email</span><input id="aig-biz-email" type="email" placeholder="you@yourbusiness.co.uk" /></label>
				<label class="aig-field"><span>Business address</span><textarea id="aig-biz-addr" placeholder="Street, city, postcode" rows="2"></textarea></label>
				<label class="aig-field"><span>VAT number (optional)</span><input id="aig-biz-vat" placeholder="e.g. GB 123 4567 89" /></label>
				<h3>Bill to</h3>
				<label class="aig-field"><span>Client name</span><input id="aig-client-name" placeholder="Client or company name" /></label>
				<label class="aig-field"><span>Client email</span><input id="aig-client-email" type="email" placeholder="client@email.com" /></label>
				<label class="aig-field"><span>Client address</span><textarea id="aig-client-addr" placeholder="Street, city, postcode" rows="2"></textarea></label>
				<h3>Invoice details</h3>
				<label class="aig-field"><span>Invoice description</span><input id="aig-desc" placeholder="e.g. Website redesign — Phase 1" /></label>
				<div class="aig-row">
					<label class="aig-field"><span>Invoice #</span><input id="aig-number" value="INV-0001" /></label>
					<label class="aig-field"><span>Currency</span>
						<select id="aig-currency">
							<option value="£">GBP £</option>
							<option value="$">USD $</option>
							<option value="€">EUR €</option>
							<option value="Rs">PKR Rs</option>
							<option value="₹">INR ₹</option>
							<option value="د.إ">AED د.إ</option>
							<option value="﷼">SAR ﷼</option>
							<option value="C$">CAD C$</option>
							<option value="A$">AUD A$</option>
						</select>
					</label>
				</div>
				<div class="aig-row">
					<label class="aig-field"><span>Issue date</span><input id="aig-issue" type="date" /></label>
					<label class="aig-field"><span>Due date</span><input id="aig-due" type="date" /></label>
				</div>
				<h3>Items</h3>
				<div id="aig-items"></div>
				<button type="button" id="aig-add-item" class="aig-btn-secondary">+ Add item</button>
				<div class="aig-row">
					<label class="aig-field"><span>VAT / tax %</span><input id="aig-tax" type="number" value="0" min="0" max="100" /></label>
					<label class="aig-field"><span>Discount (flat)</span><input id="aig-discount" type="number" value="0" min="0" /></label>
				</div>
				<h3>Notes</h3>
				<label class="aig-field"><span>Notes</span><textarea id="aig-notes" rows="2" placeholder="Payment terms, bank details, thank-you note…"></textarea></label>
			</div>
			<div class="aig-col aig-preview-wrap">
				<div id="aig-preview"></div>
				<div class="aig-actions">
					<button type="button" id="aig-print" class="aig-btn-primary">Download / Print PDF</button>
				</div>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'altus_invoice_generator', 'aig_shortcode' );


