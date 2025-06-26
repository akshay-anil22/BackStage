const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://backstage-041f.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log(data);

    alert(data.message || 'Registration successful');
    
    if (res.ok) {
     
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
});

// 🔽 Handle Login button redirect
document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = 'login.html';
});
