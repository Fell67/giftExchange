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
                    :error="(dupPersonMsg !== '')"
                    :error-messages="dupPersonMsg"
                />
            </v-col>
            <v-col>
                <v-btn
                    variant="elevated"
                    color="accent"
                    :disabled="disableAddPerson"
                    @click="addPerson()"
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
                                            class="material-symbols-outlined"
                                            @click="person.edit=true"
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
                                            class="material-symbols-outlined"
                                            @click="remove(person)"                                      
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
                                />
                            </v-col>
                            <v-col>
                                <v-row>
                                    <v-col
                                        cols="auto"
                                    >
                                    <span
                                        class="material-symbols-outlined"
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
                                            class="material-symbols-outlined"
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
export default {
    data () {
        return {
            peopleAttending: [], // List of people attending
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
            return ((this.dupPersonMsg !== '') || (this.newPerson === ""))
        },
        // If the person that the user is typing exists display an error message
        dupPersonMsg: function displayError () {
            let isListed = this.peopleAttending.find((personAttending) => { 
                return (personAttending.name.toUpperCase() === this.newPerson.toUpperCase())
            })
            if (isListed === undefined) {
                return ""
            }
            else {
                return this.newPerson + " is already on the list of people attending."
            }
        }
    },
    methods: {
        // Add a person to the list of people attending
        addPerson () {
            let person = {
                name: this.newPerson,
                edit: false,
                editName: this.newPerson
            }
            this.peopleAttending.push({...person})
            this.newPerson = ""
        },
        remove (removePerson) {
            let tempArray = []
            for (let person of this.peopleAttending) {
                if (person !== removePerson) {
                    tempArray.push(person)
                }
            }
            this.peopleAttending = tempArray
        },
        // cancel updating a person's name
        cancel (person) {
            person.edit = false
            person.editName = person.name
        },
        // Save the name that was edited
        save (person) {
            person.name = person.editName
            person.edit = false
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