const fs  = require('fs');


const routesHandler = (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="Name" placeholder="Please Enter your name"> <input type="number" name="Age" placeholder="Please enter your age"> <button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const reqBody = [];
        req.on('data', chuck => {
            console.log(chuck);
            reqBody.push(chuck);
        });
        req.on('end', () => {
            const parsedReqBodyName = Buffer.concat(reqBody).toString();
            const info = parsedReqBodyName.split('=');
            const name = info[1].split('&')[0];
            const age = info[2];
            
            message = `${name} is ${age} years old.`
        
        
            fs.writeFile('user.txt', message, err => {
                
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }); 
        })
    }

}


module.exports = routesHandler;