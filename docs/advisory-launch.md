# Advisory service preview

The current site is a review build. Plan buttons open contact options. Visitors can discuss their needs before paying. The site does not charge, create subscriptions, or book appointments.

## Pages

- `/`: Profile, experience, service plans, and contact dialogs.
- `/support/terms`: Confirmed service scope and annual refund policy, followed by draft terms.

All pages support `lang=en`, `lang=ja`, and `lang=zh`. Support pages have `noindex` while the terms are drafts.

## Confirmed terms

- Contact before payment is available through WeChat or LINE (ID: `newbdez33` on both), or Telegram `@newbdez33` (`https://t.me/newbdez33`). Confirm the fit and scope, then agree on a payment method. Book calls after payment.
- Casual uses the fixed, tax-inclusive prices below. Renewal arrangements are agreed before payment.
- 90 minutes of active async support per monthly cycle, including yearly plans. No carryover.
- Replies usually arrive within one Japanese business day. Additional work requires agreement.
- One 50-minute introduction after the first subscription payment, once per person, outside the monthly allowance.
- Separate consultations last 50 minutes and use the fixed, tax-inclusive prices below. Pay before booking.
- Chat in Chinese, Japanese, or English. Calls in Chinese or English.
- Annual early termination: refund each full monthly cycle not yet started at 1/12 of the actual annual payment, in the original payment currency.

The exact start date, monthly refund conditions, session changes, booking expiry, and refund processing time remain drafts. Confirm the service end date and currency-specific rounding for annual refunds before live checkout.

## Localized prices

| Language | Payment currency | Casual monthly | Casual yearly | 50-minute consultation |
| --- | --- | ---: | ---: | ---: |
| English | USD | 85 | 850 | 65 |
| Japanese | JPY | 12,999 | 129,999 | 10,000 |
| Chinese | CNY | 550 | 5,500 | 450 |

All prices include tax and are charged in the displayed currency. These are fixed prices, not live exchange estimates. The same price configuration supplies the homepage, contact dialogs, service rules, annual savings, and approximate monthly cost of a yearly plan. Language changes keep the selected billing period.

The USD and CNY prices were set from the [ECB reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) published on 6 November 2026: EUR 1 = USD 1.1165 = JPY 176.77 = CNY 7.4485. The JPY prices convert to approximately USD 82.10 / 821.09 / 63.16 and CNY 547.73 / 5,477.73 / 421.37 for monthly / yearly / consultation. Prices were rounded upward to simple amounts; the USD and CNY yearly plans cost ten monthly payments. Runtime exchange-rate requests are not required.

## Payment and booking setup

Do not prescribe a payment provider in the public copy. Confirm the customer's needs and service scope, then agree privately on a payment method and renewal arrangements. Provide the final terms before payment.

Share payment instructions through the agreed private channel. Appointment details and preparation notes are provided in the same chat after payment verification.

For the first five customers, verify the payment using the agreed method and confirm the purchased service privately. Arrange the included introduction or paid consultation after that check, without a second charge for booking.

## Inputs before launch

- Payment instructions and renewal terms for the agreed method, plus private appointment arrangements.
- Receipt matching procedure for WeChat, LINE, and Telegram contacts.
- Final cancellation, refund, rescheduling, and privacy terms.
- Seller information for the commercial disclosure. The [Consumer Affairs Agency guide](https://www.no-trouble.caa.go.jp/what/mailorder/) lists price, payment and service timing, cancellation conditions, and seller identification among the disclosures for mail-order services. The current rules page is not a completed legal disclosure.

## Validation

Run `pnpm exec jest --runInBand` and `pnpm build`. Check both contact dialogs, service rules navigation, all three languages, direct route access, and mobile layouts. Clipboard denial or an insecure preview origin must select the requested WeChat or LINE ID for manual copying instead of reporting success.
