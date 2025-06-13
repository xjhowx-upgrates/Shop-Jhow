import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, UserProfile } from '../context/AuthContext';
import styles from '../styles/Profile.module.scss';

const ProfilePage = () => {
  const { currentUser, userProfile, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/auth/login');
    }
  }, [currentUser, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !currentUser || !userProfile) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={userProfile.avatarUrl} alt="Avatar" className={styles.avatar} />
        <h2>Bem-vindo, {userProfile.username}!</h2>
        <p>Nível: {userProfile.level}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
      </div>
      <div className={styles.profileContent}>
        <h3>Suas Estatísticas</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h4>Minutos Jogados</h4>
            <p>{userProfile.minutes}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Vitórias</h4>
            <p>{userProfile.totalWon}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Derrotas</h4>
            <p>{userProfile.totalLost}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Partidas Jogadas</h4>
            <p>{userProfile.gamesPlayed}</p>
          </div>
        </div>
        
        <h3>Conquistas</h3>
        <div className={styles.achievements}>
          {userProfile.achievements.length > 0 ? (
            <ul>
              {userProfile.achievements.map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
            </ul>
          ) : (
            <p>Você ainda não tem nenhuma conquista.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
