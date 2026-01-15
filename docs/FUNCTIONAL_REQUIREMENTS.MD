# Job Manager Functional Requirements

## Table of Contents
- [1. Company Registration](#1-company-registration)
- [2. Company Login](#2-company-login)
- [3. Profile Management](#3-profile-management)
- [4. Job Post Management](#4-job-post-management)
- [5. Applicants Search](#5-applicants-search)
- [6. Premium Company Subscription](#6-premium-company-subscription)
- [7. Payment Service Development](#7-payment-service-development)

---

## 1. Company Registration

### Simplex

**1.1.1**
The system shall provide a registration form requiring Email, Password, and Country as mandatory fields. Phone number, Street name/number, and City are optional fields.

**1.1.2**
The system shall enforce a unique email constraint, ensuring no two companies share the same email address in the database.

**1.1.3**
The system shall send an email to the new Company with information on how to activate the account. A Company can only login after they activate their account.

**1.2.4** (Correction: Original was 1.24)
The Country input field must be a selectable option (e.g., a dropdown list) instead of a direct text input field.

### Medium

**1.2.1**
The system shall validate password strength against the following criteria: a) At least 8 characters. b) At least 1 number. c) At least 1 special character (e.g., $#@!). d) At least 1 capitalized letter.

**1.2.2**
The system shall validate the email syntax to ensure it meets standard formatting requirements, including a) Contains exactly one '@' symbol. b) Contains at least one '.' (dot) after the '@' symbol. c) The total length of the email address must be less than 255 characters. d) No spaces or prohibited characters (e.g., ( ) ; :).

**1.2.3**
The system shall validate the Phone number (if provided) to ensure it: a) Contains only digits and must start with a valid international dial code (e.g., +84, +49). b) The length of the digits following the dial code must be less than 13.

**1.2.4**
All input validations specified above must be performed on both the frontend for quick user feedback and the backend for security. Any validation error must be clearly displayed to the end-user.

### Ultimo

**1.3.1**
The system shall support registration via SSO (Single Sign-On) from ONE selected external platform: Google, Microsoft, Facebook, or GitHub. You can use personal email in this project.

**1.3.2**
Upon successful SSO registration, the system shall persist the core company profile (name, email, country) in the server. The system must be configured so the company that logs in using the SSO interface cannot use a password for Job Manager system access.

**1.3.3**
The system shall select a User’s attribute as the sharding key to partition and store the user data in the designated database shard. The chosen shard key must enhance the search algorithm of the Job Seeker and/or Job Manager systems.

---

## 2. Company Login

### Simplex

**2.1.1**
The system shall authenticate the company using the submitted email and password. If the system does not use HTTPS, the frontend shall send credentials using the Basic Authentication format. If HTTPS is applied, the email and password can be sent in plaintext within the request body.

**2.1.2**
Upon successful login, the backend shall generate a JSON Web Signature (JWS) token. This token must contain signed user identity data (e.g., user ID, Role) to verify its integrity.

### Medium

**2.2.1**
Upon successful login, the backend shall generate a JSON Web Encryption (JWE) token instead of a JWS. This token must contain user identity information (e.g., user ID, Role) and ensure that the payload is encrypted and cannot be read by unauthorized parties.

**2.2.2**
The system shall implement a mechanism to prevent brute-force attacks on the login endpoint, blocking the authentication for that account after 5 failed login attempts within 60 seconds.

**2.2.3**
The system shall invalidate and revoke the user's JWE token when the user explicitly logs out or after the defined expiration time.

### Ultimo

**2.3.1**
The system shall support logging in using an account from the single selected external platform defined in requirement 1.3.1 (Google, Microsoft, Facebook, or GitHub).

**2.3.2**
The system shall use a dedicated Redis cache instance to store and quickly check the revocation status of the JWE tokens for non-SSO accounts, improving security performance.

**2.3.3**
The backend shall implement a token refreshing mechanism for non-SSO accounts. The system issues a short-lived Access Token and a longer-lived Refresh Token to maintain user session without requiring frequent reauthentication.

---

## 3. Profile Management

### Simplex

**3.1.1**
Companies shall be able to edit their core contact information: Email, Name, Password, Phone Number, Address, City, and Country.

**3.1.2**
The system must allow the companies to create and configure their public profile, including Company Name, About Us, and ‘Who we are looking for’ section to describe the desired personalities of potential employees.

### Medium

**3.2.1**
The Company shall be able to upload a Logo picture. The system must automatically resize the image to a defined standard size for optimal display performance.

**3.2.2**
The company shall be able to upload images and videos to showcase their events, mottos, or activities.

### Ultimo

**3.3.1**
Any profile modification must be persisted immediately to the appropriate database shard. Specifically, if the job seeker changes the Country field, the application logic must perform a data migration of the entire user record to the new, corresponding database shard.

---

## 4. Job Post Management

### Simplex

**4.1.1**
The system shall allow the company to manage public and private job posts. Each job post has Title, Description, Employment Type, Posted Date, Expiry Date (optional), Salary, and Location. A job post is not publicly visible if it is not published by the company.

Salary must be a Range (e.g., 1000 – 1500 USD), Estimation (About 1000 USD, Up to 2000 USD, From 3000 USD), or Negotiable.
Employment Type includes Full-time/Part-time; Internship, and Contract. A job post can be Internship and Contractual at the same time, but it can only be Full-time or Part-time.

### Medium

**4.2.1**
The system shall allow the user to tag and manage a list of Technical Skills and Competencies for each job post (e.g., adding tags like "Python", "Kafka", "SQL").
The system shall display the applications of every job post, including the Cover Letter if applicable. The applications are organized into Pending or Archived categories.

**4.2.2**
Pending are submitted applications to the job post. The newest application is placed on top of the Pending list. The Company is allowed to archive the application, which places the selected application into the Archived list.
The Job Applicant team must be responsible for persisting the data of each job application.

### Ultimo

**4.3.1**
Profile updates must be propagated to a Kafka topic when the company changes skills or country of a job post. This enables all subscribed Job Applicants to be notified instantly if the applicant's technical background and country match the job post criteria.

**4.3.2**
The system shall enable the user to see the Curriculum Vitae (CV) and Cover Letter files of each application.

---

## 5. Applicants Search

### Simplex

**5.1.1**
Companies shall be able to search for Job Applicants using four criteria: Location (City or Country), Education (Bachelor, Master, Doctorate), Work Experience (None, Any, or contain specific keywords). The system shall allow the user to select multiple Employment Types in a single search request.

**5.1.2**
The Work Experience search must be case-insensitive (e.g., "Software Engineer" and "software engineer" yield the same results).

**5.1.3**
In any search request, the user only provides one value for the Location (either one City or one Country).

**5.1.4**
The search result shall display the First Name, Last Name, Email, City, Country, and the Highest Education Degree.
Clicking on the Applicant shows the above information along with their Education, Work Experience, and Objective Summary.

### Medium

**5.2.1**
The system shall implement a Full-Text Search (FTS) capability on the Applicant data, allowing searches across the Work Experience, Objective Summary, and Technical Skills fields.

**5.2.2**
The system shall allow job seekers to filter jobs based on Technical Skills tags. For example, if the user searches for Kafka, Java, and MongoDB tags, any applicant declaring their skills on Kafka OR Java OR MongoDB are included in the result.

**5.2.3**
The frontend shall lazy load Applicants matching the search result criteria.

**5.2.4**
The page that provides Applicants search and result display shall be responsive to desktop and mobile devices.

**5.2.5**
The search results shall display the Skill Tags (e.g., React, Kafka) of each applicant item.

### Ultimo

**5.3.1**
The search query must be optimized to perform retrieval using a database sharding key (Country), ensuring searches are routed only to the relevant data shard.
The system sets the default location of an applicant search to Vietnam.

**5.3.2**
The system allows the user to mark an Applicant as Warning or Favorite when viewing the Profile or Job Application of an Applicant. The Warning or Favorite status of an applicant must be indicated in the result.

---

## 6. Premium Company Subscription

### Simplex

**6.1.1**
The system shall provide a monthly subscription feature where company can pay a fee of 30 USD using a third-party payment system (e.g., Stripe, Paypal). The system must record and display the premium status on the company Profile page.

**6.1.2**
The system must notify the company via email when their subscription is 7 days from expiration and when it has officially expired.

### Medium

**6.2.1**
The system shall allow companies to define and save an Applicant Searching Profile including desired Technical Background (See 6.2.2), Employment Status (See 6.2.3), Country, Salary Range (See 6.2.4), and Highest Education Degree.

**6.2.2**
The system shall record desired Technical Background as tags (e.g., Kafka, React, Spring Boot) for efficient matching.

**6.2.3**
The system shall record desired Employment Status as multiple selections from Full-time, Part-time, Fresher, Internship, and Contract. If neither Fulltime nor Part-time is specified, the matching logic must include both Fulltime and Part-time jobs.

**6.2.4**
The system shall record acceptable salary range from a minimum to a maximum amount. If the minimum is not set, the minimum is 0. If maximum salary is not set, there is no upper limit. The search must also include applicants with undeclared preferred salary.

### Ultimo

**6.3.1**
The system shall implement a real-time notification service using the Kafka messaging platform. A dedicated Kafka consumer service must instantly evaluate all new or edited applicant profiles against the criteria of all active premium companies. For every found match, the system must deliver an immediate real-time notification to the companies.

---

## 7. Payment Service Development

### Simplex

**6.1.1** (Note: Requirement numbering in original was duplicate of 6.1.1 in section 6)
The Job Manager team shall develop the Payment API that allows Applicants in the Job Applicant system and Companies in the Job Manager system to subscribe for the real-time desired job notification service. The Payment API leverages the third-party credit-card payment system stated on 6.1.1.

### Medium

**6.1.2** (Note: Requirement numbering in original was duplicate of 6.1.2 in section 6)
The system must record the payment transaction with the applicant/company email, transaction time, and transaction status.