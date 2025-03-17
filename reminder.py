from twilio.rest import Client

# Twilio credentials
account_sid = 'your_account_sid'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

# Send a WhatsApp message
message = client.messages.create(
    from_='whatsapp:+14155238886',  # Twilio's WhatsApp sandbox number
    body='Reminder: Our wedding is on December 12! Don’t forget to RSVP!',
    to='whatsapp:+919876543210'  # Replace with guest's number
)

print("Message Sent:", message.sid)
