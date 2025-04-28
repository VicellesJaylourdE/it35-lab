import React, { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonModal,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
      setShowAlert(true);
      return;
    }
    if (!agreeTerms) {
      setAlertMessage("You must agree to the Terms & Conditions.");
      setShowAlert(true);
      return;
    }
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error("Account creation failed: " + error.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from('users').insert([
        {
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword,
        },
      ]);

      if (insertError) throw new Error("Failed to save user data: " + insertError.message);

      setShowSuccessModal(true);
      setShowToast(true);
    } catch (err) {
      if (err instanceof Error) setAlertMessage(err.message);
      else setAlertMessage("An unknown error occurred.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="register-card">
          <h1 className="register-title">Create an account</h1>
          <p style={{ textAlign: 'left', color: '#666', marginBottom: '20px' }}>
              Please login or sign up to continue
            </p>
          
          <IonInput
            placeholder="First name"
            type="text"
            fill="outline"
            value={firstName}
            onIonChange={e => setFirstName(e.detail.value!)}
            style={inputStyle}
          />
          <IonInput
            placeholder="Last name"
            type="text"
            fill="outline"
            value={lastName}
            onIonChange={e => setLastName(e.detail.value!)}
            style={inputStyle}
          />
          <IonInput
            placeholder="Email (@nbsc.edu.ph)"
            type="email"
            fill="outline"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            style={inputStyle}
          />
          <IonInput
            placeholder="Enter your password"
            type="password"
            fill="outline"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            style={inputStyle}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', marginTop: '10px', width: '100%' }}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor="terms" style={{ fontSize: '14px', color: '#aaa' }}>
              I agree to the <a href="#" style={{ color: '#6c63ff', textDecoration: 'none' }}>Terms & Conditions</a>
            </label>
          </div>

          <IonButton onClick={handleOpenVerificationModal} expand="full" color="success" style={{ marginTop: '10px' }}>
            Create account
          </IonButton>
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
            Already have an account? <a href="/it35-lab" style={{ color: '#6c63ff', textDecoration: 'none' }}>Log in</a>
          </p>

        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <div className="modal-content">
              <h2>Verify Your Details</h2>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Name:</strong> {firstName} {lastName}</p>
              <IonButton expand="block" onClick={doRegister} color="primary">Confirm</IonButton>
              <IonButton expand="block" fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal}>
          <IonContent className="ion-padding">
            <div className="modal-content">
              <h2>Success!</h2>
              <p>Your account has been created.</p>
              <IonButton expand="block" routerLink="/it35-lab" color="success">
                Go to Login
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Alert and Toast */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Registration successful! Check your email."
          duration={2000}
          position="top"
          color="success"
        />

        {/* Floating Animation and Card Styles */}
        <style>
          {`
            @keyframes floatCard {
              0%, 100% {
                transform: translateY(0);
                box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2), 0 0 20px 3px rgba(108, 99, 255, 0.6);
              }
              50% {
                transform: translateY(-20px);
                box-shadow: 0 25px 40px rgba(0, 0, 0, 0.3), 0 0 35px 7px rgba(108, 99, 255, 0.8);
              }
            }

            .register-card {
              max-width: 380px;
              margin: 8% auto 0 auto;
              padding: 25px 25px 30px 25px;
              background: #1e1e2f;
              border-radius: 20px;
              animation: floatCard 6s ease-in-out infinite;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-shadow: 0 8px 20px rgba(108, 99, 255, 0.3);
            }

            .register-title {
              font-size: 26px;
              color: white;
              margin-bottom: 5px;
            }

            .modal-content {
              padding: 20px;
              text-align: center;
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

const inputStyle = {
  borderRadius: '12px',
  marginBottom: '15px',
  '--highlight-color-focused': '#6c63ff',
  '--border-color': '#6c63ff',
};

export default Register;
