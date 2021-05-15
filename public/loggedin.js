document.querySelector('p').innerHTML=localStorage.token

//shahtanmay13@gmail.com
fetch('https://we-lead.herokuapp.com/getAllLeads', {
        method: 'GET', 
        headers: {
        'Authorization': 'Bearer '+localStorage.token,
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        const print=JSON.stringify(data)
        document.querySelector('div').innerHTML=print
        })
        .catch((error) => {
        console.error('Error:', error);
});