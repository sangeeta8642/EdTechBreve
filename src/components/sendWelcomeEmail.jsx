import axios from "axios";

// API Endpoints
const brevoWorkflowEndpoint = `https://api.brevo.com/v3/smtp/email`;
const brevoContactEndpoint = "https://api.brevo.com/v3/contacts";

// API Key
const apiKey = import.meta.env.VITE_API_KEY;

// Function to send a welcome email using a Brevo workflow
const sendWelcomeEmail = async (userEmail) => {
  console.log(`Sending welcome email to ${userEmail}...`);

  const emailData = {
    to: [
      {
        email: userEmail,
      },
    ],
    templateId: 2,
    subject: "Welcome To EdTech",
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3", // Custom headers
      charset: "iso-8859-1", 
    },
  };

  try {
    const response = await axios.post(brevoWorkflowEndpoint, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
    });

    if (response.status === 201) {
      console.log("Welcome email sent successfully!");
      return response.data;
    } else {
      console.error("Failed to send welcome email:", response.statusText);
    }
  } catch (error) {
    console.error(
      "Error sending welcome email:",
      error.response?.data || error.message
    );
  }
};

// Function to add a contact to Brevo
const addContact = async (email) => {
  console.log(`Adding contact ${email} to Brevo list...`);

  const contactData = {
    email: email,
    listIds: [3], // Replace with your actual list ID
    updateEnabled: false, 
  };

  try {
    const response = await axios.post(brevoContactEndpoint, contactData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
    });

    if (response.status === 201) {
      console.log("Contact added successfully!");
      return response.data;
    } else {
      console.error("Failed to add contact:", response.statusText);
    }
  } catch (error) {
    console.error(
      "Error adding contact:",
      error.response?.data || error.message
    );
  }
};

// Function to handle user actions, such as sending emails and adding contacts
const handleUserActions = async (email, userName, userLastName) => {
  console.log("Starting to handle user actions...");
  console.log(
    `User Email: ${email}, First Name: ${userName}, Last Name: ${userLastName}`
  );

  try {
    // Add contact to Brevo
    const addContactResponse = await addContact(email);
    if (!addContactResponse) {
      console.error("Failed to add contact. Aborting email send.");
      return;
    }

    console.log("Add contact response:", addContactResponse);

    // Send welcome email
    const sendEmailResponse = await sendWelcomeEmail(email);
    if (!sendEmailResponse) {
      console.error("Failed to send welcome email.");
      console.log(sendEmailResponse);
      return;
    }

    console.log("Send email response:", sendEmailResponse);
  } catch (error) {
    console.error("Error handling user actions:", error);
  }
};

export default handleUserActions;
