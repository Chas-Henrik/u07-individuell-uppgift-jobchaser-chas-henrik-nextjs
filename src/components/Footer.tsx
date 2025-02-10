import styles from './Footer.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Footer({children}: SwitchBoxProps): React.JSX.Element {
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        <footer style={themeStyles} className={styles.footer}> 
            {children}
        </footer>
    )
}

export default Footer