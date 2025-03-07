import { 
  IonAvatar,
  IonButton,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter
} from '@ionic/react';

import { logoTiktok } from 'ionicons/icons';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward');
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          marginTop: '-10rem',
          marginBottom: '-18rem',
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%', 
              overflow: 'hidden' 
            }}
          >
          
          </IonAvatar>

          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>USER LOGIN</h1>
        </div>
          
        <IonTitle>LOGIN</IonTitle>
        
        <IonItem>
          <IonInput 
            label="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onIonInput={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput 
            type="password"
            label="Password"
            value={password}
            placeholder="Enter your password"
            onIonInput={(e) => setPassword(e.detail.value!)}
          
          ></IonInput>
        </IonItem>

        <IonButton onClick={doLogin} expand="full">
          Login
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Login;
