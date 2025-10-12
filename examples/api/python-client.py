"""
BayEngage AgentKit - Python Examples

Usage:
pip install requests
python examples/api/python-client.py
"""

import requests
import time
from typing import Optional, Dict, Any, List

BASE_URL = "http://localhost:3000"


class BayEngageAgentClient:
    def __init__(self, base_url: str = BASE_URL):
        self.base_url = base_url
        self.thread_id: Optional[str] = None
        self.session = requests.Session()

    def chat(
        self,
        prompt: str,
        agent: Optional[str] = None
    ) -> Dict[str, Any]:
        """Send a chat message to the agent"""
        try:
            payload = {
                "user_input": prompt,
            }

            if agent:
                payload["agent"] = agent

            if self.thread_id:
                payload["thread_id"] = self.thread_id

            response = self.session.post(
                f"{self.base_url}/api/chat",
                json=payload,
                timeout=30
            )
            response.raise_for_status()

            data = response.json()

            # Store thread_id for conversation continuity
            if "thread_id" in data:
                self.thread_id = data["thread_id"]

            return data

        except requests.exceptions.RequestException as e:
            return {
                "success": False,
                "error": str(e)
            }

    def chat_with_retry(
        self,
        prompt: str,
        agent: Optional[str] = None,
        max_retries: int = 3
    ) -> Dict[str, Any]:
        """Send a chat message with retry logic"""
        for i in range(max_retries):
            try:
                return self.chat(prompt, agent)
            except Exception as e:
                if i == max_retries - 1:
                    raise
                time.sleep(2 ** i)  # Exponential backoff

    def reset_thread(self):
        """Reset the conversation thread"""
        self.thread_id = None


# Example 1: Basic Usage
def example1_basic_usage():
    print("=== Example 1: Basic Usage ===\n")

    client = BayEngageAgentClient()
    response = client.chat("List all my campaign segments")

    print(f"Success: {response.get('success')}")
    print(f"Response: {response.get('response')}")
    print()


# Example 2: Specialized Agents
def example2_specialized_agents():
    print("=== Example 2: Specialized Agents ===\n")

    client = BayEngageAgentClient()

    # Campaign Manager Agent
    campaign_resp = client.chat(
        "Create a campaign for summer sale",
        agent="campaign_manager"
    )
    print(f"Campaign Manager: {campaign_resp.get('response')}")

    # Data Analyst Agent
    analytics_resp = client.chat(
        "What are my best performing campaigns?",
        agent="data_analyst"
    )
    print(f"Data Analyst: {analytics_resp.get('response')}")
    print()


# Example 3: Conversation Threading
def example3_conversation_threading():
    print("=== Example 3: Conversation Threading ===\n")

    client = BayEngageAgentClient()

    resp1 = client.chat("Create a campaign named Test Campaign")
    print(f"First response: {resp1.get('response')}")
    print(f"Thread ID: {resp1.get('thread_id')}")

    # Follow-up uses same thread
    resp2 = client.chat("Change the subject to Welcome Email")
    print(f"Follow-up response: {resp2.get('response')}")
    print(f"Same thread: {resp2.get('thread_id') == resp1.get('thread_id')}")
    print()


# Example 4: Contact Management
def example4_contact_management():
    print("=== Example 4: Contact Management ===\n")

    client = BayEngageAgentClient()

    # Create contact
    create_resp = client.chat(
        "Create contact demo@example.com with first name Demo, last name User"
    )
    print(f"Create: {create_resp.get('response')}")

    # Get contact
    get_resp = client.chat("Get contact demo@example.com")
    print(f"Get: {get_resp.get('response')}")

    # Update contact
    update_resp = client.chat(
        "Update contact demo@example.com with phone 555-1234"
    )
    print(f"Update: {update_resp.get('response')}")
    print()


# Example 5: Campaign Workflow
def example5_campaign_workflow():
    print("=== Example 5: Campaign Workflow ===\n")

    client = BayEngageAgentClient()

    # Create campaign
    create_resp = client.chat(
        'Create campaign "Monthly Newsletter" with subject "January Updates" '
        'using template newsletter_v1 for segment subscribers',
        agent="campaign_manager"
    )
    print(f"Created: {create_resp.get('response')}")

    # Review campaign (same conversation)
    review_resp = client.chat("Show me the campaign details")
    print(f"Details: {review_resp.get('response')}")
    print()


# Example 6: Error Handling
def example6_error_handling():
    print("=== Example 6: Error Handling ===\n")

    client = BayEngageAgentClient()
    response = client.chat("Get contact nonexistent@example.com")

    if not response.get("success"):
        print(f"Error occurred: {response.get('error')}")
    else:
        print(f"Success: {response.get('response')}")
    print()


# Example 7: Drip Campaign Setup
def example7_drip_campaign():
    print("=== Example 7: Drip Campaign Setup ===\n")

    client = BayEngageAgentClient()
    response = client.chat(
        "Create welcome drip campaign: Day 0 welcome email, "
        "Day 2 product tour, Day 5 special offer"
    )
    print(f"Drip campaign: {response.get('response')}")
    print()


# Example 8: A/B Testing
def example8_ab_testing():
    print("=== Example 8: A/B Testing ===\n")

    client = BayEngageAgentClient()
    response = client.chat(
        'Create A/B test for subject lines: "Last Chance" vs "Don\'t Miss Out", '
        'test 20% of audience',
        agent="campaign_manager"
    )
    print(f"A/B Test: {response.get('response')}")
    print()


# Example 9: Analytics & Insights
def example9_analytics():
    print("=== Example 9: Analytics & Insights ===\n")

    client = BayEngageAgentClient()
    response = client.chat(
        "Analyze the performance of my last 3 campaigns and give recommendations",
        agent="data_analyst"
    )
    print(f"Analysis: {response.get('response')}")
    print()


# Example 10: Batch Operations
def example10_batch_operations():
    print("=== Example 10: Batch Operations ===\n")

    client = BayEngageAgentClient()

    contacts = [
        "alice@example.com",
        "bob@example.com",
        "charlie@example.com"
    ]

    for email in contacts:
        response = client.chat(f"Create contact {email}")
        print(f"Created {email}: {response.get('success')}")
    print()


def main():
    print("BayEngage AgentKit - Python Examples\n")
    print("Make sure the server is running: npm start\n")

    try:
        example1_basic_usage()
        example2_specialized_agents()
        example3_conversation_threading()
        example4_contact_management()
        example5_campaign_workflow()
        example6_error_handling()
        example7_drip_campaign()
        example8_ab_testing()
        example9_analytics()
        example10_batch_operations()

        print("=== All Examples Complete ===")

    except Exception as e:
        print(f"Error running examples: {e}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())
