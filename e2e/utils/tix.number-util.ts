import { StringUtil } from './tix.string-util';

export class NumberUtil {

    static isNumber(n): boolean {
        return typeof n == 'number' && !isNaN(n) && isFinite(n);
    }

    static stringToNumber(str: string): number {
        let numString: string = str.replace(/[^\d\.]*/g, '');
        if(StringUtil.isValidString(numString)) {
            if(numString.indexOf('.') >= 0) {
                return parseFloat(numString);
            } else {
                return parseInt(numString);
            }
        } else {
            return null;
        }
    }

    static addNumbersFromListOfString(strList): number {
        let sum: number = 0;
        strList.forEach(str => {
            let num = this.stringToNumber(str);
            sum += (num ? num : 0);
        });
        return sum;
    }

    /*static addNumbersFromListOfStringUsingReduce(strList): number {
        return strList.reduce((str1, str2) => {
            return this.stringToNumber(str1) + this.stringToNumber(str1);
        });
    }*/

    static getSumFromArrayOfElements(elements): number {
        return elements.map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return this.addNumbersFromListOfString(texts);
        });
    }
};