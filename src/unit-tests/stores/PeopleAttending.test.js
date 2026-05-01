import { setActivePinia, createPinia } from "pinia"
import { describe, expect, it, beforeEach } from "vitest"

import { usePeopleAttendingStore } from "@/stores/PeopleAttending"

describe("Testing the People Attending Store", () => {
  // creates a fresh pinia and makes it active before each test
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  // Test the addPerson action adds a person to the peopleAttending array
  it ("Test the addPerson action adds a person to the peopleAttending array", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    expect(peopleAttendingStore.peopleAttending.length).toBe(0)
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
  })
  // Test the addPerson action throws an error when trying to add a person without getting a name
  it ("Test the addPerson action throws an error when trying to add a person without getting a name", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    let response = peopleAttendingStore.addPerson(undefined)
    expect(response).toContain("Error")
  })
  // Remove a person from the list of people attending
  it ("Remove a person from the list of people attending", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
    peopleAttendingStore.removePerson(peopleAttendingStore.peopleAttending[0])
    expect(peopleAttendingStore.peopleAttending.length).toBe(0)
  })
  // Check that when removing a person that does not exist that it returns an error
  it ("Check that when removing a person that does not exist that it returns an error", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    let response = peopleAttendingStore.removePerson(undefined)
    expect(response).toContain("Error")
  })
  // Check the editPerson action sets the given person object to edit
  it ("Check the editPerson action sets the given person object to edit", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
    peopleAttendingStore.editPerson(peopleAttendingStore.peopleAttending[0])
    expect(peopleAttendingStore.peopleAttending[0].edit).toBe(true)
  })
  // Check the updateName action sets updates the name of the given person object to the given newName
  // The function should update the name to the new name, edit to false, and editName to the newName
  it ("Check the updateName action sets updates the name of the given person object to the given newName", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
    let newName = "Jane Doe"
    peopleAttendingStore.updateName(peopleAttendingStore.peopleAttending[0], newName)
    expect(peopleAttendingStore.peopleAttending[0].name).toBe(newName)
    expect(peopleAttendingStore.peopleAttending[0].edit).toBe(false)
    expect(peopleAttendingStore.peopleAttending[0].editName).toBe(newName)
  })
  // Check the updateNameDrawn action updates the nameDrawn of the given person object to the name drawn 
  it ("Check the updateNameDrawn action updates the nameDrawn of the given person object to the name drawn", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
    let nameDrawn = "Jane Doe"
    peopleAttendingStore.updateNameDrawn(peopleAttendingStore.peopleAttending[0], nameDrawn)
    expect(peopleAttendingStore.peopleAttending[0].nameDrawn).toBe(nameDrawn)
  })
  // Check the clearPeopleAttending action clears the peopleAttending array
  it ("Check the clearPeopleAttending action clears the peopleAttending array", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    expect(peopleAttendingStore.peopleAttending.length).toBe(1)
    peopleAttendingStore.clearPeopleAttending()
    expect(peopleAttendingStore.peopleAttending.length).toBe(0)
  })
  // Check that the getEditNameOfPeopleBeingEdited getter returns an array of only the names being edited
  it ("Check that the getEditNameOfPeopleBeingEdited getter returns an array of only the names being edited", () => {
    const peopleAttendingStore = usePeopleAttendingStore()
    peopleAttendingStore.addPerson("Jon Doe")
    peopleAttendingStore.addPerson("Jane Doe")
    peopleAttendingStore.addPerson("Danny Swift")
    expect(peopleAttendingStore.peopleAttending.length).toBe(3)
    expect(peopleAttendingStore.getEditNameOfPeopleBeingEdited.length).toBe(0)
    peopleAttendingStore.editPerson(peopleAttendingStore.peopleAttending[0])
    expect(peopleAttendingStore.getEditNameOfPeopleBeingEdited.length).toBe(1)
  })
})