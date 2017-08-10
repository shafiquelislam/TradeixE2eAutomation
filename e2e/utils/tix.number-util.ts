
export class NumberUtil {

    static isValidNumber(str) {
        return str != null && str != undefined && (str.length > 0);
    }

    static stringToNumber(str) {
        let numString: string = str.replace(/[^\d\.]*/g, '');
        if(this.isValidNumber(numString)) {
            if(numString.indexOf('.') >= 0) {
                return parseFloat(numString);
            } else {
                return parseInt(numString);
            }
        } else {
            return null;
        }
    }

    static addNumbersFromListOfString(strList) {
        let sum: number = 0;
        strList.forEach(str => {
            let num = this.stringToNumber(str);
            sum += (num ? num : 0);
        });
        return sum;
    }

    static getSumFromArrayOfElements(elements) {
        return elements.map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return NumberUtil.addNumbersFromListOfString(texts);
        });
    }
};