export default (errors, events, test) => {

    if (test === false) {
        events.forEach((v, key) => {
            if (errors[key]) {
                errors[key] = {}
            }
        })
    } else {
        events.forEach((v, key) => {
            if (errors[key]) {
                if (v.get('validated') === true) {
                    errors[key] = {}
                }
            }
        })
    }
    return errors;
}