const generatePassword = (first_name, last_name, secret_pin) => {
    let init = first_name.split('')[0].toLowerCase()
    last_name = last_name.toLowerCase()
    return init + last_name + secret_pin
}

export default generatePassword