<template>
    <div>
        <v-row>
            <v-col>
                <h1>
                    Drawing Names
                </h1>
            </v-col>
        </v-row>
        <v-row style="padding: 1%;">
            <v-progress-linear
                :model-value="percentCompleted"
                height="11"
                color="accent-2"
            />
            <v-row>
                <v-col style="text-align: center">
                    {{ namesDrawnOutOfTotalMsg }}
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
import { storeToRefs } from "pinia";
// The usePeopleAttendingStore is used to hold the names of the people are attending
import { usePeopleAttendingStore } from "@/stores/PeopleAttending"

export default {
    setup () {
        const peopleAttendingStore = usePeopleAttendingStore()
        const { peopleAttending } = storeToRefs(peopleAttendingStore)
        const { updateNameDrawn } = peopleAttendingStore

        return { peopleAttending, updateNameDrawn }
    },
    data () {
        return {
            namesToDraw: JSON.parse(JSON.stringify(this.peopleAttending)),
            lastPersonToDraw: undefined
        }
    },
    computed: {
      percentCompleted: function () {
        return ((this.peopleAttending.length - this.namesToDraw.length) / this.peopleAttending.length) * 100
      },
      namesDrawnOutOfTotalMsg: function () {
        return (this.peopleAttending.length - this.namesToDraw.length) + " out of " + this.peopleAttending.length + " names drawn"
      }
    },
    mounted () {
        // draw names from the hat
        this.drawNames()

        // Once all the names are drawn go to the next page
        this.goToDifferentPage("continue")
    },
    methods: {
        // Draw names from the hat for the people that are attending the gift exchange
        drawNames () {
            for (let person of this.peopleAttending) {
                // Keep track of if an acceptable name is drawn
                let isNameDrawn = false
                while (!isNameDrawn && this.namesToDraw.length !== 1) {
                    // select a random name from the list of people attending
                    let indexOfNameDrawn = Math.floor(Math.random() * this.namesToDraw.length)

                    // If the person's name was drawn then draw another person's name else add that person's name
                    if (person.name !== this.namesToDraw[indexOfNameDrawn].name) {
                        // Save the name that was drawn for this person
                        this.updateNameDrawn(person, this.namesToDraw[indexOfNameDrawn].name)
                        
                        // Mark an acceptable name has being drawn and save who the last person was
                        isNameDrawn = true
                        this.lastPersonToDraw = person

                        // Remove it from the list of names needing to be drawn
                        this.namesToDraw.splice(indexOfNameDrawn, 1)
                    }
                }
                if (!isNameDrawn && this.namesToDraw.length === 1) {
                  if (person.name === this.namesToDraw[0].name) {
                    let personToSwitch = this.lastPersonToDraw.nameDrawn
                    this.updateNameDrawn(this.lastPersonToDraw, person.name)
                    this.updateNameDrawn(person, personToSwitch)
                  } else {
                    this.updateNameDrawn(person, this.namesToDraw[0].name)
                  }
                }
            }
        },
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