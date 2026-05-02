async function verify() {
  const baseUrl = 'http://localhost:3000/api';
  
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@nammahealth.com',
        password: 'admin123!'
      })
    });
    
    const setCookie = loginRes.headers.get('set-cookie');
    if (!setCookie) {
      const errorData = await loginRes.json();
      throw new Error('Login failed: No cookies returned. ' + JSON.stringify(errorData));
    }

    const tokenMatch = setCookie.match(/accessToken=([^;]+)/);
    if (!tokenMatch) throw new Error('accessToken not found in cookies');
    
    const token = tokenMatch[1];
    const headers = { Authorization: `Bearer ${token}` };
    console.log('Login successful.');

    // 2. Verify Departments
    console.log('Verifying Departments...');
    const branchId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const deptRes = await fetch(`${baseUrl}/hospital/departments?branchId=${branchId}`, { headers });
    const deptData = await deptRes.json();
    console.log('Departments Response:', JSON.stringify(deptData, null, 2));

    // 3. Verify Doctors
    console.log('Verifying Doctors...');
    const doctorRes = await fetch(`${baseUrl}/hospital/doctors?branchId=${branchId}`, { headers });
    const doctorData = await doctorRes.json();
    console.log('Doctors Response:', JSON.stringify(doctorData, null, 2));

    // 4. Verify Billing API
    console.log('Verifying Billing API...');
    const dummyVisitId = '00000000-0000-0000-0000-000000000000';
    const billingRes = await fetch(`${baseUrl}/billing/invoice/${dummyVisitId}`, { headers });
    const billingData = await billingRes.json();
    console.log('Billing (Invoice for dummy visit):', billingData);

    console.log('Verification completed!');
  } catch (error) {
    console.error('Verification failed:', error.message);
  }
}

verify();
