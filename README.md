

### Models
**User**
* "system-admin" - Access to read/write all data
* "account-admin" - Access to read/write data in account <-- (property owner/manager)
* "user" - Access to read(only user data)/write(messages to account admin) <-- (tenant)

**Account**
* One account per company
* Contains one admin(property owner or manager) and multiple users(tenants)
* Account admin is created when account instance is created

**Registration**
* Account Admin authorizes user by creating Registration instance using tenant details
* Random code generated which must be given to user in order to login and set up user account
* User must verify registration using code to create User instance




