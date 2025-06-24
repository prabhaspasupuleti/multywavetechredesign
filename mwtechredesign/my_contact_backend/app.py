from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from flask_mail import Mail, Message
import os # Import os to potentially use environment variables

app = Flask(__name__)
CORS(app)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# It's highly recommended to use environment variables for sensitive data
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'botm91786@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'rlky uubd asiz deit')  # Use an app-specific password for Gmail
#app.config['MAIL_USERNAME'] = 'botm91786@gmail.com'  # Replace with your email
#app.config['MAIL_PASSWORD'] = 'Pr@veen1'  # Replace with your app-specific password
mail = Mail(app)

# hCaptcha Secret Key
# IMPORTANT: Replace with your actual hCaptcha Secret Key
# It's best practice to load this from environment variables (e.g., using os.environ.get)
HCAPTCHA_SECRET = os.environ.get('HCAPTCHA_SECRET', 'ES_31977d33da3e48889b68152beefa4d34')
#HCAPTCHA_SECRET = 'ES_31977d33da3e48889b68152beefa4d34' # <--- REPLACE THIS WITH YOUR HCAPTCHA SECRET KEY

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400

    data = request.get_json()

    # Verify hCaptcha
    hcaptcha_token = data.get('hcaptchaToken') # Changed from recaptchaToken
    if not hcaptcha_token:
        return jsonify({"error": "hCaptcha token missing."}), 400

    hcaptcha_verification_response = requests.post(
        'https://hcaptcha.com/siteverify', # hCaptcha verification endpoint
        data={
            'secret': HCAPTCHA_SECRET,
            'response': hcaptcha_token
        }
    )
    hcaptcha_result = hcaptcha_verification_response.json()

    if not hcaptcha_result.get('success'):
        # Log hCaptcha errors for debugging
        print(f"hCaptcha verification failed: {hcaptcha_result.get('error-codes')}")
        return jsonify({"error": "Invalid hCaptcha. Please try again.", "hcaptcha_errors": hcaptcha_result.get('error-codes')}), 400

    # Extract form data
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    subject = data.get('subject')
    message = data.get('message')

    # Basic validation for required fields before sending email
    if not all([name, email, subject, message]):
        return jsonify({"error": "Missing required form fields."}), 400

    # Send email
    try:
        msg = Message(
            subject=f"New Contact Form Submission: {subject}",
            sender=app.config['MAIL_USERNAME'],
            recipients=['prabhaspasupuleti30@gmail.com'],  # Replace with company's email
            body=(
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Phone: {phone if phone else 'N/A'}\n" # Handle optional phone
                f"Subject: {subject}\n"
                f"Message:\n{message}\n"
            )
        )
        mail.send(msg)
        return jsonify({"message": "Message sent successfully!"}), 200
    except Exception as e:
        print(f"Error sending email: {e}") # Log the error on the server
        return jsonify({"error": f"Failed to send email: {e}"}), 500

if __name__ == '__main__':
    # For production, it's recommended to not use debug=True
    # and serve with a production-ready WSGI server like Gunicorn or uWSGI
    app.run(debug=True, port=5000)