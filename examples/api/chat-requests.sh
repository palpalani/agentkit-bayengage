#!/bin/bash

# BayEngage AgentKit - cURL Examples
# Make sure the server is running: npm start

BASE_URL="http://localhost:3000"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== BayEngage AgentKit cURL Examples ===${NC}\n"

# Example 1: Health Check
echo -e "${GREEN}1. Health Check${NC}"
curl -s $BASE_URL/health | jq .
echo -e "\n"

# Example 2: List Segments
echo -e "${GREEN}2. List Segments${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "List all my campaign segments"
  }' | jq .
echo -e "\n"

# Example 3: Create Contact
echo -e "${GREEN}3. Create Contact${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a contact with email demo@example.com, first name Demo, last name User"
  }' | jq .
echo -e "\n"

# Example 4: Get Contact
echo -e "${GREEN}4. Get Contact Information${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Get contact information for demo@example.com"
  }' | jq .
echo -e "\n"

# Example 5: Create Campaign (Campaign Manager Agent)
echo -e "${GREEN}5. Create Campaign with Campaign Manager Agent${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign named \"Demo Campaign\" with subject \"Testing AgentKit\" using template welcome_1 for segment active_customers",
    "agent": "campaign_manager"
  }' | jq .
echo -e "\n"

# Example 6: Get Campaign Stats (Data Analyst Agent)
echo -e "${GREEN}6. Get Campaign Analytics with Data Analyst Agent${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Show me stats for campaign camp_12345",
    "agent": "data_analyst"
  }' | jq .
echo -e "\n"

# Example 7: Create Drip Campaign
echo -e "${GREEN}7. Create Drip Campaign${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a welcome drip campaign with 3 emails: Day 0 welcome, Day 2 tour, Day 5 offer"
  }' | jq .
echo -e "\n"

# Example 8: Create A/B Test
echo -e "${GREEN}8. Create A/B Test${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create an A/B test for subject lines: \"Sale Ends Tonight\" vs \"Last Chance to Save\""
  }' | jq .
echo -e "\n"

# Example 9: Conversation Threading
echo -e "${GREEN}9. Conversation Threading${NC}"
echo "First message:"
RESPONSE=$(curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign named Test"
  }')
echo $RESPONSE | jq .
THREAD_ID=$(echo $RESPONSE | jq -r '.thread_id')
echo -e "\nFollow-up message (using thread_id: $THREAD_ID):"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"user_input\": \"Change the name to Demo Campaign\",
    \"thread_id\": \"$THREAD_ID\"
  }" | jq .
echo -e "\n"

# Example 10: List Templates
echo -e "${GREEN}10. List Email Templates${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Show me all my email templates"
  }' | jq .
echo -e "\n"

# Example 11: Update Contact
echo -e "${GREEN}11. Update Contact${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Update contact demo@example.com with phone number 555-1234 and add tag vip"
  }' | jq .
echo -e "\n"

# Example 12: List Campaigns
echo -e "${GREEN}12. List All Campaigns${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Show me all my campaigns"
  }' | jq .
echo -e "\n"

# Example 13: Delete Contact (will require confirmation)
echo -e "${GREEN}13. Delete Contact (requires confirmation)${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Delete contact demo@example.com"
  }' | jq .
echo -e "\n"

# Example 14: Analytics Query
echo -e "${GREEN}14. Request Analytics Insights${NC}"
curl -s -X POST $BASE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "What are my best performing campaigns this month?",
    "agent": "data_analyst"
  }' | jq .
echo -e "\n"

echo -e "${BLUE}=== Examples Complete ===${NC}"
echo -e "\nNote: Some examples may show placeholder responses if actual data doesn't exist."
echo -e "Customize the prompts with your actual segment IDs, template IDs, and campaign IDs.\n"
