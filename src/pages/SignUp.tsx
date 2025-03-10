import { 
    IonButton, 
    IonContent, 
    IonInput, 
    IonItem, 
    IonPage, 
    IonTitle, 
    IonToolbar 
  } from '@ionic/react';
  
  import { useState } from 'react';
  
  const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSignUp = () => {
      if (!email || !password || !username) {
        setErrorMessage('All fields are required.');
        return;
      }
  
      setErrorMessage('');
      console.log('User signed up:', { username, email, password });
    };
  
    return (
      <IonPage>
        <IonContent className='ion-padding'>
          <IonTitle>Sign Up</IonTitle>
  
          {errorMessage && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}
  
          <IonItem>
            <IonInput
              label="Username"
              type="text"
              value={username}
              placeholder="Enter your username"
              onIonInput={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
  
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
              label="Password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
  
          <IonButton expand="full" onClick={handleSignUp}>
            Sign Up
          </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SignUp;
  