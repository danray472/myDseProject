import json
import random
import string
from faker import Faker

fake = Faker()

device_cards = []

# Generate a limited number of device cards with a controlled distribution of states
# Total: 20 cards -> 10 In-repair, 5 Completed, 5 Received
state_distribution = {
    "In-repair": 10,
    "Completed": 5,
    "Received": 5,
}

for state, count in state_distribution.items():
    for _ in range(count):
        ticket_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        device_card = {
            "ticketNumber": ticket_number,
            "deviceType": random.choice(["Smartphone", "Tablet", "Laptop"]),
            "customerName": fake.name(),
            "customerEmail": fake.email(),
            "deviceState": state,
            "date": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        device_cards.append(device_card)

# Save the device cards to a JSON file
with open("device_cards.json", "w") as json_file:
    json.dump(device_cards, json_file, indent=2)

print("Device cards generated and saved to device_cards.json")
