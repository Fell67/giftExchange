<template>
    <div>
        <v-row>
            <v-col>
                <h1>
                    Drawing Names
                </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-progress-linear
                model-value="10"
                height="11"
            />
            <v-row>
                <v-col style="text-align: center">
                    Test
                </v-col>
            </v-row>
        </v-row>
        <v-card-actions>
            <v-spacer />
            <v-btn
                color="accent-2"
                @click="goToDifferentPage('goBack')"
            >
                Go Back
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>

export default {
    name: "Welcome",
    emits: ["goToDifferentPage"],
    data () {
        return {
            
        }
    },
    created () {
        
    },
    methods: {
        // Go to the next page of the website
        goToDifferentPage (direction) {
            if (direction === "continue") {
                this.$emit("goToDifferentPage", direction)
            } else if (direction === "goBack") {
                this.$emit("goToDifferentPage", direction)
            } else {
                console.error("Error in DrawingNames: " + direction + " is invalid")
            }
        }
    }
}
</script>