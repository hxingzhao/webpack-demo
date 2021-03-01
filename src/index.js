import { cube } from 'utils/util'
import _ from 'lodash';



function component() {
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    console.log(
        _.join(['index', 'module', 'loaded!'], ' ')
    );
    return element;
}

document.body.appendChild(component());