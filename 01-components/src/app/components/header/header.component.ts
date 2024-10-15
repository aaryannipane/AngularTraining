import { Component, Input, output } from "@angular/core";

@Component({
    selector: "header-component",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent{
    @Input({required: true, transform: appendHello, alias: "mera-title"}) title:string = "Header"
    nameChange= output<string>()

    isDisabled=true
    username="admin"
    color = "red"

    onSave(event: any){
        this.title = "data saved"
        alert("save data")
        // when using $event
        // console.log((event.target as HTMLButtonElement).disabled);
        // when using Template reference variable
        console.log(event.disabled);
        
    }

    setNewName(){
        this.nameChange.emit(this.username)
    }

   
}

function appendHello(value : string | undefined){
    return "Hello "+value
}