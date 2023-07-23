import { defineStore } from 'pinia'

export const usePeopleAttendingStore = defineStore('peopleAttending', {
    state: () => ({
        peopleAttending: []
    }),
    getters: {

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
        }
    }
})