
export class StringUtil {

    static isValidString(str: string): boolean {
        return str != null && str != undefined && (str.length > 0) && (typeof str == 'string');
    }

    static removeExtraSpaces(str: string): string {
        if(this.isValidString(str)) {
            return str.trim().replace(/ +/g, ' ');
        } else {
            return "";
        }
    }

    static checkIfTwoArraysContainSimilarElements(first: Array<string>, second: Array<string>): boolean {
        if(first.length != second.length) {
            return false;
        }
        let isEqual: boolean = true;
        for(let i=0; i< first.length; i++) {
            first[i] = this.removeExtraSpaces(first[i]);
        }
        for(let i=0; i< second.length; i++) {
            let str = this.removeExtraSpaces(second[i]);
            if(first.indexOf(str) >= 0) {
                continue;
            } else {
                isEqual = false;
                break;
            }
        }
        return isEqual;
    }

};