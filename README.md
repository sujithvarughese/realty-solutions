

### Models
**User**
* "system-admin" - Access to read/write all data
* "account-admin" - Access to read/write data in account <-- (property owner/manager)
* "user" - Access to read(only user data)/write(messages to account admin) <-- (tenant)

**Account**
* One account per company
* Each account contains one admin(property owner or manager) and multiple users(tenants)
* Account admin is created when account instance is created

**Registration**
* Account Admin authorizes user by creating Registration instance using tenant details
* Random code generated which must be given to user in order to login and set up user account
* User must verify registration using code to create User instance



System admin permissions
1. Create Account Admin
2. Create Account Admin Registration (Account Admin must verify registration to complete setup and create User)

Account Admin Permissions
1. Create/Edit Unit
2. Once Unit exists, account admin can 
   1. Add user registration to vacant Unit (User must verify registration)
   2. Edit user data
3. Create/Edit Unit Financial Data
4. Create/View Rent Receipts

User permissions
1. View user's unit data including financial data pertinent to user
2. Send/receive messages to/from account admin
