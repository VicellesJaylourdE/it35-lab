import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonItem, 
  IonPage, 
  IonTitle, 
  IonToast, 
  useIonRouter, 
  IonCard, 
  IonCardContent, 
  IonLabel, 
  IonSpinner 
} from '@ionic/react';
import { useState } from 'react';

const SignUp: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setShowToast(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    console.log('User signed up:', { username, email, password });

    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
      navigation.push('/it35-lab', 'forward');
    }, 1500);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212' }}>
        <IonCard style={{ width: '90%', maxWidth: '400px', padding: '20px', borderRadius: '15px' }}>
          <IonTitle className="ion-text-center" style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>REGISTER</IonTitle>

          <IonCardContent style={{ textAlign: 'center' }}>
            {/* Username Input */} 
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput
                type="text"
                value={username}
                placeholder="Enter your username"
                onIonInput={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>

            {/* Email Input */}
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={showEmail ? email : ''}
                placeholder="Enter your email"
                onIonFocus={() => setShowEmail(true)}
                onIonBlur={() => setShowEmail(email.length > 0)}
                onIonInput={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            {/* Password Input */}
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                value={showPassword ? password : ''}
                placeholder="Enter your password"
                onIonFocus={() => setShowPassword(true)}
                onIonBlur={() => setShowPassword(password.length > 0)}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/* Register Button */}
            <IonButton 
              expand="full" 
              onClick={handleSignUp} 
              disabled={loading}
              style={{ borderRadius: '20px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
            >
              {loading ? <IonSpinner name="dots" /> : 'REGISTER'}
            </IonButton>

           {/* Sign In Link */}
             <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <IonButton 
        routerLink="/it35-lab"
       fill="clear" 
      style={{ color: '#488aff', textTransform: 'uppercase', fontSize: '14px' }}
    >
      ALREADY HAVE AN ACCOUNT?
    </IonButton>
    </div>

          </IonCardContent>
        </IonCard>

        {/* Toast Message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          duration={2000}
          message={errorMessage || 'Registration successful! Redirecting...'}
          color={errorMessage ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};


export default SignUp;
