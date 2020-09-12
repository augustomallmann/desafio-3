import React, {useState, useEffect} from 'react';
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {

      "title": `Teste ${Date.now()}`,
"url": "http://www.google.com",
	"techs": "['react','react23']",
    });
    
    const repository = response.data;
    
    setRepositories([...repositories, repository])
 
  }

  async function handleRemoveRepository(id) {

    
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    console.log(repositories.length)

    if (repositoryIndex >= 0){
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories])
      const response = await api.delete(`/repositories/${id}`, {});
return response; 
    } else {
      return console.log('projeto não encontrado');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository=> 
      <li key={repository.id}>{repository.title} 
   
       <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
      </li> 
      )}

       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
