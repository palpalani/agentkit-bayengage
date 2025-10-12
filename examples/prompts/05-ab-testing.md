# A/B Testing Examples

Test different campaign variations to optimize performance.

## Subject Line A/B Tests

### Simple Subject Test

```
"Create an A/B test for subject lines:
Variant A: 'Last Chance - Sale Ends Tonight!'
Variant B: 'Don't Miss Out: Final Hours of Sale'
Test 20% of audience, send winner based on open rate after 4 hours
Send to segment active_customers"
```

**Agent Response:**
```
✅ A/B Test Created!

Test ID: abtest_abc123
Type: Subject Line Test
Status: DRAFT

Variants:
A (50%): "Last Chance - Sale Ends Tonight!"
B (50%): "Don't Miss Out: Final Hours of Sale"

Test Phase:
- Test size: 20% of audience (490 contacts)
- Test duration: 4 hours
- Winner metric: Open Rate

Winner Phase:
- Remaining: 80% of audience (1,960 contacts)
- Will send automatically after test completes

Total audience: 2,450 contacts (active_customers)

Use 'start A/B test abtest_abc123' to begin.
```

### Multi-Variant Subject Test

```
"Create A/B test comparing 3 subject lines:
A: 'New Arrivals: Shop the Latest Trends'
B: '🔥 Hot New Products Just Dropped'
C: 'Limited Stock: Get Yours Before They're Gone'
Split evenly across 30% test sample, winner decided by open rate after 6 hours, send to segment email_subscribers"
```

## Content A/B Tests

### Template Comparison

```
"Create A/B test comparing two email templates:
Variant A: Use template newsletter_design_v1
Variant B: Use template newsletter_design_v2
Subject: 'Monthly Newsletter - January 2025'
Test 25% of audience, winner based on click rate after 8 hours
Send to segment newsletter_subscribers"
```

**Agent Response:**
```
✅ Content A/B Test Created!

Test ID: abtest_def456
Type: Content/Template Test
Status: DRAFT

Variants:
A (50%): template newsletter_design_v1 (image-heavy)
B (50%): template newsletter_design_v2 (text-focused)

Common subject: "Monthly Newsletter - January 2025"

Test Phase:
- Test size: 25% (1,250 contacts)
- Duration: 8 hours
- Winner metric: Click Rate

Winner Phase:
- Remaining: 75% (3,750 contacts)
```

### CTA Button Test

```
"Create A/B test for CTA buttons:
Variant A: Template with 'Shop Now' button
Variant B: Template with 'View Collection' button
Same subject line, test click rate with 20% sample over 12 hours on segment shoppers"
```

## Send Time A/B Tests

### Optimal Time Test

```
"Create send time A/B test:
Variant A: Send at 9 AM
Variant B: Send at 2 PM
Variant C: Send at 7 PM
Same content and subject, test 30% of audience, winner based on combined open + click rate
Send to segment timezone_us_eastern"
```

**Agent Response:**
```
✅ Send Time A/B Test Created!

Test ID: abtest_ghi789
Type: Send Time Optimization
Status: DRAFT

Variants:
A (33%): 9:00 AM EST
B (33%): 2:00 PM EST
C (33%): 7:00 PM EST

Test Phase:
- Test size: 30% (900 contacts)
- Winner metric: Combined open + click rate

Winner Phase:
- Remaining: 70% (2,100 contacts)
- Will send at winning time
```

## Starting A/B Tests

### Start Test

```
"Start A/B test abtest_abc123"
```

**Agent Response:**
```
⚠️ IMPORTANT: This will start sending real emails

A/B Test: Subject Line Test (abtest_abc123)
Type: Subject line comparison
Segment: active_customers (2,450 contacts)

Test Phase (NOW):
- 490 contacts will receive test emails
- Split: 245 each variant
- Duration: 4 hours

Winner Phase (AUTO after 4 hours):
- 1,960 contacts will receive winning variant

Are you sure you want to start this A/B test?
Reply "yes, start it" to confirm.
```

### Confirming Test Start

```
"Yes, start it"
```

**Agent Response:**
```
✅ A/B Test Started!

Test ID: abtest_abc123
Started: January 15, 2025 at 2:00 PM EST
Test ends: January 15, 2025 at 6:00 PM EST

Test phase sending to 490 contacts...

Check back after 6 PM to see which variant won!
```

## Monitoring A/B Tests

### Check Test Results

```
"Show me results for A/B test abtest_abc123"
```

**Agent Response (During Test):**
```
A/B Test: In Progress

Test ID: abtest_abc123
Status: TESTING (2 hours remaining)
Started: 2:00 PM EST

Current Results:
Variant A: "Last Chance - Sale Ends Tonight!"
- Sent: 245
- Opens: 96 (39.2%)
- Clicks: 18 (7.3%)

Variant B: "Don't Miss Out: Final Hours of Sale"
- Sent: 245
- Opens: 112 (45.7%) ⭐ Leading
- Clicks: 24 (9.8%) ⭐ Leading

Current winner: Variant B
Final winner will be determined at 6:00 PM EST
```

**Agent Response (After Test):**
```
A/B Test: Completed

Test ID: abtest_abc123
Status: WINNER SENT

Test Results:
Variant A: "Last Chance - Sale Ends Tonight!"
- Opens: 39.2%
- Clicks: 7.3%

Variant B: "Don't Miss Out: Final Hours of Sale" ⭐ WINNER
- Opens: 45.7% (+16.6% vs A)
- Clicks: 9.8% (+34.2% vs A)

Winner Phase:
- Sent to remaining 1,960 contacts at 6:00 PM EST
- Using Variant B subject line
- Final results available in 24 hours
```

## Advanced A/B Testing

### Personalization Test

```
"Create A/B test for personalization:
Variant A: Subject 'Our New Product Launch'
Variant B: Subject 'Hey {{first_name}}, Check Out Our New Product!'
Test 20% sample, winner by open rate after 5 hours on segment has_first_name"
```

### Emoji Test

```
"Create A/B test:
Variant A: 'Summer Sale Starts Now'
Variant B: '☀️ Summer Sale Starts Now! 🏖️'
Variant C: 'Summer Sale Starts Now 👉'
Test emoji impact on opens with 30% sample over 6 hours"
```

### Urgency Test

```
"Create A/B test for urgency tactics:
Variant A: 'Our New Collection Is Here'
Variant B: 'Limited Time: New Collection Launching Today'
Variant C: 'URGENT: Only 24 Hours to Shop New Collection'
Test 25% of segment, winner by click rate"
```

## Best Practices

### ✅ Test One Variable

```
# Good - Test only subject line
"A/B test subjects: 'Save 20%' vs 'Get 20% Off' with same template"

# Bad - Test multiple things
"A/B test: Subject A + Template A vs Subject B + Template B"
```

Why: You won't know which change caused the difference

### ✅ Adequate Sample Size

```
# Minimum 1,000 contacts per test
"Test requires at least 2,000 total contacts (1,000 per variant)"
```

### ✅ Statistical Significance

```
"Run test for at least 4-8 hours to get reliable results"
```

### ✅ Clear Hypothesis

```
"Test hypothesis: Personalized subject lines will increase opens by 10%+"
```

## Common A/B Test Scenarios

### Welcome Email Optimization

```
"A/B test welcome email:
A: Immediate welcome template welcome_formal
B: Immediate welcome template welcome_casual
Winner by click-through rate on first-time link clicks"
```

### Promotional Email Timing

```
"Test best day for promotions:
A: Send Tuesday 10 AM
B: Send Thursday 2 PM
C: Send Saturday 11 AM
Winner by conversion rate"
```

### Cart Abandonment Subject

```
"Test cart recovery subject lines:
A: 'You left something behind'
B: 'Your cart is waiting for you'
C: '10% off to complete your order'
Winner by cart recovery rate"
```

## Quick Reference

### Create Subject Line Test
```
"Create A/B test for subjects:
Variant A: '[subject]'
Variant B: '[subject]'
Test [X]% of audience, winner by [metric] after [hours] hours
Send to segment [segment_id]"
```

### Create Content Test
```
"Create A/B test comparing templates:
Variant A: template [template_id_1]
Variant B: template [template_id_2]
Test [X]%, winner by [metric] after [hours] hours"
```

### Start Test
```
"Start A/B test [test_id]"
# Then confirm: "Yes, start it"
```

### Check Results
```
"Show results for A/B test [test_id]"
"How is A/B test [test_id] performing?"
```

---

**Next:** Learn about [Analytics & Insights](./06-analytics.md)
