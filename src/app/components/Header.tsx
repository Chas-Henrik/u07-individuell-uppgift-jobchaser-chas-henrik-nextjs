import styles from './Header.module.css'
import { useState, useContext } from "react";
import SwitchBox from "@/components/SwitchBox"
import { ThemeContext, ThemeUpdateContext } from "@/layout";

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Header({children}: SwitchBoxProps): JSX.Element {
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const darkTheme = useContext(ThemeContext);
    const toggleTheme = useContext(ThemeUpdateContext);

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#f5f5f5',
        color: darkTheme ? '#f5f5f5' : '#333',
    };

    const handleCheckedChange = (value: boolean) => {
        setSwitchChecked(value);
        toggleTheme();
    };

    return (
        <header style={themeStyles} className={styles.header}>
            {children}
            <SwitchBox status={["Dark/light-mode", "Dark/light-mode"]} checked={switchChecked} onCheckedChange={handleCheckedChange} />
        </header>
    )
}

export default Header