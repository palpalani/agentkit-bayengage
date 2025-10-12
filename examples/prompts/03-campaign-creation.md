# Campaign Creation Examples

Learn how to create, manage, and send email campaigns using natural language prompts.

## Creating Campaign Drafts

### Simple Campaign

```
"Create a campaign named 'Summer Sale 2025' with subject '50% Off Everything!' using template summer_sale_template for segment active_customers"
```

**Agent Actions:**
- Creates campaign draft (NOT sent)
- Uses specified template and segment
- Returns campaign ID
- Status: DRAFT

**Agent Response:**
```
✅ Campaign "Summer Sale 2025" created successfully!

Campaign ID: camp_abc123
Status: DRAFT
Segment: active_customers (2,450 contacts)
Template: summer_sale_template

⚠️ Campaign is in DRAFT status. Review it before sending.
Use 'send campaign camp_abc123' when ready to send.
```

### Campaign with Full Details

```
"Create a campaign named 'Weekly Newsletter - Jan 15' with subject 'This Week's Top Stories', preview text 'Don't miss our latest articles', from name 'Editorial Team', from email news@company.com, reply-to editor@company.com, using template newsletter_v2 for segments subscribers and premium_members"
```

**Agent Actions:**
- Sets all campaign parameters
- Uses multiple segments
- Configures sender information
- Creates as draft

### Campaign with Custom HTML

```
"Create a campaign named 'Product Launch' with subject 'Introducing Our New Product' from ProductTeam <products@company.com> for segment early_adopters with this HTML content:

<!DOCTYPE html>
<html>
<head><title>New Product Launch</title></head>
<body>
  <h1>Introducing {{product_name}}</h1>
  <p>Dear {{first_name}},</p>
  <p>We're excited to announce our new product!</p>
  <a href='{{launch_url}}'>Learn More</a>
</body>
</html>"
```

**Agent Actions:**
- Uses inline HTML instead of template
- Supports merge tags
- Creates draft for review

## Scheduling Campaigns

### Schedule for Specific Date/Time

```
"Create a campaign 'Black Friday Sale' with subject 'Biggest Sale of the Year!' using template black_friday for segment all_customers and schedule it for November 29, 2025 at 9:00 AM EST"
```

**Agent Actions:**
- Creates campaign
- Sets scheduled send time
- Status: SCHEDULED
- Will send automatically at specified time

### Schedule for Optimal Send Time

```
"Create campaign 'Product Update' with subject 'What's New This Month' using template monthly_update for segment active_users and schedule it for next Tuesday at 10 AM"
```

**Agent Response:**
```
✅ Campaign "Product Update" created and scheduled!

Campaign ID: camp_def456
Scheduled: Tuesday, January 21, 2025 at 10:00 AM EST
Segment: active_users (5,230 contacts)
Status: SCHEDULED

The campaign will be sent automatically at the scheduled time.
```

## Sending Campaigns

### Send Immediately (Requires Confirmation)

```
"Send campaign camp_abc123"
```

**Agent Response:**
```
⚠️ IMPORTANT: This will send real emails to 2,450 contacts

Campaign Details:
- Name: Summer Sale 2025
- Subject: 50% Off Everything!
- Segment: active_customers (2,450 contacts)
- Template: summer_sale_template

This action cannot be undone. Are you sure you want to send this campaign?
Reply with "yes, send it" to confirm.
```

### Confirming the Send

```
"Yes, send it"
```

**Agent Response:**
```
✅ Campaign is now sending!

Campaign ID: camp_abc123
Status: SENDING
Recipients: 2,450 contacts
Started: January 15, 2025 at 2:30 PM EST

You can track performance with:
"Show me stats for campaign camp_abc123"
```

### Send with Schedule

```
"Send campaign camp_xyz789 scheduled for tomorrow at 10 AM"
```

**Agent Actions:**
- Schedules campaign instead of immediate send
- Requires same confirmation
- Status changes to SCHEDULED

## Campaign Management

### List All Campaigns

```
"Show me all my campaigns"
```

```
"List campaigns with status sent"
```

```
"Show me draft campaigns"
```

**Agent Response:**
```
Here are your campaigns:

📧 SENT Campaigns:
1. Summer Sale 2025 (camp_abc123)
   - Sent: Jan 15, 2025
   - Opens: 42.3%
   - Clicks: 8.7%

2. Welcome Series - Part 1 (camp_def456)
   - Sent: Jan 12, 2025
   - Opens: 38.9%
   - Clicks: 6.2%

📝 DRAFT Campaigns:
3. Spring Promotion (camp_ghi789)
   - Created: Jan 14, 2025
   - Segment: vip_customers
```

### Get Campaign Details

```
"Show me details for campaign camp_abc123"
```

**Agent Response:**
```
Campaign: Summer Sale 2025 (camp_abc123)

Status: SENT
Sent: January 15, 2025 at 2:30 PM EST

Content:
- Subject: 50% Off Everything!
- From: Sales Team <sales@company.com>
- Template: summer_sale_template

Audience:
- Segment: active_customers
- Recipients: 2,450 contacts

Performance:
- Opens: 1,036 (42.3%)
- Clicks: 213 (8.7%)
- Bounces: 12 (0.5%)
- Unsubscribes: 3 (0.1%)
```

### Delete Draft Campaign

```
"Delete campaign camp_draft999"
```

**Agent Response:**
```
⚠️ WARNING: This will permanently delete the draft campaign.

Campaign: Test Campaign (camp_draft999)
Status: DRAFT
Created: January 14, 2025

Are you sure you want to delete this campaign?
Reply "yes, delete it" to confirm.
```

### Confirming Deletion

```
"Yes, delete it"
```

**Agent Response:**
```
✅ Campaign camp_draft999 has been deleted.
```

**Note:** You can only delete DRAFT campaigns. Sent campaigns cannot be deleted.

## Advanced Campaign Workflows

### Multi-Step Campaign Creation

```bash
# Step 1: Create draft
"Create a campaign named 'Flash Sale' with subject 'Limited Time Offer' using template flash_sale for segment email_subscribers"

# Agent returns: camp_xyz123

# Step 2: Review (in same thread)
"Show me the details"

# Step 3: Modify (in same thread)
"Change the subject to '24 Hour Flash Sale - Don't Miss Out!'"

# Step 4: Send (in same thread)
"Send it now"

# Step 5: Confirm
"Yes, send it"
```

### Campaign with Personalization

```
"Create campaign 'Birthday Offer' with subject 'Happy Birthday {{first_name}}! Here's a Gift' using template birthday_email for segment birthday_this_month from Celebrations Team <celebrate@company.com>"
```

**Use Case:** Automated birthday emails with merge tags

### Campaign for Multiple Segments

```
"Create campaign 'Product Update' using template update_v3 for segments active_customers, trial_users, and vip_members with subject 'New Features You'll Love' from Product <product@company.com>"
```

**Agent Actions:**
- Sends to multiple segments
- Deduplicates contacts across segments
- Returns total unique recipient count

### Resend to Non-Openers

```
"Create a campaign named 'Resend: Summer Sale' with subject 'Last Chance - Sale Ends Tonight' using the same template as camp_abc123 but only send to contacts who didn't open the first email"
```

**Use Case:** Re-engagement with different subject line

## Campaign Templates

### Using Existing Templates

```
"Show me all my templates"
```

```
"Create a campaign using template welcome_series_1"
```

**Agent Actions:**
- Lists available templates
- Uses template content
- Applies merge tags automatically

### Campaign Without Template

```
"Create campaign 'Quick Update' with subject 'Important Notice' for segment all_contacts with plain text: Hello {{first_name}}, we wanted to let you know about an important update. Thanks!"
```

**Agent Actions:**
- Creates simple HTML from plain text
- Applies basic formatting
- Useful for quick announcements

## Campaign Testing

### Send Test Email

```
"Send a test of campaign camp_abc123 to test@company.com"
```

**Agent Response:**
```
✅ Test email sent!

Campaign: Summer Sale 2025
Test sent to: test@company.com

Review the test email and use "send campaign camp_abc123" when ready to send to your full segment.
```

### Create Test Campaign

```
"Create a test campaign 'Email Design Test' with subject 'Testing New Design' using template new_design_v1 for segment test_users"
```

**Use Case:** Test with small segment before full send

## Error Handling

### Missing Required Fields

```
Prompt: "Create a campaign"

Agent Response:
"To create a campaign, I need:
- Campaign name
- Subject line
- Template ID or HTML content
- Segment ID(s) or list ID(s)

Example: 'Create a campaign named [name] with subject [subject] using template [template_id] for segment [segment_id]'"
```

### Invalid Template

```
Prompt: "Create campaign using template nonexistent_template"

Agent Response:
"Template 'nonexistent_template' not found.

Use 'list my templates' to see available templates, or provide HTML content directly."
```

### Segment Not Found

```
Prompt: "Create campaign for segment invalid_segment"

Agent Response:
"Segment 'invalid_segment' not found.

Use 'list my segments' to see available segments."
```

## Best Practices

### ✅ Always Review Before Sending

```
# Create campaign
"Create campaign..."

# Review details
"Show me campaign details"

# Send test
"Send test to my email"

# Review test email
# Only then...
"Send the campaign"
```

### ✅ Use Descriptive Names

```
"Create campaign 'Newsletter_2025_01_15_ProductUpdate'"
```
- Include date
- Include purpose
- Easy to find later

### ✅ Start with Small Segments

```
"Create campaign for segment test_list (50 contacts)"
```
- Test with small audience first
- Verify everything works
- Then send to full list

### ❌ Avoid Rushing

```
❌ "Create and send campaign now"
```
- Always review first
- Check for typos
- Verify links work

## Quick Reference

### Create Campaign
```
"Create campaign [name] with subject [subject] using template [template_id] for segment [segment_id] from [from_name] <[from_email]>"
```

### Schedule Campaign
```
"Create campaign [name] ... and schedule for [date] at [time]"
```

### Send Campaign
```
"Send campaign [campaign_id]"
# Then confirm: "Yes, send it"
```

### List Campaigns
```
"List all campaigns"
"Show campaigns with status [draft|sent|scheduled]"
```

### Get Details
```
"Show details for campaign [campaign_id]"
```

### Delete Campaign
```
"Delete campaign [campaign_id]"
# Only works for drafts
```

---

**Next:** Learn about [Drip Campaigns](./04-drip-campaigns.md) for automated sequences
