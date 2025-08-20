import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import { createTestingPinia } from "@pinia/testing"

import DrawingNames from "@/components/content/DrawingNames.vue"

// create a new wrapper and return it
function createWrapper () {
    return mount(DrawingNames, {
        plugins: [
            createTestingPinia({
                createSpy: vi.fn,
                stubActions: true
            })
        ]
    })
}

describe("Testing the DrawingNames component", () => {
    // Testing that when the go back button is clicked the component emits a goToDifferentPage event with "goBack"
    it("Testing that when the go back button is clicked the component emits a goToDifferentPage event with 'goBack'", () => {
        let wrapper = createWrapper()
        wrapper.find("#go-back-button").trigger("click")
        expect(wrapper.emitted("goToDifferentPage")[1]).toEqual(["goBack"])
    }),
    // Testing that when goToDifferentPage gets an invalid direction that it returns an error
    it("Testing that when goToDifferentPage gets an invalid direction that it returns an error", () => {
        let wrapper = createWrapper()
        let response = wrapper.vm.goToDifferentPage("badDirection")
        expect(response).toContain("Error")
    })
})