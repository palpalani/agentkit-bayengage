# Drip Campaign Examples

Automated email sequences that send based on triggers and time delays.

## Creating Drip Campaigns

### Welcome Series (3 Emails)

```
"Create a welcome drip campaign with 3 emails:
1. Welcome email immediately using template welcome_1
2. Product tour after 2 days using template tour_1
3. Special offer after 5 days using template offer_1"
```

**Agent Response:**
```
✅ Drip Campaign Created!

Name: Welcome Series
Trigger: contact.created
Status: DRAFT
Emails: 3

Sequence:
1. Day 0: Welcome (template: welcome_1)
2. Day 2: Product Tour (template: tour_1)
3. Day 5: Special Offer (template: offer_1)

Use 'activate drip campaign [id]' to start sending.
```

### Onboarding Sequence (5 Emails)

```
"Create onboarding drip campaign triggered on signup:
- Day 0: Welcome email with template onboard_1 subject 'Welcome to {{company_name}}!'
- Day 1: Getting started guide with template onboard_2 subject 'Quick Start Guide'
- Day 3: Feature highlights with template onboard_3 subject 'You'll Love These Features'
- Day 7: Success stories with template onboard_4 subject 'See What Others Are Achieving'
- Day 14: Premium upgrade with template onboard_5 subject 'Ready to Unlock More?'"
```

### Post-Purchase Follow-Up

```
"Create drip campaign triggered on purchase:
- Immediately: Order confirmation with template order_confirm
- 2 hours: Shipping info with template shipping_update
- 7 days: Review request with template review_request
- 30 days: Replenishment reminder with template replenish_reminder"
```

### Abandoned Cart Recovery

```
"Create abandoned cart drip campaign:
- 1 hour after abandonment: Reminder email template cart_reminder_1
- 24 hours: Special discount template cart_discount
- 72 hours: Last chance template cart_final"
```

## Activating Drip Campaigns

### Activate Campaign

```
"Activate drip campaign drip_xyz123"
```

**Agent Response:**
```
⚠️ This will activate the drip campaign and start sending emails automatically when the trigger event occurs.

Drip Campaign: Welcome Series (drip_xyz123)
Trigger: contact.created
Emails: 3
Status: Currently DRAFT

Are you sure you want to activate this drip campaign?
Reply "yes, activate it" to confirm.
```

### Confirming Activation

```
"Yes, activate it"
```

**Agent Response:**
```
✅ Drip Campaign Activated!

Campaign: Welcome Series (drip_xyz123)
Status: ACTIVE
Trigger: contact.created

The campaign will automatically send to new contacts matching the trigger.
```

## Managing Drip Campaigns

### List All Drip Campaigns

```
"Show me all drip campaigns"
```

```
"List active drip campaigns"
```

**Agent Response:**
```
Your Drip Campaigns:

🟢 ACTIVE:
1. Welcome Series (drip_abc123)
   - Trigger: contact.created
   - Emails: 3
   - Active since: Jan 15, 2025

2. Abandoned Cart (drip_def456)
   - Trigger: cart.abandoned
   - Emails: 3
   - Active since: Jan 10, 2025

⚪ DRAFT:
3. Onboarding Pro (drip_ghi789)
   - Trigger: signup
   - Emails: 5
   - Created: Jan 14, 2025
```

### Pause Drip Campaign

```
"Pause drip campaign drip_abc123"
```

**Agent Response:**
```
✅ Drip campaign paused!

Campaign: Welcome Series (drip_abc123)
Status: PAUSED

Contacts already in the sequence will complete it, but no new contacts will be enrolled.

Use 'activate drip campaign drip_abc123' to resume.
```

### Get Drip Campaign Details

```
"Show details for drip campaign drip_abc123"
```

**Agent Response:**
```
Drip Campaign: Welcome Series (drip_abc123)

Status: ACTIVE
Trigger: contact.created
Created: January 15, 2025

Email Sequence:
1. Day 0 (Immediate)
   - Template: welcome_1
   - Subject: Welcome to Our Community!

2. Day 2
   - Template: tour_1
   - Subject: Here's Your Quick Start Guide

3. Day 5
   - Template: offer_1
   - Subject: Special Offer Just for You

Statistics:
- Active contacts in sequence: 234
- Completed: 1,456
- Total emails sent: 4,368
```

## Advanced Drip Campaign Examples

### Educational Series

```
"Create educational drip campaign 'Email Marketing Mastery' triggered on course enrollment:
- Day 0: Welcome and overview template course_welcome
- Day 3: Lesson 1 - List Building template lesson_1
- Day 7: Lesson 2 - Email Design template lesson_2
- Day 10: Lesson 3 - Copywriting template lesson_3
- Day 14: Lesson 4 - Analytics template lesson_4
- Day 17: Final assessment template course_final"
```

### Trial Expiration Sequence

```
"Create trial expiration drip campaign:
- Day 21 (7 days before end): First reminder template trial_reminder_1
- Day 25 (3 days before end): Urgency email template trial_reminder_2
- Day 27 (1 day before end): Final chance template trial_final
- Day 28 (on expiration): Upgrade CTA template trial_upgrade"
```

### Win-Back Campaign

```
"Create re-engagement drip for inactive users (last active 90+ days ago):
- Day 0: We miss you template winback_1
- Day 7: See what's new template winback_2
- Day 14: Special comeback offer template winback_3
- Day 21: Last chance template winback_final"
```

### Birthday Campaign

```
"Create birthday drip campaign triggered 1 day before birthday:
- 1 day before: Early birthday wishes template birthday_early
- On birthday: Birthday celebration template birthday_main
- 1 day after: Extended offer template birthday_extended"
```

## Drip Campaign with Conditions

### Conditional Branching

```
"Create drip campaign with conditional logic:
- Day 0: Welcome email template welcome
- Day 3: If opened previous email, send template engaged_path_1, otherwise send template not_engaged_path_1
- Day 7: If clicked link, send template buyer_path_1, otherwise send template browser_path_1"
```

**Note:** This requires advanced configuration. The agent will create the basic structure and guide you to set up conditions in the BayEngage dashboard.

## Testing Drip Campaigns

### Create Test Drip

```
"Create a test drip campaign with just 2 emails (immediate and 1 minute delay) using test templates for testing purposes"
```

**Use Case:** Test the drip sequence quickly without waiting days

### Enroll Test Contact

```
"Add contact test@company.com to drip campaign drip_abc123"
```

**Use Case:** Manually enroll a test contact to see the sequence

## Best Practices

### ✅ Plan Your Sequence

```
"Show me what a good welcome series looks like"
```

Agent will provide best practices:
- Email 1: Welcome & set expectations
- Email 2: Educational content / how-to
- Email 3: Social proof / testimonials
- Email 4: Soft ask / offer

### ✅ Optimal Timing

- **Welcome Series**: 0, 2, 5, 7 days
- **Onboarding**: 0, 1, 3, 7, 14 days
- **Abandoned Cart**: 1 hour, 24 hours, 72 hours
- **Re-engagement**: 0, 7, 14, 21 days

### ✅ Test Before Activating

```
# Create with short delays for testing
"Create test drip: email 1 immediate, email 2 after 5 minutes, email 3 after 10 minutes"

# Test with your email
# Then create real version with proper delays
```

### ❌ Avoid Common Mistakes

- Don't send too frequently (min 1 day between emails)
- Don't make sequences too long (3-7 emails max)
- Don't forget to activate after creating

## Monitoring Performance

### Check Drip Stats

```
"How is the welcome series drip campaign performing?"
```

**Agent Response:**
```
Welcome Series Performance:

Email 1 - Welcome:
- Sent: 2,450
- Open Rate: 68.2%
- Click Rate: 24.3%

Email 2 - Product Tour:
- Sent: 2,123
- Open Rate: 52.1%
- Click Rate: 18.7%

Email 3 - Special Offer:
- Sent: 1,890
- Open Rate: 48.9%
- Click Rate: 28.4%
- Conversion Rate: 8.2%

Overall sequence completion rate: 77.1%
```

## Quick Reference

### Create Drip Campaign
```
"Create drip campaign [name] triggered on [trigger]:
- Day X: [description] template [template_id]
- Day Y: [description] template [template_id]"
```

### Activate
```
"Activate drip campaign [drip_id]"
```

### Pause
```
"Pause drip campaign [drip_id]"
```

### List Drips
```
"List all drip campaigns"
"Show active drip campaigns"
```

### Get Details
```
"Show details for drip campaign [drip_id]"
```

---

**Next:** Learn about [A/B Testing](./05-ab-testing.md)
