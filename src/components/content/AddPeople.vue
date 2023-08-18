<template>
    <div>
        <h1>
            Add People
        </h1>
        <!-- text field and button to add a new person -->
        <v-row align-content="center" dense>
            <v-col>
                <v-text-field 
                    label="Name"
                    v-model="newPerson"
                    style="padding-right: 1%"
                    :error="(isDupPerson.has(newPerson))"
                    :error-messages="isDupPerson.get(newPerson)"
                />
            </v-col>
            <v-col>
                <v-btn
                    variant="elevated"
                    color="accent"
                    :disabled="disableAddPerson"
                    @click="addPersonAndClearNewPerson()"
                >
                    Add Person
                </v-btn>
            </v-col>
        </v-row>
        <!-- Display people attending -->
        <v-row>
            <h2
                style="padding-bottom: 2%;"
            >
                People Attending
            </h2>
        </v-row>
        <!-- If no one is attending display message -->
        <v-row v-if="peopleAttending.length === 0">
            {{ noOneAttendingMsg }}
        </v-row>
        <!-- else show the names of the people attending -->
        <v-row v-else>
            <v-col>
                <v-row
                    v-for="person of peopleAttending"
                    :key="person"
                    dense
                >
                    <!-- If the user didnt select edit -->
                    <v-col v-if="!person.edit">
                        <v-row>
                            <v-col
                                cols="auto"
                            >
                                {{ person.name }}
                            </v-col>
                            <v-col>
                                <v-row
                                    align-content="start"
                                >
                                    <v-col
                                        cols="auto"
                                    >
                                        <span
                                            class="material-symbols-outlined material-symbols-outlined-enabled"
                                            tabindex="0"
                                            @click="editPerson(person)"
                                        >
                                            edit
                                            <v-tooltip
                                                activator="parent"
                                                location="top"
                                            >
                                                Edit
                                            </v-tooltip>
                                        </span>
                                    </v-col>
                                    <v-col
                                        cols="auto"
                                    >
                                        <span
                                            class="material-symbols-outlined material-symbols-outlined-enabled"
                                            tabindex="0"
                                            @click="removePerson(person)"                                      
                                        >
                                            delete
                                            <v-tooltip
                                                activator="parent"
                                                location="top"
                                            >
                                                Delete
                                            </v-tooltip>
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- If the user selected edit -->
                    <v-col v-else>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="person.editName"
                                    :error="(isDupPerson.has(person.editName))"
                                    :error-messages="isDupPerson.get(person.editName)"
                                />
                            </v-col>
                            <v-col>
                                <v-row>
                                    <v-col
                                        cols="auto"
                                    >
                                    <span
                                        class="material-symbols-outlined"
                                        :class="(isDupPerson.has(person.editName)) ? 'material-symbols-outlined-disabled' : 'material-symbols-outlined-enabled'"
                                        tabindex="0"
                                        @click="save(person)"    
                                    >
                                        done
                                        <v-tooltip
                                            activator="parent"
                                            location="top"
                                        >
                                            Save
                                        </v-tooltip>
                                    </span>
                                    </v-col>
                                    <v-col
                                        cols="auto"
                                    >
                                        <span
                                            class="material-symbols-outlined material-symbols-outlined-enabled"
                                            tabindex="0"
                                            @click="cancel(person)"
                                        >
                                            close
                                            <v-tooltip
                                                activator="parent"
                                                location="top"
                                            >
                                                Cancel
                                            </v-tooltip>
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
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
                :disabled="disableContinue"
            >
                Continue
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
        const { peopleAttending, getEditNameOfPeopleBeingEdited } = storeToRefs(peopleAttendingStore)
        const { addPerson, removePerson, editPerson, updateName } = peopleAttendingStore

        return { peopleAttending, getEditNameOfPeopleBeingEdited, addPerson, removePerson, editPerson, updateName}
    },
    data () {
        return {
            noOneAttendingMsg: 'Currently have no one attending the gift exchange. To add people enter their name in the text field above and click "Add Person"',
            newPerson: "" // The new person being added
        }
    },
    computed: {
        // Disable the continue button if there are less then 2 people attending the gift exchange
        disableContinue: function disableContinue () {
            return (this.peopleAttending.length < 2)
        },
        // Disable the add person button if a name has not been entered into the text field or if its a duplicate name
        disableAddPerson: function disableAddPerson () {
            return ((this.isDupPerson.has(this.newPerson)) || (this.newPerson === ""))
        },
        // If the person that the user is typing exists display an error message
        isDupPerson: function displayError () {
            let isDupPerson = new Map()
            let namesToCheck = this.getEditNameOfPeopleBeingEdited
            namesToCheck.push(this.newPerson)

            for (let name of namesToCheck) {
                // check that the new person being entered has a unique name and the names of everyone who has a name being edited        
                let isListed = this.peopleAttending.find((personAttending) => { 
                    return (personAttending.name.toUpperCase().replace(/ /g, "") === name.toUpperCase().replace(/ /g, ""))
                })
                if (isListed !== undefined) {
                    isDupPerson.set(name, name + " is already on the list of people attending.")
                }
            }

            return isDupPerson
        }
    },
    methods: {
        addPersonAndClearNewPerson () {
            this.addPerson(this.newPerson)
            this.newPerson = ""
        },
        // cancel updating a person's name
        cancel (person) {
            this.updateName(person, person.name)
        },
        // Save the name that was edited
        save (person) {
           if (!(this.isDupPerson.has(person.editName))) {
                this.updateName(person, person.editName)
            }
        },
        // Go to the next page of the website
        goToDifferentPage (direction) {
            if (direction === "continue") {
                this.$emit("goToDifferentPage", direction)
            } else if (direction === "goBack") {
                this.$emit("goToDifferentPage", direction)
            } else {
                console.error("Error in AddPeople: " + direction + " is invalid")
            }
        }
    }
}
</script>