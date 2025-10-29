// In App.js, update the handleAccountCreated function:

const handleAccountCreated = (accountData) => {
  if (accountData.isLogin) {
    // User is logging in
    setCurrentUser(accountData.username);
    setCurrentPage('booking');
  } else {
    // User is signing up
    const newAccount = {
      ...accountData,
      id: Date.now(),
      password: accountData.password, // Store for demo (NEVER do in production!)
      createdAt: accountData.createdAt || new Date().toISOString()
    };
    
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
    setCurrentUser(accountData.username);
    setCurrentPage('booking');
    
    console.log('Account created:', newAccount);
  }
};

// And update the AccountCreation component call:
{currentPage === 'account' && (
  <AccountCreation 
    onAccountCreated={handleAccountCreated}
    existingAccounts={accounts}  // Pass existing accounts
  />
)}