import React from 'react';
import { Container } from 'react-bootstrap';
import { blogs } from '../data/blogs.js';
import BlogCard from '../components/molecules/BlogCard.jsx';
import '../styles/pages/Blogs.css';

// Su funcion es mostrar todos los blogs en la pagina blogs
function Blogs() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Historias de Zapatillas</h1>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}

    </Container>
  );
}

export default Blogs;