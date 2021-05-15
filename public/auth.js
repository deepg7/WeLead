function signup(){
    const data = {
        name:"Deep Gandhi",
        email:"deepgandhi151@gmail.com",
        type:"beds",
        contact:"9619137724",
        address:"powai"
    }

    fetch('https://we-lead.herokuapp.com/signup', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });

        
}

function signin(){
    const email = document.getElementById('sie').value;
    const password = document.getElementById('sip').value;

    const data = {
        email,
        password
    }

    fetch('https://we-lead.herokuapp.com/login', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data.token){
            window.localStorage.setItem('token',data.token)
            console.log(localStorage.token)
           location.href='./loggedin.html'
            console.log(localStorage.token)
            document.querySelector('p').innerHTML=localStorage.token
            document.getElementById('p').innerHTML=localStorage.token
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        });

}