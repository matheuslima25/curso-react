import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: "Matheus Lima",
      posts: []
    };
  }

  // handleClick() {
  //   // const { name } = this.state;
  //   // alert(`Olá, ${ name }`)
  //   //Não é a melhor abordagem porque precisa por o handler dentro do constructor.
  //   this.setState({ name: "José Matheus" });
  // }

  // Quando o componente for montado, faça...
  componentDidMount() {
    this.loadPosts();
  }

  // Função para carregar posts de uma API
  loadPosts = async () => {
    // Endpoints
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    // Usando a função await com Promise faz a função esperar a resposta
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    // Transformando em json
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    // Fazendo um zip entre fotos e posts, já que existem mais fotos que posts
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    // Mandando para o Component
    this.setState({ posts: postsAndPhotos });
  }

  // handlerAClick = (event) => {
  //   event.preventDefault();
  //   const { counter } = this.state;
  //   this.setState({ counter: counter + 1 });
  // };

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map(post => (
            <div className="post">
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className="post-content">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
