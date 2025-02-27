import "../../style/About_me.css";
import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react';

const AboutMe: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="custom-title">About Me</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <section className="about fade-in" id="About">
                    <div className="row fade-in">
                        <div className="info fade-in">
                            <h3><span> Name:</span>Jay Lourd E. Vicelles</h3>
                            <h3><span> Age: </span> 21</h3>
                            <h3><span> Post:</span> Front End Developer</h3>
                            <h3><span> Language: </span> English</h3>
                        </div>
                        
                        <div className="counter fade-in">
                            <div className="box fade-in">
                                <span>3+</span>
                                <h3>Project Completed</h3>
                            </div>

                            <div className="box fade-in">
                                <span>2+</span>
                                <h3>Years Of Studying</h3>
                            </div>

                            
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    );
};

export default AboutMe;