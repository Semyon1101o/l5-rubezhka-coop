class Validator {
    constructor(){
        // this.options = {...props};
    };
    postalCode() {
        this.startsWith = 'ZIP';
        return this;
    }

    setPostalCodeLengthConstraint(mn, mx = Infinity) {
        this.minLength = mn;
        this.maxLength = mx;
        return this;
    };

    isCode(str) {
        return `${str}`.startsWith(this.startsWith);
    };

    isLengthValid(str) {
        if (this.minLength === undefined) {
            return true;
        }
        return `${str}`.split('_').at(1).length >= this.minLength &&
        `${str}`.split('_').at(1).length <= this.maxLength;
    }

    isValid(str) {
        return this.isCode(str) && this.isLengthValid(str);
    }
};

// const v = new Validator();

// const postalCodeSchema = v.postalCode();

// console.log(postalCodeSchema.isValid('ZIP_12345')); // true
// postalCodeSchema.isValid('ZIP_67890'); // true
// postalCodeSchema.isValid('ZIP_54321'); // true
// console.log(postalCodeSchema.isValid('invalid-postal-code')); // false
// postalCodeSchema.isValid(1234567890); // false

const v = new Validator();

const postalCodeSchema1 = v.postalCode();
postalCodeSchema1.isValid('ZIP_12345'); // true

const postalCodeSchema2 = v.postalCode().setPostalCodeLengthConstraint(7);
console.log(postalCodeSchema2);
console.log(postalCodeSchema2.isValid('ZIP_6789056889')); // true
console.log(postalCodeSchema2.isValid('ZIP_54321')); // false

const postalCodeSchema3 = v.postalCode().setPostalCodeLengthConstraint(4, 6);
console.log(postalCodeSchema3.isValid('ZIP_54321')); // true
postalCodeSchema3.isValid('ZIP_67'); // false
export default Validator;

