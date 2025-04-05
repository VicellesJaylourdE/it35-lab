import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToast,
  IonLabel,
  IonCard,
  IonCardContent,
  IonSpinner,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';

const SignUp: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateForm = () => {
    if (!email || !password || !username) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!validateForm()) {
      setShowErrorToast(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    console.log('User signed up:', { username, email, password });

    setTimeout(() => {
      setLoading(false);
      setShowSuccessToast(true);
      setTimeout(() => navigation.push('/it35-lab', 'forward'), 1000); // Redirect after success
    }, 1500);
  };

  return (
    <IonPage>
    <IonContent
      className="ion-padding"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <IonCard
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <IonTitle
            className="ion-text-center"
            style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}
          >
            REGISTER
          </IonTitle>
  
          <IonCardContent style={{ textAlign: 'center' }}>
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput
                type="text"
                value={username}
                placeholder="Enter your username"
                onIonInput={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>
  
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="Enter your email"
                onIonInput={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
  
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                placeholder="Enter your password"
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
  
            <IonButton
              expand="full"
              onClick={handleSignUp}
              disabled={loading}
              style={{
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              {loading ? <IonSpinner name="dots" /> : 'REGISTER'}
            </IonButton>
  
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <IonButton
                routerLink="/it35-lab"
                fill="clear"
                style={{
                  color: '#488aff',
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                ALREADY HAVE AN ACCOUNT?
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
  
      {/* Error Toast */}
      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        duration={2000}
        message={errorMessage}
        color="danger"
      />
  
      {/* Success Toast */}
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        duration={1500}
        message="Registration successful! Redirecting..."
        color="success"
      />
    </IonContent>
  </IonPage>
  
  );
};

export default SignUp;
