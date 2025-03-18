class RadioList extends HTMLElement {

    wrapper;
    name;
    options = [];
    value;

    constructor() {
        super();
        this.wrapper = document.createElement("span");
        //this.wrapper.setStyle({'width': '100%'});
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        this.style.display = 'block';
        super.appendChild(this.wrapper);
    }

    set name(name) {
        this.name = name;
    }
    set value(value) {
        this.value = value;
    }

    appendChild(child) {
        var wrap=document.createElement("span");
        var option = document.createElement("input");
        option.setAttribute("type", "radio");
        //option.setAttribute("name", this.name);
        option.text = child.text;
        option.value = child.value;
        option.id = child.value;
        option.name = this.name;

        option.addEventListener("change", (event) => {
            this.value = event.target.value;
        });
        var label = document.createElement("label");
        label.htmlFor = child.value;
        label.innerHTML = child.text;
        
        wrap.appendChild(option);
        wrap.appendChild(label);
        this.wrapper.appendChild(wrap);
        this.options.push(option);
    }
}