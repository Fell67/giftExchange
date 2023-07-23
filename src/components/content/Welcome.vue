<template>
    <div>
        <h1>
            Welcome!
        </h1>
        <div v-html="readMeHTML" />
        <v-card-actions>
            <v-spacer />
            <v-btn 
                variant="elevated"
                color="accent"
                @click="goToDifferentPage()"
            >
                Continue
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { marked } from "marked"
import { mangle } from "marked-mangle"
import { gfmHeadingId } from "marked-gfm-heading-id"

const readMe = "@/../README.md"

export default {
    name: "Welcome",
    emits: ["goToDifferentPage"],
    data () {
        return {
            readMeHTML: ""
        }
    },
    created () {
        this.markdownToHtml()
    },
    methods: {
        // Add the readme to the template
        async markdownToHtml () {
            const options = {
                prefix: "readMe-",
            };
            marked.use(gfmHeadingId(options));
            marked.use(mangle())

            let text = await fetch(readMe).then( (response) => {
                if (!response.ok) {
                    console.error("Error when trying to load README. Status: " + response.status)
                    return "Error when trying to load README. Status: " + response.status
                } else {
                    return response.text()
                }
            })

            this.readMeHTML = marked(text)
        },
        // Go to the next page of the website
        goToDifferentPage () {
            this.$emit("goToDifferentPage", "continue")
        }
    }
}
</script>