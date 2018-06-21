export default (path, property, state) => {

    let type = state.getIn(path.concat(property).concat("type"));
    let required = state.getIn(path.concat(property).concat("required"));
    let value = state.getIn(path.concat(property).concat("value"));

    if (required) {

        let validated = false;

        switch (type) {
            case "string":
                // check its a string 
                if (value.length > 0) {
                    validated = true;
                }
                break;
            case "date":
                validated = true;
                break;

            case "number":
                // Allowing only numbers
                var numbers = "^[0-9]+$";
                if (value > 0) {
                    if (value.match(numbers)) {

                        let val = value.toString().split('');
                        let zerosExists = true;
                        value = val.map((v,i)=>{
                            if(v !== "0" || zerosExists === false){
                                zerosExists = false; 
                                return v;
                            }else{                 
                                return "";
                            }
                        }).join('');
                        validated = true;
                    }
                }
                console.log(value)
                state = state.setIn(path.concat(property).concat("value"), parseInt(value));

                break;
            case "checkbox":
                validated = true;
                break;
            case "email":
                let emailExp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
                if (value.length > 0) {
                    if (value.match(emailExp)) {
                        validated = true;
                    }
                }
                break;
        }
        state = state.setIn(path.concat(property).concat("validated"), validated);

    } else {
        state = state.setIn(path.concat(property).concat("validated"), true);
    }

    state = state.setIn(path.concat("validation").concat("value"), true);

    state.getIn(path).forEach((v, k) => {
        if (k != "validated") {
            let validated = v.get('validated');
            let required = v.get('required');
            if (validated === false && required === true) {
                state = state.setIn(path.concat("validation").concat("value"), false);
            }
        }
    });

    return state;
}