import { 
  IonAvatar, 
  IonButton, 
  IonContent, 
  
  IonInput, 
  IonItem, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter 
} from '@ionic/react';


import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const doLogin = () => {
    // Basic validation before login attempt
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    // If validation passes, proceed with login
    setErrorMessage('');
    navigation.push('/it35-lab/app', 'forward');
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            marginTop: '-10rem',
            marginBottom: '-18rem',
          }}
        >
          <IonAvatar
            style={{
           
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
  
          </IonAvatar>
        
        </div>

        <IonTitle>LOGIN</IonTitle>

        {errorMessage && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
            {errorMessage}
          </div>
        )}

        <IonItem>
          <IonInput 
            label="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onIonInput={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput 
            type="password"
            label="Password"
            value={password}
            placeholder="Enter your password"
            onIonInput={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton onClick={doLogin} expand="full" style={{ marginTop: '1rem' }}>
          Login
        </IonButton>

        {/* Redirect to SignUp */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <IonButton routerLink="/it35-lab/app/SignUp" fill="clear">Sign Up</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
