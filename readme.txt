=== Altus Invoice Generator ===
Contributors: altuswebsolutions-official
Tags: invoice generator, freelancer invoice, vat invoice, small business, pdf invoice
Requires at least: 5.8
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Free UK invoice generator for freelancers and trades — logo, VAT, line items, automatic totals, download or print as PDF. No account.

== Description ==

Build a professional invoice in minutes, free, with no account and nothing to install. Fill in your business details (name, logo, email, address, VAT number), add your client, set the invoice number, description, issue and due dates, then add line items with quantity and rate. A clean, professional invoice preview builds itself live on screen as you type — subtotal, flat discount and VAT/tax calculated automatically — and one click downloads or prints it as a PDF through your browser.

Use the shortcode `[altus_invoice_generator]` on any page.

Invoice math is (subtotal − discount) × tax%, with the tax base clamped at zero so a discount bigger than the subtotal can never produce a negative total, and 2-decimal rounding with en-GB money grouping (£1,234.50). Nine currencies are supported: GBP £, USD $, EUR €, AED, SAR, PKR Rs, INR ₹, CAD C$ and AUD A$. Upload your business logo and it appears on the invoice; add a notes field for payment terms or bank details.

Everything runs in the visitor's browser — your business details, client names and amounts never leave your computer. No account, no third-party libraries, no upload to the server (the logo is read in the browser only).

This open-source version contains NO lead capture, NO email sending, and NO data storage. Results are shown on screen only. The version hosted on altuswebsolutions.com may offer email delivery; this open-source version does not.

Invoices produced by this tool are drafts/templates only — NOT legal, tax or financial advice. Check the tax and legal details (VAT registration, what an invoice must show, payment terms) before sending an invoice to a client, and have them reviewed by an accountant or other professional where it matters.

== Installation ==

1. Upload the plugin zip via Plugins > Add New > Upload Plugin, or extract it into `/wp-content/plugins/`.
2. Activate the plugin.
3. Add `[altus_invoice_generator]` to any page and publish it.

== Frequently Asked Questions ==

= Is this invoice generator really free? =

Yes — completely free, no account, no limits, no watermark.

= How do I save the invoice as a PDF? =

Click "Download / Print PDF", then choose "Save as PDF" (or "Microsoft Print to PDF") as the printer in the dialog that appears. It works in Chrome, Edge, Firefox and Safari. The print stylesheet shows only the invoice itself.

= Can I add VAT to my invoice? =

Yes. Set any VAT/tax percentage, and add your VAT number in the business details — it appears on the invoice automatically.

= What should a UK invoice include? =

A unique invoice number, your business name and address, your client's name and address, a clear description of the goods or services, the supply date, the invoice date, the amount charged, and VAT details plus your VAT number if you are VAT-registered. Keep numbering sequential and unique (INV-0001, INV-0002…) and state your payment terms on every invoice — most freelancers use 14 or 30 days.

= Can I use it for clients outside the UK? =

Yes — switch the currency and the invoice works the same way. Just make sure the tax and legal details match the country you are invoicing in.

= Does anything I enter leave my computer? =

No. The invoice is built entirely in your browser. In this open-source version there is no email option at all — nothing you enter is sent anywhere, stored anywhere, or seen by anyone.

= Is the invoice legally valid? =

The tool builds the document for you; it is not tax or legal advice. If you are unsure about VAT registration or what your invoices must show, check GOV.UK or speak to your accountant.

== Changelog ==

= 1.0.1 =

First public release (stripped open-source version). Professional UK invoice builder: business details with logo upload and VAT number, client details, invoice numbering, issue/due dates, line items with quantity and rate, automatic subtotals with flat discount and VAT/tax at any rate, live invoice preview, one-click download/print as PDF, 9 currencies, payment-terms notes. Email delivery, lead storage and email sending removed. The invoice logic passed a 49-test Node harness (core totals, VAT, discount, currency and summary checks; the harness's email/lead assertions are removed along with that feature).
