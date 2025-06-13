import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { currentUser, loading } = useContext(AuthContext);
    const router = useRouter();

    if (loading) {
      // Pode mostrar um spinner de carregamento aqui
      return <p>Carregando...</p>;
    }

    if (!currentUser) {
      // Se não estiver logado, redireciona para a página de login
      if (typeof window !== 'undefined') {
        router.push('/login');
      }
      return null; // Retorna null enquanto redireciona
    }

    // Se estiver logado, renderiza o componente original
    return <WrappedComponent {...props} />;
  };

  // Adiciona um nome de exibição para facilitar a depuração
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
