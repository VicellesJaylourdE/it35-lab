import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph')) {
      alert('Only @nbsc.edu.ph emails are allowed to register.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    // Sign up in Supabase authentication
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Account creation failed: ' + error.message);
      return;
    }

    // Hash password before storing in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user data into 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      },
    ]);

    if (insertError) {
      alert('Failed to save user data: ' + insertError.message);
      return;
    }

    setShowSuccessModal(true);
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
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: 'white',
              }}
            >
              REGISTER
            </IonTitle>

            <IonCardContent style={{ textAlign: 'left' }}>
              <IonInput
                label="Username"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter a unique username"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              />
              <IonInput
                label="First Name"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              />
              <IonInput
                label="Last Name"
                labelPlacement="stacked"
                fill="outline"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              />
              <IonInput
                label="Email"
                labelPlacement="stacked"
                fill="outline"
                type="email"
                placeholder="Email@nbsc.edu.ph"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              />
              <IonInput
                label="Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Enter password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput
                label="Confirm Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                style={{
                  marginTop: '15px',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                onClick={handleOpenVerificationModal}
                expand="full"
                shape="round"
                style={{
                  marginTop: '15px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                Register
              </IonButton>
              <IonButton
                routerLink="/it35-lab"
                expand="full"
                fill="clear"
                shape="round"
                style={{
                  color: '#488aff',
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                Already have an account?
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Verification Modal */}
        <IonModal
          isOpen={showVerificationModal}
          onDidDismiss={() => setShowVerificationModal(false)}
          style={{ borderRadius: '15px' }}
        >
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>

                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>

                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: '5px',
                }}
              >
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal
          isOpen={showSuccessModal}
          onDidDismiss={() => setShowSuccessModal(false)}
          style={{ borderRadius: '15px' }}
        >
          <IonContent
            className="ion-padding"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              textAlign: 'center',
              marginTop: '35%',
            }}
          >
            <IonTitle style={{ marginTop: '35%' }}>Registration Successful</IonTitle>
            <IonText>
              <p>Your account has been created.</p>
              <p>Check your email address.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" routerDirection="back" color="primary">
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
