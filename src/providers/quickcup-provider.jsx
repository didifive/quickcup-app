import React, { createContext, useCallback, useState } from "react";
import apiQuickCup from "../services/quickcup-api";

export const QuickCupContext = createContext({
  loading: false,
  empresa: {},
  cliente: {},
  enderecos: [],
  pedidos: []
});


const QuickCupProvider = ({ children }) => {
  const [quickcupState, setQuickcupState] = useState({
    loading: false,
    empresa: {},
    cliente: {},
    enderecos: [],
    pedidos: [],
  });

  const getEmpresa = async () => {
    setQuickcupState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const { data:empresa } = await apiQuickCup.get("/empresa");

      if (!empresa) {
        throw new Error("Erro no sistema, empresa não encontrada");
      }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: false,
        empresa: empresa,
      }));
      
    } catch (error) {
      console.error(error);
      setQuickcupState((prevState) => ({
        ...prevState,
        loading: false,
        empresa: {},
      }));
    }
  };

  const enviarCliente = async (cliente) => {
    if (!cliente) {
      return;
    }
    
    setQuickcupState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const resposta = await apiQuickCup.post("/cliente", cliente);

      if (resposta.status === 404) {
        throw new Error(resposta.data);
      }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: false,
        cliente: resposta.data
      }));

    } catch (error) {
      console.error(error);
      setQuickcupState((prevState) => ({
        ...prevState,
        loading: false,
        cliente: {},
      }));
    }
  };


  const contextValue = {
    quickcupState,
    getEmpresa: () => getEmpresa(),
    enviarCliente: useCallback((cliente) => enviarCliente(cliente), []),
  };

  return (
    <QuickCupContext.Provider value={contextValue}>
      {children}
    </QuickCupContext.Provider>
  );
};

export default QuickCupProvider;


// const GithubProvider = ({ children }) => {
//   const [githubState, setGithubState] = useState({
//     hasUser: false,
//     loading: false,
//     user: {
//       id: undefined,
//       login: undefined,
//       html_url: undefined,
//       followers: 0,
//       following: 0,
//       public_gists: 0,
//       public_repos: 0,
//     },
//     repositories: [],
//   });


  

//   const getUser = async (username) => {
//     if (!username) {
//       return;
//     }

//     setGithubState((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const { data } = await apiGitHub.get(`users/${username}`);

//       if (!data) {
//         throw new Error("User not found");
//       }

//       setGithubState((prevState) => ({
//         ...prevState,
//         hasUser: true,
//         user: {
//           id: data.id,
//           login: data.login,
//           html_url: data.html_url,
//           followers: data.followers,
//           following: data.following,
//           public_gists: data.public_gists,
//           public_repos: data.public_repos,
//         },
//       }));
//     } catch (error) {
//       console.error(error);
//       setGithubState((prevState) => ({
//         ...prevState,
//         hasUser: false,
//         user: {},
//       }));
//     } finally {
//       setGithubState((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   const getUserRepos = (username, limit = 6) => {
//     apiGitHub.get(`users/${username}/repos`).then(({ data }) => {
//       const repos = [
//         ...data
//           .sort((a, b) => {
//             if (a.stargazers_count !== b.stargazers_count) {
//               return b.stargazers_count - a.stargazers_count;
//             } else if (a.forks_count !== b.forks_count) {
//               return b.forks_count - a.forks_count;
//             } else {
//               return new Date(b.updated_at) - new Date(a.updated_at);
//             }
//           })
//           .slice(0, limit - 1)
//           .map((repo) => ({
//             id: repo.id,
//             full_name: repo.full_name,
//             description: repo.description,
//             html_url: repo.html_url,
//             topics: repo.topics,
//             stargazers_count: repo.stargazers_count,
//             forks_count: repo.forks_count,
//             updated_at: repo.updated_at,
//             watchers_count: repo.watchers_count,
//           })),
//         {
//           id: 0,
//           full_name: "my-all-repositories",
//           description:
//             "Clique para ver todos os meus repositórios no GitHub",
//           html_url: "https://github.com/didifive?tab=repositories",
//           topics: ["github", "portfolio"],
//           stargazers_count: 0,
//           forks_count: 0,
//           updated_at: Date.now(),
//           watchers_count: 0,
//         },
//       ];

//       setGithubState((prevState) => ({
//         ...prevState,
//         repositories: repos,
//       }));
//     });
//   };

//   const contextValue = {
//     githubState,
//     getUser: useCallback((username) => getUser(username), []),
//     getUserRepos: useCallback((username) => getUserRepos(username), []),
//   };

//   return (
//     <GithubContext.Provider value={contextValue}>
//       {children}
//     </GithubContext.Provider>
//   );
// };

// export default GithubProvider;
