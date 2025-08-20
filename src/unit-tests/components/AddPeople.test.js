import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import { createTestingPinia } from "@pinia/testing"

import AddPeople from "@/components/content/AddPeople.vue"

// create a new wrapper and return it
function createWrapper () {
    return mount(AddPeople, {
        plugins: [
            createTestingPinia({
                createSpy: vi.fn,
                stubActions: true
            })
        ]
    })
}

describe("Testing the AddPeople component", () => {
    // Testing that when the continue button is clicked the component emits a goToDifferentPage event with "continue"
    it("Testing that when the continue button is clicked the component emits a goToDifferentPage event with 'continue'", () => {
        let wrapper = createWrapper()
        wrapper.find("#continue-button").trigger("click")
        expect(wrapper.emitted("goToDifferentPage")[0]).toEqual(["continue"])
    }),
    // Testing that when the go back button is clicked the component emits a goToDifferentPage event with "goBack"
    it("Testing that when the go back button is clicked the component emits a goToDifferentPage event with 'goBack'", () => {
        let wrapper = createWrapper()
        wrapper.find("#go-back-button").trigger("click")
        expect(wrapper.emitted("goToDifferentPage")[0]).toEqual(["goBack"])
    }),
    // Testing that when goToDifferentPage gets an invalid direction that it returns an error
    it("Testing that when goToDifferentPage gets an invalid direction that it returns an error", () => {
        let wrapper = createWrapper()
        let response = wrapper.vm.goToDifferentPage("badDirection")
        expect(response).toContain("Error")
    })
})