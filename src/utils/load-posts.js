// Função para carregar posts de uma API
export const loadPosts = async () => {
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

  return postsAndPhotos;
}