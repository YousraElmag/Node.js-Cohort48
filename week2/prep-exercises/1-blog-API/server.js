const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }
 
    let blogs = [];
    
        const data = fs.readFileSync('blogs.json', 'utf-8');
        blogs = JSON.parse(data);
   
    
   
    blogs.push({ title, content });
    
    
    fs.writeFileSync('blogs.json', JSON.stringify(blogs));
    res.send('ok');
});

app.get('/blogs/:title', (req, res) => {
    const title = req.params.title;
    
  
    let blogs = [];
    try {
        const data = fs.readFileSync('blogs.json', 'utf-8');
        blogs = JSON.parse(data);
    } catch (error) {
        return res.status(404).send('No blogs found');
    }
    
  
    const blog = blogs.find(el => el.title === title);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    
    res.send(blog);
});

app.put('/blogs/:title', (req, res) => {
    const title = req.params.title;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Content is required');
    }
    
   
    let blogs = [];
    try {
        const data = fs.readFileSync('blogs.json', 'utf-8');
        blogs = JSON.parse(data);
    } catch (error) {
        return res.status(404).send('No blogs found');
    }
    
    
    const blogIndex = blogs.findIndex(el => el.title === title);
    if (blogIndex === -1) {
        return res.status(404).send('Blog not found');
    }

    blogs[blogIndex].content = content;


    fs.writeFileSync('blogs.json', JSON.stringify(blogs));
    res.send('Blog updated');
});
app.delete('/blogs/:title', (req, res) => {
    const title = req.params.title;
    
 
    let blogs = [];
    try {
        const data = fs.readFileSync('blogs.json', 'utf-8');
        blogs = JSON.parse(data);
    } catch (error) {
        return res.status(404).send('No blogs found');
    }
 
    const blogIndex = blogs.findIndex(el => el.title === title);
    if (blogIndex === -1) {
        return res.status(404).send('Blog not found');
    }

    blogs.splice(blogIndex, 1);

  
    fs.writeFileSync('blogs.json', JSON.stringify(blogs));
    res.send('Blog deleted');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
