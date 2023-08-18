import { defineStore } from 'pinia'
import { Person } from "@/class/personClass"

export const usePeopleAttendingStore = defineStore('peopleAttending', {
    state: () => ({
        peopleAttending: []
    }),
    getters: {
        getEditNameOfPeopleBeingEdited () {
            let editNames = []
            for (let person of this.peopleAttending) {
                if (person.edit) {
                    editNames.push(person.editName)
                }
            }

            return editNames
        }
    },
    actions: {
        // Update a person with the new information if its a new person add them to the array
        addPerson (person) {
            if (typeof person === 'string') {
                this.peopleAttending.push(new Person(person))
            } else {
                console.error("Error in PeopleAttending store: Cannot add person. addPerson only adds variables of type String.")
            }
        },
        // Remove a person from the list of people attending
        removePerson (removePerson) {
            let indexOfName = this.peopleAttending.indexOf(removePerson)
            if (indexOfName !== -1) {
                this.peopleAttending.splice(indexOfName, 1)
            } else {
                console.error("Error in PeopleAttending store: Cannot remove person. removePerson was not able to find the person that needed to be removed.")
            }
            
        },
        // If the user wants to edit a person's name then mark that name as being edited
        editPerson (person) {
            person.edit = true
        },
        // If the person is done editing the name then save it
        updateName (person, newName) {
            person.name = newName
            person.edit = false
            person.editName = newName
        },
        // Add the name of the person that was drawn
        updateNameDrawn (person, nameDrawn) {
            person.nameDrawn = nameDrawn
        },
        // Used to empty the store
        clearPeopleAttending () {
            this.peopleAttending = []
        }
    }
})