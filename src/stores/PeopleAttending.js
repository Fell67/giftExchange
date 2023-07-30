import { defineStore } from 'pinia'

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
        // Add a person to the list of people attending
        addPerson (newPerson) {
            let person = {
                name: newPerson,
                edit: false,
                editName: newPerson
            }
            this.peopleAttending.push({...person})
        },
        // Remove a person from the list of people attending
        removePerson (removePerson) {
            let tempArray = []
            for (let person of this.peopleAttending) {
                if (person !== removePerson) {
                    tempArray.push(person)
                }
            }
            this.peopleAttending = tempArray
        },
        editPerson (person) {
            let editPersonLocation = this.peopleAttending.indexOf(person)

            this.peopleAttending[editPersonLocation].edit = true
        }
    }
})