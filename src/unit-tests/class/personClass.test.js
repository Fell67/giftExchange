import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import { Person } from "@/class/personClass"

const testName = 'Jon Doe'
const testPerson = new Person (testName)

describe("Testing the Person Class", () => {
    // Test that the constructor returns an object with the expected default parameters 
    it("Test that the constructor returns an object with the expected default parameters", () => {
        expect(testPerson.name).toBe(testName)
        expect(testPerson.edit).toBe(false)
        expect(testPerson.editName).toBe(testName)
        expect(testPerson.nameDrawn).toBe('')
    })
})