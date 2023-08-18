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
                name: newPerson, // This is the current name of the person 
                edit: false, // This keeps track on if the user is editing the name
                editName: newPerson, // This is the name the user is editing the person's name to
                nameDrawn: '' // This is the name of who they have drawn
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
        // If the user wants to edit a person's name then mark that name as being edited
        editPerson (person) {
            let editPersonLocation = this.peopleAttending.indexOf(person)

            this.peopleAttending[editPersonLocation].edit = true
        },
        // Update a person with the new information
        updatePersonAttending (personToUpdate, newInformation) {
            // Find where the person is located in the array
            let updatePersonLocation = this.peopleAttending.indexOf(personToUpdate.name)

            // update the information
            this.peopleAttending[updatePersonLocation] = newInformation
        }
    }
})