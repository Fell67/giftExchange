export class Person {
    constructor (name) {
        this.name = name, // This is the current name of the person 
        this.edit = false, // This keeps track on if the user is editing the name
        this.editName = name, // This is the name the user is editing the person's name to
        this.nameDrawn = '' // This is the name of who they have drawn
    }
}