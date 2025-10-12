# Analytics & Insights Examples

Get performance data and AI-powered insights for your campaigns.

## Campaign Analytics

### Get Campaign Stats

```
"Show me stats for campaign camp_abc123"
```

**Agent Response:**
```
Campaign Performance: Summer Sale 2025 (camp_abc123)

📊 Delivery Stats:
- Sent: 2,450
- Delivered: 2,438 (99.5%)
- Bounced: 12 (0.5%)

📧 Engagement Stats:
- Opens: 1,036 (42.5%)
- Unique Opens: 982 (40.3%)
- Clicks: 213 (8.7%)
- Unique Clicks: 189 (7.8%)

🚫 Negative Actions:
- Unsubscribes: 3 (0.1%)
- Spam Reports: 0 (0.0%)

💰 Revenue:
- Total Revenue: $12,450.00
- Revenue per Email: $5.10
- Orders: 89
- Conversion Rate: 3.6%

🔗 Top Performing Links:
1. Shop Now Button: 124 clicks
2. Product Page: 67 clicks
3. Social Media: 22 clicks
```

### Compare Multiple Campaigns

```
"Compare performance of campaigns camp_abc123, camp_def456, and camp_ghi789"
```

**Agent Response:**
```
Campaign Comparison:

Campaign 1: Summer Sale (camp_abc123)
- Sent: 2,450 | Opens: 42.5% | Clicks: 8.7% | Revenue: $12,450

Campaign 2: Spring Launch (camp_def456)
- Sent: 1,890 | Opens: 38.2% | Clicks: 6.4% | Revenue: $8,230

Campaign 3: Black Friday (camp_ghi789)
- Sent: 5,200 | Opens: 51.3% | Clicks: 12.1% | Revenue: $45,890

🏆 Best Performer:
- Open Rate: Black Friday (51.3%)
- Click Rate: Black Friday (12.1%)
- Revenue: Black Friday ($45,890)

📈 Insights:
- Black Friday had 2x higher engagement
- Subject line urgency likely contributed to performance
- Consider testing similar urgency in future campaigns
```

### Historical Performance

```
"Show me campaign performance for the last 30 days"
```

```
"What's my average open rate for the past 3 months?"
```

## Segment Analytics

### Segment Performance

```
"How is my VIP segment performing?"
```

**Agent Response:**
```
Segment Analysis: VIP Members (seg_vip123)

👥 Segment Size: 340 contacts

📊 Engagement Metrics (Last 30 Days):
- Avg Open Rate: 58.3% (↑ 12% vs all segments)
- Avg Click Rate: 15.7% (↑ 18% vs all segments)
- Conversion Rate: 8.2% (↑ 22% vs all segments)

💰 Revenue Contribution:
- Total Revenue: $45,200 (38% of total)
- Avg Order Value: $189.50
- Lifetime Value: $1,240 per contact

📧 Recent Campaigns:
1. VIP Exclusive Sale: 67% opens, 21% clicks
2. Early Access Launch: 61% opens, 18% clicks
3. Member Appreciation: 72% opens, 24% clicks

✅ Recommendation:
This is your highest-performing segment. Consider:
- Increasing email frequency from monthly to bi-weekly
- Creating VIP-only product launches
- Implementing loyalty rewards program
```

### Segment Comparison

```
"Compare engagement between VIP and regular customers segments"
```

## AI-Powered Insights

### Campaign Optimization Recommendations

```
"Analyze campaign camp_abc123 and give me recommendations"
```

**Agent Response (Using data_analyst agent):**
```
Campaign Analysis: Summer Sale 2025

📊 Performance Summary:
- Open Rate: 42.5% (Industry avg: 35%)
- Click Rate: 8.7% (Industry avg: 7.2%)
- Overall: Above Average Performance ✅

🎯 What Worked Well:
1. Subject line created urgency ("Last Chance")
2. Sent at optimal time (Tuesday 10 AM)
3. Clear, single CTA button
4. Mobile-responsive design (62% mobile opens)

⚠️ Areas for Improvement:
1. Bounce Rate (0.5%):
   - Consider cleaning old/invalid emails
   - Implement double opt-in for new contacts

2. Click-to-Open Rate (20.5%):
   - Add secondary CTA above fold
   - Make product images clickable
   - Test shorter email length

3. Unsubscribe Rate (0.1%):
   - Within acceptable range, but monitor
   - Ensure unsubscribe link is visible
   - Consider preference center

💡 Actionable Recommendations:
1. A/B test subject lines with numbers ("Save $50" vs "50% Off")
2. Add urgency countdown timer in email
3. Segment by past purchase behavior for next campaign
4. Resend to non-openers with different subject (potential +400 opens)
5. Create follow-up sequence for clickers who didn't convert

📈 Expected Impact:
- Implementing these changes could increase:
  - Opens by 8-12%
  - Clicks by 15-20%
  - Conversions by 10-15%
```

### Send Time Optimization

```
"When is the best time to send to my active_customers segment?"
```

**Agent Response:**
```
Send Time Analysis: active_customers Segment

📅 Optimal Send Times (Based on last 90 days):

🏆 Best Overall: Tuesday 10:00 AM EST
- Avg Open Rate: 48.2%
- Avg Click Rate: 10.3%
- Best for: Promotional emails

🥈 Second Best: Thursday 2:00 PM EST
- Avg Open Rate: 45.7%
- Avg Click Rate: 9.8%
- Best for: Educational content

🥉 Third Best: Saturday 11:00 AM EST
- Avg Open Rate: 42.1%
- Avg Click Rate: 8.9%
- Best for: Newsletter/digest emails

⏰ Time Patterns:
- Morning (8-11 AM): Higher opens
- Afternoon (2-4 PM): Higher clicks
- Evening (7-9 PM): Lower engagement
- Weekends: Mixed results (testing recommended)

🌍 Timezone Considerations:
- 78% of segment in US Eastern
- 15% in US Pacific
- 7% International

💡 Recommendation:
Schedule promotional campaigns for Tuesday 10 AM EST for maximum impact.
```

### Content Performance Analysis

```
"What types of subject lines perform best for my audience?"
```

**Agent Response:**
```
Subject Line Analysis (Last 6 months)

🏆 Top Performing Patterns:

1. Urgency/Scarcity (Avg 49.2% opens):
   ✅ "Last Chance: Sale Ends Tonight"
   ✅ "Only 3 Hours Left"
   ✅ "Limited Stock Alert"

2. Personalization (Avg 46.8% opens):
   ✅ "Sarah, This is Just for You"
   ✅ "Hey John, Check This Out"
   ✅ "Your Exclusive Offer, Alex"

3. Numbers/Lists (Avg 44.3% opens):
   ✅ "5 Ways to Save Money"
   ✅ "Top 10 Products This Month"
   ✅ "3 Items You'll Love"

4. Questions (Avg 41.9% opens):
   ✅ "Ready to Upgrade Your Style?"
   ✅ "Have You Seen Our New Collection?"
   ✅ "Need Help Choosing?"

5. Emojis (Avg 39.7% opens):
   ✅ "🔥 Hot Deals Inside"
   ✅ "New Arrivals ✨"
   ✅ "💰 Save Big Today"

❌ Underperforming Patterns:

1. Generic Announcements (Avg 28.1% opens):
   ❌ "Newsletter - January 2025"
   ❌ "Monthly Update"
   ❌ "Our Latest News"

2. All Caps (Avg 24.5% opens):
   ❌ "HUGE SALE NOW"
   ❌ "BREAKING NEWS"

3. Spam Trigger Words (Avg 21.3% opens):
   ❌ "Act Now!!!"
   ❌ "Free Money"
   ❌ "Click Here Now"

💡 Recommendations:
- Use urgency + personalization combo
- Test emojis (but limit to 1-2 per subject)
- Avoid all caps and excessive punctuation
- Keep subjects under 50 characters for mobile
```

## Revenue Analytics

### Revenue Attribution

```
"Show me revenue from email campaigns this month"
```

**Agent Response:**
```
Email Revenue Report: January 2025

💰 Total Email-Attributed Revenue: $124,567

📊 By Campaign Type:
- Promotional: $78,450 (63%)
- Transactional: $32,110 (26%)
- Newsletter: $14,007 (11%)

🏆 Top Performing Campaigns:
1. Black Friday Encore: $45,890 (89 orders, ROI: 2,845%)
2. New Year Sale: $22,340 (67 orders, ROI: 1,890%)
3. VIP Flash Sale: $10,220 (34 orders, ROI: 3,120%)

📈 Growth:
- vs Last Month: +18.7%
- vs Last Year: +42.3%

💡 Key Insights:
- VIP segment: 38% of revenue from 5% of list
- Mobile orders: 58% of transactions
- Best day for revenue: Tuesday
- Best time: 10 AM EST
```

### ROI Analysis

```
"Calculate ROI for campaign camp_abc123"
```

**Agent Response:**
```
ROI Analysis: Summer Sale 2025

💵 Costs:
- Email sends: 2,450 × $0.01 = $24.50
- Design/Copy: $200
- Total Cost: $224.50

💰 Revenue:
- Total Sales: $12,450
- Email-Attributed: 89 orders

📊 ROI Calculation:
- Gross Profit: $12,450 - $224.50 = $12,225.50
- ROI: 5,447%
- Revenue per Email: $5.10
- Revenue per $1 Spent: $55.47

📈 Benchmark:
- Your ROI: 5,447% ✅
- Industry Avg: 3,600%
- Performance: +51% above average

💡 Analysis:
This campaign significantly outperformed industry benchmarks, likely due to:
- Strong segmentation (active customers only)
- Compelling offer (50% off)
- Optimal send time (Tuesday 10 AM)
- Clear, urgent CTA
```

## Subscriber Health

### List Health Metrics

```
"Analyze the health of my email list"
```

**Agent Response:**
```
Email List Health Report

📊 Overall List Size: 12,450 contacts

✅ Active Subscribers (engaged in 90 days):
- 7,890 contacts (63.4%)
- Status: HEALTHY ✅

⚠️ At-Risk Subscribers (engaged 90-180 days ago):
- 2,340 contacts (18.8%)
- Action: Create re-engagement campaign
- Estimated recovery: 35-40%

❌ Inactive Subscribers (no engagement 180+ days):
- 2,220 contacts (17.8%)
- Action: Final re-engagement or sunset
- Keeping them hurts deliverability

🔍 Engagement Breakdown:
- Super Engaged (opens every email): 1,245 (10%)
- Highly Engaged (opens 75%+): 3,890 (31.2%)
- Moderately Engaged (opens 25-75%): 2,755 (22.1%)
- Low Engagement (opens <25%): 2,340 (18.8%)
- No Engagement (never opens): 2,220 (17.8%)

💡 Recommendations:
1. Create win-back campaign for at-risk segment
2. Sunset inactive subscribers after final attempt
3. Implement preference center to reduce list churn
4. Add double opt-in for new subscribers
5. Segment active users for higher frequency

📈 Projected Impact:
- Removing inactive subscribers could improve:
  - Deliverability: +15-20%
  - Open rates: +8-12%
  - Sender reputation: Significant improvement
```

## Quick Reference

### Get Campaign Stats
```
"Show stats for campaign [campaign_id]"
"How did campaign [campaign_id] perform?"
```

### Compare Campaigns
```
"Compare campaigns [id1], [id2], [id3]"
"Show me my best performing campaigns this month"
```

### Get Insights
```
"Analyze campaign [campaign_id] and give recommendations"
"What can I improve about [campaign_id]?"
```

### Send Time Optimization
```
"When is the best time to send to [segment]?"
"What day performs best for [segment]?"
```

### Revenue Analysis
```
"Show email revenue for [time period]"
"Calculate ROI for campaign [campaign_id]"
```

### List Health
```
"Analyze my email list health"
"Show me inactive subscribers"
```

---

**Next:** Learn about [Advanced Workflows](./07-advanced-workflows.md)
