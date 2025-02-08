import styles from './Footer.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/layout";

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Footer({children}: SwitchBoxProps): JSX.Element {
    const darkTheme = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#f5f5f5',
        color: darkTheme ? '#f5f5f5' : '#333',
    };

    return (
        <footer style={themeStyles} className={styles.footer}> 
            {children}
        </footer>
    )
}

export default Footer