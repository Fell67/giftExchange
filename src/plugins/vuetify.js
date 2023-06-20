import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// My themes
const customLightTheme = {
    dark: false,
    colors: {
        background: "#FFFFFF", // white
        primary: "#5BC8E7", // sky blue
        secondary: "#023047", // dark blue
        accent: "#FFB703" // golden yellow
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "customLightTheme",
        themes: {
            customLightTheme,
        }
    },
})

export default vuetify