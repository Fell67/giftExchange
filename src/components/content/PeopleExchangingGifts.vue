<template>
    <v-col>
        <v-row
            v-for="person in peopleAttending"
            :key="person"
        >
            {{ person.name }} drew {{ person.nameDrawn }}
        </v-row>
        <v-card-actions>
            <v-spacer />
            <v-btn
                color="accent-2"
                @click="goToDifferentPage('goBack')"
            >
                Go Back
            </v-btn>
            <v-btn 
                variant="elevated"
                color="accent"
                @click="goToDifferentPage('continue')"
            >
                Start Another Gift Exchange
            </v-btn>
        </v-card-actions>
    </v-col>    
</template>
<script>
import { storeToRefs } from 'pinia';
// The usePeopleAttendingStore is used to hold the names of the people are attending
import { usePeopleAttendingStore } from "@/stores/PeopleAttending"

export default {
    setup () {
        const peopleAttendingStore = usePeopleAttendingStore()
        const { peopleAttending } = storeToRefs(peopleAttendingStore)
        const { clearPeopleAttending } = peopleAttendingStore

        return { peopleAttending, clearPeopleAttending }
    },
    methods: {
        // Go to the next page of the website
        goToDifferentPage (direction) {
            if (direction === "continue") {
                this.clearPeopleAttending()
                this.$emit("goToDifferentPage", direction)
            } else if (direction === "goBack") {
                this.$emit("goToDifferentPage", direction)
            } else {
                console.error("Error in PeopleExchangingGifts: " + direction + " is invalid")
            }
        }
    }
}
</script>