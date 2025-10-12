# Contact Management Examples

Learn how to manage contacts in BayEngage using natural language prompts.

## Creating Contacts

### Basic Contact Creation

```
"Create a new contact with email alice@example.com"
```

**Agent Actions:**
- Creates contact with minimal information
- Returns contact ID
- Sets subscription status to 'subscribed'

### Contact with Full Details

```
"Create a contact with email bob@company.com, first name Bob, last name Smith, phone 555-0123, and add tags 'newsletter' and 'customer'"
```

**Agent Actions:**
- Creates contact with all provided fields
- Applies tags for segmentation
- Returns complete contact profile

### Contact with Custom Fields

```
"Create a contact alice@startup.com with first name Alice, custom field 'company' set to 'TechCorp', and custom field 'role' set to 'CEO'"
```

**Agent Actions:**
- Creates contact with standard fields
- Adds custom field key-value pairs
- Useful for advanced segmentation

### Add to Specific Lists

```
"Create contact charlie@example.com and add them to lists list_123 and list_456"
```

**Agent Actions:**
- Creates the contact
- Subscribes to specified lists
- Returns confirmation

## Retrieving Contacts

### Get Contact by Email

```
"Get contact information for sarah@example.com"
```

**Agent Response Example:**
```
Contact Details:
- Email: sarah@example.com
- Name: Sarah Johnson
- Phone: 555-0199
- Status: subscribed
- Tags: VIP, newsletter
- Created: 2024-12-15
- Lists: VIP Members, Monthly Newsletter
```

### Get Contact by ID

```
"Show me details for contact contact_xyz789"
```

**Agent Actions:**
- Retrieves contact by ID
- Returns full contact profile
- Includes custom fields and tags

## Updating Contacts

### Update Basic Information

```
"Update contact john@example.com with phone number 555-9999"
```

**Agent Actions:**
- Looks up contact by email
- Updates phone field
- Preserves other fields

### Update Multiple Fields

```
"Update contact sarah@example.com: change first name to Sara, last name to Smith, add tag 'premium'"
```

**Agent Actions:**
- Updates multiple fields in one operation
- Adds new tags without removing existing ones
- Returns updated contact info

### Change Subscription Status

```
"Unsubscribe contact spam-complaints@example.com"
```

```
"Change subscription status for john@example.com to pending"
```

**Agent Actions:**
- Updates subscription status
- Useful for compliance (GDPR, CAN-SPAM)
- Prevents email sends to unsubscribed contacts

### Update Custom Fields

```
"Update contact alice@startup.com: set custom field 'last_purchase' to '2025-01-15' and 'total_spent' to '1299.99'"
```

**Agent Actions:**
- Updates or creates custom fields
- Preserves existing custom fields
- Useful for personalization

## Deleting Contacts

### Delete by Email

```
"Delete contact test@example.com"
```

**Agent Warning:**
```
⚠️ WARNING: Deleting a contact is permanent and cannot be undone.
This will remove all contact data including:
- Profile information
- Email history
- Custom fields
- Tag associations

Are you sure you want to delete test@example.com?
Reply 'yes, delete it' to confirm.
```

### Delete by ID

```
"Delete contact contact_temp123"
```

**Agent Actions:**
- Shows same warning as email deletion
- Requires explicit confirmation
- Permanently removes contact

### Confirming Deletion

```
"Yes, delete it"
```

**Agent Response:**
```
Contact test@example.com has been permanently deleted.
```

## Bulk Operations

### Create Multiple Contacts

```
"Create three contacts: alice@example.com (Alice Brown), bob@example.com (Bob Green), charlie@example.com (Charlie White)"
```

**Agent Actions:**
- Processes each contact individually
- Returns summary of created contacts
- Indicates any failures

### Update Tags for Contact

```
"Add tags 'vip', 'high-value', 'premium' to contact sarah@example.com"
```

```
"Remove tag 'trial' from contact john@example.com"
```

**Agent Actions:**
- Adds/removes specified tags
- Useful for segmentation
- Returns updated tag list

## Advanced Use Cases

### Contact Enrichment

```
"Update contact sarah@example.com with company 'Acme Corp', job title 'Marketing Director', and industry 'SaaS'"
```

**Use Case:** Enrich contacts with additional data for better personalization

### Re-engagement Workflow

```
"Find contact inactive@example.com and add tag 're-engagement-needed'"
```

**Use Case:** Tag contacts for re-engagement campaigns

### VIP Identification

```
"Update contact whale@company.com: add tags 'vip', 'whale', 'white-glove-service', set custom field 'account_manager' to 'John Smith'"
```

**Use Case:** Flag high-value customers for special treatment

### Compliance Management

```
"Unsubscribe contact gdpr-request@example.com and add tag 'gdpr-request'"
```

**Use Case:** Handle data subject requests (GDPR)

## Conversation Threading Examples

### Multi-Step Contact Update

```bash
# Request 1
"Get contact information for sarah@example.com"

# Response includes thread_id: "thread_abc123"

# Request 2 (using thread_id)
"Update her phone to 555-1234"

# Request 3 (same thread)
"Also add the tag 'updated-2025'"

# Request 4 (same thread)
"Perfect, now show me her updated profile"
```

**Benefits:**
- Natural conversation flow
- Agent remembers context (who "her" refers to)
- No need to repeat email/ID

## Error Handling

### Contact Already Exists

```
Prompt: "Create contact existing@example.com"

Agent Response:
"A contact with email existing@example.com already exists. Would you like to:
1. Update the existing contact
2. Retrieve the existing contact's information
3. Cancel this operation"
```

### Contact Not Found

```
Prompt: "Update contact nonexistent@example.com"

Agent Response:
"No contact found with email nonexistent@example.com. Would you like to create this contact instead?"
```

### Invalid Email Format

```
Prompt: "Create contact bad-email-format"

Agent Response:
"Invalid email address format. Please provide a valid email address (e.g., name@example.com)."
```

## Best Practices

### ✅ Do This

```
"Create contact sarah@startup.com with first name Sarah, last name Chen, tags 'trial', 'startup', and custom field 'company_size' set to '25'"
```
- Provide complete information upfront
- Use descriptive tags
- Include custom fields for segmentation

### ❌ Avoid This

```
"Create a contact"
```
- Too vague, missing email
- Agent will ask for required fields

### ✅ Use Specific Identifiers

```
"Update contact sarah@example.com with phone 555-1234"
```
- Clear which contact to update

### ❌ Ambiguous References

```
"Update the contact's phone"
```
- Which contact? Need email or ID

## Integration Patterns

### Webhook → Contact Creation

When you receive webhook data from your app:

```
"Create contact {{email}} with first name {{first_name}}, last name {{last_name}}, custom field 'signup_source' set to '{{source}}', and add tag '{{plan_type}}'"
```

### CRM Sync

```
"Update contact {{email}}: set custom field 'crm_id' to '{{crm_id}}', 'last_activity' to '{{date}}', 'account_value' to '{{value}}'"
```

### E-commerce Integration

```
"Create contact {{email}} with first name {{name}}, add tags 'customer', 'purchased', set custom field 'first_order_date' to '{{date}}', 'total_orders' to '1'"
```

## Quick Reference

### Create Contact
```
"Create contact [email] with first name [name], last name [name], phone [phone], tags [tag1], [tag2]"
```

### Get Contact
```
"Get contact [email/id]"
"Show me details for [email]"
```

### Update Contact
```
"Update contact [email]: [field] to [value], [field2] to [value2]"
```

### Delete Contact
```
"Delete contact [email]"
```

### Manage Tags
```
"Add tags [tag1], [tag2] to contact [email]"
"Remove tag [tag] from contact [email]"
```

### Change Status
```
"Unsubscribe contact [email]"
"Resubscribe contact [email]"
```

---

**Next:** Learn about [Campaign Creation](./03-campaign-creation.md)
