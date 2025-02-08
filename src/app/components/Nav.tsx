import styles from './Nav.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/layout";

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Nav({children}: SwitchBoxProps): JSX.Element {
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <nav style={themeStyles} className={styles.nav}> 
            {children}
        </nav>
    )
}

export default Nav