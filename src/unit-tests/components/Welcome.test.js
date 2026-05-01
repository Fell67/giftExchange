import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import Welcome from "@/components/content/Welcome.vue"
import { marked } from "marked"
import { mangle } from "marked-mangle"
import { gfmHeadingId } from "marked-gfm-heading-id"

const readMe = new URL("README.md", "https://fell67.github.io/giftExchange/")

// create a new wrapper and return it
function createWrapper () {
    return mount(Welcome, {})
}

// Create the html that would be made from the readMe file to compare with the function
async function createTestReadMeHTML () {
    const options = {
        prefix: "readMe-",
    };
    marked.use(gfmHeadingId(options));
    marked.use(mangle())

    let text = await fetch(readMe).then( (response) => {
        if (!response.ok) {
            console.error("Error when trying to load README. Status: " + response.status)
            return "Error when trying to load README. Status: " + response.status
        } else {
            return response.text()
        }
    })

    return marked(text)
}

describe("Testing the Welcome component", () => {
    // Test that the readme can load correctly
    it("Test that the readme can load correctly", async () => {
        let wrapper = createWrapper()
        let readMeFromTest = await createTestReadMeHTML()
        let readMeFromMethod = await wrapper.vm.markdownToHtml(readMe)
        expect(readMeFromMethod).to.equal(readMeFromTest)
    }),
    // Test that the markdownToHtml throws an error when given a bad url
    it("Test that the markdownToHtml throws an error when given a bad url", async () => {
        let wrapper = createWrapper()
        let readMeFromMethod = await wrapper.vm.markdownToHtml(new URL("badurl.md", "https://fell67.github.io/giftExchange/"))
        expect(readMeFromMethod).toContain("Error")
    }),
    // Testing that when the continue button is clicked the component emits a goToDifferentPage event with "continue"
    it("Testing that when the continue button is clicked the component emits a goToDifferentPage event with 'continue'", () => {
        let wrapper = createWrapper()
        wrapper.find("#continue-button").trigger("click")
        expect(wrapper.emitted('goToDifferentPage')[0]).toEqual(["continue"])
    })
})
