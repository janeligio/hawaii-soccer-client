import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <section className="footer-section">
                    <h3 className="footer-section-header">About</h3>
                    <ul className="footer-section-list">
                        <li>Interested in playing soccer but no one you know does?</li>
                        <li>Not interested in joining some league?</li>
                        <li>Just play a casual game at a park!</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h3 className="footer-section-header">Navigate</h3>
                    <ul className="footer-section-list">
                        <li><Link className="footer-link" to="/create">Organize a game!</Link></li>
                        <li>Or join a scheduled game!</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h3 className="footer-section-header">Source</h3>
                    <ul className="footer-section-list">
                        <li>Powered by: 
                            <ul className="powered-by">
                                <li><FooterLink link="https://nodejs.org/en/" text="Node"/></li>
                                <li><FooterLink link="https://reactjs.org/" text="React"/></li>
                                <li><FooterLink link="https://www.mongodb.com/" text="MongoDB"/></li>
                            </ul>
                        </li>
                        <li><FooterLink link="https://github.com/janeligio/hawaii-soccer-client" text="Client Code"/></li>
                        <li><FooterLink link="https://github.com/janeligio/hawaii-soccer-server" text="Server Code"/></li>
                    </ul>
                </section>

            </div>
            <section className="personal">
                <div>
                    <p><FooterLink link={'https://www.janeligio.com/'} text={`About me.`}/></p>
                </div>
            </section>
        </footer>
    );
}

function FooterLink(props) {
    const { className, link, text} = props;
    return (<a href={link} class={`footer-link ${className}`} target="_blank" rel="noopener noreferrer">{text}</a>);
}