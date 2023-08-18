<template>
    <div>
        <Welcome 
            v-if="currentComponent=='Welcome'"
            @goToDifferentPage="goToDifferentPage($event)"
        />
        <AddPeople 
            v-if="currentComponent=='AddPeople'"
            @goToDifferentPage="goToDifferentPage($event)"
        />
        <DrawingNames 
            v-if="currentComponent=='DrawingNames'"
            @goToDifferentPage="goToDifferentPage($event)"
        />
    </div>
</template>

<script>
    import Welcome from "@/components/content/Welcome.vue"
    import AddPeople from "@/components/content/AddPeople.vue"
    import DrawingNames from  "@/components/content/DrawingNames.vue"

    export default {
        name: "ContentBox",
        components: {
            Welcome: Welcome,
            AddPeople: AddPeople,
            DrawingNames: DrawingNames
        },
        data () {
            return {
                currentComponent: "", // This keeps track of what currentComponent to show
                componentNavigation: { // This keeps track of the page navigation
                    Welcome: {
                        goBack: "",
                        continue: "AddPeople"
                    },
                    AddPeople: {
                        goBack: "Welcome",
                        continue: "DrawingNames"
                    },
                    DrawingNames: {
                        goBack: "AddPeople",
                        continue: ""
                    }
                } 
            }
        },
        mounted () {
            // by default show the welcome screen
            this.currentComponent = "Welcome"
        },
        methods: {
            goToDifferentPage(direction) {
                if (this.currentComponent in this.componentNavigation) {
                    if (direction in this.componentNavigation[this.currentComponent] && this.componentNavigation[this.currentComponent][direction] !== "") {
                        this.currentComponent=this.componentNavigation[this.currentComponent][direction]
                    }
                    else {
                        console.error("Error in contentBox: The " + this.currentComponent + " component does not have a page in the " + direction + " direction set")
                    }
                } else {
                    console.error("Error in contentBox: The " + this.currentComponent + " component does not have any navigational settings set")
                }
            }
        }
    }
</script>