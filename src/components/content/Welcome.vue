<template>
    <div>
        <h1>
            Welcome!
        </h1>
        <div v-html="readMeHTML" />
        <v-card-actions>
            <v-spacer />
            <v-btn
                id="continue-button"
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

const readMe = new URL('readme.md', 'http://localhost:5173/giftExchange/')

export default {
    data () {
        return {
            readMeHTML: ""
        }
    },
    async created () {
        this.readMeHTML = await this.markdownToHtml(readMe)
    },
    methods: {
        // Add the readme to the template
        async markdownToHtml (readMe) {
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

            return marked(text)
        },
        // Go to the next page of the website
        goToDifferentPage () {
            this.$emit("goToDifferentPage", "continue")
        }
    }
}
</script>