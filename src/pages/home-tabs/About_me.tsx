import "../../style/About_me.css";
import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonAvatar, 
    IonCard, 
    IonCardContent
} from '@ionic/react';

const AboutMe: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="header-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>My Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="account-content">
                <div className="profile-section">
                    <IonAvatar className="profile-avatar">
                    <img src="src/public/profile.jpg" alt="Jay Lourd E. Vicelles" />

                    </IonAvatar>
                    <h2>Jay Lourd E. Vicelles</h2>
                    <p>Frontend Developer</p>

                </div>
                
                <IonCard className="info-card">
                    <IonCardContent>
                        <h3><span> Age:</span> 21</h3>
                        <h3><span> Language:</span> English</h3>
                        <h3><span> Projects Completed:</span> 3+</h3>
                        <h3><span> Years of Studying:</span> 2+</h3>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AboutMe;
