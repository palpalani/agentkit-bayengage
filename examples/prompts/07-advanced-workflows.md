# Advanced Workflows Examples

Complex multi-step email marketing workflows combining multiple features.

## Complete Welcome Series Workflow

```
# Step 1: Create welcome drip campaign
"Create welcome drip campaign triggered on contact.created:
- Day 0: Welcome email template welcome_1 subject 'Welcome to {{company_name}}!'
- Day 2: Product tour template tour_1 subject 'Get Started in 5 Minutes'
- Day 5: Success stories template social_proof_1 subject 'See What Others Are Achieving'
- Day 10: Upgrade CTA template upgrade_1 subject 'Ready for More?'"

# Step 2: Review the campaign
"Show me details of the drip campaign we just created"

# Step 3: Activate it
"Activate the welcome series drip campaign"
"Yes, activate it"

# Step 4: Monitor performance
"How is the welcome series performing?"

# Step 5: Optimize based on data
"Which email in the welcome series has the lowest open rate?"
"Create an A/B test for that email with 2 different subject lines"
```

## Segmentation + Campaign Workflow

```
# Step 1: Identify high-value customers
"Show me contacts with custom field 'total_orders' greater than 5"

# Step 2: Tag them
"Add tag 'vip' to all contacts with 5+ orders"

# Step 3: Create VIP campaign
"Create campaign 'VIP Exclusive Sale' with subject 'Your Exclusive 30% Off - VIP Only' using template vip_sale for segment vip_customers"

# Step 4: Schedule for optimal time
"Schedule this campaign for next Tuesday at 10 AM"

# Step 5: Set up follow-up
"Create a drip campaign for VIP members who don't purchase:
- Day 3: Reminder template vip_reminder subject 'Still Time to Save 30%'
- Day 7: Last chance template vip_final subject 'Final Hours - VIP Sale Ends Tonight'"
```

## Abandoned Cart Recovery Workflow

```
# Step 1: Create abandoned cart sequence
"Create abandoned cart drip campaign:
- 1 hour: Reminder template cart_1 subject '{{first_name}}, You Left Something Behind'
- 24 hours: Incentive template cart_discount subject 'Save 10% on Your Cart'
- 72 hours: Final template cart_final subject 'Last Chance - Your Cart Expires Soon'"

# Step 2: Set up dynamic content
"Update templates to include {{cart_items}} and {{cart_total}} merge tags"

# Step 3: A/B test the discount
"Create A/B test for 24-hour email:
Variant A: 10% discount
Variant B: Free shipping
Test conversion rate"

# Step 4: Monitor and optimize
"Show recovery rate for abandoned cart campaign"
"What's the average time to purchase after cart abandonment emails?"
```

## Re-engagement Campaign Workflow

```
# Step 1: Identify inactive subscribers
"Find all contacts who haven't opened an email in 90 days"

# Step 2: Create re-engagement segment
"Create a segment called 'inactive_90d' with contacts who haven't engaged in 90 days"

# Step 3: Send win-back campaign
"Create campaign 'We Miss You' with subject '{{first_name}}, We Miss You! Here's 25% Off' using template winback_1 for segment inactive_90d"

# Step 4: Track opens
"Send the We Miss You campaign"
"Yes, send it"

# Step 5: Follow up with openers
"Create segment of contacts who opened 'We Miss You' campaign"
"Send thank you email to that segment with subject 'Welcome Back! Here's Your Discount'"

# Step 6: Sunset non-openers
"After 14 days, unsubscribe contacts who didn't open the win-back email"
```

## Product Launch Workflow

```
# Step 1: Create tease campaign
"Create campaign 'Something Big Is Coming' with subject '🔒 Secret Launch in 3 Days' using template teaser_1 for segment all_subscribers 3 days before launch"

# Step 2: Early access for VIPs
"Create campaign 'VIP Early Access' with subject 'You're First: Shop Our New Product Now' using template launch_vip for segment vip_customers on launch day at 8 AM"

# Step 3: General launch
"Create campaign 'New Product Launch' with subject 'It's Here: Our Newest Product' using template launch_general for segment active_customers on launch day at 12 PM"

# Step 4: Follow-up based on behavior
"Create drip campaign for contacts who clicked but didn't purchase:
- Day 1: Social proof template launch_social_proof
- Day 3: Limited offer template launch_offer
- Day 7: Final CTA template launch_final"

# Step 5: Track and optimize
"Show me launch campaign performance across all segments"
"Which segment had the best conversion rate?"
```

## Seasonal Campaign Series

```
# Black Friday/Cyber Monday Workflow

# Step 1: Pre-announcement
"Create campaign 'Black Friday Preview' with subject 'Sneak Peek: Our Biggest Sale' for segment email_subscribers send 1 week before"

# Step 2: Early bird
"Create campaign 'Early Bird Black Friday' with subject 'Shop Now: Early Access for You' for segment vip_customers send day before at 8 PM"

# Step 3: Main event
"Create campaign 'Black Friday Is Here!' with subject '🔥 Black Friday: Up to 70% Off!' for segment all_subscribers send Friday at 12 AM"

# Step 4: Hourly deals
"Create 4 campaigns for hourly deals:
- 8 AM: Morning deals template hourly_1
- 12 PM: Midday deals template hourly_2
- 4 PM: Afternoon deals template hourly_3
- 8 PM: Evening deals template hourly_4"

# Step 5: Cyber Monday
"Create campaign 'Cyber Monday Extended' with subject 'Last Chance: Cyber Monday Deals' for contacts who didn't purchase on Black Friday"

# Step 6: Thank you
"Create campaign 'Thank You!' for contacts who purchased during sale with subject 'Thank You for Shopping With Us' and include review request"
```

## Multi-Channel Workflow Integration

```
# Coordinated Email + Social Campaign

# Step 1: Email announcement
"Create campaign 'New Collection Launch' with subject 'First Look: Our New Collection' for segment style_enthusiasts"

# Step 2: Social retargeting setup
"Tag all contacts who clicked the email with 'launch_interested'"

# Step 3: Send reminder to non-openers
"Create campaign with different subject for contacts who didn't open the first email:
'You're Missing Out: New Styles Just Dropped'"

# Step 4: Cross-channel follow-up
"Create drip sequence for contacts who engaged with email or social:
- Day 2: Styling tips template style_guide
- Day 5: Customer photos template ugc_showcase
- Day 10: Last chance template final_cta"

# Note: Social retargeting would be set up in your ads platform using the segment
```

## Birthday/Anniversary Campaigns

```
# Automated Birthday Campaign

# Step 1: Create birthday segment
"Create segment 'birthday_this_month' for contacts with birthday in current month"

# Step 2: Set up birthday drip
"Create birthday drip campaign triggered 1 day before birthday:
- Day -1: Early wishes template birthday_early subject 'Early Birthday Wishes + Gift Inside'
- Day 0: Birthday template birthday_main subject 'Happy Birthday {{first_name}}! 🎉'
- Day 1: Extended template birthday_extended subject 'Birthday Sale Extended Just for You'"

# Step 3: Personalize offers
"Update templates to include personalized discount code based on customer tier"

# Step 4: Track performance
"Show me birthday campaign conversion rate"
"What's the average order value for birthday emails?"
```

## Loyalty Program Workflow

```
# Step 1: Identify tiers
"Tag contacts based on total_orders:
- 1-3 orders: 'bronze'
- 4-9 orders: 'silver'
- 10+ orders: 'gold'"

# Step 2: Tier announcement
"Create three campaigns announcing loyalty tiers:
- Bronze: template tier_bronze
- Silver: template tier_silver
- Gold: template tier_gold"

# Step 3: Tier-specific campaigns
"Create monthly campaign series:
- Bronze: General offers
- Silver: 15% discount
- Gold: 25% discount + early access"

# Step 4: Upgrade notifications
"Create drip triggered when contact moves up a tier:
- Immediately: Congratulations template tier_upgrade
- Day 7: Benefits overview template tier_benefits
- Day 14: Exclusive offer template tier_offer"
```

## Content Marketing Workflow

```
# Monthly Newsletter with Follow-ups

# Step 1: Main newsletter
"Create monthly newsletter campaign 'January Digest' with subject 'Top Stories This Month' using template newsletter_jan for segment newsletter_subscribers"

# Step 2: Segment by engagement
"After 48 hours, create segments:
- Opened but didn't click
- Clicked specific topics
- Didn't open"

# Step 3: Targeted follow-ups
"Send targeted campaigns to each segment:
- Didn't open: Different subject line resend
- Opened but didn't click: 'Deep dive' on most popular topic
- Clicked: Related content recommendations"

# Step 4: Nurture sequence
"For contacts who engaged, create nurture drip:
- Day 3: Related blog post
- Day 7: Case study
- Day 14: Product demo offer"
```

## Testing & Optimization Workflow

```
# Continuous Optimization Loop

# Step 1: Baseline campaign
"Create campaign 'Spring Sale Baseline' with standard subject and template for segment active_customers"

# Step 2: Document performance
"After campaign sends, show me:
- Open rate
- Click rate
- Conversion rate
- Revenue per email"

# Step 3: Create variants
"Create 3 A/B test campaigns testing:
Test 1: Subject lines (urgency vs benefit vs question)
Test 2: Email length (short vs long)
Test 3: CTA placement (top vs bottom vs both)"

# Step 4: Implement winners
"Apply winning variations to next campaign"

# Step 5: Test new element
"Now test next variable: personalization level"

# Repeat monthly for continuous improvement
```

## Crisis Management Workflow

```
# Service Disruption Communication

# Step 1: Immediate notification
"Create urgent campaign 'Service Update' with subject 'Important: Service Notification' using template service_alert for segment all_customers send immediately"

# Step 2: Update campaign
"Create follow-up 'Service Restored' with subject 'Update: Service Restored' send when issue resolved"

# Step 3: Apology + compensation
"Create campaign 'Our Apologies' with subject 'We're Sorry - Here's 20% Off' using template apology for segment affected_customers"

# Step 4: Feedback collection
"Send survey to affected customers asking about their experience"

# Step 5: Re-engagement
"Create win-back drip for customers who churned after incident"
```

## Quick Reference

### Complete Workflow Pattern
```
1. Identify goal/trigger
2. Create segment(s)
3. Create campaign(s)/drip(s)
4. Set up A/B tests
5. Monitor performance
6. Create follow-up sequences
7. Optimize and iterate
```

### Multi-Step Campaign
```
1. Create initial campaign
2. Segment responders vs non-responders
3. Send targeted follow-ups
4. Track conversions
5. Analyze and improve
```

### Automation Workflow
```
1. Define trigger event
2. Create drip sequence
3. Set up conditionals
4. Activate automation
5. Monitor and optimize
```

---

**You've completed all prompt examples!** Now explore the [API Examples](../api/README.md) for programmatic integration.
