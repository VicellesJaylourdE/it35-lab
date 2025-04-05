import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Reusable AlertBox
const AlertBox: React.FC<{
  message: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = () => {
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    setErrorMessage('');
    setShowToast(true); // Show toast
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward');
    }, 1500); // Redirect after toast duration
  };

  return (
    <IonPage>
      {/* Proper header structure for IonTitle */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

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
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            placeholder="Enter your password"
            onIonInput={(e) => setPassword(e.detail.value!)}
          />
          <IonButton fill="clear" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </IonButton>
        </IonItem>

        <IonButton onClick={doLogin} expand="full" style={{ marginTop: '1rem' }}>
          Login
        </IonButton>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <IonButton routerLink="/it35-lab/app/home/signup" fill="clear">
            Creating New Account
          </IonButton>
        </div>

        {/* AlertBox */}
        <AlertBox
          message={alertMessage}
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
        />

        {/* Toast works properly here */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
